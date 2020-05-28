import { TextFieldBase } from './textfield.common';
import { backgroundInternalProperty, placeholderColorProperty, keyboardTypeProperty, textProperty } from '@nativescript/core/ui/editable-text-base';
import {
    buttonColorProperty,
    digitsProperty,
    errorColorProperty,
    errorProperty,
    floatingColorProperty,
    floatingInactiveColorProperty,
    floatingProperty,
    helperProperty,
    maxLengthProperty,
    strokeColorProperty,
    strokeInactiveColorProperty,
} from 'nativescript-material-core/textbase/cssproperties';
import { themer } from 'nativescript-material-core/core';
import { Color } from '@nativescript/core/color';
import { Style } from '@nativescript/core/ui/styling/style';
import { Background } from '@nativescript/core/ui/styling/background';
import { screen } from '@nativescript/core/platform/platform';

// it is exported but not in the typings
const _updateCharactersInRangeReplacementString = require('@nativescript/core/ui/editable-text-base')._updateCharactersInRangeReplacementString;

let colorScheme: MDCSemanticColorScheme;
function getColorScheme() {
    if (!colorScheme) {
        colorScheme = MDCSemanticColorScheme.new();
    }
    return colorScheme;
}

declare module '@nativescript/core/ui/text-field/text-field' {
    interface TextField {
        _updateAttributedPlaceholder();
    }
}

