import { Color } from '@nativescript/core/color';
import {
    activeColorCssProperty,
    BottomNavigationBarBase,
    BottomNavigationTabBase,
    inactiveColorCssProperty,
    tabsProperty,
    TitleVisibility,
    titleVisibilityProperty
} from './bottomnavigationbar-common';

// Types shortcuts
declare type OnNavigationItemSelectedListener = com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemSelectedListener;
declare type OnNavigationItemReselectedListener = com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemReselectedListener;

// Listeners
interface OnTabSelectedlistener {
    new (owner: BottomNavigationBar): OnNavigationItemSelectedListener;
}

let OnTabSelectedlistener: OnTabSelectedlistener;

const getOnTabSelectedlistener = () => {
    if (OnTabSelectedlistener) {
        return OnTabSelectedlistener;
    }

    @Interfaces([com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemSelectedListener])
    class OnTabSelectedlistenerImpl extends java.lang.Object implements OnNavigationItemSelectedListener {
        constructor(public owner: BottomNavigationBar) {
            super();

            // necessary when extending TypeScript constructors
            return global.__native(this);
        }

        public onNavigationItemSelected(menuItem: globalAndroid.view.MenuItem): boolean {
            const index = menuItem.getItemId();
            const bottomNavigationTab = this.owner.items[index];

            if (bottomNavigationTab.isSelectable) {
                this.owner._emitTabSelected(index);
            } else {
                this.owner._emitTabPressed(index);
            }

            return bottomNavigationTab.isSelectable;
        }
    }

    OnTabSelectedlistener = OnTabSelectedlistenerImpl;

    return OnTabSelectedlistener;
};

interface OnTabReselectedListener {
    new (owner: BottomNavigationBar): OnNavigationItemReselectedListener;
}

let OnTabReselectedListener: OnTabReselectedListener;

const getOnTabReselectedListener = () => {
    if (OnTabReselectedListener) {
        return OnTabReselectedListener;
    }
    @Interfaces([com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemReselectedListener])
    class OnTabReselectedListenerImpl extends java.lang.Object implements OnNavigationItemReselectedListener {
        constructor(public owner: BottomNavigationBar) {
            super();

            // necessary when extending TypeScript constructors
            return global.__native(this);
        }

        public onNavigationItemReselected(menuItem: globalAndroid.view.MenuItem): void {
            this.owner._emitTabReselected(menuItem.getItemId());
        }
    }

    OnTabReselectedListener = OnTabReselectedListenerImpl;

    return OnTabReselectedListener;
};

function createColorStateList(activeColor: Color, inactiveColor: Color) {
    const stateChecked = Array.create('int', 1);
    stateChecked[0] = android.R.attr.state_checked;
    const stateUnChecked = Array.create('int', 0);

    const states = java.lang.reflect.Array.newInstance(stateChecked.getClass() || stateUnChecked.getClass(), 2);
    states[0] = stateChecked;
    states[1] = stateUnChecked;

    const colors = Array.create('int', 2);
    colors[0] = activeColor.android;
    colors[1] = inactiveColor.android;

    return new android.content.res.ColorStateList(states, colors);
}

export class BottomNavigationBar extends BottomNavigationBarBase {
    nativeViewProtected: com.google.android.material.bottomnavigation.BottomNavigationView;
    _items: BottomNavigationTab[];
    reselectListener: OnNavigationItemReselectedListener;
    selectListener: OnNavigationItemSelectedListener;
    createNativeView() {
        return new com.google.android.material.bottomnavigation.BottomNavigationView(this._context);
    }

    initNativeView(): void {
        super.initNativeView();
        const OnTabReselectedListener = getOnTabReselectedListener();
        const OnTabSelectedListener = getOnTabSelectedlistener();
        this.reselectListener = new OnTabReselectedListener(this);
        this.selectListener = new OnTabSelectedListener(this);
        this.nativeViewProtected.setOnNavigationItemReselectedListener(this.reselectListener);
        this.nativeViewProtected.setOnNavigationItemSelectedListener(this.selectListener);
        // Create the tabs before setting the default values for each tab
        // We call this method here to create the tabs defined in the xml
        this.createTabs(this._items);
    }
    disposeNativeView(): void {
        this.nativeViewProtected.setOnNavigationItemReselectedListener(null);
        this.nativeViewProtected.setOnNavigationItemSelectedListener(null);
        this.reselectListener = null;
        this.selectListener = null;
        this._items.forEach(item => this._removeView(item));
        super.disposeNativeView();
    }

