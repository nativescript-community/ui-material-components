import { ButtonBase } from './button-common';
import { Length } from 'tns-core-modules/ui/core/view';
export declare class Button extends ButtonBase {
    defaultBorderRadius: any;
    constructor();
    nativeViewProtected: MDCButton;
    getRippleColor(color: string): any;
    createNativeView(): MDCButton;
    borderRadius: string | Length;
}
