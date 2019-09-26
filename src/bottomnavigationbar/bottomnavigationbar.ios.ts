import { screen } from 'tns-core-modules/platform';
import { ios } from 'tns-core-modules/application';
import { backgroundColorProperty, Color, layout } from 'tns-core-modules/ui/core/view';
import { ImageSource } from 'tns-core-modules/image-source';

import { activeColorCssProperty, BottomNavigationBarBase, BottomNavigationTabBase, inactiveColorCssProperty, tabsProperty, titleVisibilityProperty } from './bottomnavigationbar-common';

// Delegate
class BottomNavigationBarDelegate extends NSObject {
    static ObjCProtocols = [MDCBottomNavigationBarDelegate];
    private _owner: BottomNavigationBar;

    static initWithOwner(owner: WeakRef<BottomNavigationBar>): BottomNavigationBarDelegate {
        const delegate = <BottomNavigationBarDelegate>BottomNavigationBarDelegate.new();
        delegate._owner = owner.get();

        return delegate;
    }

    bottomNavigationBarDidSelectItem(navigationBar: MDCBottomNavigationBar, item: UITabBarItem) {
        if (this._owner.selectedTabIndex === item.tag) {
            this._owner._emitTabReselected(item.tag);
            return;
        }

        this._owner._emitTabSelected(item.tag);
    }

    bottomNavigationBarShouldSelectItem(bottomNavigationBar: MDCBottomNavigationBar, item: UITabBarItem): boolean {
        const bottomNavigationTab = this._owner.items[item.tag];
        if (!bottomNavigationTab.isSelectable) {
            this._owner._emitTabPressed(item.tag);
        }

        return bottomNavigationTab.isSelectable;
    }
}

export class BottomNavigationBar extends BottomNavigationBarBase {
    nativeView: MDCBottomNavigationBar;

    private _delegate: BottomNavigationBarDelegate;

    get ios(): MDCBottomNavigationBar {
        return this.nativeView;
    }

    createNativeView(): Object {
        const nativeView = MDCBottomNavigationBar.alloc().init();
        this._delegate = BottomNavigationBarDelegate.initWithOwner(new WeakRef(this));

        return nativeView;
    }

    initNativeView(): void {
        // Create the tabs before setting the default values for each tab
        // We call this method here to create the tabs defined in the xml
        this.createTabs(this._items);
        // Set default LabelVisibilityMode
        this.nativeView.titleVisibility = this.titleVisibility as any;
        // Set default ActiveColor
        this.nativeView.selectedItemTintColor = this.activeColor.ios;
        // Set default InactiveColor
        this.nativeView.unselectedItemTintColor = this.inactiveColor.ios;
    }

    disposeNativeView() {
        this._delegate = null;
    }

    onLoaded() {
        super.onLoaded();
        this.nativeView.delegate = this._delegate;
    }

    onUnloaded() {
        this.nativeView.delegate = null;
        super.onUnloaded();
    }

    layoutNativeView(left: number, top: number, right: number, bottom: number): void {
        if (!this.nativeViewProtected) {
            return;
        }

        let bottomSafeArea = 0;
        if (ios.window.safeAreaInsets) {
            bottomSafeArea = ios.window.safeAreaInsets.bottom;
        }

        const viewSize: CGSize = CGSizeMake(screen.mainScreen.widthDIPs, screen.mainScreen.heightDIPs);
        const nativeViewSize: CGSize = this.nativeView.sizeThatFits(viewSize);
        const bottomBarHeight = nativeViewSize.height + bottomSafeArea;

        const nativeView = this.nativeViewProtected;
        const frame = CGRectMake(0, layout.toDeviceIndependentPixels(top), viewSize.width, bottomBarHeight);

        (this as any)._setNativeViewFrame(nativeView, frame);
    }

    showBadge(index: number, value?: number): void {
        const tabBarItem = this.nativeView.items[index];

        tabBarItem.badgeValue = value ? `${value}` : '';
    }

    removeBadge(index: number): void {
        const tabBarItem = this.nativeView.items[index];
        tabBarItem.badgeValue = null;
    }

    [tabsProperty.setNative](tabs: BottomNavigationTab[]) {
        this.createTabs(tabs);
    }

    [titleVisibilityProperty.setNative](titleVisibility: MDCBottomNavigationBarTitleVisibility) {
        this.nativeView.titleVisibility = titleVisibility;
    }

    [activeColorCssProperty.setNative](activeColor: Color) {
        this.nativeView.selectedItemTintColor = activeColor.ios;
    }

    [inactiveColorCssProperty.setNative](inactiveColor: Color) {
        this.nativeView.unselectedItemTintColor = inactiveColor.ios;
    }

    [backgroundColorProperty.setNative](backgroundColor: Color) {
        this.nativeView.barTintColor = backgroundColor.ios;
    }

    protected createTabs(tabs: BottomNavigationTab[] | undefined) {
        if (tabs) {
            this._items = tabs;
        }

        const bottomNavigationTabs = this._items.map((tab, index) => UITabBarItem.alloc().initWithTitleImageTag(tab.title, tab.getNativeIcon(), index));
        this.nativeView.items = new NSArray({ array: bottomNavigationTabs });

        this.selectTabNative(this.selectedTabIndex);
    }

    protected selectTabNative(index: number): void {
        if (this.nativeView.items.count === 0) {
            return;
        }

        this.nativeView.selectedItem = this.nativeView.items[index];
        this.selectedTabIndex = index;
    }
}

// Bottom Navigation Tab

export class BottomNavigationTab extends BottomNavigationTabBase {
    getNativeIcon(): UIImage {
        return (this.icon as ImageSource).ios;
    }
}
