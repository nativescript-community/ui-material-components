/**
 * @module @nativescript-community/ui-material-core-tabs/tab-navigation
 */
import { Color, CoreTypes, Device, Font, Frame, IOSHelper, ImageSource, Property, Utils, View, ViewBase, booleanConverter, getTransformedText } from '@nativescript/core';
import { TabContentItem } from '../tab-content-item';
import { getIconSpecSize, itemsProperty, selectedIndexProperty, tabStripProperty } from '../tab-navigation-base';
import { TabStrip } from '../tab-strip';
import { TabStripItem } from '../tab-strip-item';
import { TabNavigationBase, swipeEnabledProperty } from './index-common';

export { TabContentItem, TabStrip, TabStripItem };

// import { profile } from "../../profiling";

const majorVersion = Utils.ios.MajorVersion;
const isPhone = Device.deviceType === 'Phone';

// Equivalent to dispatch_async(dispatch_get_main_queue(...)) call
const invokeOnRunLoop = (function () {
    const runloop = CFRunLoopGetMain();

    return (action: () => any) => {
        CFRunLoopPerformBlock(runloop, kCFRunLoopDefaultMode, action);
        CFRunLoopWakeUp(runloop);
    };
})();

@NativeClass
class BackgroundIndicatorTemplate extends NSObject implements MDCTabBarViewIndicatorTemplate {
    public static ObjCProtocols = [MDCTabBarViewIndicatorTemplate];

    public indicatorAttributesForContext(context: MDCTabBarViewIndicatorContext): MDCTabBarViewIndicatorAttributes {
        const attributes = new MDCTabBarViewIndicatorAttributes();
        attributes.path = UIBezierPath.bezierPathWithRect(context.bounds);

        return attributes;
    }
}

@NativeClass
class UIPageViewControllerDataSourceImpl extends NSObject implements UIPageViewControllerDataSource {
    public static ObjCProtocols = [UIPageViewControllerDataSource];

    private _owner: WeakRef<TabNavigation>;

    public static initWithOwner(owner: WeakRef<TabNavigation>): UIPageViewControllerDataSourceImpl {
        const dataSource = UIPageViewControllerDataSourceImpl.new() as UIPageViewControllerDataSourceImpl;
        dataSource._owner = owner;

        return dataSource;
    }

    public pageViewControllerViewControllerBeforeViewController(pageViewController: UIPageViewController, viewController: UIViewController): UIViewController {
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
        const prevViewController = (prevItem as any).__controller;

        // if (!prevViewController) {
        //     prevViewController = owner.getViewController(prevItem);
        // }

        owner._setCanBeLoaded(selectedIndex);
        owner._loadUnloadTabItems(selectedIndex);

        return prevViewController;
    }

    public pageViewControllerViewControllerAfterViewController(pageViewController: UIPageViewController, viewController: UIViewController): UIViewController {
        // if (Trace.isEnabled()) {
        //     traceWrite('TabView.delegate.SHOULD_select(' + tabBarController + ', ' + viewController + ');', traceCategories.Debug);
        // }

        const owner = this._owner.get();
        let selectedIndex = owner.selectedIndex;

        if (selectedIndex === owner.items.length - 1) {
            return null;
        }

        selectedIndex++;
        const nextItem = owner.items[selectedIndex];
        const nextViewController = (nextItem as any).__controller;

        // if (!nextViewController) {
        //     nextViewController = owner.getViewController(nextItem);
        // }

        owner._setCanBeLoaded(selectedIndex);
        owner._loadUnloadTabItems(selectedIndex);
        // nextItem.loadView(nextItem.view);

        return nextViewController;
    }

    public presentationCountForPageViewController(pageViewController: UIPageViewController): number {
        // TODO
        // if (traceEnabled()) {
        //     traceWrite("TabView.delegate.SHOULD_select(" + tabBarController + ", " + viewController + ");", traceCategories.Debug);
        // }

        return 0;
    }

    public presentationIndexForPageViewController(pageViewController: UIPageViewController): number {
        // TODO
        // if (traceEnabled()) {
        //     traceWrite("TabView.delegate.SHOULD_select(" + tabBarController + ", " + viewController + ");", traceCategories.Debug);
        // }

        return 0;
    }
}

