import { Page as INSPage, View } from '@nativescript/core/ui/page';
import { ActionBar } from '@nativescript/core/ui/action-bar';
import * as application from '@nativescript/core/application';
import { applyMixins } from 'nativescript-material-core/core';

function getLayout(id: string) {
    const context: android.content.Context = application.android.context;
    return context.getResources().getIdentifier(id, 'layout', context.getPackageName());
}

function getId(id: string) {
    const context: android.content.Context = application.android.context;
    return context.getResources().getIdentifier(id, 'id', context.getPackageName());
}

export class Page extends INSPage {
    appBarLayout: com.google.android.material.appbar.AppBarLayout;
    collapsingToolbarLayout: com.google.android.material.appbar.CollapsingToolbarLayout;
    nativeViewProtected: androidx.coordinatorlayout.widget.CoordinatorLayout;
    contentLayout: android.widget.LinearLayout;

    createNativeView() {
        const layout = android.view.LayoutInflater.from(this._context).inflate(getLayout('material_page'), null, false) as androidx.coordinatorlayout.widget.CoordinatorLayout;

        this.appBarLayout = layout.findViewById(getId('appbarLayout')) as com.google.android.material.appbar.AppBarLayout;
        this.collapsingToolbarLayout = layout.findViewById(getId('collapsingToolbarLayout')) as com.google.android.material.appbar.CollapsingToolbarLayout;
        this.contentLayout = layout.findViewById(getId('contentLayout')) as android.widget.LinearLayout;
        return layout;
    }
    _addViewToNativeVisualTree(child: View, atIndex?: number): boolean {
        // super._addViewToNativeVisualTree(child);

        if (this.nativeViewProtected && child.nativeViewProtected) {
            if (child instanceof ActionBar) {
                const params = new com.google.android.material.appbar.AppBarLayout.LayoutParams(-1, -1);
                // const  params =  (child.nativeViewProtected as androidx.appcompat.widget.Toolbar).getLayoutParams() as  (com.google.android.material.appbar.AppBarLayout.LayoutParams);
                params.setScrollFlags(0);
                // params.setScrollFlags(com.google.android.material.appbar.AppBarLayout.LayoutParams.SCROLL_FLAG_SCROLL | com.google.android.material.appbar.AppBarLayout.LayoutParams.SCROLL_FLAG_ENTER_ALWAYS);
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
let mixinInstalled = false;
export function overridePage() {
    const NSPage = require('@nativescript/core/ui/page/page').Page;
    applyMixins(NSPage, [Page]);
}
export function install() {
    if (!mixinInstalled) {
        mixinInstalled = true;
        overridePage();
    }
}
