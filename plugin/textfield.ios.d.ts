import * as common from './textfield.common';
import { Style } from 'tns-core-modules/ui/editable-text-base/editable-text-base';
declare module 'tns-core-modules/ui/text-field/text-field' {
    interface TextField {
        _updateAttributedPlaceholder(): any;
    }
}
export declare class TextField extends common.TextField {
    private _controller;
    _ios: MDCTextField;
    private _delegate;
    readonly style: Style & {
        variant: 'outline' | 'underline' | 'filled';
    };
    variant: string;
    createNativeView(): MDCTextField;
    dismissSoftInput(): void;
    readonly ios: MDCTextField;
    onLoaded(): void;
    onUnloaded(): void;
    blur(): void;
}
