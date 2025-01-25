import { state, stateSets } from '@nativescript-community/ui-material-core/android/utils';
import { Color, ImageSource, Utils, heightProperty } from '@nativescript/core';
import {
    BottomNavigationBarBase,
    BottomNavigationTabBase,
    TitleVisibility,
    activeColorCssProperty,
    iconProperty,
    inactiveColorCssProperty,
    tabsProperty,
    titleVisibilityProperty
} from './bottomnavigationbar-common';

// Types shortcuts
declare type OnNavigationItemSelectedListener = com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemSelectedListener;
declare type OnNavigationItemReselectedListener = com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemReselectedListener;

// Listeners
type OnTabSelectedlistener = new (owner: WeakRef<BottomNavigationBar>) => OnNavigationItemSelectedListener;

// eslint-disable-next-line no-redeclare
let OnTabSelectedlistener: OnTabSelectedlistener;

const getOnTabSelectedlistener = () => {
    if (OnTabSelectedlistener) {
        return OnTabSelectedlistener;
    }

    @NativeClass
    @Interfaces([com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemSelectedListener])
    class OnTabSelectedlistenerImpl extends java.lang.Object implements OnNavigationItemSelectedListener {
        constructor(public owner: WeakRef<BottomNavigationBar>) {
            super();
            // necessary when extending TypeScript constructors
            return global.__native(this);
        }

        public onNavigationItemSelected(menuItem: globalAndroid.view.MenuItem): boolean {
            const owner = this.owner?.get();
            if (owner) {
                const index = menuItem.getItemId();
                const bottomNavigationTab = owner.items[index];

                if (bottomNavigationTab.isSelectable) {
                    owner._emitTabSelected(index);
                } else {
                    owner._emitTabPressed(index);
                }
                return bottomNavigationTab.isSelectable;
            }
            return false;
        }
    }

    OnTabSelectedlistener = OnTabSelectedlistenerImpl;

    return OnTabSelectedlistener;
};

type OnTabReselectedListener = new (owner: WeakRef<BottomNavigationBar>) => OnNavigationItemReselectedListener;

// eslint-disable-next-line no-redeclare
let OnTabReselectedListener: OnTabReselectedListener;

const getOnTabReselectedListener = () => {
    if (OnTabReselectedListener) {
        return OnTabReselectedListener;
    }
    @NativeClass
    @Interfaces([com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemReselectedListener])
    class OnTabReselectedListenerImpl extends java.lang.Object implements OnNavigationItemReselectedListener {
        constructor(public owner: WeakRef<BottomNavigationBar>) {
            super();
            // necessary when extending TypeScript constructors
            return global.__native(this);
        }

        public onNavigationItemReselected(menuItem: globalAndroid.view.MenuItem): void {
            this.owner?.get()?._emitTabReselected(menuItem.getItemId());
        }
    }

    OnTabReselectedListener = OnTabReselectedListenerImpl;

    return OnTabReselectedListener;
};

function createColorStateList(activeColor: number, inactiveColor: number) {
    const stateChecked = Array.create('int', 1);
    stateChecked[0] = state.checked;
    const stateUnChecked = Array.create('int', 0);

    const states = Array.create('[I', 2);
    states[0] = stateChecked;
    states[1] = stateUnChecked;

    const colors = Array.create('int', 2);
    colors[0] = activeColor;
    colors[1] = inactiveColor;

    return new android.content.res.ColorStateList(states, colors);
}

export class BottomNavigationBar extends BottomNavigationBarBase {
    nativeViewProtected: com.google.android.material.bottomnavigation.BottomNavigationView;
    _items: BottomNavigationTab[];
    reselectListener: OnNavigationItemReselectedListener;
    selectListener: OnNavigationItemSelectedListener;
    // default height property
    height = 56;
    createNativeView() {
        return new com.google.android.material.bottomnavigation.BottomNavigationView(this._context);
    }

    initNativeView(): void {
        super.initNativeView();
        const OnTabReselectedListener = getOnTabReselectedListener();
        const OnTabSelectedListener = getOnTabSelectedlistener();
        const that = new WeakRef(this);
        this.reselectListener = new OnTabReselectedListener(that);
        this.selectListener = new OnTabSelectedListener(that);
        this.nativeViewProtected.setOnNavigationItemReselectedListener(this.reselectListener);
        this.nativeViewProtected.setOnNavigationItemSelectedListener(this.selectListener);
        // Create the tabs before setting the default values for each tab
        // We call this method here to create the tabs defined in the xml
        this.createTabs(this._items);
        this.selectTabNative(this.selectedTabIndex);
    }
    disposeNativeView(): void {
        this.nativeViewProtected.setOnNavigationItemReselectedListener(null);
        this.nativeViewProtected.setOnNavigationItemSelectedListener(null);
        this.reselectListener = null;
        this.selectListener = null;
        this._items.forEach((item) => this._removeView(item));
        super.disposeNativeView();
    }

