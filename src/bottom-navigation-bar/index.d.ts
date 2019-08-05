import { BottomNavigationBarBase } from './lib/base/bottom-navigation-bar.base';
import { BottomNavigationTabBase } from './lib/base/bottom-navigation-tab.base';
import {
  TabSelectedEventData,
  TabPressedEventData,
  TabReselectedEventData,
  TitleVisibility,
} from './lib/internal/internals';

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
  activeColor: string;
  inactiveColor: string;
  backgroundColor: Color;
  selectTab(index: number): void;
  showBadge(index: number, value?: number): void;
  removeBadge(index: number): void;
  on(
    event: 'tabPressed',
    callback: (args: TabPressedEventData) => void,
    thisArg?: any,
  ): void;
  on(
    event: 'tabSelected',
    callback: (args: TabSelectedEventData) => void,
    thisArg?: any,
  ): void;
  on(
    event: 'tabReselected',
    callback: (args: TabReselectedEventData) => void,
    thisArg?: any,
  ): void;

  // Needed when 'on' method is overriden.
  on(
    eventNames: string,
    callback: (data: EventData) => void,
    thisArg?: any,
  ): void;
}

export declare class BottomNavigationTab extends BottomNavigationTabBase {
  title: string;
  icon: string;
  isSelectable: boolean;
}
