import { Directive, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { ios as iosApp, addCss } from 'tns-core-modules/application';
import { themer } from '../src/material';

@Directive({
    selector: '[materialAppBar]'
})
export class AppBarDirective implements AfterViewInit {
    _appBarController: MDCAppBarViewController;
    addedToParent = false;
    constructor(route: ActivatedRoute, private page: Page) {
        // page.frame.ios.navBarVisibility = 'never';
        console.log('AppBarDirective');
        this.createNativeView();
    }

    public createNativeView() {
        this._appBarController = MDCAppBarViewController.alloc().init();
        // const _appBar = this.appBar = MDCAppBar.new();
        // _appBar.headerViewController.headerView.minMaxHeightIncludesSafeArea = false;
        // _appBar.navigationBar.inkColor = new Color('red').ios;
        // _appBar.navigationBar.tintColor  = new Color('blue').ios;
        // _appBar.headerViewController.headerView.backgroundColor = new Color('yellow').ios;
        // _appBar.navigationBar.sizeToFit();
        let colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCAppBarColorThemer.applyColorSchemeToAppBarViewController(colorScheme, this._appBarController);
        }
        console.log('createNativeView AppBar');
        this._addController();
        return null;
    }

    private _addController() {
        // console.log('_addController', this.addedToParent, this instanceof AppBar, this instanceof ActionBar);
        if (this._appBarController && !this.addedToParent) {
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
                viewController.addChildViewController(this._appBarController);
                // console.log('addChildViewController done');
                this.addedToParent = true;
            }
        }
    }
    // public onLoaded() {
    //     super.onLoaded();
    //     console.log('onLoaded');

    //     // }, 1000);
    // }

    ngAfterViewInit() {
        console.log('AppBarDirective ngAfterViewInit');
        this._addController();
        // setTimeout(() => {
        const viewController = <UIViewController>this.page.ios;
        if (viewController.navigationController) {
            viewController.navigationController.setNavigationBarHiddenAnimated(true, false);
        }
        viewController.view.addSubview(this._appBarController.view);
        this._appBarController.didMoveToParentViewController(viewController);
        // this.appBar.addSubviewsToParent();
    }
}
