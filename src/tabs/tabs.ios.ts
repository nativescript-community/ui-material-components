// Types
import { TabContentItem } from '@nativescript/core/ui/tab-navigation-base/tab-content-item';
import { TabStrip } from '@nativescript/core/ui/tab-navigation-base/tab-strip';
import { TabStripItem } from '@nativescript/core/ui/tab-navigation-base/tab-strip-item';
import { TextTransform, ViewBase } from '@nativescript/core/ui/text-base';

// Requires
import { Color } from '@nativescript/core/color';
import { ImageSource } from '@nativescript/core/image-source';
import { device } from '@nativescript/core/platform';
import { ios as iosUtils, isFontIconURI, layout } from '@nativescript/core/utils/utils';
import { View, ios as iosView } from '@nativescript/core/ui/core/view';
import { Frame } from '@nativescript/core/ui/frame';
import { Font } from '@nativescript/core/ui/styling/font';
import { getIconSpecSize, itemsProperty, selectedIndexProperty, tabStripProperty } from '@nativescript/core/ui/tab-navigation-base/tab-navigation-base';
import { IOSTabBarItemsAlignment, TabsBase, iOSTabBarItemsAlignmentProperty, swipeEnabledProperty } from './tabs-common';

// TODO
// import { profile } from "../../profiling";

export * from './tabs-common';

const majorVersion = iosUtils.MajorVersion;
const isPhone = device.deviceType === 'Phone';

// Equivalent to dispatch_async(dispatch_get_main_queue(...)) call
const invokeOnRunLoop = (function () {
    const runloop = CFRunLoopGetMain();

    return (action: () => any) => {
        CFRunLoopPerformBlock(runloop, kCFRunLoopDefaultMode, action);
        CFRunLoopWakeUp(runloop);
    };
})();

declare class IMDCTabBarDelegateImpl extends NSObject implements MDCTabBarDelegate {
    static new(): IMDCTabBarDelegateImpl;
    _owner: WeakRef<Tabs>;
}

const MDCTabBarDelegateImpl = (NSObject as any).extend(
    {
        // public static ObjCProtocols = [MDCTabBarDelegate];

        // private _owner: WeakRef<Tabs>;

        // public static initWithOwner(owner: WeakRef<Tabs>): MDCTabBarDelegateImpl {
        //     let delegate = <MDCTabBarDelegateImpl>MDCTabBarDelegateImpl.new();
        //     delegate._owner = owner;

        //     return delegate;
        // }

        tabBarShouldSelectItem(tabBar: MDCTabBar, item: UITabBarItem): boolean {
            const owner = this._owner.get();
            const shouldSelectItem = owner._canSelectItem;
            const selectedIndex = owner.tabBarItems.indexOf(item);

            if (owner.selectedIndex !== selectedIndex) {
                owner._canSelectItem = false;
            }

            const tabStrip = owner.tabStrip;
            const tabStripItems = tabStrip && tabStrip.items;

            if (tabStripItems && tabStripItems[selectedIndex]) {
                tabStripItems[selectedIndex]._emit(TabStripItem.tapEvent);
                tabStrip.notify({ eventName: TabStrip.itemTapEvent, object: tabStrip, index: selectedIndex });
            }

            return shouldSelectItem;
        },
        tabBarDidSelectItem(tabBar: MDCTabBar, selectedItem: UITabBarItem): void {
            const owner = this._owner.get();
            const tabBarItems = owner.tabBarItems;
            const selectedIndex = tabBarItems.indexOf(selectedItem);

            owner.selectedIndex = selectedIndex;
        },
    } as Partial<IMDCTabBarDelegateImpl>,
    {
        protocols: [MDCTabBarDelegate],
    }
) as typeof IMDCTabBarDelegateImpl;

declare class IBackgroundIndicatorTemplate extends NSObject implements MDCTabBarIndicatorTemplate {
    static new(): IBackgroundIndicatorTemplate;
    indicatorAttributesForContext(context: MDCTabBarIndicatorContext): MDCTabBarIndicatorAttributes;
}

const BackgroundIndicatorTemplate = (NSObject as any).extend(
    {
        indicatorAttributesForContext(context: MDCTabBarIndicatorContext): MDCTabBarIndicatorAttributes {
            const attributes = new MDCTabBarIndicatorAttributes();
            attributes.path = UIBezierPath.bezierPathWithRect(context.bounds);

            return attributes;
        },
    },
    {
        protocols: [MDCTabBarIndicatorTemplate],
    }
) as typeof IBackgroundIndicatorTemplate;

declare class IUIPageViewControllerImpl extends UIPageViewController {
    static new(): IUIPageViewControllerImpl;
    static alloc(): IUIPageViewControllerImpl;
    tabBar: MDCTabBar;
    scrollView: UIScrollView;
    tabBarDelegate: IMDCTabBarDelegateImpl;

