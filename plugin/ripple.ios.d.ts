import { RippleBase } from './ripple-common';
import { Color } from 'tns-core-modules/ui/page/page';
export declare class Ripple extends RippleBase {
    getRippleColor(color: Color): any;
    inkTouchController: MDCInkTouchController;
    readonly ios: MDCInkView;
    createNativeView(): UIView;
}
