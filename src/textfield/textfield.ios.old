import { VerticalTextAlignment, verticalTextAlignmentProperty } from '@nativescript-community/text';
import { themer } from '@nativescript-community/ui-material-core';
import {
    buttonColorProperty,
    counterMaxLengthProperty,
    digitsProperty,
    errorColorProperty,
    errorProperty,
    floatingColorProperty,
    floatingInactiveColorProperty,
    floatingProperty,
    helperColorProperty,
    helperProperty,
    strokeColorProperty,
    strokeDisabledColorProperty,
    strokeInactiveColorProperty
} from '@nativescript-community/ui-material-core/textbase/cssproperties';
import {
    Background,
    Color,
    Font,
    Style,
    Utils,
    _updateCharactersInRangeReplacementString,
    backgroundInternalProperty,
    editableProperty,
    fontInternalProperty,
    paddingBottomProperty,
    paddingLeftProperty,
    paddingRightProperty,
    paddingTopProperty,
    placeholderColorProperty
} from '@nativescript/core';
import { textProperty } from '@nativescript/core/ui/text-base';
import { TextFieldBase } from './textfield.common';

@NativeClass
class TextInputControllerUnderlineImpl extends MDCTextInputControllerUnderline {
    _owner: WeakRef<TextField>;
    public static initWithOwner(owner: TextField) {
        const delegate = TextInputControllerUnderlineImpl.new() as TextInputControllerUnderlineImpl;
        delegate._owner = new WeakRef(owner);

        return delegate;
    }
    textInsetsWithSizeThatFitsWidthHint(defaultValue, widthHint) {
        let result = super.textInsetsWithSizeThatFitsWidthHint(defaultValue, widthHint);
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
    textInsetsWithSizeThatFitsWidthHint(defaultValue, widthHint) {
        let result = super.textInsetsWithSizeThatFitsWidthHint(defaultValue, widthHint);
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
    textInsetsWithSizeThatFitsWidthHint(defaultValue, widthHint) {
        let result = super.textInsetsWithSizeThatFitsWidthHint(defaultValue, widthHint);
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
    textInsetsWithSizeThatFitsWidthHint(defaultValue, widthHint) {
        let result = super.textInsetsWithSizeThatFitsWidthHint(defaultValue, widthHint);
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
    firstEdit: boolean;
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
        if (this.secureWithoutAutofill && !textField.secureTextEntry) {
            /**
             * Helps avoid iOS 12+ autofill strong password suggestion prompt
             * Discussed in several circles but for example:
             * https://github.com/expo/expo/issues/2571#issuecomment-473347380
             */
            textField.secureTextEntry = true;
        }

        // we need to override this from N as in MDC case the range is 0
        // if (range.length > 0) {
        const delta = replacementString.length - range.length;
        if (delta > 0) {
            if (textField.text.length + delta > this.maxLength) {
                return false;
            }
        }
        // }

        if (this.updateTextTrigger === 'textChanged') {
            if (textField.secureTextEntry && this.firstEdit) {
                textProperty.nativeValueChange(this, replacementString);
            } else {
                if (range.location <= textField.text.length) {
                    const newText = NSString.stringWithString(textField.text).stringByReplacingCharactersInRangeWithString(range, replacementString);
                    textProperty.nativeValueChange(this, newText);
                }
            }
        }

        if (this.formattedText) {
            _updateCharactersInRangeReplacementString(this.formattedText, range.location, range.length, replacementString);
        }

        this.firstEdit = false;
        if (this.mCanAutoSize) {
            // if the textfield is in auto size we need to request a layout to take the new text width into account
            this.requestLayout();
        }
        return true;
        // return super.textFieldShouldChangeCharactersInRangeReplacementString(textField, range, replacementString);
    }
    private mCanAutoSize = false;
    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        const widthMode = Utils.layout.getMeasureSpecMode(widthMeasureSpec);
        this.mCanAutoSize = widthMode !== Utils.layout.EXACTLY;
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    _getTextInsetsForBounds(insets: UIEdgeInsets): UIEdgeInsets {
        const style = this.style;
        if (this.variant === 'underline' && this._controller.underlineHeightNormal === 0) {
            // if no underline/custom background, remove all insets like on android
            insets.top = 0;
            insets.bottom = 0;
        }
        if (paddingTopProperty.isSet(style)) {
            insets.top = Utils.layout.toDeviceIndependentPixels(this.effectivePaddingTop);
        }
        if (paddingRightProperty.isSet(style)) {
            insets.right = Utils.layout.toDeviceIndependentPixels(this.effectivePaddingRight);
        }
        if (paddingBottomProperty.isSet(style)) {
            insets.bottom = Utils.layout.toDeviceIndependentPixels(this.effectivePaddingBottom);
        }
        if (paddingLeftProperty.isSet(style)) {
            insets.left = Utils.layout.toDeviceIndependentPixels(this.effectivePaddingLeft);
        }
        return insets;
    }

    // variant = 'underline';
    public createNativeView() {
        // const view = MDCTextFieldImpl.initWithOwner(new WeakRef(this));
        const view = MDCTextField.new();

        // disable it for now
        view.clearButtonMode = UITextFieldViewMode.Never;
        const scheme = MDCContainerScheme.new();
        scheme.colorScheme = themer.getAppColorScheme();
        if (this.style.variant === 'filled') {
            this._controller = TextInputControllerFilledImpl.initWithOwner(this);
        } else if (this.style.variant === 'outline') {
            this._controller = TextInputControllerOutlinedImpl.initWithOwner(this);
        } else if (this.style.variant === 'underline') {
            this._controller = TextInputControllerUnderlineImpl.initWithOwner(this);
        } else {
            this._controller = TextInputControllerImpl.initWithOwner(this);
            this._controller.floatingEnabled = false;
            // (this._controller as TextInputControllerImpl).applyThemeWithScheme(scheme);
        }
        this._controller.textInput = view;

        //theme needs to be applied after setting the textInput
        if (this.style.variant === 'filled') {
            (this._controller as TextInputControllerFilledImpl).applyThemeWithScheme(scheme);
        } else if (this.style.variant === 'outline') {
            (this._controller as TextInputControllerOutlinedImpl).applyThemeWithScheme(scheme);
        } else if (this.style.variant === 'underline') {
            (this._controller as TextInputControllerUnderlineImpl).applyThemeWithScheme(scheme);
        } else {
            this._controller.underlineHeightActive = 0;
            this._controller.underlineHeightNormal = 0;
        }

        view.textInsetsMode = MDCTextInputTextInsetsMode.IfContent;
        // this._controller.
        // if (colorScheme) {
        //     MDCTextFieldColorThemer.applySemanticColorSchemeToTextInput(colorScheme, view);
        //     MDCTextFieldColorThemer.applySemanticColorSchemeToTextInputController(colorScheme, this._controller);
        // }
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
    [editableProperty.setNative](value: boolean) {
        this.clearFocus();
        // this.nativeTextViewProtected.enabled = value;
    }
    [floatingColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.floatingPlaceholderActiveColor = color;
        this._updateAttributedPlaceholder();
    }
    [floatingInactiveColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        // this._controller.inlinePlaceholderColor = color;
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
    [strokeDisabledColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.disabledColor = color;
    }
    [buttonColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.textInputClearButtonTintColor = color;
    }
    [helperProperty.setNative](value: string) {
        this._controller.helperText = value;
    }
    [helperColorProperty.setNative](value: string | Color) {
        const temp = typeof value === 'string' ? new Color(value) : value;
        const color: UIColor = temp.ios;
        this._controller.leadingUnderlineLabelTextColor = color;
    }
    [counterMaxLengthProperty.setNative](value: number) {
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
                    this._controller.activeColor = value.borderTopColor.ios;
                }
                break;
            }
        }
    }
    [fontInternalProperty.setNative](value: Font | UIFont) {
        super[fontInternalProperty.setNative](value);
        const font = value instanceof Font ? value.getUIFont(this._controller.inlinePlaceholderFont) : value;
        this._controller.inlinePlaceholderFont = font;
    }

    [verticalTextAlignmentProperty.setNative](value: VerticalTextAlignment) {
        // TODO: not working for now
        const view = this.nativeTextViewProtected;
        view.backgroundColor = UIColor.redColor;
        switch (value) {
            case 'initial':
            case 'top':
                view.contentVerticalAlignment = UIControlContentVerticalAlignment.Top;
                break;
            case 'middle':
                view.contentVerticalAlignment = UIControlContentVerticalAlignment.Center;

                break;

            case 'bottom':
                view.contentVerticalAlignment = UIControlContentVerticalAlignment.Bottom;
                break;
        }
    }
}