    _owner: WeakRef<Tabs>;
}
const UIPageViewControllerImpl = (UIPageViewController as any).extend(
    {
        // private _owner: WeakRef<Tabs>;

        // public static initWithOwner(owner: WeakRef<Tabs>): UIPageViewControllerImpl {
        //     const handler = <UIPageViewControllerImpl>(
        //         UIPageViewControllerImpl.alloc().initWithTransitionStyleNavigationOrientationOptions(UIPageViewControllerTransitionStyle.Scroll, UIPageViewControllerNavigationOrientation.Horizontal, null)
        //     );
        //     handler._owner = owner;

        //     return handler;
        // }

        viewDidLoad(): void {
            const owner = this._owner.get();

            const tabBarItems = owner.tabBarItems;
            const tabBar = MDCTabBar.alloc().initWithFrame(this.view.bounds);

            if (tabBarItems && tabBarItems.length) {
                tabBar.items = NSArray.arrayWithArray(tabBarItems);
            }

            tabBar.delegate = this.tabBarDelegate = MDCTabBarDelegateImpl.new();
            this.tabBarDelegate._owner = new WeakRef(owner);

            if (majorVersion <= 12 || !UIColor.labelColor) {
                tabBar.tintColor = UIColor.blueColor;
                tabBar.barTintColor = UIColor.whiteColor;
                tabBar.setTitleColorForState(UIColor.blackColor, MDCTabBarItemState.Normal);
                tabBar.setTitleColorForState(UIColor.blackColor, MDCTabBarItemState.Selected);
            } else {
                tabBar.tintColor = UIColor.systemBlueColor;
                tabBar.barTintColor = UIColor.systemBackgroundColor;
                tabBar.setTitleColorForState(UIColor.labelColor, MDCTabBarItemState.Normal);
                tabBar.setTitleColorForState(UIColor.labelColor, MDCTabBarItemState.Selected);
                tabBar.inkColor = UIColor.clearColor;
            }

            tabBar.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleBottomMargin;
            tabBar.alignment = MDCTabBarAlignment.Justified;
            tabBar.sizeToFit();

            this.tabBar = tabBar;
            this.view.addSubview(tabBar);
        },

        viewWillAppear(animated: boolean): void {
            this.super.viewWillAppear(animated);
            const owner = this._owner.get();
            if (!owner) {
                return;
            }

            iosView.updateAutoAdjustScrollInsets(this, owner);

            // Tabs can be reset as a root view. Call loaded here in this scenario.
            if (!owner.isLoaded) {
                owner.callLoaded();
            }
        },

        viewDidLayoutSubviews(): void {
            this.super.viewDidLayoutSubviews();
            const owner = this._owner.get();
            if (!owner) {
                return;
            }

            let safeAreaInsetsBottom = 0;
            let safeAreaInsetsTop = 0;

            if (majorVersion > 10) {
                safeAreaInsetsBottom = this.view.safeAreaInsets.bottom;
                safeAreaInsetsTop = this.view.safeAreaInsets.top;
            } else {
                safeAreaInsetsTop = this.topLayoutGuide.length;
            }

            let scrollViewTop = 0;
            let scrollViewHeight = this.view.bounds.size.height + safeAreaInsetsBottom;

            if (owner.tabStrip) {
                scrollViewTop = this.tabBar.frame.size.height;
                scrollViewHeight = this.view.bounds.size.height - this.tabBar.frame.size.height + safeAreaInsetsBottom;
                let tabBarTop = safeAreaInsetsTop;
                const tabBarHeight = this.tabBar.frame.size.height;

                const tabsPosition = owner.tabsPosition;
                if (tabsPosition === 'bottom') {
                    tabBarTop = this.view.frame.size.height - this.tabBar.frame.size.height - safeAreaInsetsBottom;
                    scrollViewTop = this.view.frame.origin.y;
                    scrollViewHeight = this.view.frame.size.height - safeAreaInsetsBottom;
                }

                let parent = owner.parent;

                // Handle Angular scenario where Tabs is in a ProxyViewContainer
                // It is possible to wrap components in ProxyViewContainers indefinitely
                while (parent && !parent.nativeViewProtected) {
                    parent = parent.parent;
                }

                if (parent && majorVersion > 10) {
                    // TODO: Figure out a better way to handle ViewController nesting/Safe Area nesting
                    tabBarTop = Math.max(tabBarTop, parent.nativeView.safeAreaInsets.top);
                }

                this.tabBar.frame = CGRectMake(0, tabBarTop, this.tabBar.frame.size.width, tabBarHeight);
            } else {
                this.tabBar.hidden = true;
            }

            const subViews: NSArray<UIView> = this.view.subviews;
            let scrollView: UIScrollView = null;

            for (let i = 0; i < subViews.count; i++) {
                const view: UIView = subViews[i];
                if (view instanceof UIScrollView) {
                    scrollView = view;
                }
            }

            if (scrollView) {
                // The part of the UIPageViewController that is changing the pages is a UIScrollView
                // We want to expand it to the size of the UIPageViewController as it is not so by default
                this.scrollView = scrollView;

                if (!owner.swipeEnabled) {
                    scrollView.scrollEnabled = false;
                }

                scrollView.frame = CGRectMake(0, scrollViewTop, this.view.bounds.size.width, scrollViewHeight); //this.view.bounds;
            }
        },

        // Mind implementation for other controllers
        traitCollectionDidChange(previousTraitCollection: UITraitCollection): void {
            this.super.traitCollectionDidChange(previousTraitCollection);

            if (majorVersion >= 13) {
                const owner = this._owner.get();
                if (
                    owner &&
                    this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection &&
                    this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection(previousTraitCollection)
                ) {
                    owner.notify({ eventName: iosView.traitCollectionColorAppearanceChangedEvent, object: owner });
                }
            }
        },
        viewWillTransitionToSizeWithTransitionCoordinator(size: CGSize, coordinator: UIViewControllerTransitionCoordinator): void {
            this.super.viewWillTransitionToSizeWithTransitionCoordinator(size, coordinator);
            coordinator.animateAlongsideTransitionCompletion(() => {
                const owner = this._owner.get();
                if (owner && owner.tabStrip && owner.tabStrip.items) {
                    const tabStrip = owner.tabStrip;
                    tabStrip.items.forEach((tabStripItem) => {
                        updateBackgroundPositions(
                            tabStrip,
                            tabStripItem,
                            this.tabBar.alignment !== MDCTabBarAlignment.Justified || owner.selectedIndex !== tabStripItem._index ? owner._defaultItemBackgroundColor : null
                        );

                        const index = tabStripItem._index;
                        const tabBarItemController = owner.viewControllers[index];
                        updateTitleAndIconPositions(tabStripItem, tabBarItemController.tabBarItem, tabBarItemController);
                    });
                }
            }, null);
        },
    },
    {}
) as typeof IUIPageViewControllerImpl;

