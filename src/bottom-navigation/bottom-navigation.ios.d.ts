import { BottomNavigationBase, BottomNavigationTabBase, TitleVisibilityOptions } from './bottom-navigation.common';
declare const MDCBottomNavigationBar: any;
declare type MDCBottomNavigationBar = any;
export declare class MDCBottomNavigationBarDelegate {
}
export declare class BottomNavigationDelegate extends NSObject {
    static ObjCProtocols: (typeof MDCBottomNavigationBarDelegate)[];
    private _owner;
    static initWithOwner(owner: WeakRef<BottomNavigation>): BottomNavigationDelegate;
    bottomNavigationBarDidSelectItem(navigationBar: MDCBottomNavigationBar, item: UITabBarItem): void;
    bottomNavigationBarShouldSelectItem(bottomNavigationBar: MDCBottomNavigationBar, item: UITabBarItem): boolean;
}
export declare class BottomNavigation extends BottomNavigationBase {
    protected titleVisibilityOptions: TitleVisibilityOptions;
    private _delegate;
    readonly ios: any;
    createNativeView(): Object;
    initNativeView(): void;
    disposeNativeView(): void;
    onLoaded(): void;
    layoutNativeView(left: number, top: number, right: number, bottom: number): void;
    createTabs(tabs: BottomNavigationTab[]): void;
    protected selectTabNative(index: number): void;
}
export declare class BottomNavigationTab extends BottomNavigationTabBase {
    constructor(title: string, icon: string, selectable?: boolean, parent?: WeakRef<BottomNavigationBase>);
}
export {};
