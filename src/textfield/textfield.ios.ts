import { TextFieldBase } from './textfield.common';
import { backgroundInternalProperty, placeholderColorProperty } from 'tns-core-modules/ui/editable-text-base/editable-text-base';
import { errorColorProperty, errorProperty, floatingProperty, helperProperty, highlightColorProperty, maxLengthProperty } from './textfield_cssproperties';
import { themer } from 'nativescript-material-core/core';
import { Color } from 'tns-core-modules/color';
import { Style } from 'tns-core-modules/ui/styling/style';
import { Background } from 'tns-core-modules/ui/styling/background';
import { screen } from 'tns-core-modules/platform/platform';

let colorScheme: MDCSemanticColorScheme;
function getColorScheme() {
    if (!colorScheme) {
        colorScheme = MDCSemanticColorScheme.new();
    }
    return colorScheme;
}

declare module 'tns-core-modules/ui/text-field/text-field' {
    interface TextField {
        _updateAttributedPlaceholder();
    }
}

class MDCTextInputControllerUnderlineImpl extends MDCTextInputControllerUnderline {
    private _owner: WeakRef<TextField>;
    public static initWithOwner(owner: WeakRef<TextField>): MDCTextInputControllerUnderlineImpl {
        const handler = <MDCTextInputControllerUnderlineImpl>MDCTextInputControllerUnderlineImpl.new();
        handler._owner = owner;
        return handler;
    }

    textInsets(defaultValue) {
        let result = super.textInsets(defaultValue);
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            result = owner._getTextInsetsForBounds(result);
        }
        return result;
    }
}

class MDCTextInputControllerOutlinedImpl extends MDCTextInputControllerOutlined {
    private _owner: WeakRef<TextField>;
    public static initWithOwner(owner: WeakRef<TextField>): MDCTextInputControllerOutlinedImpl {
        const handler = <MDCTextInputControllerOutlinedImpl>MDCTextInputControllerOutlinedImpl.new();
        handler._owner = owner;
        return handler;
    }
    textInsets(defaultValue) {
        let result = super.textInsets(defaultValue);
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            result = owner._getTextInsetsForBounds(result);
        }
        return result;
    }
}
class MDCTextInputControllerFilledImpl extends MDCTextInputControllerFilled {
    private _owner: WeakRef<TextField>;
    public static initWithOwner(owner: WeakRef<TextField>): MDCTextInputControllerFilledImpl {
        const handler = <MDCTextInputControllerFilledImpl>MDCTextInputControllerFilledImpl.new();
        handler._owner = owner;
        return handler;
    }
    textInsets(defaultValue) {
        let result = super.textInsets(defaultValue);
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            result = owner._getTextInsetsForBounds(result);
        }
        return result;
    }
}

export class TextField extends TextFieldBase {
    nativeViewProtected: MDCTextField;
    private _controller: MDCTextInputControllerBase;
    public readonly style: Style & { variant: 'outline' | 'underline' | 'filled' };

    public clearFocus() {
        this.dismissSoftInput();
    }

    public requestFocus() {
        this.focus();
    }

    _getTextInsetsForBounds(insets: UIEdgeInsets): UIEdgeInsets {
        const scale = 1;

        if (this.variant === 'underline' && this._controller.underlineHeightNormal === 0) {
            // if no underline/custom background, remove all insets like on android
            insets.top = 0;
            insets.bottom = 0;
        }

        insets.left += (this.effectiveBorderLeftWidth + this.effectivePaddingLeft) / scale;
        insets.top += (this.effectiveBorderTopWidth + this.effectivePaddingTop) / scale;
        insets.right += (this.effectivePaddingRight + this.effectiveBorderRightWidth) / scale;
        insets.bottom += (this.effectivePaddingBottom + this.effectiveBorderBottomWidth) / scale;

        return insets;
    }

    variant = 'underline';
    public createNativeView() {
        // const view = MDCTextFieldImpl.initWithOwner(new WeakRef(this));
        const view = MDCTextField.new();
        const colorScheme = themer.getAppColorScheme();
        const owner = new WeakRef(this);
        if (this.style.variant === 'filled') {
            this._controller = MDCTextInputControllerFilled.new();
            this._controller.textInput = view;
        } else if (this.style.variant === 'outline') {
            this._controller = MDCTextInputControllerOutlinedImpl.new();
            this._controller.textInput = view;
        } else {
            this._controller = MDCTextInputControllerUnderlineImpl.initWithOwner(owner);
            this._controller.textInput = view;
        }
        view.textInsetsMode = MDCTextInputTextInsetsMode.IfContent;

        if (colorScheme) {
            MDCTextFieldColorThemer.applySemanticColorSchemeToTextInput(colorScheme, view);
            MDCTextFieldColorThemer.applySemanticColorSchemeToTextInputController(colorScheme, this._controller);
        }
        return view;
    }

    // TODO: check why i was checking for isFirstResponder
    // with it the blur event is not fired anymore

    // public dismissSoftInput() {
    //     if (this.nativeViewProtected.isFirstResponder) {
    //         super.dismissSoftInput();
    //     }
    // }
    get ios(): MDCTextField {
        return this.nativeViewProtected;
    }

    blur() {
        this.dismissSoftInput();
    }

    [placeholderColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.floatingPlaceholderActiveColor = color;
        this._controller.inlinePlaceholderColor = color;
        this._updateAttributedPlaceholder();
    }
    [errorColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.errorColor = color;
    }
    [highlightColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.activeColor = color;
    }
    [helperProperty.setNative](value: string) {
        this._controller.helperText = value;
    }
    [maxLengthProperty.setNative](value: number) {
        this._controller.characterCountMax = value;
    }
    [floatingProperty.setNative](value: boolean) {
        this._controller.floatingEnabled = value;
    }
    [errorProperty.setNative](value: string) {
        this._controller.setErrorTextErrorAccessibilityValue(value, value);
    }

    [backgroundInternalProperty.setNative](value: Background) {
        super[backgroundInternalProperty.setNative](value);
        if (this.nativeViewProtected) {
            if (value.color) {
                // hide the underline like on android
                this._controller.underlineHeightActive = 0;
                this._controller.underlineHeightNormal = 0;
            } else {
                this._controller.underlineHeightActive = MDCTextInputControllerBase.underlineHeightActiveDefault;
                this._controller.underlineHeightNormal = MDCTextInputControllerBase.underlineHeightNormalDefault;
            }
        }
    }
}