@NativeClass
class UIPageViewControllerDelegateImpl extends NSObject implements UIPageViewControllerDelegate {
    public static ObjCProtocols = [UIPageViewControllerDelegate];

    private _owner: WeakRef<TabNavigation>;

    public static initWithOwner(owner: WeakRef<TabNavigation>): UIPageViewControllerDelegateImpl {
        const delegate = UIPageViewControllerDelegateImpl.new() as UIPageViewControllerDelegateImpl;
        delegate._owner = owner;

        return delegate;
    }

    public pageViewControllerWillTransitionToViewControllers(pageViewController: UIPageViewController, viewControllers: NSArray<UIViewController>): void {
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
    }

    public pageViewControllerDidFinishAnimatingPreviousViewControllersTransitionCompleted(
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
            // let s not animate again on selectedIndex change
            // or it will create weird behaviors
            owner.mAnimateNextChange = false;
            owner.selectedIndex = nextViewControllerIndex;
            owner.finishTabTransition();
        }
        // HACK: UIPageViewController fix; see https://stackoverflow.com/questions/15325891
        if (owner.mNeedsCacheUpdate) {
            invokeOnRunLoop(() => {
                owner.mNeedsCacheUpdate = false;
                const viewController = owner.viewController;
                viewController.dataSource = null;
                viewController.dataSource = (owner as any)._dataSource;
            });
        }
    }
}

function iterateIndexRange(index: number, eps: number, lastIndex: number, callback: (i) => void) {
    const rangeStart = Math.max(0, index - eps);
    const rangeEnd = Math.min(index + eps, lastIndex);
    for (let i = rangeStart; i <= rangeEnd; i++) {
        callback(i);
    }
}

export function updateBackgroundPositions(tabStrip: TabStrip, tabStripItem: TabStripItem, color: UIColor = null) {
    if (!tabStrip.nativeView || tabStripItem.index === undefined) {
        return;
    }
    let bgView = (tabStripItem as any).bgView;
    const index = tabStripItem.index;
    const width = tabStrip.nativeView.frame.size.width / tabStrip.items.filter((s) => s.index !== undefined).length;
    const frame = CGRectMake(width * index, 0, width, tabStrip.nativeView.frame.size.width);
    if (!bgView) {
        bgView = UIView.alloc().initWithFrame(frame);
        tabStrip.nativeView.insertSubviewAtIndex(bgView, 0);
        (tabStripItem as any).bgView = bgView;
    } else {
        bgView.frame = frame;
    }

    const backgroundColor = tabStripItem.style.backgroundColor;
    bgView.backgroundColor = color || (backgroundColor instanceof Color ? backgroundColor.ios : backgroundColor);
}

