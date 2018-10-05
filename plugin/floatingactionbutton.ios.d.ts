import { FloatingActionButtonBase } from './floatingactionbutton-common';
export declare class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: MDCFloatingButton;
    _setNativeImage(nativeImage: UIImage): void;
    createNativeView(): MDCFloatingButton;
}
