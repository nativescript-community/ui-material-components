import {
  activeColorCssProperty,
  activeColorProperty,
  backgroundColorCssProperty,
  backgroundColorProperty,
  BottomNavigationBase,
  BottomNavigationTabBase,
  inactiveColorCssProperty,
  inactiveColorProperty,
  tabsProperty,
  TitleVisibility,
  TitleVisibilityOptions,
  titleVisibilityProperty,
} from './bottom-navigation.common';
import { Color } from 'tns-core-modules/color';
import { fromResource } from 'tns-core-modules/image-source';

declare const com, android: any;

const BitmapDrawable = android.graphics.drawable.BitmapDrawable;

export class BottomNavigation extends BottomNavigationBase {
  protected titleVisibilityOptions: TitleVisibilityOptions = {
    always: 0,
    never: 1,
    selected: 2,
  };

  get android(): any {
    return this.nativeView;
  }

  createNativeView(): Object {
    const owner = new WeakRef(this);
    // TODO: Pending of implementation

    return this.nativeView;
  }


  initNativeView(): void {
    // TODO: Pending of implementation
  }

  createTabs(tabs: BottomNavigationTab[]) {
    if (!this.tabs) { this.tabs = tabs; }
    for (let tab of tabs) {
      let icon = new BitmapDrawable(fromResource(tab.icon).android);
      // TODO: Pending of implementation
    }
  }

  [tabsProperty.getDefault](): BottomNavigationTab[] {
    return null;
  }

  [tabsProperty.setNative](value: BottomNavigationTab[]) {
    this.createTabs(value);
  }

  [titleVisibilityProperty.getDefault](): TitleVisibility {
    return 'selected';
  }

  [titleVisibilityProperty.setNative](value: TitleVisibility) {
    // TODO: Pending of implementation
  }

  [activeColorProperty.setNative](activeColor: string) {
    // TODO: Pending of implementation
  }

  [activeColorCssProperty.setNative](activeColor: Color) {
    // TODO: Pending of implementation
  }

  [inactiveColorProperty.setNative](inactiveColor: string) {
    // TODO: Pending of implementation
  }

  [inactiveColorCssProperty.setNative](inactiveColor: Color) {
    // TODO: Pending of implementation
  }

  [backgroundColorProperty.setNative](backgroundColor: string) {
    // TODO: Pending of implementation
  }

  [backgroundColorCssProperty.setNative](backgroundColor: Color) {
    // TODO: Pending of implementation
  }

  protected selectTabNative(index: number): void {
    // TODO: Pending of implementation
  }

}

export class BottomNavigationTab extends BottomNavigationTabBase {
  constructor(title: string, icon: string, selectable?: boolean, parent?: WeakRef<BottomNavigationBase>) {
    super(title, icon, selectable, parent);
  }
}