declare class IUIPageViewControllerDataSourceImpl extends NSObject implements UIPageViewControllerDataSource {
    pageViewControllerViewControllerAfterViewController(pageViewController: UIPageViewController, viewController: UIViewController): UIViewController;
    pageViewControllerViewControllerBeforeViewController(pageViewController: UIPageViewController, viewController: UIViewController): UIViewController;
    presentationCountForPageViewController?(pageViewController: UIPageViewController): number;
    presentationIndexForPageViewController?(pageViewController: UIPageViewController): number;
    static new(): IUIPageViewControllerDataSourceImpl;
    static alloc(): IUIPageViewControllerDataSourceImpl;
    _owner: WeakRef<Tabs>;
}
const UIPageViewControllerDataSourceImpl = (NSObject as any).extend(
    {
        pageViewControllerViewControllerBeforeViewController(pageViewController: UIPageViewController, viewController: UIViewController): UIViewController {
            // TODO
            // if (traceEnabled()) {
            //     traceWrite("TabView.delegate.SHOULD_select(" + tabBarController + ", " + viewController + ");", traceCategories.Debug);
            // }

            const owner = this._owner.get();
            let selectedIndex = owner.selectedIndex;

            if (selectedIndex === 0) {
                return null;
            }

            selectedIndex--;
            const prevItem = owner.items[selectedIndex];
            const prevViewController = prevItem.__controller;

            // if (!prevViewController) {
            //     prevViewController = owner.getViewController(prevItem);
            // }

            owner._setCanBeLoaded(selectedIndex);
            owner._loadUnloadTabItems(selectedIndex);

            return prevViewController;
        },

        pageViewControllerViewControllerAfterViewController(pageViewController: UIPageViewController, viewController: UIViewController): UIViewController {
            // TODO
            // if (traceEnabled()) {
            //     traceWrite("TabView.delegate.SHOULD_select(" + tabBarController + ", " + viewController + ");", traceCategories.Debug);
            // }

            const owner = this._owner.get();
            let selectedIndex = owner.selectedIndex;

            if (selectedIndex === owner.items.length - 1) {
                return null;
            }

            selectedIndex++;
            const nextItem = owner.items[selectedIndex];
            const nextViewController = nextItem.__controller;

            // if (!nextViewController) {
            //     nextViewController = owner.getViewController(nextItem);
            // }

            owner._setCanBeLoaded(selectedIndex);
            owner._loadUnloadTabItems(selectedIndex);
            // nextItem.loadView(nextItem.view);

            return nextViewController;
        },

        presentationCountForPageViewController(pageViewController: UIPageViewController): number {
            // TODO
            // if (traceEnabled()) {
            //     traceWrite("TabView.delegate.SHOULD_select(" + tabBarController + ", " + viewController + ");", traceCategories.Debug);
            // }

            return 0;
        },

        presentationIndexForPageViewController(pageViewController: UIPageViewController): number {
            // TODO
            // if (traceEnabled()) {
            //     traceWrite("TabView.delegate.SHOULD_select(" + tabBarController + ", " + viewController + ");", traceCategories.Debug);
            // }

            return 0;
        },
    },
    {
        protocols: [UIPageViewControllerDataSource],
    }
) as typeof IUIPageViewControllerDataSourceImpl;

declare class IUIPageViewControllerDelegateImpl extends NSObject implements UIPageViewControllerDelegate {
    static new(): IUIPageViewControllerDelegateImpl;
    static alloc(): IUIPageViewControllerDelegateImpl;
    _owner: WeakRef<Tabs>;
}
const UIPageViewControllerDelegateImpl = (NSObject as any).extend(
    {
        // private _owner: WeakRef<Tabs>;

        // public static initWithOwner(owner: WeakRef<Tabs>): UIPageViewControllerDelegateImpl {
        //     let delegate = <UIPageViewControllerDelegateImpl>UIPageViewControllerDelegateImpl.new();
        //     delegate._owner = owner;

        //     return delegate;
        // }

        pageViewControllerWillTransitionToViewControllers(pageViewController: UIPageViewController, viewControllers: NSArray<UIViewController>): void {
            // const owner = this._owner.get();
            // const ownerViewControllers = owner.viewControllers;
            // const selectedIndex = owner.selectedIndex;
            // const nextViewController = viewControllers[0];
            // const nextViewControllerIndex = ownerViewControllers.indexOf(nextViewController);
            // if (selectedIndex > nextViewControllerIndex) {
            //     owner.selectedIndex--;
            // } else {
            //     owner.selectedIndex++;
            // }
        },

        pageViewControllerDidFinishAnimatingPreviousViewControllersTransitionCompleted(
            pageViewController: UIPageViewController,
            didFinishAnimating: boolean,
            previousViewControllers: NSArray<UIViewController>,
            transitionCompleted: boolean
        ): void {
            if (!transitionCompleted) {
                return;
            }

            const owner = this._owner.get();
            const ownerViewControllers = owner.viewControllers;
            const selectedIndex = owner.selectedIndex;
            const nextViewController = pageViewController.viewControllers[0];
            const nextViewControllerIndex = ownerViewControllers.indexOf(nextViewController);

            if (selectedIndex !== nextViewControllerIndex) {
                owner.selectedIndex = nextViewControllerIndex;
                owner._canSelectItem = true;
            }
        },
    },
    {
        protocols: [UIPageViewControllerDelegate],
    }
) as typeof IUIPageViewControllerDelegateImpl;

