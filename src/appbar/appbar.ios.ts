import { AppBarBase } from './appbar-common';
import { layout } from 'tns-core-modules/utils/utils';
import { themer } from 'nativescript-material-core/core';

declare module 'tns-core-modules/ui/action-bar/action-bar' {
    interface ActionBar {
        _setupUI(context: android.content.Context, atIndex?: number, parentIsLoaded?: boolean);
    }
}

export class AppBar extends AppBarBase {
    // appBar: MDCAppBar;
    _appBarController: MDCAppBarViewController;
    addedToParent = false;
    public createNativeView() {
        this._appBarController = MDCAppBarViewController.alloc().init();
        // const _appBar = this.appBar = MDCAppBar.new();
        // _appBar.headerViewController.headerView.minMaxHeightIncludesSafeArea = false;
        // _appBar.navigationBar.inkColor = new Color('red').ios;
        // _appBar.navigationBar.tintColor  = new Color('blue').ios;
        // _appBar.headerViewController.headerView.backgroundColor = new Color('yellow').ios;
        // _appBar.navigationBar.sizeToFit();
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCAppBarColorThemer.applyColorSchemeToAppBarViewController(colorScheme, this._appBarController);
        }
        this._addController();
        return null;
    }
    // setupUI = false;
    // public _setupUI(context: android.content.Context, atIndex?: number, parentIsLoaded?: boolean): void {
    //     this.setupUI = true;
    //     super._setupUI(context, atIndex, parentIsLoaded);
    //     this.setupUI = false;
    // }
    get nativeViewProtected() {
        return this._appBarController ? this._appBarController.navigationBar : null;
    }
    get ios() {
        return this.nativeViewProtected;
    }

    public get _getActualSize(): { width: number; height: number } {
        const navBar = this.ios;
        if (!navBar) {
            return { width: 0, height: 0 };
        }

        const size = navBar.sizeThatFits(this._appBarController.navigationBar.frame.size);
        const width = layout.toDevicePixels(size.width);
        const height = layout.toDevicePixels(size.height);
        return { width, height };
    }

    private _addController() {
        if (this._appBarController && !this.addedToParent) {
            const page = this.page;
            if (page && page.parent) {
                let showNavigationBar = true;
                Object.defineProperty(page.frame.ios, 'showNavigationBar', {
                    get() {
                        return showNavigationBar;
                    },
                    set(value) {
                        showNavigationBar = value;
                    }
                });
                const viewController = page.ios as UIViewController;
                if (viewController.navigationController) {
                    viewController.navigationController.navigationBarHidden = true;
                }

                this._appBarController.topLayoutGuideViewController = viewController;
                this._appBarController.inferPreferredStatusBarStyle = true;
                this._appBarController.inferTopSafeAreaInsetFromViewController = true;
                this._appBarController.topLayoutGuideAdjustmentEnabled = true;
                viewController.addChildViewController(this._appBarController);
                this.addedToParent = true;
            }
        }
    }
    public onLoaded() {
        super.onLoaded();
        this._addController();
        const viewController = this.page.ios as UIViewController;
        viewController.view.addSubview(this._appBarController.view);
        this._appBarController.didMoveToParentViewController(viewController);
    }
}
