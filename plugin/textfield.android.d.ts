import * as common from './textfield.common';
declare module 'tns-core-modules/ui/text-field/text-field' {
    interface TextField {
        _configureEditText(editText: any): any;
        _onReturnPress(): any;
        _dirtyTextAccumulator: string;
        _changeFromCode: boolean;
    }
}
export declare class TextField extends common.TextField {
    editText: android.support.design.widget.TextInputEditText;
    layoutView: android.support.design.widget.TextInputLayout;
    nativeViewProtected: android.support.design.widget.TextInputLayout;
    constructor();
    readonly nativeTextViewProtected: globalAndroid.support.design.widget.TextInputEditText;
    createNativeView(): globalAndroid.support.design.widget.TextInputLayout;
    blur(): void;
}
