import { Color } from 'tns-core-modules/color/color';

import {
  BottomNavigationBarBase,
  tabsProperty,
  titleVisibilityProperty,
  activeColorCssProperty,
  inactiveColorCssProperty,
} from '../base/bottom-navigation-bar.base';

import { OnTabReselectedListener } from './listeners/on-tab-reselected.listener';
import { OnTabSelectedListener } from './listeners/on-tab-selected.listener';
import { BottomNavigationTab } from './bottom-navigation-tab';
import { TitleVisibility } from '../internal/internals';
import { createColorStateList } from './utils';

// Classes shortcuts
const { BottomNavigationView } = com.google.android.material.bottomnavigation;
const { Menu } = android.view;

export class BottomNavigationBar extends BottomNavigationBarBase {
  nativeView: com.google.android.material.bottomnavigation.BottomNavigationView;

  get android() {
    return this.nativeView;
  }

  public createNativeView() {
    const nativeView = new BottomNavigationView(this._context);

    const owner = new WeakRef(this);

    nativeView.setOnNavigationItemSelectedListener(
      OnTabSelectedListener.initWithOwner(owner),
    );

    nativeView.setOnNavigationItemReselectedListener(
      OnTabReselectedListener.initWithOwner(owner),
    );

    return nativeView;
  }

  initNativeView(): void {
    // Create the tabs before setting the default values for each tab
    this.createTabs();
    // Set default LabelVisibilityMode
    this.nativeView.setLabelVisibilityMode(this.titleVisibility);
    // Set default ActiveColor
    this.setActiveColor(this.style.activeColor);
    // Set default InactiveColor
    this.setInactiveColor(this.style.inactiveColor);
  }

  showBadge(index: number, value?: number): void {
    const badge = this.nativeView.showBadge(index);
    if (value) {
      badge.setNumber(value);
    }
  }

  removeBadge(index: number): void {
    this.nativeView.removeBadge(index);
  }

  [tabsProperty.setNative](tabs: BottomNavigationTab[]) {
    this.createTabs(tabs);
  }

  [titleVisibilityProperty.setNative](titleVisibility: TitleVisibility) {
    this.nativeView.setLabelVisibilityMode(titleVisibility);
  }

  [activeColorCssProperty.setNative](activeColor: Color) {
    this.setActiveColor(activeColor);
  }

  [inactiveColorCssProperty.setNative](inactiveColor: Color) {
    this.setInactiveColor(inactiveColor);
  }

  protected createTabs(tabs?: BottomNavigationTab[]) {
    const bottomNavigationTabs = this.nativeView.getMenu();

    if (bottomNavigationTabs.size() > 0) {
      bottomNavigationTabs.clear();
    }

    if (tabs) {
      this._items = tabs;
    }

    this._items.forEach((tab, index) => {
      const menuItem = bottomNavigationTabs.add(
        Menu.NONE,
        index,
        Menu.NONE,
        tab.title,
      );
      menuItem.setIcon(tab.getNativeIcon());
    });
  }

  protected selectTabNative(index: number): void {
    this.nativeView.setSelectedItemId(index);
  }

  private setActiveColor(activeColor: Color) {
    const colorStateList = createColorStateList(
      activeColor,
      this.style.inactiveColor,
    );
    this.nativeView.setItemTextColor(colorStateList);
    this.nativeView.setItemIconTintList(colorStateList);
  }

  private setInactiveColor(inactiveColor: Color) {
    const colorStateList = createColorStateList(
      this.style.activeColor,
      inactiveColor,
    );
    this.nativeView.setItemTextColor(colorStateList);
    this.nativeView.setItemIconTintList(colorStateList);
  }
}