function iterateIndexRange(index: number, eps: number, lastIndex: number, callback: (i) => void) {
    const rangeStart = Math.max(0, index - eps);
    const rangeEnd = Math.min(index + eps, lastIndex);
    for (let i = rangeStart; i <= rangeEnd; i++) {
        callback(i);
    }
}

function updateBackgroundPositions(tabStrip: TabStrip, tabStripItem: TabStripItem, color: UIColor = null) {
    let bgView = (<any>tabStripItem).bgView;
    const index = tabStripItem._index;
    const width = tabStrip.nativeView.frame.size.width / tabStrip.items.length;
    const frame = CGRectMake(width * index, 0, width, tabStrip.nativeView.frame.size.width);
    if (!bgView) {
        bgView = UIView.alloc().initWithFrame(frame);
        tabStrip.nativeView.insertSubviewAtIndex(bgView, 0);
        (<any>tabStripItem).bgView = bgView;
    } else {
        bgView.frame = frame;
    }

    const backgroundColor = tabStripItem.style.backgroundColor;
    bgView.backgroundColor = color || (backgroundColor instanceof Color ? backgroundColor.ios : backgroundColor);
}

function updateTitleAndIconPositions(tabStripItem: TabStripItem, tabBarItem: UITabBarItem, controller: UIViewController) {
    if (!tabStripItem || !tabBarItem) {
        return;
    }

    // For iOS <11 icon is *always* above the text.
    // For iOS 11 icon is above the text *only* on phones in portrait mode.
    const orientation = controller.interfaceOrientation;
    const isPortrait = orientation !== UIInterfaceOrientation.LandscapeLeft && orientation !== UIInterfaceOrientation.LandscapeRight;
    const isIconAboveTitle = majorVersion < 11 || (isPhone && isPortrait);

    if (!tabStripItem.iconSource) {
        if (isIconAboveTitle) {
            tabBarItem.titlePositionAdjustment = { horizontal: 0, vertical: -20 };
        } else {
            tabBarItem.titlePositionAdjustment = { horizontal: 0, vertical: 0 };
        }
    }

    if (!tabStripItem.title) {
        if (isIconAboveTitle) {
            tabBarItem.imageInsets = new UIEdgeInsets({ top: 6, left: 0, bottom: -6, right: 0 });
        } else {
            tabBarItem.imageInsets = new UIEdgeInsets({ top: 0, left: 0, bottom: 0, right: 0 });
        }
    }
}

export class Tabs extends TabsBase {
    public nativeViewProtected: UIView;
    public selectedIndex: number;
    // public swipeEnabled: boolean;
    // public offscreenTabLimit: number;
    // public tabsPosition: "top" | "bottom";
    public _canSelectItem: boolean;
    public isLoaded: boolean;
    public viewController: IUIPageViewControllerImpl;
    public items: TabContentItem[];
    // public _ios: IUIPageViewControllerImpl;
    public viewControllers: UIViewController[];
    public tabBarItems: UITabBarItem[];
    private _currentNativeSelectedIndex: number;
    private _dataSource: IUIPageViewControllerDataSourceImpl;
    private _delegate: IUIPageViewControllerDelegateImpl;
    // private _moreNavigationControllerDelegate: UINavigationControllerDelegateImpl;
    private _iconsCache = {};
    private _backgroundIndicatorColor: UIColor;
    public _defaultItemBackgroundColor: UIColor;
    private _selectedItemColor: Color;
    private _unSelectedItemColor: Color;

    constructor() {
        super();

        this.viewController = UIPageViewControllerImpl.alloc().initWithTransitionStyleNavigationOrientationOptions(
            UIPageViewControllerTransitionStyle.Scroll,
            UIPageViewControllerNavigationOrientation.Horizontal,
            null
        );
        this.viewController._owner = new WeakRef(this);
    }

    get tabBar() {
        return this.viewController.tabBar;
    }

    createNativeView() {
        return this.viewController.view;
    }

    initNativeView() {
        super.initNativeView();
        this._dataSource = UIPageViewControllerDataSourceImpl.new();
        this._dataSource._owner = new WeakRef(this);
        this._delegate = UIPageViewControllerDelegateImpl.new();
        this._delegate._owner = new WeakRef(this);
    }

    disposeNativeView() {
        this._dataSource = null;
        this._delegate = null;
        this.viewController.tabBarDelegate = null;
        this.viewController.tabBar = null;
        super.disposeNativeView();
    }

    // TODO
    // @profile
    public onLoaded() {
        super.onLoaded();

        this.setViewControllers(this.items);

        const selectedIndex = this.selectedIndex;
        const selectedView = this.items && this.items[selectedIndex] && this.items[selectedIndex].content;
        if (selectedView instanceof Frame) {
            selectedView._pushInFrameStackRecursive();
        }

        this.viewController.dataSource = this._dataSource;
        this.viewController.delegate = this._delegate;
    }

    public onUnloaded() {
        this.viewController.dataSource = null;
        this.viewController.delegate = null;
        super.onUnloaded();
    }

    public layoutNativeView(left: number, top: number, right: number, bottom: number): void {
        //
    }

    public _setNativeViewFrame(nativeView: UIView, frame: CGRect) {
        //
    }

