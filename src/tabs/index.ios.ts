import { themer } from '@nativescript-community/ui-material-core';
import { TabContentItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-content-item';
import { TabsPosition } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-navigation/index-common';
import { TabNavigation, updateBackgroundPositions, updateTitleAndIconPositions } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-navigation/index.ios';
import { TabStrip } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip';
import { TabStripItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip-item';
import { IOSHelper, Utils } from '@nativescript/core';

export { TabContentItem, TabStrip, TabStripItem };

const majorVersion = Utils.ios.MajorVersion;

@NativeClass
class MDCTabBarViewDelegateImpl extends NSObject implements MDCTabBarViewDelegate {
    public static ObjCProtocols = [MDCTabBarViewDelegate];

    private _owner: WeakRef<Tabs>;

    public static initWithOwner(owner: WeakRef<Tabs>): MDCTabBarViewDelegateImpl {
        const delegate = MDCTabBarViewDelegateImpl.new() as MDCTabBarViewDelegateImpl;
        delegate._owner = owner;
        return delegate;
    }

    public tabBarViewShouldSelectItem(tabBar: MDCTabBarView, item: UITabBarItem): boolean {
        const owner = this._owner.get();
        const shouldSelectItem = owner.mCanSelectItem;
        const selectedIndex = owner.tabBarItems.indexOf(item);

        if (owner.selectedIndex !== selectedIndex) {
            owner.beginTabTransition();
        }

        const tabStrip = owner.tabStrip;
        const tabStripItems = tabStrip && tabStrip.items;

        if (tabStripItems && tabStripItems[selectedIndex]) {
            tabStripItems[selectedIndex]._emit(TabStripItem.tapEvent);
            tabStrip.notify({ eventName: TabStrip.itemTapEvent, object: tabStrip, index: selectedIndex });
        }

        return shouldSelectItem;
    }

    public tabBarViewDidSelectItem(tabBar: MDCTabBarView, selectedItem: UITabBarItem): void {
        const owner = this._owner.get();
        const tabBarItems = owner.tabBarItems;
        const selectedIndex = tabBarItems.indexOf(selectedItem);
        owner.selectedIndex = selectedIndex;
    }
}

@NativeClass
class UIPageViewControllerImpl extends UIPageViewController {
    tabBar: MDCTabBarView;
    scrollView: UIScrollView;
    tabBarDelegate: MDCTabBarViewDelegateImpl;

    private _owner: WeakRef<Tabs>;

    public static initWithOwner(owner: WeakRef<Tabs>): UIPageViewControllerImpl {
        const handler = UIPageViewControllerImpl.alloc().initWithTransitionStyleNavigationOrientationOptions(
            UIPageViewControllerTransitionStyle.Scroll,
            UIPageViewControllerNavigationOrientation.Horizontal,
            null
        ) as UIPageViewControllerImpl;
        handler._owner = owner;

        return handler;
    }

    public accessibilityScroll(direction: UIAccessibilityScrollDirection): boolean {
        if (this._owner.get()?.swipeEnabled ?? true) {
            return super.accessibilityScroll(direction);
        }
        return false;
    }

    public viewDidLoad(): void {
        const owner = this._owner.get();

        const tabBarItems = owner.tabBarItems;
        const tabBar = MDCTabBarView.alloc().init();
        this.tabBar = tabBar;
        const colorScheme = themer.getAppColorScheme() as MDCSemanticColorScheme;

        if (tabBarItems && tabBarItems.length) {
            tabBar.items = NSArray.arrayWithArray(tabBarItems);
        }

        tabBar.tabBarDelegate = this.tabBarDelegate = MDCTabBarViewDelegateImpl.initWithOwner(new WeakRef(owner));
        if (colorScheme && colorScheme.primaryColor) {
            tabBar.rippleColor = colorScheme.primaryColor.colorWithAlphaComponent(0.24);
            tabBar.tintColor = colorScheme.primaryColor;
            tabBar.selectionIndicatorStrokeColor = colorScheme.primaryColor;
            owner.setTabBarColor(colorScheme.primaryColor);
        } else {
            if (majorVersion <= 12 || !UIColor.labelColor) {
                tabBar.tintColor = UIColor.blueColor;
                tabBar.barTintColor = UIColor.whiteColor;
                tabBar.setTitleColorForState(UIColor.blackColor, UIControlState.Normal);
                tabBar.setTitleColorForState(UIColor.blackColor, UIControlState.Selected);
            } else {
                tabBar.tintColor = UIColor.systemBlueColor;
                tabBar.barTintColor = UIColor.systemBackgroundColor;
                tabBar.setTitleColorForState(UIColor.labelColor, UIControlState.Normal);
                tabBar.setTitleColorForState(UIColor.labelColor, UIControlState.Selected);
                tabBar.rippleColor = UIColor.clearColor;
            }
        }

        tabBar.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleBottomMargin;

        this.view.addSubview(tabBar);
        tabBar.sizeToFit();
    }

    public viewDidUnload(): void {
        if (this.tabBar) {
            this.tabBar.tabBarDelegate = null;
            this.tabBar = null;
        }
    }

    public viewWillAppear(animated: boolean): void {
        super.viewWillAppear(animated);
        const owner = this._owner.get();
        if (!owner) {
            return;
        }

        IOSHelper.updateAutoAdjustScrollInsets(this, owner);

        // Tabs can be reset as a root view. Call loaded here in this scenario.
        if (!owner.isLoaded) {
            owner.callLoaded();
        }
    }
    // public viewWillLayoutSubviews(): void {
    //     super.viewWillLayoutSubviews();
    //     this.tabBar.sizeToFit();
    // }
    public viewDidLayoutSubviews(): void {
        super.viewDidLayoutSubviews();
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

        const conditionalSafeAreaBottom = owner.iosOverflowSafeArea ? safeAreaInsetsBottom : 0;
        let scrollViewTop = 0;
        let scrollViewHeight = this.view.bounds.size.height + conditionalSafeAreaBottom;

        if (owner.tabStrip && this.tabBar) {
            const viewWidth = this.view.bounds.size.width;
            const viewHeight = this.view.bounds.size.height;
            const tabBarHeight = this.tabBar.frame.size.height;
            let tabBarTop = safeAreaInsetsTop;

            scrollViewTop = tabBarHeight;
            scrollViewHeight = this.view.bounds.size.height - tabBarHeight + conditionalSafeAreaBottom;

            const tabsPosition = owner.tabsPosition;
            if (tabsPosition === TabsPosition.Bottom) {
                tabBarTop = viewHeight - tabBarHeight - safeAreaInsetsBottom;
                scrollViewTop = this.view.frame.origin.y;
                scrollViewHeight = viewHeight - tabBarHeight;
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
            this.tabBar.frame = CGRectMake(0, tabBarTop, viewWidth, tabBarHeight);
        } else {
            this.tabBar.hidden = true;
        }

        const subViews: NSArray<UIView> = this.view.subviews;
        let scrollView: UIScrollView = null;

        for (let i = 0; i < subViews.count; i++) {
            const view: UIView = subViews[i];
            if (view instanceof UIScrollView && !(view instanceof MDCTabBarView)) {
                scrollView = view;
            }
        }
        if (scrollView) {
            // The part of the UIPageViewController that is changing the pages is a UIScrollView
            // We want to expand it to the size of the UIPageViewController as it is not so by default
            this.scrollView = scrollView;

            if (!owner.swipeEnabled) {
                scrollView.scrollEnabled = false;
            } else {
                scrollView.scrollEnabled = true;
            }

            scrollView.frame = CGRectMake(0, scrollViewTop, this.view.bounds.size.width, scrollViewHeight); //this.view.bounds;
        }
    }

    // Mind implementation for other controllers
    public traitCollectionDidChange(previousTraitCollection: UITraitCollection): void {
        super.traitCollectionDidChange(previousTraitCollection);

        if (majorVersion >= 13) {
            const owner = this._owner.get();
            if (
                owner &&
                this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection &&
                this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection(previousTraitCollection)
            ) {
                owner.notify({ eventName: IOSHelper.traitCollectionColorAppearanceChangedEvent, object: owner });
            }
        }
    }

    public viewWillTransitionToSizeWithTransitionCoordinator(size: CGSize, coordinator: UIViewControllerTransitionCoordinator): void {
        super.viewWillTransitionToSizeWithTransitionCoordinator(size, coordinator);
        coordinator.animateAlongsideTransitionCompletion(() => {
            const owner = this._owner.get();
            if (owner && owner.tabStrip && owner.tabStrip.items) {
                const tabStrip = owner.tabStrip;
                tabStrip.items.forEach((tabStripItem) => {
                    updateBackgroundPositions(tabStrip, tabStripItem, owner.selectedIndex !== tabStripItem._index ? owner.mDefaultItemBackgroundColor : null);

                    const index = tabStripItem._index;
                    const tabBarItemController = owner.viewControllers[index];
                    updateTitleAndIconPositions(tabStripItem, tabBarItemController.tabBarItem, tabBarItemController);
                });
            }
        }, null);
    }
}

export class Tabs extends TabNavigation<UIPageViewControllerImpl> {
    protected createViewController() {
        return UIPageViewControllerImpl.initWithOwner(new WeakRef(this));
    }
}