    showBadge(index: number, value?: number): void {
        // showBadge method is available in v1.1.0-alpha07 of material components
        // but NS team has the .d.ts for version 1
        // that's why we need to cast the nativeView to any to avoid typing errors
        const badge = this.nativeViewProtected.getOrCreateBadge(index);
        if (this.badgeColor) {
            badge.setBackgroundColor(this.badgeColor.android);
        }
        if (this.badgeTextColor) {
            badge.setBadgeTextColor(this.badgeTextColor.android);
        }
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
        const color1 = activeColor instanceof Color ? activeColor.android : activeColor;
        const color2 = this.inactiveColor instanceof Color ? this.inactiveColor.android : this.nativeViewProtected.getItemTextColor().getColorForState(stateSets.BACKGROUND_DEFAULT_STATE_2, color1);
        const colorStateList = createColorStateList(color1, color2);
        this.nativeViewProtected.setItemTextColor(colorStateList);
        this.nativeViewProtected.setItemIconTintList(colorStateList);
    }

    [inactiveColorCssProperty.setNative](inactiveColor: Color) {
        const color2 = inactiveColor instanceof Color ? inactiveColor.android : inactiveColor;
        const color1 = this.activeColor instanceof Color ? this.activeColor.android : this.nativeViewProtected.getItemTextColor().getColorForState(stateSets.FOCUSED_STATE_SET, color2);
        const colorStateList = createColorStateList(color1, color2);
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
            // const tab = item.nativeViewProtected;
            // tab.setIcon(item.getNativeIcon());
        });
    }

    protected selectTabNative(index: number): void {
        if (this.nativeViewProtected) {
            const bottomNavigationTabs = this.nativeViewProtected.getMenu();
            if (bottomNavigationTabs.size() === 0) {
                return;
            }
            this.nativeViewProtected.setSelectedItemId(index);
        }
        this.selectedTabIndex = index;
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
    [iconProperty.setNative](iconSource) {
        if (!iconSource) {
            return null;
        }
        let is: ImageSource;
        if (iconSource instanceof ImageSource) {
            is = iconSource;
        } else if (Utils.isFontIconURI(iconSource)) {
            const fontIconCode = iconSource.split('//')[1];
            const font = this.style.fontInternal;
            is = ImageSource.fromFontIconCodeSync(fontIconCode, font, new Color('white'));
        } else {
            is = ImageSource.fromFileOrResourceSync(iconSource);
        }
        this.nativeViewProtected.setIcon(is ? new android.graphics.drawable.BitmapDrawable(is.android) : null);
    }

    showBadge(value?): void {
        (this.parent as BottomNavigationBar).showBadge(this.index, value);
    }

    removeBadge(): void {
        (this.parent as BottomNavigationBar).removeBadge(this.index);
    }
    [activeColorCssProperty.setNative](activeColor: Color) {
        // not working for now
        const color1 = activeColor instanceof Color ? activeColor.android : activeColor;
        const color2 =
            this.inactiveColor instanceof Color
                ? this.inactiveColor.android
                : this.nativeViewProtected.getIconTintList()
                  ? this.nativeViewProtected.getIconTintList().getColorForState(stateSets.BACKGROUND_DEFAULT_STATE_2, color1)
                  : 0;
        const colorStateList = createColorStateList(color1, color2);
        // this.nativeViewProtected.color(colorStateList); // can we set the text color?
        this.nativeViewProtected.setIconTintList(colorStateList);
    }

    [inactiveColorCssProperty.setNative](inactiveColor: Color) {
        // not working for now
        const color2 = inactiveColor instanceof Color ? inactiveColor.android : inactiveColor;
        const color1 =
            this.activeColor instanceof Color
                ? this.activeColor.android
                : this.nativeViewProtected.getIconTintList()
                  ? this.nativeViewProtected.getIconTintList().getColorForState(stateSets.SELECTED_STATE_SET, color2)
                  : 0;
        const colorStateList = createColorStateList(color1, color2);
        // this.nativeViewProtected.setText(colorStateList); // can we set the text color?
        this.nativeViewProtected.setIconTintList(colorStateList);
    }
}
