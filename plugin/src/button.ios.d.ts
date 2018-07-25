import { ButtonBase } from './button-common';
import { Length } from 'tns-core-modules/ui/core/view';
import { Color } from 'tns-core-modules/ui/page/page';
export declare class Button extends ButtonBase {
    nativeViewProtected: MDCButton;
    _backgroundColor: Color;
    getRippleColor(color: string): any;
    createNativeView(): MDCButton;
    borderRadius: string | Length;
    backgroundColor: Color | string;
}
