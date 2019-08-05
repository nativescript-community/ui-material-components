import { BottomNavigationBar } from './bottom-navigation-bar';

type MDCBottomNavigationBar = any;

export declare class MDCBottomNavigationBarDelegate {}

export class BottomNavigationBarDelegate extends NSObject {
  static ObjCProtocols = [MDCBottomNavigationBarDelegate];
  private _owner: BottomNavigationBar;

  static initWithOwner(
    owner: WeakRef<BottomNavigationBar>,
  ): BottomNavigationBarDelegate {
    const delegate = <BottomNavigationBarDelegate>(
      BottomNavigationBarDelegate.new()
    );
    delegate._owner = owner.get();

    return delegate;
  }

  bottomNavigationBarDidSelectItem(
    navigationBar: MDCBottomNavigationBar,
    item: UITabBarItem,
  ) {
    if (this._owner.selectedTabIndex === item.tag) {
      this._owner._emitTabReselected(item.tag);
      return;
    }

    this._owner._emitTabSelected(item.tag);
  }

  bottomNavigationBarShouldSelectItem(
    bottomNavigationBar: MDCBottomNavigationBar,
    item: UITabBarItem,
  ): boolean {
    const bottomNavigationTab = this._owner.items[item.tag];
    if (!bottomNavigationTab.isSelectable) {
      this._owner._emitTabPressed(item.tag);
    }

    return bottomNavigationTab.isSelectable;
  }
}
