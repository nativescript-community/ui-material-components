import { themer } from '@nativescript-community/ui-material-core';
import {
    buttonColorProperty,
    errorColorProperty,
    errorProperty,
    floatingColorProperty,
    floatingInactiveColorProperty,
    floatingProperty,
    helperProperty,
    maxLengthProperty,
    strokeColorProperty,
    strokeInactiveColorProperty
} from '@nativescript-community/ui-material-core/textbase/cssproperties';
import { Background, Color, Property, Screen, Style, backgroundInternalProperty, editableProperty, hintProperty, isAndroid, placeholderColorProperty } from '@nativescript/core';
import { TextViewBase } from './textview.common';

const textProperty = new Property<TextView, string>({
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

@NativeClass()
class TextViewInputControllerUnderlineImpl extends MDCTextInputControllerUnderline {
    _owner: WeakRef<TextView>;
    public static initWithOwner(owner: TextView) {
        const delegate = TextViewInputControllerUnderlineImpl.new() as TextViewInputControllerUnderlineImpl;
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

@NativeClass()
class TextViewInputControllerImpl extends MDCTextInputControllerBase {
    _owner: WeakRef<TextView>;
    public static initWithOwner(owner: TextView) {
        const delegate = TextViewInputControllerImpl.new() as TextViewInputControllerImpl;
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

@NativeClass()
class TextViewInputControllerOutlinedImpl extends MDCTextInputControllerOutlined {
    _owner: WeakRef<TextView>;
    public static initWithOwner(owner: TextView) {
        const delegate = TextViewInputControllerOutlinedImpl.new() as TextViewInputControllerOutlinedImpl;
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

@NativeClass()
class TextViewInputControllerFilledImpl extends MDCTextInputControllerFilled {
    _owner: WeakRef<TextView>;
    public static initWithOwner(owner: TextView) {
        const delegate = TextViewInputControllerFilledImpl.new() as TextViewInputControllerFilledImpl;
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

export class TextView extends TextViewBase {
    nativeViewProtected: MDCMultilineTextField;
    private _controller: MDCTextInputControllerBase;
    public _isEditing: boolean;
    public readonly style: Style & { variant: 'outline' | 'underline' | 'filled' };

    public clearFocus() {
        this.dismissSoftInput();
    }

    public requestFocus() {
        this.focus();
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
        const view = MDCMultilineTextField.new();

        // disable it for now
        view.clearButtonMode = UITextFieldViewMode.Never;
        const colorScheme = themer.getAppColorScheme();
        if (this.style.variant === 'filled') {
            this._controller = TextViewInputControllerFilledImpl.initWithOwner(this);;
        } else if (this.style.variant === 'outline') {
            this._controller = TextViewInputControllerOutlinedImpl.initWithOwner(this);
        } else if (this.style.variant === 'underline') {
            this._controller = TextViewInputControllerUnderlineImpl.initWithOwner(this);
        } else {
            this._controller = TextViewInputControllerImpl.initWithOwner(this);
            this._controller.underlineHeightActive = 0;
            this._controller.underlineHeightNormal = 0;
        }
        this._controller.textInput = view;
        view.textInsetsMode = MDCTextInputTextInsetsMode.IfContent;
        this._controller.placeholderText = this.hint;

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

    [hintProperty.getDefault](): string {
        return '';
    }
    [hintProperty.setNative](value: string) {
        this._controller.placeholderText = value;
    }
    [editableProperty.getDefault](): boolean {
        return this.nativeTextViewProtected.editable;
    }
    [editableProperty.setNative](value: boolean) {
        this.nativeTextViewProtected.editable = value;
    }
    [floatingColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.floatingPlaceholderActiveColor = color;
    }
    [floatingInactiveColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.inlinePlaceholderColor = color;
        this._controller.floatingPlaceholderNormalColor = color;
    }
    [placeholderColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.ios : value;
        this._controller.inlinePlaceholderColor = color;
        if (!this.floatingColor) {
            this._controller.floatingPlaceholderActiveColor = color;
        }
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
    [backgroundInternalProperty.setNative](value: Background) {
        switch (this.variant) {
            case 'none':
            case 'filled':
                super[backgroundInternalProperty.setNative](value);
                break;
            case 'outline':
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

textProperty.register(TextView);
