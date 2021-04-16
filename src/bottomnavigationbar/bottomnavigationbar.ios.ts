import { themer } from '@nativescript-community/ui-material-core';
import { Application, Color, Screen, Utils, backgroundColorProperty } from '@nativescript/core';
import {
    BottomNavigationBarBase,
    BottomNavigationTabBase,
    TitleVisibility,
    activeColorCssProperty,
    badgeColorCssProperty,
    badgeTextColorCssProperty,
    inactiveColorCssProperty,
    tabsProperty,
    titleVisibilityProperty
} from './bottomnavigationbar-common';

@NativeClass
class BottomNavigationBarDelegate extends NSObject {
    static ObjCProtocols = [MDCBottomNavigationBarDelegate];
    _owner: WeakRef<BottomNavigationBar>;
    public static initWithOwner(owner: BottomNavigationBar) {
        const delegate = BottomNavigationBarDelegate.new() as BottomNavigationBarDelegate;
        delegate._owner = new WeakRef(owner);

        return delegate;
    }
    bottomNavigationBarDidSelectItem(navigationBar: MDCBottomNavigationBar, item: UITabBarItem) {
        const owner = this._owner.get();
        if (!owner) {
            return;
        }
        const barIndex = item && (item as any).barIndex ? (item as any).barIndex : 0;
        if (owner.selectedTabIndex === barIndex) {
            owner._emitTabReselected(barIndex);
            return;
        }
        owner._emitTabSelected(barIndex);
    }

    bottomNavigationBarShouldSelectItem(bottomNavigationBar: MDCBottomNavigationBar, item: UITabBarItem): boolean {
        const owner = this._owner.get();
        if (!owner) {
            return true;
        }
        const barIndex = item && (item as any).barIndex ? (item as any).barIndex : 0;
        const bottomNavigationTab = owner.items[barIndex];
        if (!bottomNavigationTab.isSelectable) {
            owner._emitTabPressed(barIndex);
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
        const colorScheme = themer.getAppColorScheme() as MDCSemanticColorScheme;
        if (colorScheme) {
            const scheme = MDCContainerScheme.alloc().init();
            scheme.colorScheme = colorScheme;
            view.applyPrimaryThemeWithScheme(scheme);
        }
        return view;
    }

    initNativeView(): void {
        super.initNativeView();
        this._delegate = BottomNavigationBarDelegate.initWithOwner(this);
        this.nativeViewProtected.delegate = this._delegate;
        // Create the tabs before setting the default values for each tab
        // We call this method here to create the tabs defined in the xml
        this.createTabs(this._items);
    }

    disposeNativeView() {
        this.nativeViewProtected.delegate = null;
        this._delegate = null;
        this._items.forEach((item) => this._removeView(item));
        super.disposeNativeView();
    }

    layoutNativeView(left: number, top: number, right: number, bottom: number): void {
        if (!this.nativeViewProtected) {
            return;
        }

        let bottomSafeArea = 0;
        if (Application.ios.window.safeAreaInsets) {
            bottomSafeArea = Application.ios.window.safeAreaInsets.bottom;
        }

        const viewSize: CGSize = CGSizeMake(Screen.mainScreen.widthDIPs, Screen.mainScreen.heightDIPs);
        const nativeViewSize: CGSize = this.nativeViewProtected.sizeThatFits(viewSize);
        const bottomBarHeight = nativeViewSize.height + bottomSafeArea;

        const nativeView = this.nativeViewProtected;
        const frame = CGRectMake(0, Utils.layout.toDeviceIndependentPixels(top), viewSize.width, bottomBarHeight);

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

    [titleVisibilityProperty.setNative](titleVisibility: TitleVisibility) {
        this.nativeViewProtected.titleVisibility = titleVisibility as number;
    }

    [activeColorCssProperty.setNative](activeColor: Color) {
        this.nativeViewProtected.selectedItemTintColor = activeColor ? activeColor.ios : null;
    }
    [badgeColorCssProperty.setNative](color: Color) {
        this.nativeViewProtected.itemBadgeBackgroundColor = color ? color.ios : null;
    }

    [badgeTextColorCssProperty.setNative](color: Color) {
        this.nativeViewProtected.itemBadgeTextColor = color ? color.ios : null;
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
            (tab as any).barIndex = index;
            return tab;
        });
        this.nativeViewProtected.items = new NSArray({ array: bottomNavigationTabs });

        // TODO: this is for he v8 runtime. Should not have to need this setTimeout(), find better way.
        setTimeout(() => {
            this.nativeViewProtected.selectedItem = this.nativeViewProtected.items[this.selectedTabIndex];
        }, 0);
    }

    protected selectTabNative(index: number): void {
        if (this.nativeViewProtected.items.count === 0) {
            return;
        }
        // ios impl does not trigger delegates!
        const itemToSelect = this.nativeViewProtected.items[index];
        if (this._delegate.bottomNavigationBarShouldSelectItem(this.nativeViewProtected, itemToSelect)) {
            this.nativeViewProtected.selectedItem = this.nativeViewProtected.items[index];
            this._delegate.bottomNavigationBarDidSelectItem(this.nativeViewProtected, itemToSelect);
            this.selectedTabIndex = index;
        }
    }
}

// Bottom Navigation Tab

declare class MDCBottomNavigationItemView extends UIView {
    selectedItemTintColor: UIColor;
    unselectedItemTintColor: UIColor;
    selectedItemTitleColor: UIColor;
    badgeTextColor: UIColor;
    badgeColor: UIColor;
}

export class BottomNavigationTab extends BottomNavigationTabBase {
    nativeViewProtected: UITabBarItem;
    createNativeView() {
        let icon = this.getNativeIcon();
        if (icon) {
            icon = icon.imageWithRenderingMode(UIImageRenderingMode.Automatic);
        }
        return UITabBarItem.alloc().initWithTitleImageTag(this.title, icon, 0);
    }

    getNativeIcon(): UIImage {
        return this.icon && this.icon.ios;
    }

    getMDView() {
        return (this.parent as BottomNavigationBar).nativeViewProtected.viewForItem(this.nativeViewProtected) as MDCBottomNavigationItemView;
    }

    [activeColorCssProperty.setNative](activeColor: Color) {
        const color = activeColor ? activeColor.ios : null;
        // TODO: it wont work for now as MDCBottomNavigationItemView is not exposed
        this.getMDView().selectedItemTintColor = color;
    }

    [inactiveColorCssProperty.setNative](inactiveColor: Color) {
        const color = inactiveColor ? inactiveColor.ios : null;
        // TODO: it wont work for now as MDCBottomNavigationItemView is not exposed
        this.getMDView().unselectedItemTintColor = color;
    }

    showBadge(value?: number): void {
        this.nativeViewProtected.badgeValue = value ? `${value}` : '';
    }

    removeBadge(): void {
        this.nativeViewProtected.badgeValue = null;
    }
}
