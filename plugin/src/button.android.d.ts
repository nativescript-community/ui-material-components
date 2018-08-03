import { ButtonBase } from './button-common';
import { Length } from 'tns-core-modules/ui/page/page';
export declare class Button extends ButtonBase {
    nativeViewProtected: android.support.design.button.MaterialButton;
    defaultBorderRadius: any;
    _settingDefaultValues: boolean;
    constructor();
    isLoading: boolean;
    readonly android: android.support.design.button.MaterialButton;
    createNativeView(): android.support.design.button.MaterialButton;
    borderRadius: string | Length;
}
