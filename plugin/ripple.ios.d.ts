import { RippleBase } from './ripple-common';
export declare class Ripple extends RippleBase {
    getRippleColor(color: string): any;
    inkTouchController: MDCInkTouchController;
    readonly ios: MDCInkView;
    createNativeView(): UIButton;
}