class TextInputControllerUnderlineImpl extends MDCTextInputControllerUnderline {
    private _owner: WeakRef<TextField>;
    public static initWithOwner(owner: WeakRef<TextField>): TextInputControllerUnderlineImpl {
        const handler = <TextInputControllerUnderlineImpl>TextInputControllerUnderlineImpl.new();
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

class TextInputControllerImpl extends MDCTextInputControllerBase {
    private _owner: WeakRef<TextField>;
    public static initWithOwner(owner: WeakRef<TextField>): TextInputControllerImpl {
        const handler = <TextInputControllerImpl>TextInputControllerImpl.new();
        handler.underlineHeightActive = 0;
        handler.underlineHeightNormal = 0;
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

class TextInputControllerOutlinedImpl extends MDCTextInputControllerOutlined {
    private _owner: WeakRef<TextField>;
    public static initWithOwner(owner: WeakRef<TextField>): TextInputControllerOutlinedImpl {
        const handler = <TextInputControllerOutlinedImpl>TextInputControllerOutlinedImpl.new();
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

class TextInputControllerFilledImpl extends MDCTextInputControllerFilled {
    private _owner: WeakRef<TextField>;
    public static initWithOwner(owner: WeakRef<TextField>): TextInputControllerFilledImpl {
        const handler = <TextInputControllerFilledImpl>TextInputControllerFilledImpl.new();
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

class UITextFieldDelegateImpl extends NSObject implements UITextFieldDelegate {
    public static ObjCProtocols = [UITextFieldDelegate];

    private _owner: WeakRef<TextField>;
    private firstEdit: boolean;

    public static initWithOwner(owner: WeakRef<TextField>): UITextFieldDelegateImpl {
        const delegate = <UITextFieldDelegateImpl>UITextFieldDelegateImpl.new();
        delegate._owner = owner;

        return delegate;
    }

    public textFieldShouldBeginEditing(textField: UITextField): boolean {
        this.firstEdit = true;
        const owner = this._owner.get();
        if (owner) {
            return owner.editable;
        }

        return true;
    }

    public textFieldDidBeginEditing(textField: UITextField): void {
        const owner = this._owner.get();
        if (owner) {
            owner.notify({ eventName: TextField.focusEvent, object: owner });
        }
    }

    public textFieldDidEndEditing(textField: UITextField) {
        const owner = this._owner.get();
        if (owner) {
            if (owner.updateTextTrigger === 'focusLost') {
                textProperty.nativeValueChange(owner, textField.text);
            }

            owner.dismissSoftInput();
        }
    }

    public textFieldShouldClear(textField: UITextField) {
        this.firstEdit = false;
        const owner = this._owner.get();
        if (owner) {
            textProperty.nativeValueChange(owner, '');
        }

        return true;
    }

    public textFieldShouldReturn(textField: UITextField): boolean {
        // Called when the user presses the return button.
        const owner = this._owner.get();
        if (owner) {
            if (owner.closeOnReturn) {
                owner.dismissSoftInput();
            }
            owner.notify({ eventName: TextField.returnPressEvent, object: owner });
        }

        return true;
    }

    public textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, replacementString: string): boolean {
        const owner = this._owner.get();
        if (owner) {
            // ignore if not in our alllowed digits
            if (owner.nsdigits && replacementString.length > 0 && NSString.stringWithString(replacementString).rangeOfCharacterFromSet(owner.nsdigits).location === NSNotFound) {
                return false;
            }
            if (owner.secureWithoutAutofill && !textField.secureTextEntry) {
                /**
                 * Helps avoid iOS 12+ autofill strong password suggestion prompt
                 * Discussed in several circles but for example:
                 * https://github.com/expo/expo/issues/2571#issuecomment-473347380
                 */
                textField.secureTextEntry = true;
            }
            const delta = replacementString.length - range.length;
            if (delta > 0) {
                if (textField.text.length + delta > owner.maxLength) {
                    return false;
                }
            }

            if (owner.updateTextTrigger === 'textChanged') {
                if (textField.secureTextEntry && this.firstEdit) {
                    textProperty.nativeValueChange(owner, replacementString);
                } else {
                    if (range.location <= textField.text.length) {
                        const newText = NSString.stringWithString(textField.text).stringByReplacingCharactersInRangeWithString(range, replacementString);
                        textProperty.nativeValueChange(owner, newText);
                    }
                }
            }

            if (owner.formattedText) {
                _updateCharactersInRangeReplacementString(owner.formattedText, range.location, range.length, replacementString);
            }
        }

        this.firstEdit = false;

        return true;
    }
}

export class TextField extends TextFieldBase {
    nativeViewProtected: MDCTextField;
    nativeTextViewProtected: MDCTextField;
    private _controller: MDCTextInputControllerBase;
    public readonly style: Style & { variant: 'outline' | 'underline' | 'filled' };
    public nsdigits?: NSCharacterSet;
    public clearFocus() {
        this.dismissSoftInput();
    }

    public requestFocus() {
        this.focus();
    }

    _getTextInsetsForBounds(insets: UIEdgeInsets): UIEdgeInsets {
        const scale = screen.mainScreen.scale;

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

    // variant = 'underline';
    public createNativeView() {
        // const view = MDCTextFieldImpl.initWithOwner(new WeakRef(this));
        const view = MDCTextField.new();

        // disable it for now
        view.clearButtonMode = UITextFieldViewMode.Never;
        const colorScheme = themer.getAppColorScheme();
        const owner = new WeakRef(this);
        if (this.style.variant === 'filled') {
            this._controller = TextInputControllerFilledImpl.initWithOwner(owner);
        } else if (this.style.variant === 'outline') {
            this._controller = TextInputControllerOutlinedImpl.initWithOwner(owner);
        } else if (this.style.variant === 'underline') {
            this._controller = TextInputControllerUnderlineImpl.initWithOwner(owner);
        } else {
            this._controller = TextInputControllerImpl.initWithOwner(owner);
        }
        this._controller.textInput = view;
        view.textInsetsMode = MDCTextInputTextInsetsMode.IfContent;

        if (colorScheme) {
            MDCTextFieldColorThemer.applySemanticColorSchemeToTextInput(colorScheme, view);
            MDCTextFieldColorThemer.applySemanticColorSchemeToTextInputController(colorScheme, this._controller);
        }
        return view;
    }
    private _delegate: UITextFieldDelegateImpl;

    initNativeView() {
        super.initNativeView();
        // it will get picked in onLoaded
        this._delegate = UITextFieldDelegateImpl.initWithOwner(new WeakRef(this));
    }

    // TODO: check why i was checking for isFirstResponder
    // with it the blur event is not fired anymore

    // public dismissSoftInput() {
    //     if (this.nativeViewProtected.isFirstResponder) {
    //         super.dismissSoftInput();
    //     }
    // }

    blur() {
        this.dismissSoftInput();
    }

    public setSelection(start: number, stop?: number) {
        const view = this.nativeTextViewProtected;
        if (stop !== undefined) {
            const begin = view.beginningOfDocument;
            view.selectedTextRange = view.textRangeFromPositionToPosition(view.positionFromPositionOffset(begin, start), view.positionFromPositionOffset(begin, stop));
        } else {
            const begin = view.beginningOfDocument;
            const pos = view.positionFromPositionOffset(begin, start);
            view.selectedTextRange = view.textRangeFromPositionToPosition(pos, pos);
        }
    }

    [floatingColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.floatingPlaceholderActiveColor = color;
        this._updateAttributedPlaceholder();
    }
    [floatingInactiveColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.inlinePlaceholderColor = color;
        this._controller.floatingPlaceholderNormalColor = color;
        this._updateAttributedPlaceholder();
    }
    [placeholderColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.inlinePlaceholderColor = color;
        if (!this.floatingColor) {
            this._controller.floatingPlaceholderActiveColor = color;
        }
        this._updateAttributedPlaceholder();
    }
    [errorColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.errorColor = color;
    }
    [strokeColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.activeColor = color;
    }
    [strokeInactiveColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.normalColor = color;
    }
    [buttonColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.textInputClearButtonTintColor = color;
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
    [digitsProperty.setNative](value: string) {
        if (value && value.length > 0) {
            this.nsdigits = NSCharacterSet.characterSetWithCharactersInString(value);
        } else {
            this.nsdigits = null;
        }
    }
    [backgroundInternalProperty.setNative](value: Background) {
        switch (this.variant) {
            case 'none':
                super[backgroundInternalProperty.setNative](value);
                break;
            case 'outline':
            case 'filled':
            case 'underline': {
                if (value.color) {
                    this._controller.borderFillColor = value.color.ios;
                }
                if (value.borderTopColor) {
                    this._controller.normalColor = value.borderTopColor.ios;
                }
                break;
            }
        }
    }
}