    public onSelectedIndexChanged(oldIndex: number, newIndex: number): void {
        const items = this.items;
        if (!items) {
            return;
        }

        const oldItem = items[oldIndex];
        if (oldItem) {
            oldItem.canBeLoaded = false;
            oldItem.unloadView(oldItem.content);
        }

        const newItem = items[newIndex];
        if (newItem && this.isLoaded) {
            const selectedView = items[newIndex].content;
            if (selectedView instanceof Frame) {
                selectedView._pushInFrameStackRecursive();
            }

            newItem.canBeLoaded = true;
            newItem.loadView(newItem.content);
        }

        const tabStripItems = this.tabStrip && this.tabStrip.items;
        if (tabStripItems) {
            if (tabStripItems[newIndex]) {
                tabStripItems[newIndex]._emit(TabStripItem.selectEvent);
                this.setIconColor(tabStripItems[newIndex]);
            }

            if (tabStripItems[oldIndex]) {
                tabStripItems[oldIndex]._emit(TabStripItem.unselectEvent);
                this.setIconColor(tabStripItems[oldIndex]);
            }
        }

        this._loadUnloadTabItems(newIndex);

        super.onSelectedIndexChanged(oldIndex, newIndex);
    }

    public _loadUnloadTabItems(newIndex: number) {
        const items = this.items;
        if (!items) {
            return;
        }

        const lastIndex = items.length - 1;
        const offsideItems = this.offscreenTabLimit;

        const toUnload = [];
        const toLoad = [];

        iterateIndexRange(newIndex, offsideItems, lastIndex, (i) => toLoad.push(i));

        items.forEach((item, i) => {
            const indexOfI = toLoad.indexOf(i);
            if (indexOfI < 0) {
                toUnload.push(i);
            }
        });

        toUnload.forEach((index) => {
            const item = items[index];
            if (items[index]) {
                item.unloadView(item.content);
            }
        });

        const newItem = items[newIndex];
        const selectedView = newItem && newItem.content;
        if (selectedView instanceof Frame) {
            selectedView._pushInFrameStackRecursive();
        }

        toLoad.forEach((index) => {
            const item = items[index];
            if (this.isLoaded && items[index]) {
                item.loadView(item.content);
            }
        });
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        const width = layout.getMeasureSpecSize(widthMeasureSpec);
        const widthMode = layout.getMeasureSpecMode(widthMeasureSpec);

        const height = layout.getMeasureSpecSize(heightMeasureSpec);
        const heightMode = layout.getMeasureSpecMode(heightMeasureSpec);

        const widthAndState = View.resolveSizeAndState(width, width, widthMode, 0);
        const heightAndState = View.resolveSizeAndState(height, height, heightMode, 0);

        this.setMeasuredDimension(widthAndState, heightAndState);
    }

    public _onViewControllerShown(viewController: UIViewController) {
        // This method could be called with the moreNavigationController or its list controller, so we have to check.
        // TODO
        // if (traceEnabled()) {
        //     traceWrite("TabView._onViewControllerShown(" + viewController + ");", traceCategories.Debug);
        // }
        if (this.viewController.viewControllers && this.viewController.viewControllers.containsObject(viewController)) {
            this.selectedIndex = this.viewController.viewControllers.indexOfObject(viewController);
        } else {
            // TODO
            // if (traceEnabled()) {
            //     traceWrite("TabView._onViewControllerShown: viewController is not one of our viewControllers", traceCategories.Debug);
            // }
        }
    }

    private getViewController(item: TabContentItem): UIViewController {
        let newController: UIViewController = item.content ? item.content.viewController : null;

        if (newController) {
            (<any>item).setViewController(newController, newController.view);

            return newController;
        }

        if (item.content.ios instanceof UIViewController) {
            newController = item.content.ios;
            (<any>item).setViewController(newController, newController.view);
        } else if (item.content.ios && item.content.ios.controller instanceof UIViewController) {
            newController = item.content.ios.controller;
            (<any>item).setViewController(newController, newController.view);
        } else {
            newController = iosView.UILayoutViewController.initWithOwner(new WeakRef(item.content)) as UIViewController;
            newController.view.addSubview(item.content.nativeViewProtected);
            item.content.viewController = newController;
            (<any>item).setViewController(newController, item.content.nativeViewProtected);
        }

        return newController;
    }

    public _setCanBeLoaded(index: number) {
        const items = this.items;
        if (!this.items) {
            return;
        }

        const lastIndex = items.length - 1;
        const offsideItems = this.offscreenTabLimit;

        iterateIndexRange(index, offsideItems, lastIndex, (i) => {
            if (items[i]) {
                items[i].canBeLoaded = true;
            }
        });
    }

    private setViewControllers(items: TabContentItem[]) {
        const length = items ? items.length : 0;
        if (length === 0) {
            this.viewControllers = null;

            return;
        }

        const viewControllers = [];
        const tabBarItems = [];

        if (this.tabStrip) {
            this.tabStrip.setNativeView(this.tabBar);
        }

        const tabStripItems = this.tabStrip && this.tabStrip.items;
        if (tabStripItems) {
            if (tabStripItems[this.selectedIndex]) {
                tabStripItems[this.selectedIndex]._emit(TabStripItem.selectEvent);
            }
        }

        items.forEach((item, i) => {
            const controller = this.getViewController(item);

            if (this.tabStrip && this.tabStrip.items && this.tabStrip.items[i]) {
                const tabStripItem = this.tabStrip.items[i];
                const tabBarItem = this.createTabBarItem(tabStripItem, i);
                updateTitleAndIconPositions(tabStripItem, tabBarItem, controller);

                this.setViewTextAttributes(tabStripItem.label, i === this.selectedIndex);

                controller.tabBarItem = tabBarItem;
                tabStripItem._index = i;
                tabBarItems.push(tabBarItem);
                tabStripItem.setNativeView(tabBarItem);
            }

            item.canBeLoaded = true;
            viewControllers.push(controller);
        });

        this.setItemImages();

        this.viewControllers = viewControllers;
        this.tabBarItems = tabBarItems;

        if (this.viewController && this.tabBar) {
            this.tabBar.itemAppearance = this.getTabBarItemAppearance();
            this.tabBar.items = NSArray.arrayWithArray(this.tabBarItems);
            // TODO: investigate why this call is necessary to actually toggle item appearance
            this.tabBar.sizeToFit();
            if (this.selectedIndex) {
                this.tabBar.setSelectedItemAnimated(this.tabBarItems[this.selectedIndex], false);
            }
        }
    }

