import { Color } from 'tns-core-modules/color/color';
import { ImageSource } from 'tns-core-modules/image-source';

import { activeColorCssProperty, BottomNavigationBarBase, BottomNavigationTabBase, inactiveColorCssProperty, tabsProperty, titleVisibilityProperty } from './bottomnavigationbar-common';

import { TitleVisibility } from './internal/internals';

export * from './internal/internals';

// Classes shortcuts
const { BottomNavigationView } = com.google.android.material.bottomnavigation;
const { BitmapDrawable } = android.graphics.drawable;
const { ColorStateList } = android.content.res;
const { Menu } = android.view;

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
            const bottomNavigationTab = this.owner.items[menuItem.getItemId()];

            if (bottomNavigationTab.isSelectable) {
                this.owner._emitTabSelected(menuItem.getItemId());
            } else {
                this.owner._emitTabPressed(menuItem.getItemId());
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

    return new ColorStateList(states, colors);
}

export class BottomNavigationBar extends BottomNavigationBarBase {
    nativeView: com.google.android.material.bottomnavigation.BottomNavigationView;

    get android() {
        return this.nativeView;
    }

    createNativeView() {
        const nativeView = new BottomNavigationView(this._context);

        const OnTabReselectedListener = getOnTabReselectedListener();
        nativeView.setOnNavigationItemReselectedListener(new OnTabReselectedListener(this));
        const OnTabSelectedListener = getOnTabSelectedlistener();
        nativeView.setOnNavigationItemSelectedListener(new OnTabSelectedListener(this));

        return nativeView;
    }

    initNativeView(): void {
        super.initNativeView();
        // Create the tabs before setting the default values for each tab
        // We call this method here to create the tabs defined in the xml
        this.createTabs(this._items);
        // Set default LabelVisibilityMode
        this.nativeView.setLabelVisibilityMode(this.titleVisibility);
        // Set default ActiveColor
        this.setActiveColor(this.style.activeColor);
        // Set default InactiveColor
        this.setInactiveColor(this.style.inactiveColor);
    }

    showBadge(index: number, value?: number): void {
        // showBadge method is available in v1.1.0-alpha07 of material components
        // but NS team has the .d.ts for version 1
        // that's why we need to cast the nativeView to any to avoid typing errors
        const badge = (this.nativeView as any).showBadge(index);
        if (value) {
            badge.setNumber(value);
        }
    }

    removeBadge(index: number): void {
        // removeBadge method is available in v1.1.0-alpha07 of material components
        // but NS team has the .d.ts for version 1
        // that's why we need to cast the nativeView to any to avoid typing errors
        (this.nativeView as any).removeBadge(index);
    }

    [tabsProperty.setNative](tabs: BottomNavigationTab[]) {
        this.createTabs(tabs);
    }

    [titleVisibilityProperty.setNative](titleVisibility: TitleVisibility) {
        this.nativeView.setLabelVisibilityMode(titleVisibility);
    }

    [activeColorCssProperty.setNative](activeColor: Color) {
        this.setActiveColor(activeColor);
    }

    [inactiveColorCssProperty.setNative](inactiveColor: Color) {
        this.setInactiveColor(inactiveColor);
    }

    protected createTabs(tabs: BottomNavigationTab[] | undefined) {
        const bottomNavigationTabs = this.nativeView.getMenu();

        if (bottomNavigationTabs.size() > 0) {
            bottomNavigationTabs.clear();
        }

        if (tabs) {
            this._items = tabs;
        }

        this._items.forEach((tab, index) => {
            const menuItem = bottomNavigationTabs.add(Menu.NONE, index, Menu.NONE, tab.title);
            menuItem.setIcon(tab.getNativeIcon());
        });
    }

    protected selectTabNative(index: number): void {
        const bottomNavigationTabs = this.nativeView.getMenu();

        if (bottomNavigationTabs.size() === 0) {
            return;
        }

        this.nativeView.setSelectedItemId(index);
    }

    private setActiveColor(activeColor: Color) {
        const colorStateList = createColorStateList(activeColor, this.style.inactiveColor);
        this.nativeView.setItemTextColor(colorStateList);
        this.nativeView.setItemIconTintList(colorStateList);
    }

    private setInactiveColor(inactiveColor: Color) {
        const colorStateList = createColorStateList(this.style.activeColor, inactiveColor);
        this.nativeView.setItemTextColor(colorStateList);
        this.nativeView.setItemIconTintList(colorStateList);
    }
}

// Bottom Navigation Tab

export class BottomNavigationTab extends BottomNavigationTabBase {
    getNativeIcon(): android.graphics.drawable.BitmapDrawable {
        // The icon property always will return an ImageSource
        // but can be setted with a resource string that will be converted
        return new BitmapDrawable((this.icon as ImageSource).android);
    }
}
