import { TextViewBase } from './textview.common';
import { backgroundInternalProperty, editableProperty, hintProperty, placeholderColorProperty, textProperty } from '@nativescript/core/ui/editable-text-base';
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
    strokeInactiveColorProperty,
} from 'nativescript-material-core/textbase/cssproperties';
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

declare class ITextInputControllerUnderlineImpl extends MDCTextInputControllerUnderline {
    static new(): ITextInputControllerUnderlineImpl;
    _owner: WeakRef<TextView>;
}

const TextViewInputControllerUnderlineImpl = (MDCTextInputControllerUnderline as any).extend({
    textInsets(defaultValue) {
        let result = this.super.textInsets(defaultValue);
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            result = owner._getTextInsetsForBounds(result);
        }
        return result;
    },
}) as typeof ITextInputControllerUnderlineImpl;

declare class ITextInputControllerImpl extends MDCTextInputControllerBase {
    static new(): ITextInputControllerImpl;
    _owner: WeakRef<TextView>;
}
const TextViewInputControllerImpl = (MDCTextInputControllerBase as any).extend({
    textInsets(defaultValue) {
        let result = this.super.textInsets(defaultValue);
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            result = owner._getTextInsetsForBounds(result);
        }
        return result;
    },
}) as typeof ITextInputControllerImpl;

declare class ITextInputControllerOutlinedImpl extends MDCTextInputControllerOutlined {
    static new(): ITextInputControllerOutlinedImpl;
    _owner: WeakRef<TextView>;
}
const TextViewInputControllerOutlinedImpl = (MDCTextInputControllerOutlined as any).extend({
    textInsets(defaultValue) {
        let result = this.super.textInsets(defaultValue);
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            result = owner._getTextInsetsForBounds(result);
        }
        return result;
    },
}) as typeof ITextInputControllerOutlinedImpl;

declare class ITextInputControllerFilledImpl extends MDCTextInputControllerFilled {
    static new(): ITextInputControllerFilledImpl;
    _owner: WeakRef<TextView>;
}
const TextViewInputControllerFilledImpl = (MDCTextInputControllerFilled as any).extend({
    textInsets(defaultValue) {
        let result = this.super.textInsets(defaultValue);
        const owner = this._owner ? this._owner.get() : null;
        if (owner) {
            result = owner._getTextInsetsForBounds(result);
        }
        return result;
    },
}) as typeof ITextInputControllerFilledImpl;

declare class ITextViewDelegateImpl extends NSObject implements UITextViewDelegate {
    static new(): ITextViewDelegateImpl;
    _owner: WeakRef<TextView>;
}
const TextViewDelegateImpl = (NSObject as any).extend(
    {
        textViewShouldBeginEditing(textView: UITextView): boolean {
            const owner = this._owner.get();
            if (owner) {
                return owner.editable;
            }

            return true;
        },

        textViewDidBeginEditing(textView: UITextView): void {
            const owner = this._owner.get();
            if (owner) {
                owner._isEditing = true;
                owner.notify({ eventName: TextView.focusEvent, object: owner });
            }
        },

        textViewDidEndEditing(textView: UITextView) {
            const owner = this._owner.get();
            if (owner) {
                if (owner.updateTextTrigger === 'focusLost') {
                    textProperty.nativeValueChange(owner, textView.text);
                }

                owner._isEditing = false;
                owner.dismissSoftInput();
            }
        },

        textViewDidChange(textView: UITextView) {
            const owner = this._owner.get();
            if (owner) {
                if (owner.updateTextTrigger === 'textChanged') {
                    textProperty.nativeValueChange(owner, textView.text);
                }
                owner.requestLayout();
            }
        },
    },
    {
        protocols: [UITextViewDelegate],
    }
) as typeof ITextViewDelegateImpl;

export class TextView extends TextViewBase {
    nativeViewProtected: MDCMultilineTextField;
    private _controller: ITextInputControllerImpl;
    public _isEditing: boolean;
    private _delegate: ITextViewDelegateImpl;
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
        if (this.style.variant === 'filled') {
            this._controller = TextViewInputControllerFilledImpl.new();
        } else if (this.style.variant === 'outline') {
            this._controller = TextViewInputControllerOutlinedImpl.new();
        } else if (this.style.variant === 'underline') {
            this._controller = TextViewInputControllerUnderlineImpl.new();
        } else {
            this._controller = TextViewInputControllerImpl.new();
            this._controller.underlineHeightActive = 0;
            this._controller.underlineHeightNormal = 0;
        }
        this._controller._owner = new WeakRef(this);
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
        this._delegate = TextViewDelegateImpl.new();
        this._delegate._owner = new WeakRef(this);
        this.ios.textView.delegate = this._delegate;
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
