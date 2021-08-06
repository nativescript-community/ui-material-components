/**
 * Material BottomNavigation component
 * @module @nativescript-community/ui-material-bottom-navigation
 */

import { TabContentItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-content-item';
import { TabNavigationBase } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-navigation-base';
import { TabStrip } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip';
import { CoercibleProperty, EventData, Property } from '@nativescript/core';
import { TabStripItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip-item';

export { TabContentItem, TabStrip, TabStripItem };
/**
 * Defines the data for the TabView.selectedIndexChanged event.
 */
export interface SelectedIndexChangedEventData extends EventData {
    /**
     * The old selected index.
     */
    oldIndex: number;

    /**
     * The new selected index.
     */
    newIndex: number;
}

/**
 * Represents a tab navigation widget with static tabs at the bottom.
 */
export class BottomNavigation extends TabNavigationBase {
    /**
     * Gets or sets the items of the BottomNavigation.
     */
    items: TabContentItem[];

    /**
     * Gets or sets the tab strip of the BottomNavigation.
     */
    tabStrip: TabStrip;

    /**
     * Gets or sets the selectedIndex of the BottomNavigation.
     */
    selectedIndex: number;

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

    /**
     * @hidden
     * A basic method signature to hook an event listener (shortcut alias to the addEventListener method).
     * @param eventNames - String corresponding to events (e.g. "propertyChange"). Optionally could be used more events separated by `,` (e.g. "propertyChange", "change").
     * @param callback - Callback function which will be executed when event is raised.
     * @param thisArg - An optional parameter which will be used as `this` context for callback execution.
     */
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);

    /**
     * Raised when the selected index changes.
     */
    on(event: 'selectedIndexChanged', callback: (args: SelectedIndexChangedEventData) => void, thisArg?: any);

    // parameter to allow the bottom-navigation to be positioned correcly within layouts and thus not be full size
    // be careful it will then be influenced by safeArea. Default is false
    iosCustomPositioning: boolean;
}

export const itemsProperty: Property<BottomNavigation, TabContentItem[]>;
export const tabStripProperty: Property<BottomNavigation, TabStrip>;
export const selectedIndexProperty: CoercibleProperty<BottomNavigation, number>;
