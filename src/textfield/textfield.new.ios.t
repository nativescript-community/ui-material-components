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
    hintProperty,
    paddingBottomProperty,
    paddingLeftProperty,
    paddingRightProperty,
    paddingTopProperty,
    placeholderColorProperty
} from '@nativescript/core';
import { textProperty } from '@nativescript/core/ui/text-base';
import { TextFieldBase } from './textfield.common';

@NativeClass
class MDCFilledTextFieldImpl extends MDCFilledTextField {
    _owner: WeakRef<TextField>;
    public static initWithOwner(owner: TextField) {
        const delegate = MDCFilledTextFieldImpl.new() as MDCFilledTextFieldImpl;
        delegate._owner = new WeakRef(owner);

        return delegate;
    }
    textRectForBounds(bounds: CGRect) {
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            return owner._getTextRectForBounds(bounds);
        }
        return super.textRectForBounds(bounds);
    }
    public editingRectForBounds(bounds: CGRect): CGRect {
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            return owner._getTextRectForBounds(bounds);
        }
        return super.editingRectForBounds(bounds);
    }
}

@NativeClass
class MDCOutlinedTextFieldImpl extends MDCOutlinedTextField {
    _owner: WeakRef<TextField>;
    public static initWithOwner(owner: TextField) {
        const delegate = MDCOutlinedTextFieldImpl.new() as MDCOutlinedTextFieldImpl;
        delegate._owner = new WeakRef(owner);

        return delegate;
    }
    textRectForBounds(bounds: CGRect) {
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            return owner._getTextRectForBounds(bounds);
        }
        return super.textRectForBounds(bounds);
    }
    public editingRectForBounds(bounds: CGRect): CGRect {
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            return owner._getTextRectForBounds(bounds);
        }
        return super.editingRectForBounds(bounds);
    }
}

@NativeClass
class MDCUnderlinedTextFieldImpl extends MDCUnderlinedTextField {
    _owner: WeakRef<TextField>;
    public static initWithOwner(owner: TextField) {
        const delegate = MDCUnderlinedTextFieldImpl.new() as MDCUnderlinedTextFieldImpl;
        delegate._owner = new WeakRef(owner);

        return delegate;
    }
    textRectForBounds(bounds: CGRect) {
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            return owner._getTextRectForBounds(bounds);
        }
        return super.textRectForBounds(bounds);
    }
    public editingRectForBounds(bounds: CGRect): CGRect {
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            return owner._getTextRectForBounds(bounds);
        }
        return super.editingRectForBounds(bounds);
    }
}

declare module '@nativescript/core/ui/text-field' {
    interface TextField {
        textFieldShouldChangeCharactersInRangeReplacementString(textField: UITextField, range: NSRange, replacementString: string): boolean;
    }
}

export class TextField extends TextFieldBase {
    nativeViewProtected: MDCBaseTextField;
    nativeTextViewProtected: MDCBaseTextField;
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

