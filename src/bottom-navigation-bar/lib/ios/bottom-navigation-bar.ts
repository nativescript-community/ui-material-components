import { screen } from 'tns-core-modules/platform';
import { ios } from 'tns-core-modules/application';
import {
  layout,
  backgroundColorProperty,
  Color,
} from 'tns-core-modules/ui/core/view';

import {
  BottomNavigationBarBase,
  tabsProperty,
  titleVisibilityProperty,
  activeColorCssProperty,
  inactiveColorCssProperty,
} from '../base/bottom-navigation-bar.base';

import { BottomNavigationTab } from './bottom-navigation-tab';
import { BottomNavigationBarDelegate } from './bottom-navigation-bar.delegate';

export class BottomNavigationBar extends BottomNavigationBarBase {
  nativeView: MDCBottomNavigationBar;

  private _delegate: BottomNavigationBarDelegate;

  get ios(): MDCBottomNavigationBar {
    return this.nativeView;
  }

  createNativeView(): Object {
    const nativeView = MDCBottomNavigationBar.alloc().init();
    this._delegate = BottomNavigationBarDelegate.initWithOwner(
      new WeakRef(this),
    );

    return nativeView;
  }

  initNativeView(): void {
    // Create the tabs before setting the default values for each tab
    this.createTabs();
    // Set default LabelVisibilityMode
    this.nativeView.titleVisibility = this.titleVisibility as any;
    // Set default ActiveColor
    this.nativeView.selectedItemTintColor = this.activeColor.ios;
    // Set default InactiveColor
    this.nativeView.unselectedItemTintColor = this.inactiveColor.ios;
  }

  disposeNativeView() {
    this._delegate = null;
  }

  onLoaded() {
    super.onLoaded();
    this.nativeView.delegate = this._delegate;
  }

  onUnloaded() {
    this.nativeView.delegate = null;
    super.onUnloaded();
  }

  layoutNativeView(
    left: number,
    top: number,
    right: number,
    bottom: number,
  ): void {
    if (!this.nativeViewProtected) {
      return;
    }

    let bottomSafeArea = 0;
    if (ios.window.safeAreaInsets) {
      bottomSafeArea = ios.window.safeAreaInsets.bottom;
    }

    const viewSize: CGSize = CGSizeMake(
      screen.mainScreen.widthDIPs,
      screen.mainScreen.heightDIPs,
    );
    const nativeViewSize: CGSize = this.nativeView.sizeThatFits(viewSize);
    const bottomBarHeight = nativeViewSize.height + bottomSafeArea;

    const nativeView = this.nativeViewProtected;
    const frame = CGRectMake(
      0,
      layout.toDeviceIndependentPixels(top),
      viewSize.width,
      bottomBarHeight,
    );

    (this as any)._setNativeViewFrame(nativeView, frame);
  }

  showBadge(index: number, value?: number): void {
    const tabBarItem = this.nativeView.items[index];

    tabBarItem.badgeValue = value ? `${value}` : '';
  }

  removeBadge(index: number): void {
    const tabBarItem = this.nativeView.items[index];
    tabBarItem.badgeValue = null;
  }

  [tabsProperty.setNative](tabs: BottomNavigationTab[]) {
    this.createTabs(tabs);
  }

  [titleVisibilityProperty.setNative](
    titleVisibility: MDCBottomNavigationBarTitleVisibility,
  ) {
    console.log('serrting adasdasdas');
    this.nativeView.titleVisibility = titleVisibility;
  }

  [activeColorCssProperty.setNative](activeColor: Color) {
    this.nativeView.selectedItemTintColor = activeColor.ios;
  }

  [inactiveColorCssProperty.setNative](inactiveColor: Color) {
    this.nativeView.unselectedItemTintColor = inactiveColor.ios;
  }

  [backgroundColorProperty.setNative](backgroundColor: Color) {
    this.nativeView.barTintColor = backgroundColor.ios;
  }

  protected createTabs(tabs?: BottomNavigationTab[]) {
    if (!this._items) {
      this._items = tabs;
    }
    const bottomNavigationTabs = this._items.map((tab, index) =>
      UITabBarItem.alloc().initWithTitleImageTag(
        tab.title,
        tab.getNativeIcon(),
        index,
      ),
    );

    this.nativeView.items = new NSArray({ array: bottomNavigationTabs });
    this.nativeView.selectedItem = bottomNavigationTabs[this.selectedTabIndex];
  }

  protected selectTabNative(index: number): void {
    this.nativeView.selectedItem = this.nativeView.items[index];
    this.selectedTabIndex = index;
  }
}
