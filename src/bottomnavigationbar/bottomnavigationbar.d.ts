import { Color, EventData, ImageSource } from '@nativescript/core';
import { BottomNavigationBarBase, BottomNavigationTabBase, TabPressedEventData, TabReselectedEventData, TabSelectedEventData, TitleVisibility } from './bottomnavigationbar-common';

export { TabPressedEventData, TabReselectedEventData, TabSelectedEventData, TitleVisibility };

export declare class BottomNavigationBar extends BottomNavigationBarBase {
    static tabPressedEvent: string;
    static tabSelectedEvent: string;
    static tabReselectedEvent: string;
    readonly ios: any;
    readonly android: any;
    readonly items: BottomNavigationTab[];
    selectedTabIndex: number;
    titleVisibility: TitleVisibility;
    activeColor: Color;
    inactiveColor: Color;
    backgroundColor: Color;
    selectTab(index: number): void;
    showBadge(index: number, value?: number): void;
    removeBadge(index: number): void;
    on(event: 'tabPressed', callback: (args: TabPressedEventData) => void, thisArg?: any): void;
    on(event: 'tabSelected', callback: (args: TabSelectedEventData) => void, thisArg?: any): void;
    on(event: 'tabReselected', callback: (args: TabReselectedEventData) => void, thisArg?: any): void;

    // Needed when 'on' method is overriden.
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any): void;
    protected createTabs(tabs?: BottomNavigationTab[]): void;
    protected selectTabNative(index: number): void;
}

export declare class BottomNavigationTab extends BottomNavigationTabBase {
    title: string;
    icon: ImageSource;
    isSelectable: boolean;
    getNativeIcon(): any;
    showBadge(value?: number): void;
    removeBadge(): void;
}
