// Types
import { CSSType, Property, TabNavigationBase, booleanConverter } from '@nativescript/core';
import { Tabs as TabsDefinition } from './tabs';

export const traceCategory = 'TabView';

export namespace knownCollections {
    export const items = 'items';
}

@CSSType('MDTabs')
export class TabsBase extends TabNavigationBase implements TabsDefinition {
    public swipeEnabled: boolean;
    public offscreenTabLimit: number;
    public tabsPosition: 'top' | 'bottom';
    public iOSTabBarItemsAlignment: IOSTabBarItemsAlignment;
}

// TODO: Add Unit tests
export const swipeEnabledProperty = new Property<TabsBase, boolean>({
    name: 'swipeEnabled', defaultValue: true, valueConverter: booleanConverter
});
swipeEnabledProperty.register(TabsBase);

// TODO: Add Unit tests
// TODO: Coerce to max number of items?
export const offscreenTabLimitProperty = new Property<TabsBase, number>({
    name: 'offscreenTabLimit', defaultValue: 1, valueConverter: (v) => parseInt(v, 10)
});
offscreenTabLimitProperty.register(TabsBase);

export const tabsPositionProperty = new Property<TabsBase, 'top' | 'bottom'>({ name: 'tabsPosition', defaultValue: 'top' });
tabsPositionProperty.register(TabsBase);

export type IOSTabBarItemsAlignment = 'leading' | 'justified' | 'center' | 'centerSelected';
export const iOSTabBarItemsAlignmentProperty = new Property<TabsBase, IOSTabBarItemsAlignment>({ name: 'iOSTabBarItemsAlignment', defaultValue: 'justified' });
iOSTabBarItemsAlignmentProperty.register(TabsBase);
