import { BottomNavigationBarBase } from './lib/base/bottom-navigation-bar.base';
import { BottomNavigationTabBase } from './lib/base/bottom-navigation-tab.base';
import { Color } from 'tns-core-modules/color';
import {
    TabPressedEventData,
    TabReselectedEventData,
    TabSelectedEventData,
    TitleVisibility,
} from './lib/internal/internals';
import { EventData } from 'tns-core-modules/ui/core/view';

export * from './lib/internal/internals';

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
    on(
        event: 'tabPressed',
        callback: (args: TabPressedEventData) => void,
        thisArg?: any
    ): void;
    on(
        event: 'tabSelected',
        callback: (args: TabSelectedEventData) => void,
        thisArg?: any
    ): void;
    on(
        event: 'tabReselected',
        callback: (args: TabReselectedEventData) => void,
        thisArg?: any
    ): void;

    // Needed when 'on' method is overriden.
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any): void;
    protected selectTabNative(index: number): void;
    protected createTabs(tabs: BottomNavigationTab[]): void;
}

export declare class BottomNavigationTab extends BottomNavigationTabBase {
    getNativeIcon(): any;
    title: string;
    icon: string;
    isSelectable: boolean;
}