    private setItemImages() {
        if (this._selectedItemColor || this._unSelectedItemColor) {
            if (this.tabStrip && this.tabStrip.items) {
                this.tabStrip.items.forEach((item) => {
                    if (this._unSelectedItemColor && item.nativeView) {
                        item.nativeView.image = this.getIcon(item, this._unSelectedItemColor);
                    }
                    if (this._selectedItemColor && item.nativeView) {
                        if (this.selectedIndex === item._index) {
                            item.nativeView.image = this.getIcon(item, this._selectedItemColor);
                        }
                    }
                });
            }
        }
    }

    private createTabBarItem(item: TabStripItem, index: number): UITabBarItem {
        let image: UIImage;
        let title: string;

        if (item.isLoaded) {
            image = this.getIcon(item);
            title = item.label.text;

            if (!this.tabStrip._hasImage) {
                this.tabStrip._hasImage = !!image;
            }

            if (!this.tabStrip._hasTitle) {
                this.tabStrip._hasTitle = !!title;
            }
        }

        const tabBarItem = UITabBarItem.alloc().initWithTitleImageTag(title, image, index);

        return tabBarItem;
    }

    private getTabBarItemAppearance(): MDCTabBarItemAppearance {
        let itemAppearance;
        if (this.tabStrip && this.tabStrip._hasImage && this.tabStrip._hasTitle) {
            itemAppearance = MDCTabBarItemAppearance.TitledImages;
        } else if (this.tabStrip && this.tabStrip._hasImage) {
            itemAppearance = MDCTabBarItemAppearance.Images;
        } else {
            itemAppearance = MDCTabBarItemAppearance.Titles;
        }

        return itemAppearance;
    }

    private getIconRenderingMode(): UIImageRenderingMode {
        switch (this.tabStrip && this.tabStrip.iosIconRenderingMode) {
            case 'alwaysOriginal':
                return UIImageRenderingMode.AlwaysOriginal;
            case 'alwaysTemplate':
                return UIImageRenderingMode.AlwaysTemplate;
            case 'automatic':
            default:
                const hasItemColor = this._selectedItemColor || this._unSelectedItemColor;

                return hasItemColor ? UIImageRenderingMode.AlwaysTemplate : UIImageRenderingMode.AlwaysOriginal;
        }
    }

    private getIcon(tabStripItem: TabStripItem, color?: Color): UIImage {
        // Image and Label children of TabStripItem
        // take priority over its `iconSource` and `title` properties
        const iconSource = tabStripItem.image && tabStripItem.image.src;
        if (!iconSource) {
            return null;
        }

        const target = tabStripItem.image;
        const font = target.style.fontInternal;
        if (!color) {
            color = target.style.color;
        }
        const iconTag = [iconSource, font.fontStyle, font.fontWeight, font.fontSize, font.fontFamily, color].join(';');

        let isFontIcon = false;
        let image: UIImage = this._iconsCache[iconTag];
        if (!image) {
            let is = new ImageSource();
            if (isFontIconURI(iconSource)) {
                isFontIcon = true;
                const fontIconCode = iconSource.split('//')[1];
                is = ImageSource.fromFontIconCodeSync(fontIconCode, font, color);
            } else {
                is = ImageSource.fromFileOrResourceSync(iconSource);
            }

            if (is && is.ios) {
                image = is.ios;

                if (this.tabStrip && this.tabStrip.isIconSizeFixed) {
                    image = this.getFixedSizeIcon(image);
                }

                let renderingMode: UIImageRenderingMode = UIImageRenderingMode.Automatic;
                if (!isFontIcon) {
                    renderingMode = this.getIconRenderingMode();
                }
                const originalRenderedImage = image.imageWithRenderingMode(renderingMode);
                this._iconsCache[iconTag] = originalRenderedImage;
                image = originalRenderedImage;
            }
        }

        return image;
    }

    private getFixedSizeIcon(image: UIImage): UIImage {
        const inWidth = image.size.width;
        const inHeight = image.size.height;

        const iconSpecSize = getIconSpecSize({ width: inWidth, height: inHeight });

        const widthPts = iconSpecSize.width;
        const heightPts = iconSpecSize.height;

        UIGraphicsBeginImageContextWithOptions({ width: widthPts, height: heightPts }, false, layout.getDisplayDensity());
        image.drawInRect(CGRectMake(0, 0, widthPts, heightPts));
        const resultImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();

        return resultImage;
    }

    public getTabBarBackgroundColor(): UIColor {
        return this.tabBar.barTintColor;
    }

    public setTabBarBackgroundColor(value: UIColor | Color): void {
        this.tabBar.barTintColor = value instanceof Color ? value.ios : value;
    }

    public setTabBarItemTitle(tabStripItem: TabStripItem, value: string): void {
        tabStripItem.nativeView.title = value;
    }

    private equalUIColor(first: UIColor, second: UIColor): boolean {
        if (!first && !second) {
            return true;
        }
        if (!first || !second) {
            return false;
        }
        const firstComponents = CGColorGetComponents(first.CGColor);
        const secondComponents = CGColorGetComponents(second.CGColor);

        return firstComponents[0] === secondComponents[0] && firstComponents[1] === secondComponents[1] && firstComponents[2] === secondComponents[2] && firstComponents[3] === secondComponents[3];
    }

