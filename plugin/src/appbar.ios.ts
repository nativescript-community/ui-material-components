import { AppBarBase } from './appbar-common';
import { ActionBar } from 'tns-core-modules/ui/action-bar/action-bar';
import { Color } from 'tns-core-modules/color/color';
import { layout } from 'tns-core-modules/utils/utils';

declare module 'tns-core-modules/ui/action-bar/action-bar' {
    interface ActionBar {
        _setupUI(context: android.content.Context, atIndex?: number, parentIsLoaded?: boolean);
    }
}

export class AppBar extends AppBarBase {
    appBar: MDCAppBar;
    addedToParent = false;
    public createNativeView() {
        const _appBar = this.appBar = MDCAppBar.new();
        _appBar.headerViewController.headerView.minMaxHeightIncludesSafeArea = false;
        _appBar.navigationBar.inkColor = new Color('red').ios;
        _appBar.navigationBar.tintColor  = new Color('blue').ios;
        _appBar.headerViewController.headerView.backgroundColor = new Color('yellow').ios;
        _appBar.navigationBar.sizeToFit();
        console.log('createNativeView AppBar');
        this._addController(this.appBar);
        return null;
    }
    // setupUI = false;
    // public _setupUI(context: android.content.Context, atIndex?: number, parentIsLoaded?: boolean): void {
    //     this.setupUI = true;
    //     super._setupUI(context, atIndex, parentIsLoaded);
    //     this.setupUI = false;
    // }
    get nativeViewProtected() {
        return this.appBar ? this.appBar.navigationBar : null;
    }
    get ios() {
        return this.appBar ? this.appBar.navigationBar : null;
    }

    public get _getActualSize(): { width: number, height: number } {
        const navBar = this.ios;
        if (!navBar) {
            return { width: 0, height: 0 };
        }

        const size  = navBar.sizeThatFits(this.appBar.headerViewController.view.frame.size);
        const width = layout.toDevicePixels(size.width);
        const height = layout.toDevicePixels(size.height);
        console.log("_getActualSize", width, height);
        return { width, height };
    }

    private _addController(appBar: MDCAppBar) {
        // console.log('_addController', this.addedToParent, this instanceof AppBar, this instanceof ActionBar);
        if (!this.addedToParent) {
            const page = this.page;
            if (page && page.parent) {
                page['customNavigationBar'] = true;
                const viewController = <UIViewController>page.ios;
                if (viewController.navigationController) {
                    viewController.navigationController.navigationBarHidden = true;
                }
                // let currentControllers = viewController.childViewControllers;
                // console.log('currentControllers', currentControllers.count);
                // if (currentControllers.count > 0) {
                //     currentControllers[0].removeFromParentViewController();
                // }
                // viewController.childViewControllers[0]
                viewController.addChildViewController(appBar.headerViewController);
                // console.log('addChildViewController done');
                this.addedToParent = true;
            }
        }
    }
    public onLoaded() {
        super.onLoaded();
        console.log('onLoaded');
        this._addController(this.appBar);
        // setTimeout(() => {
            // const viewController = <UIViewController>this.page.ios;
                // if (viewController.navigationController) {
                //     viewController.navigationController.navigationBarHidden = true;
                // }
            this.appBar.addSubviewsToParent();
        // }, 1000);
    }
}
