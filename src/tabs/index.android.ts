import { TabContentItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-content-item';
import { PRIMARY_COLOR, PositionChanger, TabNavigation, getDefaultAccentColor } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-navigation/index.android';
import { TabStrip } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip';
import { TabStripItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip-item';
import { CSSType, Utils } from '@nativescript/core';

export { TabContentItem, TabStrip, TabStripItem };

interface TabsBar extends com.nativescript.material.core.TabsBar {
    // tslint:disable-next-line:no-misused-new
    new (context: android.content.Context, owner: Tabs): TabsBar;
    onSelectedPositionChange(position: number, prevPosition: number): void;
}
// eslint-disable-next-line no-redeclare
let TabsBar: TabsBar;

function initializeNativeClasses() {
    if (TabsBar) {
        return;
    }
    @NativeClass
    class TabsBarImplementation extends com.nativescript.material.core.TabsBar implements PositionChanger {
        constructor(context: android.content.Context, public owner: Tabs) {
            super(context);

            return global.__native(this);
        }

        public onSelectedPositionChange(position: number, prevPosition: number): void {
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
            return owner.onTabsBarTap(position);
        }
    }

    TabsBar = TabsBarImplementation as any;
}

@CSSType('Tabs')
export class Tabs extends TabNavigation<TabsBar> {
    protected override updateTabsBarItemAt(position: number, itemSpec: com.nativescript.material.core.TabItemSpec) {
        this.mTabsBar.updateItemAt(position, itemSpec);
    }
    protected override setTabsBarSelectedIndicatorColors(colors: number[]) {
        this.mTabsBar.setSelectedIndicatorColors(colors);
    }
    protected override getTabBarItemView(index: number) {
        return this.mTabsBar.getViewForItemAt(index);
    }
    protected override getTabBarItemTextView(index: number) {
        return this.mTabsBar.getTextViewForItemAt(index);
    }
    protected override createNativeTabBar(context: android.content.Context) {
        initializeNativeClasses();
        const tabsBar = new TabsBar(context, this);
        const primaryColor = Utils.android.resources.getPaletteColor(PRIMARY_COLOR, context);
        const accentColor = getDefaultAccentColor(context);
        if (accentColor) {
            tabsBar.setSelectedIndicatorColors([accentColor]);
        }

        if (primaryColor) {
            tabsBar.setBackgroundColor(primaryColor);
        }
        return tabsBar;
    }

    protected override setTabBarItems(tabItems: com.nativescript.material.core.TabItemSpec[], viewPager: com.nativescript.material.core.TabViewPager) {
        this.mTabsBar.setItems(tabItems, viewPager);
    }

    protected override selectTabBar(oldIndex: number, newIndex: number) {
        this.mTabsBar.onSelectedPositionChange(oldIndex, newIndex);
    }

    protected override setTabStripItems(items: TabStripItem[]) {
        if (items.length > 0 && !this.mUnSelectedItemColor) {
            items.some((item) => {
                const color = item.label?.style.color;
                if (color) {
                    this.mUnSelectedItemColor = color;
                    return true;
                }
                return false;
            });
        }
        super.setTabStripItems(items);
    }

    public override onLoaded(): void {
        super.onLoaded();

        if (!this.tabStrip && this.mTabsBar) {
            // manually set the visibility, so that the grid layout remeasures
            this.mTabsBar.setVisibility(android.view.View.GONE);
        }
    }
}
