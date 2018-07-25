import * as common from './textfield.common';
declare module 'tns-core-modules/ui/text-field/text-field' {
    interface TextField {
        _updateAttributedPlaceholder(): any;
    }
}
export declare class TextField extends common.TextField {
    private _controller;
    _ios: MDCTextField;
    private _delegate;
    createNativeView(): MDCTextField;
    dismissSoftInput(): void;
    readonly ios: MDCTextField;
    onLoaded(): void;
    onUnloaded(): void;
    blur(): void;
}
