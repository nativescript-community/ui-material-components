import { EventData } from 'tns-core-modules/data/observable';
import {
    BottomNavigationBase,
    BottomNavigationTabBase,
    TitleVisibilityOptions
} from './bottom-navigation.common';

export declare interface OnTabPressedEventData extends EventData {
    index: number;
}

export declare interface OnTabReselectedEventData extends EventData {
    index: number;
}

export declare interface OnTabSelectedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}

export declare type TitleVisibility = 'always' | 'selected' | 'never';

export declare class BottomNavigation extends BottomNavigationBase {

    /**
     * Get or set the Bottom Navigation tabs
     */
    public tabs: BottomNavigationTabBase[];

    /**
     * Get or set the current selected tab index
     */
    public selectedTabIndex: number;

    /**
     * Get ot Set the Title Visibility
     */
    public titleVisibility: TitleVisibility;

    /**
     * Get or set the color of the icon and title of the selected tab.
     */
    public activeColor: string;

    /**
     * Get or set the color of the icon and title of not selected tabs.
     */
    public inactiveColor: string;

    /**
     * Get or set the backgroundColor of the bottomNavigation
     */
    public backgroundColor: string;

    readonly android: any;
    readonly ios: any;
    protected titleVisibilityOptions: TitleVisibilityOptions;

    /**
     * Method allowing to manually select a tab
     */
    public selectTab(index: number): void;

    public createTabs(tabs: BottomNavigationTab[]): void;

    protected selectTabNative(index: number): void;
}

export declare class BottomNavigationTab extends BottomNavigationTabBase {
    constructor(title: string, icon: string, selectable?: boolean, parent?: WeakRef<BottomNavigationBase>);
}
