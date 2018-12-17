import { Page as INSPage, View } from 'tns-core-modules/ui/page/page';
export declare class Page extends INSPage {
    appBarLayout: android.support.design.widget.AppBarLayout;
    collapsingToolbarLayout: android.support.design.widget.CollapsingToolbarLayout;
    nativeViewProtected: android.support.design.widget.CoordinatorLayout;
    contentLayout: android.widget.LinearLayout;
    createNativeView(): globalAndroid.support.design.widget.CoordinatorLayout;
    _addViewToNativeVisualTree(child: View, atIndex?: number): boolean;
}
