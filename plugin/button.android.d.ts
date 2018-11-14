import { ButtonBase } from './button-common';
export declare class Button extends ButtonBase {
    nativeViewProtected: android.support.design.button.MaterialButton;
    isLoading: boolean;
    readonly android: android.support.design.button.MaterialButton;
    createNativeView(): globalAndroid.support.design.button.MaterialButton;
    setCornerRadius(value: any): void;
}
