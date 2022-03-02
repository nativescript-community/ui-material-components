/**
 * Contains the Tabs class, which represents a tab navigation component.
 * @module @nativescript-community/ui-material-tabs
 */

import { Property } from '@nativescript/core';
import { TabNavigationBase } from '../tab-navigation-base';
import { TabContentItem } from '../tab-navigation-base/tab-content-item';
import { TabStrip } from '../tab-navigation-base/tab-strip';
import { TabStripItem } from '../tab-navigation-base/tab-strip-item';
export { TabContentItem, TabStrip, TabStripItem };
/**
 * Represents a swipeable tabs view.
 */
export abstract class TabNavigation<T = any> extends TabNavigationBase {
    /**
     * Gets or sets the items of the Tabs.
     */
    items: TabContentItem[];

    /**
     * Gets or sets the tab strip of the Tabs.
     */
    tabStrip: TabStrip;

    /**
     *
     * Gets or sets the selectedIndex of the Tabs.
     */
    selectedIndex: number;

    /**
     * Gets or sets the swipe enabled state of the Tabs.
     */
    swipeEnabled: boolean;

    /**
     * Gets or sets the number of offscreen preloaded tabs of the Tabs.
     */
    offscreenTabLimit: number;

    /**
     * Gets or sets the position state of the Tabs.
     */
    tabsPosition: 'top' | 'bottom';

    /**
     * Allow custom positioning of Tabs within another view
     */
    public iosCustomPositioning?: boolean;

    /**
     * Gets the native [android widget](http://developer.android.com/reference/android/support/v4/view/ViewPager.html) that represents the user interface for this component. Valid only when running on Android OS.
     */
    android: any /* android.view.View */; //android.support.v4.view.ViewPager;

    /**
     * Gets the native iOS [UITabBarController](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UITabBarController_Class/) that represents the user interface for this component. Valid only when running on iOS.
     */
    ios: any /* UITabBarController */;

    /**
     * String value used when hooking to the selectedIndexChanged event.
     */
    public static selectedIndexChangedEvent: string;
}

export const itemsProperty: Property<Tabs, TabContentItem[]>;
export const tabStripProperty: Property<Tabs, TabStrip>;
export const selectedIndexProperty: Property<Tabs, number>;

/**
 * IOS Alignment of the Tabs TabStrip to use.
 *  - `leading` - tab items are aligned to the left
 *  - `justified` - tab strip is split equally to all the tab items
 *  - `center` - tabs items are aligned in the center
 *  - `centerSelected` - tab items move to make the selected tab in the center
 */
// export type IOSTabBarItemsAlignment = 'leading' | 'justified' | 'center' | 'centerSelected';
