import { screen } from '@nativescript/core/platform';
import { ios } from '@nativescript/core/application';
import { backgroundColorProperty, Color, layout } from '@nativescript/core/ui/core/view';
import { ImageSource } from '@nativescript/core/image-source';
import { getRippleColor, themer } from 'nativescript-material-core/core';

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
    nativeViewProtected: MDCBottomNavigationBar;
    _items: BottomNavigationTab[];

    constructor() {
        super();
    }

    private _delegate: BottomNavigationBarDelegate;

    createNativeView(): Object {
        const view = MDCBottomNavigationBar.new();
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCBottomNavigationBarColorThemer.applyColorSchemeToBottomNavigationBar(colorScheme, view);
        }
        return view;
    }

    initNativeView(): void {
        super.initNativeView();
        this._delegate = BottomNavigationBarDelegate.initWithOwner(new WeakRef(this));
        this.nativeViewProtected.delegate = this._delegate;
        // Create the tabs before setting the default values for each tab
        // We call this method here to create the tabs defined in the xml
        this.createTabs(this._items);
    }

    disposeNativeView() {
        this.nativeViewProtected.delegate = null;
        this._delegate = null;
        this._items.forEach(item => this._removeView(item));
        super.disposeNativeView();
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
        const nativeViewSize: CGSize = this.nativeViewProtected.sizeThatFits(viewSize);
        const bottomBarHeight = nativeViewSize.height + bottomSafeArea;

        const nativeView = this.nativeViewProtected;
        const frame = CGRectMake(0, layout.toDeviceIndependentPixels(top), viewSize.width, bottomBarHeight);

        (this as any)._setNativeViewFrame(nativeView, frame);
    }

    showBadge(index: number, value?: number): void {
        this._items[index] && this._items[index].showBadge(value);
    }

    removeBadge(index: number): void {
        this._items[index] && this._items[index].removeBadge();
    }

    [tabsProperty.setNative](tabs: BottomNavigationTab[]) {
        this.createTabs(tabs);
    }

    [titleVisibilityProperty.setNative](titleVisibility: MDCBottomNavigationBarTitleVisibility) {
        this.nativeViewProtected.titleVisibility = titleVisibility;
    }

    [activeColorCssProperty.setNative](activeColor: Color) {
        this.nativeViewProtected.selectedItemTintColor = activeColor ? activeColor.ios : null;
    }

    [inactiveColorCssProperty.setNative](inactiveColor: Color) {
        this.nativeViewProtected.unselectedItemTintColor = inactiveColor ? inactiveColor.ios : null;
    }

    [backgroundColorProperty.setNative](backgroundColor: Color) {
        this.nativeViewProtected.barTintColor = backgroundColor.ios;
    }

    protected createTabs(tabs: BottomNavigationTab[] | undefined) {
        if (tabs) {
            this._items = tabs;
        }

        const bottomNavigationTabs = this._items.map((item, index) => {
            this._addView(item);
            const tab = item.nativeViewProtected;
            tab.tag = index;
            return tab;
        });
        this.nativeViewProtected.items = new NSArray({ array: bottomNavigationTabs });

        this.selectTabNative(this.selectedTabIndex);
    }

    protected selectTabNative(index: number): void {
        if (this.nativeViewProtected.items.count === 0) {
            return;
        }

        this.nativeViewProtected.selectedItem = this.nativeViewProtected.items[index];
        this.selectedTabIndex = index;
    }
}

// Bottom Navigation Tab

export class BottomNavigationTab extends BottomNavigationTabBase {
    nativeViewProtected: UITabBarItem;
    createNativeView() {
        return UITabBarItem.alloc().initWithTitleImageTag(this.title, this.getNativeIcon(), 0);
    }

    getNativeIcon(): UIImage {
        return this.icon && this.icon.ios;
    }

    getMDView() {
        return (this.parent as BottomNavigationBar).nativeViewProtected.viewForItem(this.nativeViewProtected) as any;
    }

    [activeColorCssProperty.setNative](activeColor: Color) {
        // not working for now
        // const color = activeColor ? activeColor.ios : null;
        // this.getMDView().selectedItemTintColor = color;
    }

    [inactiveColorCssProperty.setNative](inactiveColor: Color) {
        // not working for now
        // const color = inactiveColor ? inactiveColor.ios : null;
        // this.getMDView().unselectedItemTintColor = color;
    }

    showBadge(value?: number): void {
        this.nativeViewProtected.badgeValue = value ? `${value}` : '';
    }

    removeBadge(): void {
        this.nativeViewProtected.badgeValue = null;
    }
}
