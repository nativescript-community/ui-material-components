import { AppBarBase } from './appbar-common';
declare module 'tns-core-modules/ui/action-bar/action-bar' {
    interface ActionBar {
        _setupUI(context: android.content.Context, atIndex?: number, parentIsLoaded?: boolean): any;
    }
}
export declare class AppBar extends AppBarBase {
    _appBarController: MDCAppBarViewController;
    addedToParent: boolean;
    createNativeView(): any;
    readonly nativeViewProtected: MDCNavigationBar;
    readonly ios: MDCNavigationBar;
    readonly _getActualSize: {
        width: number;
        height: number;
    };
    private _addController();
    onLoaded(): void;
}
