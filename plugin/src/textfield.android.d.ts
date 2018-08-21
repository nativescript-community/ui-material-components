import * as common from './textfield.common';
import { EditableTextBase } from 'tns-core-modules/ui/editable-text-base/editable-text-base';
export declare const FrameLayout: typeof globalAndroid.widget.FrameLayout;
export declare const LinearLayout: typeof globalAndroid.widget.LinearLayout;
declare module 'tns-core-modules/ui/text-field/text-field' {
    interface TextField {
        _configureEditText(editText: any): any;
        _onReturnPress(): any;
        _dirtyTextAccumulator: string;
        _changeFromCode: boolean;
        _setupUI(context: android.content.Context, atIndex?: number, parentIsLoaded?: boolean): any;
        _redrawNativeBackground(value: android.graphics.drawable.Drawable | Background): any;
    }
}
import { Background } from 'tns-core-modules/ui/styling/background';
export declare let dismissKeyboardTimeoutId: any;
export declare let dismissKeyboardOwner: WeakRef<EditableTextBase>;
export declare class TextField extends common.TextField {
    editText: android.support.design.widget.TextInputEditText;
    layoutView: android.support.design.widget.TextInputLayout;
    constructor();
    onResumeNativeUpdates(): void;
    readonly nativeViewProtected: globalAndroid.support.design.widget.TextInputLayout | globalAndroid.support.design.widget.TextInputEditText;
    readonly android: android.support.design.widget.TextInputLayout;
    layoutNativeView(left: number, top: number, right: number, bottom: number): void;
    createNativeView(): globalAndroid.support.design.widget.TextInputLayout;
    viewInit: boolean;
    _settingLayout: boolean;
    initNativeView(): void;
    _setupUI(context: android.content.Context, atIndex?: number, parentIsLoaded?: boolean): void;
    _redrawNativeBackground(value: android.graphics.drawable.Drawable | Background): void;
    blur(): void;
}
