import { FloatingActionButtonBase } from './floatingactionbutton.common';
export declare class FloatingActionButton extends FloatingActionButtonBase {
    nativeView: UIView;
    constructor();
    readonly ios: UIView;
    createNativeView(): UIView;
}