export function updateTitleAndIconPositions(tabStripItem: TabStripItem, tabBarItem: UITabBarItem, controller: UIViewController) {
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

export const iosCustomPositioningProperty = new Property<TabNavigation, boolean>({
    name: 'iosCustomPositioning',
    defaultValue: false,

    valueConverter: booleanConverter
});
export abstract class TabNavigation<
    T extends UIPageViewController & {
        tabBar: MDCTabBarView;
        scrollView: UIScrollView;
    } = any
> extends TabNavigationBase {
    public nativeViewProtected: UIView;
    public selectedIndex: number;
    public mCanSelectItem: boolean;
    public isLoaded: boolean;
    public viewController: T;
    public items: TabContentItem[];
    public viewControllers: UIViewController[];
    public tabBarItems: UITabBarItem[];
    private mCurrentNativeSelectedIndex: number;
    private mDataSource: UIPageViewControllerDataSourceImpl;
    private mDelegate: UIPageViewControllerDelegateImpl;
    // private _moreNavigationControllerDelegate: UINavigationControllerDelegateImpl;
    private mIconsCache = {};
    private mBackgroundIndicatorColor: UIColor;
    public mDefaultItemBackgroundColor: UIColor;
    private mSelectedItemColor: Color;
    private mUnSelectedItemColor: Color;
    public animationEnabled: boolean;

    public mNeedsCacheUpdate = false;
    public mAnimateNextChange = true;
    private mSelectionIndicatorColor: Color;
    private mRippleColor: Color;
    public iosCustomPositioning: boolean;

    private mLayoutPending = false;

    protected abstract createViewController(): T;

    constructor() {
        super();
        this.viewController = this.createViewController();
        // this.viewController = UIPageViewControllerImpl.initWithOwner(new WeakRef(this));
    }

    createNativeView() {
        return this.viewController.view;
    }

    initNativeView() {
        super.initNativeView();
        this.mDataSource = UIPageViewControllerDataSourceImpl.initWithOwner(new WeakRef(this));
        this.mDelegate = UIPageViewControllerDelegateImpl.initWithOwner(new WeakRef(this));
    }

    disposeNativeView() {
        this.mDataSource = null;
        this.mDelegate = null;
        super.disposeNativeView();
    }

    requestLayout() {
        if (!this.mCanSelectItem) {
            this.mLayoutPending = true;
        } else {
            this.mLayoutPending = false;
            super.requestLayout();
        }
    }

    beginTabTransition() {
        this.mCanSelectItem = false;
    }

    finishTabTransition() {
        this.mCanSelectItem = true;
        if (this.mLayoutPending) {
            this.requestLayout();
        }
    }

    public onLoaded() {
        super.onLoaded();
        this.setViewControllers(this.items);
        const selectedIndex = this.selectedIndex;
        const selectedView = this.items && this.items[selectedIndex] && this.items[selectedIndex].content;
        if (selectedView instanceof Frame) {
            selectedView._pushInFrameStackRecursive();
        }

        this.viewController.dataSource = this.mDataSource;
        this.viewController.delegate = this.mDelegate;
    }

    public onUnloaded() {
        this.viewController.dataSource = null;
        this.viewController.delegate = null;
        super.onUnloaded();
        this.items.forEach((item, i) => {
            item.unloadView(item.content);
        });
    }

    //@ts-ignore
    get ios(): T {
        return this.viewController;
    }

    public layoutNativeView(left: number, top: number, right: number, bottom: number): void {
        if (this.iosCustomPositioning) {
            super.layoutNativeView(left, top, right, bottom);
        }
    }

    public _setNativeViewFrame(nativeView: UIView, frame: CGRect) {
        if (this.iosCustomPositioning) {
            super._setNativeViewFrame(nativeView, frame);
        }
    }

    public onSelectedIndexChanged(oldIndex: number, newIndex: number): void {
        const items = this.items;
        if (!items) {
            return;
        }

        const oldItem = items[oldIndex];
        if (this.unloadOnTabChange && oldItem) {
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
                this.updateItemColors(tabStripItems[newIndex]);
            }

            if (tabStripItems[oldIndex]) {
                tabStripItems[oldIndex]._emit(TabStripItem.unselectEvent);
                this.updateItemColors(tabStripItems[oldIndex]);
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
        if (this.unloadOnTabChange) {
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
        }
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
        const width = Utils.layout.getMeasureSpecSize(widthMeasureSpec);
        const widthMode = Utils.layout.getMeasureSpecMode(widthMeasureSpec);

        const height = Utils.layout.getMeasureSpecSize(heightMeasureSpec);
        const heightMode = Utils.layout.getMeasureSpecMode(heightMeasureSpec);

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
            (item as any).setViewController(newController, newController.view);

            return newController;
        }

        if (item.content.ios instanceof UIViewController) {
            newController = item.content.ios;
            (item as any).setViewController(newController, newController.view);
        } else if (item.content.ios && item.content.ios.controller instanceof UIViewController) {
            newController = item.content.ios.controller;
            (item as any).setViewController(newController, newController.view);
        } else {
            newController = IOSHelper.UILayoutViewController.initWithOwner(new WeakRef(item.content)) as UIViewController;
            newController.view.addSubview(item.content.nativeViewProtected);
            item.content.viewController = newController;
            (item as any).setViewController(newController, item.content.nativeViewProtected);
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
            this.tabStrip.setNativeView(this.viewController.tabBar);
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
                tabStripItem.index = i;
                tabBarItems.push(tabBarItem);
                tabStripItem.setNativeView(tabBarItem);
            }

            item.canBeLoaded = true;
            viewControllers.push(controller);
        });

        this.setItemImages();
        this.viewControllers = viewControllers;
        this.tabBarItems = tabBarItems;

        if (this.viewController && this.viewController.tabBar) {
            // this.viewController.tabBar.itemAppearance = this.getTabBarItemAppearance();
            this.viewController.tabBar.items = NSArray.arrayWithArray(this.tabBarItems);
            // TODO: investigate why this call is necessary to actually toggle item appearance
            this.viewController.tabBar.sizeToFit();
            // if (this.selectedIndex) {
            this.viewController.tabBar.setSelectedItemAnimated(this.tabBarItems[this.selectedIndex], false);
            // }
        }
    }

    public onItemsChanged(oldItems: TabContentItem[], newItems: TabContentItem[]): void {
        this.mNeedsCacheUpdate = true;
        super.onItemsChanged(oldItems, newItems);
        if (oldItems) {
            if (!this.mCanSelectItem) {
                this.finishTabTransition();
            }
            this._setCanBeLoaded(this.selectedIndex);
            this._loadUnloadTabItems(this.selectedIndex);
        }
    }

    private setItemImages() {
        if (this.mSelectedItemColor || this.mUnSelectedItemColor) {
            if (this.tabStrip && this.tabStrip.items) {
                this.tabStrip.items.forEach((item) => {
                    if (this.mUnSelectedItemColor && item.nativeView) {
                        item.nativeView.image = this.getIcon(item, this.mUnSelectedItemColor);
                    }
                    if (this.mSelectedItemColor && item.nativeView) {
                        if (this.selectedIndex === item.index) {
                            item.nativeView.image = this.getIcon(item, this.mSelectedItemColor);
                        }
                    }
                });
            }
        }
    }

    private updateAllItemsColors() {
        this.mDefaultItemBackgroundColor = null;
        this.setItemColors();
        if (this.tabStrip && this.tabStrip.items) {
            this.tabStrip.items.forEach((tabStripItem) => {
                this.updateItemColors(tabStripItem);
            });
        }
    }

    private updateItemColors(tabStripItem: TabStripItem): void {
        updateBackgroundPositions(this.tabStrip, tabStripItem);
        this.setIconColor(tabStripItem, true);
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
                // TEXT-TRANSFORM
                const textTransform = this.getItemLabelTextTransform(item);
                title = getTransformedText(title, textTransform);
                this.tabStrip._hasTitle = !!title;
            }
        }

        const tabBarItem = UITabBarItem.alloc().initWithTitleImageTag(title, image, index);

        return tabBarItem;
    }

    // private getTabBarItemAppearance(): MDCTabBarViewItemAppearance {
    //     let itemAppearance;
    //     if (this.tabStrip && this.tabStrip._hasImage && this.tabStrip._hasTitle) {
    //         itemAppearance = MDCTabBarViewItemAppearance.TitledImages;
    //     } else if (this.tabStrip && this.tabStrip._hasImage) {
    //         itemAppearance = MDCTabBarViewItemAppearance.Images;
    //     } else {
    //         itemAppearance = MDCTabBarViewItemAppearance.Titles;
    //     }

    //     return itemAppearance;
    // }

    private getIconRenderingMode(): UIImageRenderingMode {
        switch (this.tabStrip && this.tabStrip.iosIconRenderingMode) {
            case 'alwaysOriginal':
                return UIImageRenderingMode.AlwaysOriginal;
            case 'alwaysTemplate':
                return UIImageRenderingMode.AlwaysTemplate;
            case 'automatic':
            default:
                const hasItemColor = this.mSelectedItemColor || this.mUnSelectedItemColor;

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
        const font = target.style.fontInternal || Font.default;
        if (!color) {
            color = target.style.color;
        }
        const iconTag = [iconSource, font.fontStyle, font.fontWeight, font.fontSize, font.fontFamily, color].join(';');

        let isFontIcon = false;
        let image: UIImage = this.mIconsCache[iconTag];
        if (!image) {
            let is: ImageSource;
            if (Utils.isFontIconURI(iconSource)) {
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
                this.mIconsCache[iconTag] = originalRenderedImage;
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

        UIGraphicsBeginImageContextWithOptions({ width: widthPts, height: heightPts }, false, Utils.layout.getDisplayDensity());
        image.drawInRect(CGRectMake(0, 0, widthPts, heightPts));
        const resultImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();

        return resultImage;
    }

    public getTabBarBackgroundColor(): UIColor {
        return this.viewController.tabBar.barTintColor;
    }

    public setTabBarBackgroundColor(value: UIColor | Color): void {
        this.viewController.tabBar.barTintColor = value instanceof Color ? value.ios : value;
        this.updateAllItemsColors();
    }

    public setTabBarItemTitle(tabStripItem: TabStripItem, value: string): void {
        const nativeView = tabStripItem.nativeView;
        if (!nativeView) {
            return;
        }
        const textTransform = this.getItemLabelTextTransform(tabStripItem);
        nativeView.title = getTransformedText(value, textTransform);
    }

    public setTabBarItemTextTransform(tabStripItem: TabStripItem, value: CoreTypes.TextTransformType): void {
        const nativeView = tabStripItem.nativeView;
        if (!nativeView) {
            return;
        }
        const nestedLabel = tabStripItem.label;
        const title = getTransformedText(nestedLabel.text, value);
        nativeView.title = title;
    }

    public setTabBarTextTransform(value: CoreTypes.TextTransformType): void {
        const items = this.tabStrip && this.tabStrip.items;
        if (items) {
            items.forEach((tabStripItem) => {
                if (tabStripItem.label && tabStripItem.nativeViewProtected) {
                    const nestedLabel = tabStripItem.label;
                    const title = getTransformedText(nestedLabel.text, value);
                    tabStripItem.nativeViewProtected.title = title;
                }
            });
        }
        this.mTextTransform = value;
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
        return tabStripItem.index === this.selectedIndex && tabStripItem['_visualState'] === 'highlighted';
    }

    public setTabBarItemBackgroundColor(tabStripItem: TabStripItem, value: UIColor | Color): void {
        if (!this.tabStrip || !tabStripItem || !tabStripItem.nativeView) {
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

        if (!this.mDefaultItemBackgroundColor && !itemSelectedAndHighlighted) {
            this.mDefaultItemBackgroundColor = newColor;
        }

        if (itemSelectedAndHighlighted && !this.equalUIColor(this.mDefaultItemBackgroundColor, newColor)) {
            if (!this.mBackgroundIndicatorColor) {
                this.mBackgroundIndicatorColor = newColor;
                this.viewController.tabBar.selectionIndicatorTemplate = new BackgroundIndicatorTemplate();
                this.viewController.tabBar.tintColor = newColor;
            }
        } else {
            updateBackgroundPositions(this.tabStrip, tabStripItem, newColor);
        }
    }

    public setTabBarItemColor(tabStripItem: TabStripItem, value: UIColor | Color): void {
        this.setViewTextAttributes(tabStripItem.label);
    }

    private setItemColors(): void {
        if (this.mSelectedItemColor) {
            this.viewController.tabBar.setImageTintColorForState(this.mSelectedItemColor.ios, UIControlState.Selected);
            this.viewController.tabBar.setTitleColorForState(this.mSelectedItemColor.ios, UIControlState.Selected);
        }
        if (this.mUnSelectedItemColor) {
            this.viewController.tabBar.setImageTintColorForState(this.mUnSelectedItemColor.ios, UIControlState.Normal);
            this.viewController.tabBar.setTitleColorForState(this.mUnSelectedItemColor.ios, UIControlState.Normal);
        }
    }

    private setIconColor(tabStripItem: TabStripItem, forceReload = false): void {
        const nativeView = tabStripItem.nativeView;
        if (nativeView && (forceReload || (!this.mUnSelectedItemColor && !this.mSelectedItemColor))) {
            // if selectedItemColor or unSelectedItemColor is set we don't respect the color from the style
            const tabStripColor = this.selectedIndex === tabStripItem.index ? this.mSelectedItemColor : this.mUnSelectedItemColor;
            const image = this.getIcon(tabStripItem, tabStripColor);

            nativeView.image = image;
            nativeView.selectedImage = image;
        }
    }

    public setTabBarIconColor(tabStripItem: TabStripItem, value: UIColor | Color): void {
        this.setIconColor(tabStripItem, true);
    }

    public setTabBarIconSource(tabStripItem: TabStripItem, value: UIColor | Color): void {
        this.updateItemColors(tabStripItem);
    }

    public setTabBarItemFontInternal(tabStripItem: TabStripItem, value: Font): void {
        this.setViewTextAttributes(tabStripItem.label);
    }

    public getTabBarFontInternal(): UIFont {
        return this.viewController.tabBar.titleFontForState(UIControlState.Normal);
    }

    public setTabBarFontInternal(): void {
        const defaultTabItemFontSize = 10;
        const tabItemFontSize = this.tabStrip.style.fontSize || defaultTabItemFontSize;
        const font: UIFont = (this.tabStrip.style.fontInternal || Font.default).getUIFont(UIFont.systemFontOfSize(tabItemFontSize));

        this.viewController.tabBar.setTitleFontForState(font, UIControlState.Normal);
        this.viewController.tabBar.setTitleFontForState(font, UIControlState.Selected);
    }

    // public getTabBarTextTransform(): TextTransform {
    //     switch (this.viewController.tabBar.titleTextTransform) {
    //         case MDCTabBarViewTextTransform.None:
    //             return 'none';
    //         case MDCTabBarViewTextTransform.Automatic:
    //             return 'initial';
    //         case MDCTabBarViewTextTransform.Uppercase:
    //         default:
    //             return 'uppercase';
    //     }
    // }

    // public setTabBarTextTransform(value: TextTransform): void {
    //     if (value === 'none') {
    //         this.viewController.tabBar.titleTextTransform = MDCTabBarViewTextTransform.None;
    //     } else if (value === 'uppercase') {
    //         this.viewController.tabBar.titleTextTransform = MDCTabBarViewTextTransform.Uppercase;
    //     } else if (value === 'initial') {
    //         this.viewController.tabBar.titleTextTransform = MDCTabBarViewTextTransform.Automatic;
    //     }
    // }

    public getTabBarColor(): UIColor {
        return this.viewController.tabBar.titleColorForState(UIControlState.Normal);
    }

    public setTabBarColor(value: UIColor | Color): void {
        const nativeColor = value instanceof Color ? value.ios : value;
        // this.viewController.tabBar.setTitleColorForState(nativeColor, UIControlState.Normal);
        this.viewController.tabBar.setTitleColorForState(nativeColor, UIControlState.Selected);
        this.viewController.tabBar.setImageTintColorForState(nativeColor, UIControlState.Selected);
    }

    public getTabBarHighlightColor(): Color {
        return this.mSelectionIndicatorColor;
    }

    public setTabBarHighlightColor(value: Color) {
        this.mSelectionIndicatorColor = value;
        this.viewController.tabBar.selectionIndicatorStrokeColor = value.ios;
    }

    public getTabBarSelectedItemColor(): Color {
        return this.mSelectedItemColor;
    }

    public setTabBarSelectedItemColor(value: Color) {
        this.mSelectedItemColor = value;
        this.updateAllItemsColors();
    }

    public getTabBarUnSelectedItemColor(): Color {
        return this.mUnSelectedItemColor;
    }

    public setTabBarUnSelectedItemColor(value: Color) {
        this.mUnSelectedItemColor = value;
        this.updateAllItemsColors();
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

    public setTabBarRippleColor(value: Color) {
        this.mRippleColor = value;
        this.viewController.tabBar.rippleColor = value.ios;
    }

    public getTabBarRippleColor(): Color {
        return this.mRippleColor;
    }

    [selectedIndexProperty.setNative](value: number) {
        // TODO
        // if (traceEnabled()) {
        //     traceWrite("TabView._onSelectedIndexPropertyChangedSetNativeValue(" + value + ")", traceCategories.Debug);
        // }
        if (value > -1) {
            const item = this.items[value];
            const controllers = NSMutableArray.alloc<UIViewController>().initWithCapacity(1);

            const itemController = (item as any).__controller;

            // if (!itemController) {
            //     itemController = this.getViewController(item);
            // }

            controllers.addObject(itemController);

            let navigationDirection = UIPageViewControllerNavigationDirection.Forward;

            if (this.mCurrentNativeSelectedIndex && this.mCurrentNativeSelectedIndex > value) {
                navigationDirection = UIPageViewControllerNavigationDirection.Reverse;
            }

            this.mCurrentNativeSelectedIndex = value;

            // do not make layout changes while the animation is in progress https://stackoverflow.com/a/47031524/613113
            this.visitFrames(item, (frame) => (frame._animationInProgress = true));

            const doneAnimating = () => {
                this.visitFrames(item, (frame) => (frame._animationInProgress = false));

                this.finishTabTransition();
                this._setCanBeLoaded(value);
                this._loadUnloadTabItems(value);
            };
            if (this.mAnimateNextChange) {
                invokeOnRunLoop(() => {
                    this.viewController.setViewControllersDirectionAnimatedCompletion(controllers, navigationDirection, this.animationEnabled, (finished: boolean) => {
                        if (finished) {
                            if (this.animationEnabled) {
                                // HACK: UIPageViewController fix; see https://stackoverflow.com/a/17330606
                                // Prior Hack fails on iOS 10.3 during tests with v8 engine...
                                // Leaving the above link in case we need to special case this for only iOS > 10.3?

                                // HACK: UIPageViewController fix; see https://stackoverflow.com/questions/15325891
                                invokeOnRunLoop(() => {
                                    doneAnimating();
                                });
                            } else {
                                doneAnimating();
                            }
                        }
                    });
                });
            } else {
                this.mAnimateNextChange = true;
                doneAnimating();
            }

            if (this.tabBarItems && this.tabBarItems.length && this.viewController && this.viewController.tabBar) {
                this.viewController.tabBar.setSelectedItemAnimated(this.tabBarItems[value], this.animationEnabled);
            }
            // TODO:
            // (<any>this.viewController)._willSelectViewController = this.viewController.viewControllers[value];
            // this.viewController.selectedIndex = value;
        }
    }

    [itemsProperty.getDefault](): TabContentItem[] {
        return null;
    }
    [itemsProperty.setNative](value: TabContentItem[]) {
        if (value) {
            value.forEach((item: TabContentItem, i) => {
                (item as any).index = i;
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

    // [iOSTabBarItemsAlignmentProperty.getDefault](): IOSTabBarItemsAlignment {
    //     if (!this.viewController || !this.viewController.tabBar) {
    //         return 'justified';
    //     }

    //     const alignment = this.viewController.tabBar.alignment.toString();

    //     return <any>(alignment.charAt(0).toLowerCase() + alignment.substring(1));
    // }
    // [iOSTabBarItemsAlignmentProperty.setNative](value: IOSTabBarItemsAlignment) {
    //     if (!this.viewController || !this.viewController.tabBar) {
    //         return;
    //     }

    //     let alignment = MDCTabBarViewAlignment.Justified;
    //     switch (value) {
    //         case 'leading':
    //             alignment = MDCTabBarViewAlignment.Leading;
    //             break;
    //         case 'center':
    //             alignment = MDCTabBarView.Alignment.Center;
    //             break;
    //         case 'centerSelected':
    //             alignment = MDCTabBarViewAlignment.CenterSelected;
    //             break;
    //     }

    //     this.viewController.tabBar.alignment = alignment;
    // }

    private setViewTextAttributes(view: View, setSelected = false): any {
        if (!view) {
            return null;
        }

        const defaultTabItemFontSize = 10;
        const tabItemFontSize = view.style.fontSize || defaultTabItemFontSize;
        const font: UIFont = (view.style.fontInternal || Font.default).getUIFont(UIFont.systemFontOfSize(tabItemFontSize));

        this.viewController.tabBar.setTitleFontForState(font, UIControlState.Normal);
        this.viewController.tabBar.setTitleFontForState(font, UIControlState.Selected);

        const tabItemTextColor = view.style.color;
        const textColor = tabItemTextColor instanceof Color ? tabItemTextColor.ios : null;
        if (textColor) {
            this.viewController.tabBar.setTitleColorForState(textColor, UIControlState.Normal);
            this.viewController.tabBar.setImageTintColorForState(textColor, UIControlState.Normal);

            if (setSelected) {
                this.viewController.tabBar.setTitleColorForState(textColor, UIControlState.Selected);
                this.viewController.tabBar.setImageTintColorForState(textColor, UIControlState.Selected);
            }
        }

        if (this.mSelectedItemColor) {
            this.viewController.tabBar.setTitleColorForState(this.mSelectedItemColor.ios, UIControlState.Selected);
            this.viewController.tabBar.setImageTintColorForState(this.mSelectedItemColor.ios, UIControlState.Selected);
        }
        if (this.mUnSelectedItemColor) {
            this.viewController.tabBar.setTitleColorForState(this.mUnSelectedItemColor.ios, UIControlState.Normal);
            this.viewController.tabBar.setImageTintColorForState(this.mUnSelectedItemColor.ios, UIControlState.Selected);
        }
    }
}
iosCustomPositioningProperty.register(TabNavigation);
