import { cssProperty } from '@nativescript-community/ui-material-core';
// Types
import { Color, CoreTypes, Frame, Property, booleanConverter } from '@nativescript/core';
import { TabNavigationBase as TabNavigationBaseBase } from '../tab-navigation-base';

import { TabNavigation as TabsDefinition } from '.';
import { TabStripItem } from '../tab-strip-item';
import { TabContentItem } from '../tab-content-item';

export namespace knownCollections {
    export const items = 'items';
}

export enum TabsPosition {
    Top = 'top',
    Bottom = 'bottom'
}

export class TabNavigationBase extends TabNavigationBaseBase implements TabsDefinition {
    public swipeEnabled: boolean;
    public offscreenTabLimit: number;
    public tabsPosition: TabsPosition;
    // public iOSTabBarItemsAlignment: IOSTabBarItemsAlignment;
    public animationEnabled: boolean;
    @cssProperty rippleColor: Color;
    protected mTextTransform: CoreTypes.TextTransformType = 'none';

    protected getItemLabelTextTransform(tabStripItem: TabStripItem): CoreTypes.TextTransformType {
        const nestedLabel = tabStripItem.label;
        let textTransform: CoreTypes.TextTransformType = null;
        if (nestedLabel && nestedLabel.style.textTransform !== 'initial') {
            textTransform = nestedLabel.style.textTransform;
        } else if (tabStripItem.style.textTransform !== 'initial') {
            textTransform = tabStripItem.style.textTransform;
        }

        return textTransform || this.mTextTransform;
    }
    public getTabBarTextTransform(): CoreTypes.TextTransformType {
        return this.mTextTransform;
    }
    public getTabBarItemTextTransform(tabStripItem: TabStripItem): CoreTypes.TextTransformType {
        return this.getItemLabelTextTransform(tabStripItem);
    }

    public _loadUnloadTabItems(newIndex: number) {
        const items = this.items;
        if (!items) {
            return;
        }

        const offsideItems = this.offscreenTabLimit;

        const toLoad: TabContentItem[] = [];
        const toUnload: TabContentItem[] = [];
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            if (item) {
                if (Math.abs(index - newIndex) <= offsideItems) {
                    toLoad.push(item);
                } else {
                    toUnload.push(item);
                }
            }
        }

        if (this.unloadOnTabChange) {
            toUnload.forEach((item) => item.unloadView(item.content));
        }

        const newItem = items[newIndex];
        const selectedView = newItem && newItem.content;
        if (selectedView instanceof Frame) {
            selectedView._pushInFrameStackRecursive();
        }

        if (this.isLoaded) {
            toLoad.forEach((item) => item.loadView(item.content));
        }
    }
}

export const swipeEnabledProperty = new Property<TabNavigationBase, boolean>({
    name: 'swipeEnabled',
    defaultValue: true,
    valueConverter: booleanConverter
});
swipeEnabledProperty.register(TabNavigationBase);

export const offscreenTabLimitProperty = new Property<TabNavigationBase, number>({
    name: 'offscreenTabLimit',
    defaultValue: 1,
    valueConverter: (v) => parseInt(v, 10)
});
offscreenTabLimitProperty.register(TabNavigationBase);

export const tabsPositionProperty = new Property<TabNavigationBase, TabsPosition>({ name: 'tabsPosition', defaultValue: TabsPosition.Top });
tabsPositionProperty.register(TabNavigationBase);

// export type IOSTabBarItemsAlignment = 'leading' | 'justified' | 'center' | 'centerSelected';
// export const iOSTabBarItemsAlignmentProperty = new Property<TabsBase, IOSTabBarItemsAlignment>({ name: 'iOSTabBarItemsAlignment', defaultValue: 'justified' });
// iOSTabBarItemsAlignmentProperty.register(TabsBase);

export const animationEnabledProperty = new Property<TabNavigationBase, boolean>({ name: 'animationEnabled', defaultValue: true, valueConverter: booleanConverter });
animationEnabledProperty.register(TabNavigationBase);
