import {
  CSSType,
  View,
  AddChildFromBuilder,
  Color,
  Property,
  CssProperty,
  Style,
  AddArrayFromBuilder,
} from 'tns-core-modules/ui/core/view';

import {
  TitleVisibility,
  TabPressedEventData,
  TabReselectedEventData,
  TabSelectedEventData,
} from '../internal/internals';

import { BottomNavigationTabBase } from './bottom-navigation-tab.base';

@CSSType('BottomNavigationBar')
export abstract class BottomNavigationBarBase extends View
  implements AddChildFromBuilder {
  static tabPressedEvent = 'tabPressed';
  static tabSelectedEvent = 'tabSelected';
  static tabReselectedEvent = 'tabReselected';

  selectedTabIndex: number = 0;
  titleVisibility: TitleVisibility = TitleVisibility.Selected;

  protected _items: BottomNavigationTabBase[] = [];

  get items(): BottomNavigationTabBase[] {
    return this._items;
  }

  get inactiveColor(): Color {
    return this.style.inactiveColor;
  }

  set inactiveColor(color: Color) {
    this.style.inactiveColor = color;
  }

  get activeColor(): Color {
    return this.style.activeColor;
  }

  set activeColor(color: Color) {
    this.style.activeColor = color;
  }

  get backgroundColor(): Color {
    return this.style.backgroundColor;
  }

  set backgroundColor(color: Color) {
    this.style.backgroundColor = color;
  }

  selectTab(index: number): void {
    if (index === this.selectedTabIndex) {
      return;
    }

    this.selectTabNative(index);
  }

  _emitTabPressed(index: number) {
    let eventData: TabPressedEventData = {
      eventName: BottomNavigationBarBase.tabPressedEvent,
      object: this,
      index,
    };
    this.notify(eventData);
    this.removeBadge(index);
  }

  _emitTabSelected(index: number) {
    let eventData: TabSelectedEventData = {
      eventName: BottomNavigationBarBase.tabSelectedEvent,
      object: this,
      oldIndex: this.selectedTabIndex,
      newIndex: index,
    };
    this.selectedTabIndex = index;
    this.notify(eventData);
    this.removeBadge(index);
  }

  _emitTabReselected(index: number) {
    let eventData: TabReselectedEventData = {
      eventName: BottomNavigationBarBase.tabReselectedEvent,
      object: this,
      index,
    };
    this.notify(eventData);
  }

  _addChildFromBuilder(name: string, value: BottomNavigationTabBase): void {
    if (name === 'BottomNavigationTab') {
      if (!this._items) {
        this._items = [];
      }
      this._items.push(value);
    }
  }

  abstract showBadge(index: number, value?: number): void;
  abstract removeBadge(index: number): void;
  protected abstract selectTabNative(index: number): void;
  protected abstract createTabs(tabs: BottomNavigationTabBase[]): void;
}

export const tabsProperty = new Property<
  BottomNavigationBarBase,
  BottomNavigationTabBase[]
>({
  name: 'tabs',
  affectsLayout: true,
  defaultValue: [],
});

tabsProperty.register(BottomNavigationBarBase);

export const titleVisibilityProperty = new Property<
  BottomNavigationBarBase,
  TitleVisibility
>({
  name: 'titleVisibility',
  equalityComparer: (x, y) => x === y,
  affectsLayout: true,
  defaultValue: TitleVisibility.Selected,
  valueConverter: v => TitleVisibility[v],
});

titleVisibilityProperty.register(BottomNavigationBarBase);

export const activeColorCssProperty = new CssProperty<Style, Color>({
  name: 'activeColor',
  cssName: 'active-color',
  equalityComparer: Color.equals,
  defaultValue: new Color('black'),
  valueConverter: v => new Color(v),
});
activeColorCssProperty.register(Style);

export const inactiveColorCssProperty = new CssProperty<Style, Color>({
  name: 'inactiveColor',
  cssName: 'inactive-color',
  equalityComparer: Color.equals,
  defaultValue: new Color('gray'),
  valueConverter: v => new Color(v),
});
inactiveColorCssProperty.register(Style);
