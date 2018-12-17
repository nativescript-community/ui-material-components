import { ButtonBase } from './button-common';
import { Color } from 'tns-core-modules/ui/page/page';
export declare class Button extends ButtonBase {
    nativeViewProtected: MDCButton;
    _ios: MDCButton;
    applyShapeScheme(): void;
    getRippleColor(color: Color): any;
    createNativeView(): MDCButton;
    shapeScheme: MDCShapeScheme;
    private getShapeScheme();
    private setBottomLeftCornerRadius(value);
    private setBottomRightCornerRadius(value);
    private setTopLeftCornerRadius(value);
    private setTopRightCornerRadius(value);
    _setNativeClipToBounds(): void;
}
