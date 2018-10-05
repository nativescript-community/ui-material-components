import { CardViewBase } from "./cardview-common";
import { Length, Color } from "tns-core-modules/ui/page/page";
export declare class CardView extends CardViewBase {
    nativeViewProtected: android.support.design.card.MaterialCardView;
    readonly android: android.support.design.card.MaterialCardView;
    private getSelectedItemDrawable(context);
    private createRoundRectShape();
    private createForegroundShapeDrawable();
    private createCompatRippleDrawable(rippleColor);
    createNativeView(): globalAndroid.support.design.card.MaterialCardView;
    getRippleColor(color: string): number;
    setRippleDrawable(view: any): void;
    borderRadius: string | Length;
    borderWidth: string | Length;
    borderColor: Color;
}
