import { getLayout, handleClearFocus, stateSets } from 'nativescript-material-core/android/utils';
import { Color } from '@nativescript/core/color';
import { backgroundInternalProperty, borderBottomLeftRadiusProperty, hintProperty, placeholderColorProperty } from '@nativescript/core/ui/editable-text-base';
import { Background } from '@nativescript/core/ui/styling/background';
import { ad } from '@nativescript/core/utils/utils';
import { TextFieldBase } from './textfield.common';
import {
    errorColorProperty,
    errorProperty,
    floatingColorProperty,
    floatingInactiveColorProperty,
    floatingProperty,
    helperProperty,
    maxLengthProperty,
    strokeColorProperty,
    strokeInactiveColorProperty
} from 'nativescript-material-core/textbase/cssproperties';

interface TextInputEditText extends com.google.android.material.textfield.TextInputEditText {
    // tslint:disable-next-line:no-misused-new
    new (context): TextInputEditText;
    owner: WeakRef<TextField>;
}
let TextInputEditText: TextInputEditText;

export function initTextInputEditText() {
    if (TextInputEditText) {
        return;
    }
    @JavaProxy('org.nativescript.material.TextInputEditText')
    class TextInputEditTextImpl extends com.google.android.material.textfield.TextInputEditText {
        public owner: WeakRef<TextField>;
        constructor(context: android.content.Context) {
            super(context);
            return global.__native(this);
        }
        dispatchKeyEventPreIme(event) {
            const imm = ad.getInputMethodManager();

            if (imm != null && imm.isActive() && event.getAction() === android.view.KeyEvent.ACTION_UP && event.getKeyCode() === android.view.KeyEvent.KEYCODE_BACK) {
                // when hiding the keyboard with the back button also blur
                const owner = this.owner && this.owner.get();
                if (owner) {
                    owner.clearFocus();
                    return true;
                }
            }
            return super.dispatchKeyEventPreIme(event);
        }
    }
    TextInputEditText = TextInputEditTextImpl as any;
}

function getColorStateList(activeColor: number, inactiveColor = 1627389952) {
    const states = Array.create('[I', 2);
    states[0] = stateSets.FOCUSED_STATE_SET;
    states[1] = Array.create('int', 0);
    const colors = Array.create('int', 2);
    colors[0] = activeColor;
    colors[1] = inactiveColor;
    return new android.content.res.ColorStateList(states, colors);
}

export class TextField extends TextFieldBase {
    editText: com.google.android.material.textfield.TextInputEditText;
    layoutView: com.google.android.material.textfield.TextInputLayout;

    constructor() {
        super();
    }
    get nativeTextViewProtected() {
        return this.editText as com.google.android.material.textfield.TextInputEditText;
    }

    drawingBackground = false;
    get nativeViewProtected() {
        return this.layoutView;
    }

