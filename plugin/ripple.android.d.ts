import { RippleBase } from './ripple-common';
import { Color } from 'tns-core-modules/ui/page/page';
export declare class Ripple extends RippleBase {
    nativeViewProtected: android.view.View;
    ripple: android.graphics.drawable.RippleDrawable;
    createNativeView(): globalAndroid.view.View;
    private getSelectedItemDrawable(context);
    private createRoundRectShape();
    private createForegroundShapeDrawable();
    private createCompatRippleDrawable(rippleColor);
    getRippleColor(color: string | Color): number;
    setRippleDrawable(view: android.view.View): void;
}
