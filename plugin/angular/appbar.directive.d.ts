import { AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
export declare class AppBarDirective implements AfterViewInit {
    private page;
    _appBarController: MDCAppBarViewController;
    addedToParent: boolean;
    constructor(route: ActivatedRoute, page: Page);
    createNativeView(): any;
    private _addController();
    ngAfterViewInit(): void;
}
