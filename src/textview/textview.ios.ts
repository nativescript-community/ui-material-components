import { themer } from '@nativescript-community/ui-material-core';
import {
    buttonColorProperty,
    counterMaxLengthProperty,
    errorColorProperty,
    errorProperty,
    floatingColorProperty,
    floatingInactiveColorProperty,
    floatingProperty,
    helperColorProperty,
    helperProperty,
    strokeColorProperty,
    strokeInactiveColorProperty,
} from '@nativescript-community/ui-material-core/textbase/cssproperties';
import { Background, Color, Property, Screen, Style, Utils, View, backgroundInternalProperty, editableProperty, hintProperty, isAndroid, placeholderColorProperty } from '@nativescript/core';
import { resetSymbol, textProperty } from '@nativescript/core/ui/text-base';
import { TextViewBase } from './textview.common';

declare module '@nativescript/core/ui/text-view' {
    interface TextView {
        setFormattedTextDecorationAndTransform();
        setTextDecorationAndTransform();
    }
}

@NativeClass
class MDCMultilineTextInputLayoutDelegateImpl extends NSObject {
    static ObjCProtocols = [MDCMultilineTextInputLayoutDelegate];
    _owner: WeakRef<TextView>;
    public static initWithOwner(owner: TextView) {
        const delegate = MDCMultilineTextInputLayoutDelegateImpl.new() as MDCMultilineTextInputLayoutDelegateImpl;
        delegate._owner = new WeakRef(owner);

        return delegate;
    }

    multilineTextFieldDidChangeContentSize?(multilineTextField: MDCMultilineTextInput, size: CGSize) {
        // called when clicked on background
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            owner._onTextFieldDidChangeContentSize && owner._onTextFieldDidChangeContentSize(size);
        }
    }
}

@NativeClass
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

@NativeClass
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

@NativeClass
class TextViewInputControllerOutlinedImpl extends MDCTextInputControllerOutlinedTextArea {
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

@NativeClass
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

// const MDCMultilineTextFieldImpl = (MDCMultilineTextField as any).extend({
// sizeThatFits(size: CGSize) {
//     this._sizeThatFits = size;
//     let result = this.super.sizeThatFits(size);
//     const owner = this._owner ? this._owner.get() : null;
//     if (owner && owner.height !== 'auto') {
//         result = CGSizeMake(result.width, size.height);
//         console.log('sizeThatFits', this, size.width, size.height, result.width, result.height, owner && owner.height !== 'auto');
//     }
//     return result;
// },
// get intrinsicContentSize() {
//     let result = this.super.intrinsicContentSize;
//     console.log('get intrinsicContentSize', this, result.width, result.height);
//     try {
//         const owner = this._owner ? this._owner.get() : null;
//         if (owner && owner.height !== 'auto' && this._sizeThatFits) {
//             result = CGSizeMake(result.width, this._sizeThatFits.height);
//             this._sizeThatFits = null;
//             console.log('intrinsicContentSize', this, result.width, result.height, owner.height);
//         }
//     } catch (err) {}

//     return result;
// },
// });
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

    // N bug fix
    get ios() {
        return this.nativeTextViewProtected;
    }
    get nativeTextViewProtected() {
        return this.nativeViewProtected.textView;
    }
    // get nativeRealTextViewProtected() {
    //     return this.nativeViewProtected.textView;
    // }

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
    _onTextFieldDidChangeContentSize(size: CGSize) {
        if (this.height === 'auto') {
            this.requestLayout();
        }
    }
    public createNativeView() {
        const view = MDCMultilineTextField.new();
        (view as any)._owner = new WeakRef(this);
        // disable it for now
        view.clearButtonMode = UITextFieldViewMode.Never;
        const scheme = MDCContainerScheme.new();
        scheme.colorScheme = themer.getAppColorScheme();
        if (this.style.variant === 'filled') {
            this._controller = TextViewInputControllerFilledImpl.initWithOwner(this);
        } else if (this.style.variant === 'outline') {
            this._controller = TextViewInputControllerOutlinedImpl.initWithOwner(this);
        } else if (this.style.variant === 'underline') {
            this._controller = TextViewInputControllerUnderlineImpl.initWithOwner(this);
        } else {
            this._controller = TextViewInputControllerImpl.initWithOwner(this);
        }
        this._controller.textInput = view;

        if (this.style.variant === 'filled') {
            (this._controller as TextViewInputControllerFilledImpl).applyThemeWithScheme(scheme);
        } else if (this.style.variant === 'outline') {
            // (this._controller as TextViewInputControllerOutlinedImpl).applyThemeWithScheme(scheme);
        } else if (this.style.variant === 'underline') {
            (this._controller as TextViewInputControllerUnderlineImpl).applyThemeWithScheme(scheme);
        } else {
            this._controller.underlineHeightActive = 0;
            this._controller.underlineHeightNormal = 0;
        }

        // view.textInsetsMode = MDCTextInputTextInsetsMode.IfContent;

        return view;
    }
    layoutDelegate: MDCMultilineTextInputLayoutDelegate;
    initNativeView() {
        super.initNativeView();
        const view = this.nativeViewProtected;
        view.layoutDelegate = MDCMultilineTextInputLayoutDelegateImpl.initWithOwner(this);
        this.layoutDelegate = view.layoutDelegate;
    }
    disposeNativeView() {
        const view = this.nativeViewProtected;
        view.layoutDelegate = null;
        this.layoutDelegate = null;
        super.disposeNativeView();
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
        const view = this.nativeTextViewProtected as UITextView;
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
    [editableProperty.setNative](value: boolean) {
        (this.nativeTextViewProtected as UITextView).editable = value;
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
    setFormattedTextDecorationAndTransform() {
        // this.returnRealTextView = false;
        super.setFormattedTextDecorationAndTransform();
        const attributedText = this.nativeTextViewProtected.attributedText;
        this.nativeTextViewProtected.text = null;
        this.nativeViewProtected.attributedText = attributedText;
    }
    setTextDecorationAndTransform() {
        super.setTextDecorationAndTransform();
        if (this.nativeTextViewProtected.attributedText) {
            const attributedText = this.nativeTextViewProtected.attributedText;
            this.nativeViewProtected.attributedText = attributedText;
        } else {
            const text = this.nativeTextViewProtected.text;
            this.nativeViewProtected.text = text;
        }
    }
    // [textProperty.setNative](value: string | number | symbol) {
    //     const reset = value === resetSymbol;
    //     if (!reset && this.formattedText) {
    //         return;
    //     }

    //     this._setNativeText(reset);
    //     this._requestLayoutOnTextChanged();
    // }
    // public textViewShouldBeginEditing(textView: UITextView): boolean {
    //     return true;
    // }
    // public showHint(hint: string) {
    //     console.log('showHint');
    // }

    // public showText() {
    //     console.log('showText');
    // }
    // public _refreshHintState(hint: string, text: string) {}
}
