import { FloatingActionButtonBase } from './floatingactionbutton-common';
export declare class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: android.support.design.widget.FloatingActionButton;
    constructor();
    readonly android: android.support.design.widget.FloatingActionButton;
    createNativeView(): android.support.design.widget.FloatingActionButton;
    initNativeView(): void;
    disposeNativeView(): void;
    show(): void;
    hide(): void;
}
