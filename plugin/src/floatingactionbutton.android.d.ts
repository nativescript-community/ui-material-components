/// <reference path="../references.d.ts" />
import { FloatingActionButtonBase } from './floatingactionbutton-common';
export declare class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: android.support.design.widget.FloatingActionButton;
    readonly android: android.support.design.widget.FloatingActionButton;
    createNativeView(): android.support.design.widget.FloatingActionButton;
    show(): void;
    hide(): void;
    size: string;
}