    private isSelectedAndHightlightedItem(tabStripItem: TabStripItem): boolean {
        // to find out whether the current tab strip item is active (has style with :active selector applied)
        // we need to check whether its _visualState is equal to "highlighted" as when changing tabs
        // we first go through setTabBarItemBackgroundColor thice, once before setting the "highlighted" state
        // and once after that, but if the "highlighted" state is not set we cannot get the backgroundColor
        // set using :active selector
        return tabStripItem._index === this.selectedIndex && tabStripItem['_visualState'] === 'highlighted';
    }

    public setTabBarItemBackgroundColor(tabStripItem: TabStripItem, value: UIColor | Color): void {
        if (!this.tabStrip || !tabStripItem) {
            return;
        }

        const newColor = value instanceof Color ? value.ios : value;
        const itemSelectedAndHighlighted = this.isSelectedAndHightlightedItem(tabStripItem);

        // As we cannot implement selected item background color in Tabs we are using the Indicator for this
        // To be able to detect that there are two different background colors (one for selected and one for not selected item)
        // we are checking whether the current item is not selected and higlighted and we store the value of its
        // background color to _defaultItemBackgroundColor and later if we need to process a selected and highlighted item
        // we are comparing it's backgroun color to the default one and if there's a difference
        // we are changing the selectionIndicatorTemplate from underline to the whole item
        // in that mode we are not able to show the indicator as it is used for the background of the selected item

        if (!this._defaultItemBackgroundColor && !itemSelectedAndHighlighted) {
            this._defaultItemBackgroundColor = newColor;
        }

        if (this.tabBar.alignment !== MDCTabBarAlignment.Justified && itemSelectedAndHighlighted && !this.equalUIColor(this._defaultItemBackgroundColor, newColor)) {
            if (!this._backgroundIndicatorColor) {
                this._backgroundIndicatorColor = newColor;
                this.tabBar.selectionIndicatorTemplate = BackgroundIndicatorTemplate.new();
                this.tabBar.tintColor = newColor;
            }
        } else {
            updateBackgroundPositions(this.tabStrip, tabStripItem, newColor);
        }
    }

    public setTabBarItemColor(tabStripItem: TabStripItem, value: UIColor | Color): void {
        this.setViewTextAttributes(tabStripItem.label);
    }

    private setItemColors(): void {
        if (this._selectedItemColor) {
            this.tabBar.selectedItemTintColor = this._selectedItemColor.ios;
        }
        if (this._unSelectedItemColor) {
            this.tabBar.unselectedItemTintColor = this._unSelectedItemColor.ios;
        }
    }

    private setIconColor(tabStripItem: TabStripItem, forceReload: boolean = false): void {
        // if there is no change in the css color and there is no item color set
        // we don't need to reload the icon
        if (!forceReload && !this._selectedItemColor && !this._unSelectedItemColor) {
            return;
        }


        // if selectedItemColor or unSelectedItemColor is set we don't respect the color from the style
        const tabStripColor = this.selectedIndex === tabStripItem._index ? this._selectedItemColor : this._unSelectedItemColor;
        const image: UIImage = this.getIcon(tabStripItem, tabStripColor);

        tabStripItem.nativeView.image = image;
    }

    public setTabBarIconColor(tabStripItem: TabStripItem, value: UIColor | Color): void {
        this.setIconColor(tabStripItem, true);
    }

    public setTabBarItemFontInternal(tabStripItem: TabStripItem, value: Font): void {
        this.setViewTextAttributes(tabStripItem.label);
    }

    public getTabBarFontInternal(): UIFont {
        return this.tabBar.unselectedItemTitleFont;
    }

    public setTabBarFontInternal(value: Font): void {
        const defaultTabItemFontSize = 10;
        const tabItemFontSize = this.tabStrip.style.fontSize || defaultTabItemFontSize;
        const font: UIFont = this.tabStrip.style.fontInternal.getUIFont(UIFont.systemFontOfSize(tabItemFontSize));

        this.tabBar.unselectedItemTitleFont = font;
        this.tabBar.selectedItemTitleFont = font;
    }

    public getTabBarTextTransform(): TextTransform {
        switch (this.tabBar.titleTextTransform) {
            case MDCTabBarTextTransform.None:
                return 'none';
            case MDCTabBarTextTransform.Automatic:
                return 'initial';
            case MDCTabBarTextTransform.Uppercase:
            default:
                return 'uppercase';
        }
    }

    public setTabBarTextTransform(value: TextTransform): void {
        if (value === 'none') {
            this.tabBar.titleTextTransform = MDCTabBarTextTransform.None;
        } else if (value === 'uppercase') {
            this.tabBar.titleTextTransform = MDCTabBarTextTransform.Uppercase;
        } else if (value === 'initial') {
            this.tabBar.titleTextTransform = MDCTabBarTextTransform.Automatic;
        }
    }

    public getTabBarColor(): UIColor {
        return this.tabBar.titleColorForState(MDCTabBarItemState.Normal);
    }

    public setTabBarColor(value: UIColor | Color): void {
        const nativeColor = value instanceof Color ? value.ios : value;
        this.tabBar.setTitleColorForState(nativeColor, MDCTabBarItemState.Normal);
        this.tabBar.setTitleColorForState(nativeColor, MDCTabBarItemState.Selected);
    }

    public getTabBarHighlightColor(): UIColor {
        return this.tabBar.tintColor;
    }

    public setTabBarHighlightColor(value: UIColor | Color) {
        const nativeColor = value instanceof Color ? value.ios : value;
        this.tabBar.tintColor = nativeColor;
    }

