import { FloatingActionButtonBase } from './floatingactionbutton-common';
export declare class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: android.support.design.widget.FloatingActionButton;
    readonly android: android.support.design.widget.FloatingActionButton;
    createNativeView(): globalAndroid.support.design.widget.FloatingActionButton;
    show(): void;
    hide(): void;
    size: string;
}
