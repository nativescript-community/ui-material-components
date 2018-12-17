import { ButtonBase } from './button-common';
import { Color } from 'tns-core-modules/ui/page/page';
export declare class Button extends ButtonBase {
    nativeViewProtected: android.support.design.button.MaterialButton;
    isLoading: boolean;
    readonly android: android.support.design.button.MaterialButton;
    getRippleColor(color: Color): number;
    createNativeView(): globalAndroid.support.design.button.MaterialButton;
    setCornerRadius(value: any): void;
}