    showBadge(index: number, value?: number): void {
        // showBadge method is available in v1.1.0-alpha07 of material components
        // but NS team has the .d.ts for version 1
        // that's why we need to cast the nativeView to any to avoid typing errors
        const badge = (this.nativeViewProtected as any).getOrCreateBadge(index);
        if (value) {
            badge.setNumber(value);
        }
    }

    removeBadge(index: number): void {
        // removeBadge method is available in v1.1.0-alpha07 of material components
        // but NS team has the .d.ts for version 1
        // that's why we need to cast the nativeView to any to avoid typing errors
        (this.nativeViewProtected as any).removeBadge(index);
    }

    [tabsProperty.setNative](tabs: BottomNavigationTab[]) {
        this.createTabs(tabs);
    }

    [titleVisibilityProperty.setNative](titleVisibility: TitleVisibility) {
        this.nativeViewProtected.setLabelVisibilityMode(titleVisibility);
    }

    [activeColorCssProperty.setNative](activeColor: Color) {
        const colorStateList = createColorStateList(activeColor, this.inactiveColor);
        this.nativeViewProtected.setItemTextColor(colorStateList);
        this.nativeViewProtected.setItemIconTintList(colorStateList);
    }

    [inactiveColorCssProperty.setNative](inactiveColor: Color) {
        const colorStateList = createColorStateList(this.activeColor, inactiveColor);
        this.nativeViewProtected.setItemTextColor(colorStateList);
        this.nativeViewProtected.setItemIconTintList(colorStateList);
    }

    protected createTabs(tabs: BottomNavigationTab[] | undefined) {
        const bottomNavigationTabs = this.nativeViewProtected.getMenu();

        if (bottomNavigationTabs.size() > 0) {
            bottomNavigationTabs.clear();
        }

        if (tabs) {
            this._items = tabs;
        }

        this._items.forEach((item, index) => {
            // the create nativeView will actually add the item to the tab bar
            item.index = index;
            this._addView(item);
            const tab = item.nativeViewProtected;
            tab.setIcon(item.getNativeIcon());
        });
    }

    protected selectTabNative(index: number): void {
        const bottomNavigationTabs = this.nativeView.getMenu();

        if (bottomNavigationTabs.size() === 0) {
            return;
        }

        this.nativeView.setSelectedItemId(index);
    }
}

// Bottom Navigation Tab

export class BottomNavigationTab extends BottomNavigationTabBase {
    nativeViewProtected: android.view.MenuItem;
    index: number = android.view.Menu.NONE;
    _isPaddingRelative = true; // trick because @nativescript/core expect us to be a view
    createNativeView() {
        const view = (this.parent as BottomNavigationBar).nativeViewProtected.getMenu().add(android.view.Menu.NONE, this.index, android.view.Menu.NONE, this.title);
        // trick because @nativescript/core expect us to be a view
        (view as any).defaultPaddings = { top: 0, left: 0, bottom: 0, right: 0 };
        return view;
    }
    initNativeView() {
        // override for super not to be called. isClickable does not exist on android.view.MenuItem
    }
    getNativeIcon(): android.graphics.drawable.BitmapDrawable {
        return this.icon && new android.graphics.drawable.BitmapDrawable(this.icon.android);
    }

    showBadge(value?): void {
        (this.parent as BottomNavigationBar).showBadge(this.index, value);
    }

    removeBadge(): void {
        (this.parent as BottomNavigationBar).removeBadge(this.index);
    }
    [activeColorCssProperty.setNative](activeColor: Color) {
        // not working for now
        // const colorStateList = createColorStateList(activeColor, this.inactiveColor);
        // this.nativeViewProtected.color(colorStateList); // can we set the text color?
        // this.nativeViewProtected.setIconTintList(colorStateList);
    }

    [inactiveColorCssProperty.setNative](inactiveColor: Color) {
        // not working for now
        // const colorStateList = createColorStateList(this.activeColor, inactiveColor);
        // this.nativeViewProtected.setText(colorStateList); // can we set the text color?
        // this.nativeViewProtected.setIconTintList(colorStateList);
    }
}
