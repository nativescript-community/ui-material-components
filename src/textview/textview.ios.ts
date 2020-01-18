import { TextViewBase } from './textview.common';
import { backgroundInternalProperty, editableProperty, hintProperty, placeholderColorProperty, textProperty } from '@nativescript/core/ui/editable-text-base';
import { errorColorProperty, errorProperty, floatingColorProperty, floatingProperty, helperProperty, maxLengthProperty, strokeColorProperty, buttonColorProperty } from 'nativescript-material-core/textbase/cssproperties';
import { themer } from 'nativescript-material-core/core';
import { Color } from '@nativescript/core/color';
import { Style } from '@nativescript/core/ui/styling/style';
import { Background } from '@nativescript/core/ui/styling/background';
import { screen } from '@nativescript/core/platform/platform';

let colorScheme: MDCSemanticColorScheme;
function getColorScheme() {
    if (!colorScheme) {
        colorScheme = MDCSemanticColorScheme.new();
    }
    return colorScheme;
}

class TextViewInputControllerUnderlineImpl extends MDCTextInputControllerUnderline {
    private _owner: WeakRef<TextView>;
    public static initWithOwner(owner: WeakRef<TextView>): TextViewInputControllerUnderlineImpl {
        const handler = <TextViewInputControllerUnderlineImpl>TextViewInputControllerUnderlineImpl.new();
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

class TextViewInputControllerImpl extends MDCTextInputControllerBase {
    private _owner: WeakRef<TextView>;
    public static initWithOwner(owner: WeakRef<TextView>): TextViewInputControllerImpl {
        const handler = <TextViewInputControllerImpl>TextViewInputControllerImpl.new();
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

class TextViewInputControllerOutlinedImpl extends MDCTextInputControllerOutlinedTextArea {
    private _owner: WeakRef<TextView>;
    public static initWithOwner(owner: WeakRef<TextView>): TextViewInputControllerOutlinedImpl {
        const handler = <TextViewInputControllerOutlinedImpl>TextViewInputControllerOutlinedImpl.new();
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

class TextViewInputControllerFilledImpl extends MDCTextInputControllerFilled {
    private _owner: WeakRef<TextView>;
    public static initWithOwner(owner: WeakRef<TextView>): TextViewInputControllerFilledImpl {
        const handler = <TextViewInputControllerFilledImpl>TextViewInputControllerFilledImpl.new();
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

class TextViewDelegateImpl extends NSObject implements UITextViewDelegate {
    public static ObjCProtocols = [UITextViewDelegate];

    private _owner: WeakRef<TextView>;

    public static initWithOwner(owner: WeakRef<TextView>): TextViewDelegateImpl {
        const impl = <TextViewDelegateImpl>TextViewDelegateImpl.new();
        impl._owner = owner;

        return impl;
    }

    public textViewShouldBeginEditing(textView: UITextView): boolean {
        const owner = this._owner.get();
        return true;
    }

    public textViewDidBeginEditing(textView: UITextView): void {
        const owner = this._owner.get();
        if (owner) {
            owner._isEditing = true;
            owner.notify({ eventName: TextView.focusEvent, object: owner });
        }
    }

    public textViewDidEndEditing(textView: UITextView) {
        const owner = this._owner.get();
        if (owner) {
            if (owner.updateTextTrigger === "focusLost") {
                textProperty.nativeValueChange(owner, textView.text);
            }

            owner._isEditing = false;
            owner.dismissSoftInput();
        }
    }

    public textViewDidChange(textView: UITextView) {
        const owner = this._owner.get();
        if (owner) {
            if (owner.updateTextTrigger === 'textChanged') {
                textProperty.nativeValueChange(owner, textView.text);
            }
            owner.requestLayout();
        }
    }
}

export class TextView extends TextViewBase {
    nativeViewProtected: MDCMultilineTextField;
    private _controller: MDCTextInputControllerBase;
    public _isEditing: boolean;
    private _delegate: TextViewDelegateImpl;
    public readonly style: Style & { variant: 'outline' | 'underline' | 'filled' };

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
        const view = MDCMultilineTextField.new();

        // disable it for now
        view.clearButtonMode = UITextFieldViewMode.Never;
        const colorScheme = themer.getAppColorScheme();
        const owner = new WeakRef(this);
        if (this.style.variant === 'filled') {
            this._controller = TextViewInputControllerFilledImpl.initWithOwner(owner);
        } else if (this.style.variant === 'outline') {
            this._controller = TextViewInputControllerOutlinedImpl.initWithOwner(owner);
        } else if (this.style.variant === 'underline') {
            this._controller = TextViewInputControllerUnderlineImpl.initWithOwner(owner);
        } else {
            this._controller = TextViewInputControllerImpl.initWithOwner(owner);
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

    initNativeView() {
        super.initNativeView();
        this._delegate = TextViewDelegateImpl.initWithOwner(new WeakRef(this));
        this.ios.textView.delegate = this._delegate;
    }

    // TODO: check why i was checking for isFirstResponder
    // with it the blur event is not fired anymore

    // public dismissSoftInput() {
    //     if (this.nativeViewProtected.isFirstResponder) {
    //         super.dismissSoftInput();
    //     }
    // }
    get ios(): MDCMultilineTextField {
        return this.nativeViewProtected;
    }

    blur() {
        this.dismissSoftInput();
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
