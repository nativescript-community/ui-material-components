import { Page as INSPage, View } from 'tns-core-modules/ui/page/page';
import { ActionBar } from 'tns-core-modules/ui/action-bar/action-bar';
import * as application from 'application';
import { applyMixins } from 'nativescript-material-core';

function getLayout(id: string) {
    const context: android.content.Context = application.android.context;
    return context.getResources().getIdentifier(id, 'layout', context.getPackageName());
}

function getId(id: string) {
    const context: android.content.Context = application.android.context;
    return context.getResources().getIdentifier(id, 'id', context.getPackageName());
}

export class Page extends INSPage {
    appBarLayout: android.support.design.widget.AppBarLayout;
    collapsingToolbarLayout: android.support.design.widget.CollapsingToolbarLayout;
    nativeViewProtected: android.support.design.widget.CoordinatorLayout;
    contentLayout: android.widget.LinearLayout;

    createNativeView() {
        const layout = android.view.LayoutInflater.from(this._context).inflate(getLayout('material_page'), null, false) as android.support.design.widget.CoordinatorLayout;

        this.appBarLayout = layout.findViewById(getId('appbarLayout')) as android.support.design.widget.AppBarLayout;
        this.collapsingToolbarLayout = layout.findViewById(getId('collapsingToolbarLayout')) as android.support.design.widget.CollapsingToolbarLayout;
        this.contentLayout = layout.findViewById(getId('contentLayout')) as android.widget.LinearLayout;
        return layout;
    }
    _addViewToNativeVisualTree(child: View, atIndex?: number): boolean {
        // super._addViewToNativeVisualTree(child);

        if (this.nativeViewProtected && child.nativeViewProtected) {
            if (child instanceof ActionBar) {
                const params = new android.support.design.widget.AppBarLayout.LayoutParams(-1, -1);
                // const  params =  (child.nativeViewProtected as android.support.v7.widget.Toolbar).getLayoutParams() as  (android.support.design.widget.AppBarLayout.LayoutParams);
                params.setScrollFlags(0);
                // params.setScrollFlags(android.support.design.widget.AppBarLayout.LayoutParams.SCROLL_FLAG_SCROLL | android.support.design.widget.AppBarLayout.LayoutParams.SCROLL_FLAG_ENTER_ALWAYS);
                child.nativeViewProtected.setLayoutParams(params);
                this.appBarLayout.addView(child.nativeViewProtected);
            } else {
                this.contentLayout.addView(child.nativeViewProtected);
            }
            if (child instanceof View) {
                (this as any)._updateNativeLayoutParams(child);
            }
            return true;
        }

        return false;
    }
}

export function overridePage() {
    const NSPage = require('tns-core-modules/ui/page/page').Page;
    applyMixins(NSPage, [Page]);
}
export function install() {
    overridePage();
}
