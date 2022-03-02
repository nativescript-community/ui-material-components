import { cssProperty } from '../../';
// Types
import { CSSType, Color, Property, booleanConverter } from '@nativescript/core';
import { TabNavigationBase as TabNavigationBaseBase } from '../tab-navigation-base';

import { TabNavigation as TabsDefinition } from '.';

export const traceCategory = 'TabView';

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

export const tabsPositionProperty = new Property<TabNavigationBase, TabsPosition>({ name: 'tabsPosition' });
tabsPositionProperty.register(TabNavigationBase);

// export type IOSTabBarItemsAlignment = 'leading' | 'justified' | 'center' | 'centerSelected';
// export const iOSTabBarItemsAlignmentProperty = new Property<TabsBase, IOSTabBarItemsAlignment>({ name: 'iOSTabBarItemsAlignment', defaultValue: 'justified' });
// iOSTabBarItemsAlignmentProperty.register(TabsBase);

export const animationEnabledProperty = new Property<TabNavigationBase, boolean>({ name: 'animationEnabled', defaultValue: true, valueConverter: booleanConverter });
animationEnabledProperty.register(TabNavigationBase);
