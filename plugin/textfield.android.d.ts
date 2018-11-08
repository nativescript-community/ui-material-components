import * as common from './textfield.common';
export declare class TextField extends common.TextField {
    editText: android.support.design.widget.TextInputEditText;
    layoutView: android.support.design.widget.TextInputLayout;
    nativeViewProtected: android.support.design.widget.TextInputLayout;
    constructor();
    readonly nativeTextViewProtected: globalAndroid.support.design.widget.TextInputEditText;
    createNativeView(): globalAndroid.support.design.widget.TextInputLayout;
    focus(): boolean;
    blur(): void;
}