    public getTabBarSelectedItemColor(): Color {
        return this._selectedItemColor;
    }

    public setTabBarSelectedItemColor(value: Color) {
        this._selectedItemColor = value;
    }

    public getTabBarUnSelectedItemColor(): Color {
        return this._unSelectedItemColor;
    }

    public setTabBarUnSelectedItemColor(value: Color) {
        this._unSelectedItemColor = value;
    }

    private visitFrames(view: ViewBase, operation: (frame: Frame) => {}) {
        if (view instanceof Frame) {
            operation(view);
        }
        view.eachChild((child) => {
            this.visitFrames(child, operation);

            return true;
        });
    }

    [selectedIndexProperty.setNative](value: number) {
        // TODO
        // if (traceEnabled()) {
        //     traceWrite("TabView._onSelectedIndexPropertyChangedSetNativeValue(" + value + ")", traceCategories.Debug);
        // }

        if (value > -1) {
            const item = this.items[value];
            const controllers = NSMutableArray.alloc<UIViewController>().initWithCapacity(1);

            const itemController = (<any>item).__controller;

            // if (!itemController) {
            //     itemController = this.getViewController(item);
            // }

            controllers.addObject(itemController);

            let navigationDirection = UIPageViewControllerNavigationDirection.Forward;

            if (this._currentNativeSelectedIndex && this._currentNativeSelectedIndex > value) {
                navigationDirection = UIPageViewControllerNavigationDirection.Reverse;
            }

            this._currentNativeSelectedIndex = value;

            // do not make layout changes while the animation is in progress https://stackoverflow.com/a/47031524/613113
            this.visitFrames(item, (frame) => (frame._animationInProgress = true));

            this.viewController.setViewControllersDirectionAnimatedCompletion(controllers, navigationDirection, true, (finished: boolean) => {
                this.visitFrames(item, (frame) => (frame._animationInProgress = false));
                if (finished) {
                    // HACK: UIPageViewController fix; see https://stackoverflow.com/a/17330606
                    invokeOnRunLoop(() => this.viewController.setViewControllersDirectionAnimatedCompletion(controllers, navigationDirection, false, null));

                    this._canSelectItem = true;
                    this._setCanBeLoaded(value);
                    this._loadUnloadTabItems(value);
                }
            });

            if (this.tabBarItems && this.tabBarItems.length && this.viewController && this.tabBar) {
                this.tabBar.setSelectedItemAnimated(this.tabBarItems[value], true);
            }
            // TODO:
            // (<any>this._ios)._willSelectViewController = this._ios.viewControllers[value];
            // this._ios.selectedIndex = value;
        }
    }

    [itemsProperty.getDefault](): TabContentItem[] {
        return null;
    }
    [itemsProperty.setNative](value: TabContentItem[]) {
        if (value) {
            value.forEach((item: TabContentItem, i) => {
                (<any>item).index = i;
            });
        }

        this.setViewControllers(value);
        selectedIndexProperty.coerce(this);
    }

    [tabStripProperty.getDefault](): TabStrip {
        return null;
    }

    [tabStripProperty.setNative](value: TabStrip) {
        this.setViewControllers(this.items);
        selectedIndexProperty.coerce(this);
    }

    [swipeEnabledProperty.getDefault](): boolean {
        return true;
    }

    [swipeEnabledProperty.setNative](value: boolean) {
        if (this.viewController && this.viewController.scrollView) {
            this.viewController.scrollView.scrollEnabled = value;
        }
    }

    [iOSTabBarItemsAlignmentProperty.getDefault](): IOSTabBarItemsAlignment {
        if (!this.viewController || !this.tabBar) {
            return 'justified';
        }

        const alignment = this.tabBar.alignment.toString();

        return <any>(alignment.charAt(0).toLowerCase() + alignment.substring(1));
    }

    [iOSTabBarItemsAlignmentProperty.setNative](value: IOSTabBarItemsAlignment) {
        if (!this.viewController || !this.tabBar) {
            return;
        }

        let alignment = MDCTabBarAlignment.Justified;
        switch (value) {
            case 'leading':
                alignment = MDCTabBarAlignment.Leading;
                break;
            case 'center':
                alignment = MDCTabBarAlignment.Center;
                break;
            case 'centerSelected':
                alignment = MDCTabBarAlignment.CenterSelected;
                break;
        }

        this.tabBar.alignment = alignment;
    }

    private setViewTextAttributes(view: View, setSelected: boolean = false): any {
        if (!view) {
            return null;
        }

        const defaultTabItemFontSize = 10;
        const tabItemFontSize = view.style.fontSize || defaultTabItemFontSize;
        const font: UIFont = view.style.fontInternal.getUIFont(UIFont.systemFontOfSize(tabItemFontSize));

        this.tabBar.unselectedItemTitleFont = font;
        this.tabBar.selectedItemTitleFont = font;

        const tabItemTextColor = view.style.color;
        const textColor = tabItemTextColor instanceof Color ? tabItemTextColor.ios : null;

        if (textColor) {
            this.tabBar.setTitleColorForState(textColor, MDCTabBarItemState.Normal);
            this.tabBar.setImageTintColorForState(textColor, MDCTabBarItemState.Normal);

            if (setSelected) {
                this.tabBar.setTitleColorForState(textColor, MDCTabBarItemState.Selected);
                this.tabBar.setImageTintColorForState(textColor, MDCTabBarItemState.Selected);
            }
        }

        if (this._selectedItemColor) {
            this.tabBar.selectedItemTintColor = this._selectedItemColor.ios;
        }
        if (this._unSelectedItemColor) {
            this.tabBar.unselectedItemTintColor = this._unSelectedItemColor.ios;
        }
    }
}
