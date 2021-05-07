import { PropertyChangeData } from '@nativescript/core';
import { ViewAttributes } from 'react-nativescript';
import { SelectedIndexChangedEventData } from '..';
import { TabContentItem } from '../../tab-content-item';
import { TabStrip } from '../../tab-strip';

// ui/tab-navigation-base/tab-navigation-base/tab-navigation-base.d.ts
export type TabNavigationBaseAttributes = ViewAttributes & {
    android?: any;
    ios?: any;
    items?: string | TabContentItem[];
    onItemsChange?: (args: PropertyChangeData) => void;
    onSelectedIndexChange?: (args: PropertyChangeData) => void;
    onSelectedIndexChanged?: (args: SelectedIndexChangedEventData) => void;
    onTabStripChange?: (args: PropertyChangeData) => void;
    selectedIndex?: string | number;
    tabStrip?: string | TabStrip;
};
