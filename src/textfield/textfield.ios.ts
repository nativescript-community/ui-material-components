import { themer } from '@nativescript-community/ui-material-core';
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
} from '@nativescript-community/ui-material-core/textbase/cssproperties';
import { Background, Color, Property, Screen, Style, backgroundInternalProperty, isAndroid, placeholderColorProperty } from '@nativescript/core';
import { TextFieldBase } from './textfield.common';

const textProperty = new Property<TextField, string>({
    name: 'text',
    defaultValue: '',
    affectsLayout: isAndroid,
});

let colorScheme: MDCSemanticColorScheme;
function getColorScheme() {
    if (!colorScheme) {
        colorScheme = MDCSemanticColorScheme.new();
    }
    return colorScheme;
}

@NativeClass
class TextInputControllerUnderlineImpl extends MDCTextInputControllerUnderline {
    _owner: WeakRef<TextField>;
    public static initWithOwner(owner: TextField) {
        const delegate = TextInputControllerUnderlineImpl.new() as TextInputControllerUnderlineImpl;
        delegate._owner = new WeakRef(owner);

        return delegate;
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

@NativeClass
class TextInputControllerImpl extends MDCTextInputControllerBase {
    _owner: WeakRef<TextField>;
    public static initWithOwner(owner: TextField) {
        const delegate = TextInputControllerImpl.new() as TextInputControllerImpl;
        delegate._owner = new WeakRef(owner);

        return delegate;
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

@NativeClass
class TextInputControllerOutlinedImpl extends MDCTextInputControllerOutlined {
    _owner: WeakRef<TextField>;
    public static initWithOwner(owner: TextField) {
        const delegate = TextInputControllerOutlinedImpl.new() as TextInputControllerOutlinedImpl;
        delegate._owner = new WeakRef(owner);

        return delegate;
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

@NativeClass
class TextInputControllerFilledImpl extends MDCTextInputControllerFilled {
    _owner: WeakRef<TextField>;
    public static initWithOwner(owner: TextField) {
        const delegate = TextInputControllerFilledImpl.new() as TextInputControllerFilledImpl;
        delegate._owner = new WeakRef(owner);

        return delegate;
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

declare module '@nativescript/core/ui/text-field' {
    interface TextField {
        textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, replacementString: string): boolean;
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

    textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, replacementString: string): boolean {
        // ignore if not in our alllowed digits
        if (this.nsdigits && replacementString.length > 0 && NSString.stringWithString(replacementString).rangeOfCharacterFromSet(this.nsdigits).location === NSNotFound) {
            return false;
        }
        return super.textFieldShouldChangeCharactersInRangeReplacementString(textField, range, replacementString);
    }

    _getTextInsetsForBounds(insets: UIEdgeInsets): UIEdgeInsets {
        const scale = Screen.mainScreen.scale;

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
        if (this.style.variant === 'filled') {
            this._controller = TextInputControllerFilledImpl.initWithOwner(this);
        } else if (this.style.variant === 'outline') {
            this._controller = TextInputControllerOutlinedImpl.initWithOwner(this);
        } else if (this.style.variant === 'underline') {
            this._controller = TextInputControllerUnderlineImpl.initWithOwner(this);
        } else {
            this._controller = TextInputControllerImpl.initWithOwner(this);
            this._controller.underlineHeightActive = 0;
            this._controller.underlineHeightNormal = 0;
        }
        this._controller.textInput = view;
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
textProperty.register(TextField);
