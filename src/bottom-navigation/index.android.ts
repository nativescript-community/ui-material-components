import { TabContentItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-content-item';
import { PRIMARY_COLOR, TabNavigation } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-navigation/index.android';
import { TabStrip } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip';
import { TabStripItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip-item';
import { CSSType, Color, Utils } from '@nativescript/core';
import { selectedIndexProperty } from '@nativescript/core/ui/list-picker/list-picker-common';
export { TabContentItem, TabStrip, TabStripItem };

interface BottomNavigationBar extends com.nativescript.material.core.BottomNavigationBar {
    // tslint:disable-next-line:no-misused-new
    new (context: android.content.Context, owner: BottomNavigation): BottomNavigationBar;
}
// eslint-disable-next-line no-redeclare
let BottomNavigationBar: BottomNavigationBar;

function initializeNativeClasses() {
    if (BottomNavigationBar) {
        return;
    }

    @NativeClass
    class BottomNavigationBarImplementation extends com.nativescript.material.core.BottomNavigationBar {
        constructor(context: android.content.Context, public owner: BottomNavigation) {
            super(context);

            return global.__native(this);
        }

        public onSelectedPositionChange(position: number, prevPosition: number): void {
            console.log('onSelectedPositionChange', position, prevPosition);
            const owner = this.owner;
            if (!owner) {
                return;
            }
            owner.onTabsBarSelectedPositionChange(position, prevPosition);
        }

        public onTap(position: number): boolean {
            const owner = this.owner;
            if (!owner) {
                return false;
            }
            console.log('onTap', position, owner.onTabsBarTap(position));
            return owner.onTabsBarTap(position);
        }
    }

    BottomNavigationBar = BottomNavigationBarImplementation as any;
}

@CSSType('BottomNavigation')
export class BottomNavigation extends TabNavigation<com.nativescript.material.core.BottomNavigationBar> {
    protected updateTabsBarItemAt(position: number, itemSpec: com.nativescript.material.core.TabItemSpec) {
        this.mTabsBar.updateItemAt(position, itemSpec);
    }
    protected setTabsBarSelectedIndicatorColors(colors: number[]) {
        // nothing to do
    }
    protected getTabBarItemView(index: number) {
        return this.mTabsBar.getViewForItemAt(index);
    }
    protected getTabBarItemTextView(index: number) {
        return this.mTabsBar.getTextViewForItemAt(index);
    }
    protected createNativeTabBar(context: android.content.Context) {
        initializeNativeClasses();
        const tabsBar = new BottomNavigationBar(context, this);
        const primaryColor = Utils.android.resources.getPaletteColor(PRIMARY_COLOR, context);
        // const accentColor = getDefaultAccentColor(context);
        // if (accentColor) {
        //     tabsBar.setSelectedIndicatorColors([accentColor]);
        // }

        if (primaryColor) {
            tabsBar.setBackgroundColor(primaryColor);
        }
        tabsBar.setSelectedPosition(this.selectedIndex);
        return tabsBar;
    }

    protected setTabBarItems(tabItems: com.nativescript.material.core.TabItemSpec[], viewPager: com.nativescript.material.core.TabViewPager) {
        this.mTabsBar.setItems(tabItems);
    }

    protected selectTabBar(oldIndex: number, newIndex: number) {
        this.mTabsBar.setSelectedPosition(newIndex);
    }

    public onLoaded(): void {
        super.onLoaded();

        if (!this.tabStrip) {
            // manually set the visibility, so that the grid layout remeasures
            this.mTabsBar.setVisibility(android.view.View.GONE);
        }

        // if (this._attachedToWindow) {
        //     this.changeTab(this.selectedIndex);
        // }
    }

    _onAttachedToWindow(): void {
        super._onAttachedToWindow();
        // this.changeTab(this.selectedIndex);
    }

    public updateAndroidItemAt(index: number, spec: com.nativescript.material.core.TabItemSpec) {
        // that try catch is fix for an android NPE error on css change which navigated in (not the current fragment)
        try {
            if (this.mTabsBar) {
                this.mTabsBar.updateItemAt(index, spec);
            }
        } catch (err) {}
    }

    public setTabBarBackgroundColor(value: android.graphics.drawable.Drawable | Color): void {
        super.setTabBarBackgroundColor(value);
        // this.updateTabStripItems();
    }

    // private updateTabStripItems(): void {
    //     this.tabStrip.items.forEach((tabStripItem: TabStripItem) => {
    //         if (tabStripItem.nativeView) {
    //             const tabItemSpec = this.createTabItemSpec(tabStripItem);
    //             this.updateAndroidItemAt(tabStripItem._index, tabItemSpec);
    //         }
    //     });
    // }

    public _setItemsColors(items: TabStripItem[]): void {
        items.forEach((item) => {
            if (item.nativeView) {
                this._setItemColor(item);
            }
        });
    }

    public setTabBarSelectedItemColor(value: Color) {
        super.setTabBarSelectedItemColor(value);
        this._setItemsColors(this.tabStrip.items);
    }

    public setTabBarUnSelectedItemColor(value: Color) {
        super.setTabBarUnSelectedItemColor(value);
        this._setItemsColors(this.tabStrip.items);
    }

    public onTabsBarSelectedPositionChange(position: number, prevPosition: number) {
        super.onTabsBarSelectedPositionChange(position, prevPosition);
        this.mViewPager.setCurrentItem(position, true);
        this._setItemsColors(this.tabStrip.items);
    }
}