        return true;
        // return super.textFieldShouldChangeCharactersInRangeReplacementString(textField, range, replacementString);
    }

    _getTextRectForBounds(bounds: CGRect): CGRect {
        const size = bounds.size;

        const x = Utils.layout.toDeviceIndependentPixels(this.effectiveBorderLeftWidth + this.effectivePaddingLeft);
        const y = Utils.layout.toDeviceIndependentPixels(this.effectiveBorderTopWidth + this.effectivePaddingTop);
        const width = Utils.layout.toDeviceIndependentPixels(
            Utils.layout.toDevicePixels(size.width) - (this.effectiveBorderLeftWidth + this.effectivePaddingLeft + this.effectivePaddingRight + this.effectiveBorderRightWidth)
        );
        const height = Utils.layout.toDeviceIndependentPixels(
            Utils.layout.toDevicePixels(size.height) - (this.effectiveBorderTopWidth + this.effectivePaddingTop + this.effectivePaddingBottom + this.effectiveBorderBottomWidth)
        );

        return CGRectMake(x, y, width, height);
    }

    // variant = 'underline';
    public createNativeView() {
        // const view = MDCTextFieldImpl.initWithOwner(new WeakRef(this));
        let view: MDCFilledTextFieldImpl | MDCOutlinedTextFieldImpl | MDCUnderlinedTextFieldImpl;

        // disable it for now
        if (this.style.variant === 'filled') {
            view = MDCFilledTextFieldImpl.initWithOwner(this);
        } else if (this.style.variant === 'outline') {
            view = MDCOutlinedTextFieldImpl.initWithOwner(this);
        } else if (this.style.variant === 'underline') {
            view = MDCUnderlinedTextFieldImpl.initWithOwner(this);
        } else {
            view = MDCUnderlinedTextFieldImpl.initWithOwner(this);
            (view as MDCUnderlinedTextField).normalUnderlineThickness = 0;
            (view as MDCUnderlinedTextField).editingUnderlineThickness = 0;
        }
        view.clearButtonMode = UITextFieldViewMode.Never;
        //theme needs to be applied after setting the textInput
        const scheme = MDCContainerScheme.new();
        scheme.colorScheme = themer.getAppColorScheme();
        view.applyThemeWithScheme(scheme); // Default theming method
        view.applyErrorThemeWithScheme(scheme); // Default theming method
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
        this.nativeViewProtected.setFloatingLabelColorForState(color, MDCTextControlState.Editing);
        this._updateAttributedPlaceholder();
    }
    [floatingInactiveColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        // this._controller.inlinePlaceholderColor = color;
        this.nativeViewProtected.setFloatingLabelColorForState(color, MDCTextControlState.Normal);
        this._updateAttributedPlaceholder();
    }
    [placeholderColorProperty.setNative](value: UIColor | Color) {
        this._updateAttributedPlaceholder();
    }
    [hintProperty.setNative](value: string) {
        this._updateAttributedPlaceholder();
        if (this.floating && this.variant !== 'none') {
            this.nativeViewProtected.label.text = value;
        }
    }
    [errorColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this.nativeViewProtected.trailingAssistiveLabel.textColor = color;
    }
    [strokeColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        const view = this.nativeViewProtected;
        if (view instanceof MDCOutlinedTextFieldImpl) {
            view.setOutlineColorForState(color, MDCTextControlState.Editing);
        } else {
            (view as MDCFilledTextFieldImpl).setUnderlineColorForState(color, MDCTextControlState.Editing);
        }
    }
    [strokeInactiveColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        const view = this.nativeViewProtected;
        if (view instanceof MDCOutlinedTextFieldImpl) {
            view.setOutlineColorForState(color, MDCTextControlState.Normal);
        } else {
            (view as MDCFilledTextFieldImpl).setUnderlineColorForState(color, MDCTextControlState.Normal);
        }
    }
    [strokeDisabledColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        const view = this.nativeViewProtected;
        if (view instanceof MDCOutlinedTextFieldImpl) {
            view.setOutlineColorForState(color, MDCTextControlState.Disabled);
        } else {
            (view as MDCFilledTextFieldImpl).setUnderlineColorForState(color, MDCTextControlState.Disabled);
        }
    }
    [buttonColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        // this._controller.textInputClearButtonTintColor = color;
    }
    [helperProperty.setNative](value: string) {
        this.nativeViewProtected.leadingAssistiveLabel.text = value;
    }
    [helperColorProperty.setNative](value: string | Color) {
        const temp = typeof value === 'string' ? new Color(value) : value;
        const color: UIColor = temp.ios;
        this.nativeViewProtected.leadingAssistiveLabel.textColor = color;
    }
    [counterMaxLengthProperty.setNative](value: number) {
        // this._controller.characterCountMax = value;
    }
    [floatingProperty.setNative](value: boolean) {
        // this.nativeViewProtected.labelBehavior = MDCTextControlLabelBehavior.Floats;
    }
    [errorProperty.setNative](value: string) {
        this.nativeViewProtected.trailingAssistiveLabel.text = value;
    }
    [digitsProperty.setNative](value: string) {
        if (value && value.length > 0) {
            this.nsdigits = NSCharacterSet.characterSetWithCharactersInString(value);
        } else {
            this.nsdigits = null;
        }
    }
    [backgroundInternalProperty.setNative](value: Background) {
        const view = this.nativeViewProtected;
        switch (this.variant) {
            case 'none':
                super[backgroundInternalProperty.setNative](value);
                break;
            case 'outline':
            case 'filled':
            case 'underline': {
                if (value.color) {
                    if (view instanceof MDCFilledTextFieldImpl) {
                        view.setFilledBackgroundColorForState(value.color ? value.color.ios : null, MDCTextControlState.Normal);
                        view.setFilledBackgroundColorForState(value.color ? value.color.ios : null, MDCTextControlState.Editing);
                    } else {
                        view.backgroundColor = value.color ? value.color.ios : null;
                    }
                }
                // if (value.borderTopColor) {
                //     this._controller.activeColor = value.borderTopColor.ios;
                // }
                break;
            }
        }
    }
    [fontInternalProperty.setNative](value: Font | UIFont) {
        super[fontInternalProperty.setNative](value);
        const view = this.nativeViewProtected;
        const font = value instanceof Font ? value.getUIFont(view.font) : value;
        view.leadingAssistiveLabel.font = font;
        view.trailingAssistiveLabel.font = font;
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