    public createNativeView() {
        let layoutIdName = 'material_text_field';
        if (this.variant === 'filled') {
            layoutIdName = 'material_text_field_filled';
        } else if (this.variant === 'outline') {
            layoutIdName = 'material_text_field_outline';
        }
        const layoutId = getLayout(layoutIdName);

        let layoutView: com.google.android.material.textfield.TextInputLayout;
        let editText: TextInputEditText;
        initTextInputEditText();
        if (layoutId !== 0) {
            layoutView = this.layoutView = android.view.LayoutInflater.from(this._context).inflate(layoutId, null, false) as com.google.android.material.textfield.TextInputLayout;
            editText = this.editText = (layoutView.getChildAt(0) as android.widget.FrameLayout).getChildAt(0) as TextInputEditText;
        } else {
            layoutView = this.layoutView = new com.google.android.material.textfield.TextInputLayout(this._context);
            editText = this.editText = new TextInputEditText(layoutView.getContext());
            editText.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.FrameLayout.LayoutParams.MATCH_PARENT, android.widget.FrameLayout.LayoutParams.WRAP_CONTENT));
            layoutView.addView(editText);
        }
        if (layoutIdName === 'material_text_field') {
            layoutView.setBoxBackgroundColor(android.graphics.Color.TRANSPARENT);
            editText.setBackground(null);
        }
        editText.owner = new WeakRef(this);
        layoutView.setFocusableInTouchMode(true); // to prevent focus on view creation
        return layoutView;
    }

    [borderBottomLeftRadiusProperty.getDefault]() {
        return this.layoutView.getBoxCornerRadiusTopStart();
    }

    [hintProperty.getDefault](): string {
        return this.layoutView.getHint();
    }
    [hintProperty.setNative](value: string) {
        const text = value === null || value === undefined ? null : value.toString();
        this.layoutView.setHint(text);
    }

    [placeholderColorProperty.setNative](value: Color) {
        const placeholderColor = value instanceof Color ? value.android : value;
        const floatingColor = this.floatingColor instanceof Color ? this.floatingColor.android : placeholderColor;

        this.layoutView.setDefaultHintTextColor(getColorStateList(floatingColor, placeholderColor));
    }

    [floatingColorProperty.setNative](value: Color) {
        const floatingColor = value instanceof Color ? value.android : value;
        const placeholderColor = this.placeholderColor instanceof Color ? this.placeholderColor.android : undefined;
        this.layoutView.setDefaultHintTextColor(getColorStateList(floatingColor, placeholderColor));
    }

    [floatingInactiveColorProperty.setNative](value: Color) {
        const placeholderColor = value instanceof Color ? value.android : value;
        const floatingColor =
            this.floatingColor instanceof Color ? this.floatingColor.android : this.layoutView.getDefaultHintTextColor().getColorForState(stateSets.FOCUSED_STATE_SET, placeholderColor);
        this.layoutView.setDefaultHintTextColor(getColorStateList(floatingColor, placeholderColor));
    }

    public requestFocus() {
        if (this.layoutView) {
            // because of setFocusableInTouchMode fix we need this for focus to work
            const oldDesc = this.layoutView.getDescendantFocusability();
            this.layoutView.setDescendantFocusability(android.view.ViewGroup.FOCUS_AFTER_DESCENDANTS);
            // }
            this.layoutView.requestFocus();
            setTimeout(() => {
                this.layoutView.setDescendantFocusability(oldDesc);
                ad.showSoftInput(this.nativeTextViewProtected);
                // this.focus();
            }, 0);
        }

        return false;
    }
    public clearFocus() {
        handleClearFocus(this.nativeViewProtected);
        this.dismissSoftInput();
    }

    public setSelection(start:number, stop?:number) {
        if (stop !== undefined) {
            this.editText.setSelection(start, stop);
        } else {
            this.editText.setSelection(start);
        }
    }

    [errorColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        (this.layoutView as any).setErrorTextColor(android.content.res.ColorStateList.valueOf(color));
    }

    [helperProperty.setNative](value: string) {
        (this.layoutView as any).setHelperText(!!value ? value : null);
    }
    [errorProperty.setNative](value: string) {
        this.layoutView.setError(!!value ? value : null);
        this.layoutView.setErrorEnabled(!!value);
    }

    [maxLengthProperty.setNative](value: number) {
        this.layoutView.setCounterEnabled(value > 0);
        this.layoutView.setCounterMaxLength(value);
    }

    [floatingProperty.setNative](value: boolean) {
        this.layoutView.setHintEnabled(!!value);
    }

    [strokeInactiveColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        // @ts-ignore This check can be removed once this package is updated to rely on 1.2.0 of material components
        if (this.layoutView.setBoxStrokeColorStateList) {
            const activeColor = this.strokeColor instanceof Color ? this.strokeColor.android : this.layoutView.getBoxStrokeColor();
            const colorStateList = getColorStateList(activeColor, color);
            // @ts-ignore
            this.layoutView.setBoxStrokeColorStateList(colorStateList);
        }
        // this.editText.setBackgroundTintList(android.content.res.ColorStateList.valueOf(color));
    }

    [strokeColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        // @ts-ignore This check can be removed once this package is updated to rely on 1.2.0 of material components
        if (this.layoutView.setBoxStrokeColorStateList) {
            const inactiveColor = this.strokeInactiveColor instanceof Color ? this.strokeInactiveColor.android : undefined;
            const colorStateList = getColorStateList(color, inactiveColor);
            // @ts-ignore
            this.layoutView.setBoxStrokeColorStateList(colorStateList);
        } else {
            this.layoutView.setBoxStrokeColor(color);
        }
        // this.editText.setBackgroundTintList(android.content.res.ColorStateList.valueOf(color));
    }

    [backgroundInternalProperty.setNative](value: Background) {
        switch (this.variant) {
            case 'none':
            case 'filled':
                super[backgroundInternalProperty.setNative](value);
                if (value.color) {
                    // this.layoutView.setBackground(null);
                    const background = this.editText.getBackground();
                    if (background instanceof com.google.android.material.shape.MaterialShapeDrawable) {
                        background.setTintList(android.content.res.ColorStateList.valueOf(value.color.android));
                        this.layoutView.setBoxBackgroundColor(android.graphics.Color.TRANSPARENT);
                        this.layoutView.setBackgroundColor(android.graphics.Color.TRANSPARENT);
                    } else {
                        this.layoutView.setBoxBackgroundColor(value.color.android);
                    }
                }
                break;
            case 'outline':
            case 'underline': {
                if (value.color) {
                    // this.layoutView.setBackground(null);
                    const background = this.editText.getBackground();
                    if (background instanceof com.google.android.material.shape.MaterialShapeDrawable) {
                        background.setTintList(android.content.res.ColorStateList.valueOf(value.color.android));
                        this.layoutView.setBoxBackgroundColor(android.graphics.Color.TRANSPARENT);
                        this.layoutView.setBackgroundColor(android.graphics.Color.TRANSPARENT);
                    } else {
                        this.layoutView.setBoxBackgroundColor(value.color.android);
                    }
                }
                if (value.borderTopColor) {
                    // TODO: for now no control over border color. it is an attr
                    // this.nativeViewProtected.setStrokeColor(value.borderTopColor.android);
                }
                break;
            }
        }
    }
}
//
