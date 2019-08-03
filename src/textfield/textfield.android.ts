import { TextFieldBase } from './textfield.common';
import { backgroundInternalProperty, borderBottomLeftRadiusProperty, hintProperty, placeholderColorProperty } from 'tns-core-modules/ui/editable-text-base/editable-text-base';

import { errorColorProperty, errorProperty, floatingColorProperty, floatingProperty, helperProperty, maxLengthProperty, strokeColorProperty } from './textfield_cssproperties';
import { Color } from 'tns-core-modules/color';
import { ad } from 'tns-core-modules/utils/utils';
import { getFocusedColorStateList, getLayout, handleClearFocus, stateSets } from 'nativescript-material-core/android/utils';
import { Background } from 'tns-core-modules/ui/styling/background';
import { layout } from 'tns-core-modules/utils/utils';

declare module 'tns-core-modules/ui/text-field/text-field' {
    interface TextField {
        _redrawNativeBackground(value: android.graphics.drawable.Drawable | Background): void;
    }
}

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

export function getDefaultHintTextColorStateList(pressedColor: number, color = 1627389952) {
    const states = Array.create('[I', 2);
    states[0] = stateSets.FOCUSED_STATE_SET;
    states[1] = Array.create('int', 0);
    const colors = Array.create('int', 2);
    colors[0] = pressedColor;
    colors[1] = color;
    return new android.content.res.ColorStateList(states, colors);
}

export class TextField extends TextFieldBase {
    editText: com.google.android.material.textfield.TextInputEditText;
    layoutView: com.google.android.material.textfield.TextInputLayout;

    // nativeViewProtected: com.google.android.material.textfield.TextInputLayout;
    constructor() {
        super();
    }
    get nativeTextViewProtected() {
        return this.editText as com.google.android.material.textfield.TextInputEditText;
    }

    drawingBackground = false;
    get nativeViewProtected() {
        // if (this.drawingBackground) {
        // return this.editText;
        // }
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
        // in com.google.material the default style is boxed!
        // layoutView.setBackgroundColor(android.graphics.Color.TRANSPARENT);
        // layoutView.setBoxBackgroundColor(android.graphics.Color.TRANSPARENT);
        // editText.setBackgroundColor(android.graphics.Color.TRANSPARENT);
        // editText.setBackground(null);
        if (layoutIdName === 'material_text_field') {
            layoutView.setBoxBackgroundColor(android.graphics.Color.TRANSPARENT);
            editText.setBackground(null);
            // editText.setPadding(0, layout.toDevicePixels(20), 0, layout.toDevicePixels(6));
        }
        // this.style.borderTopLeftRadius = { unit: 'px', value: this.layoutView.getBoxCornerRadiusTopStart() };
        // this.style.borderTopRightRadius = { unit: 'px', value: this.layoutView.getBoxCornerRadiusTopEnd() };
        // this.style.borderBottomLeftRadius = { unit: 'px', value: this.layoutView.getBoxCornerRadiusBottomStart() };
        // this.style.borderBottomRightRadius = { unit: 'px', value: this.layoutView.getBoxCornerRadiusBottomEnd() };
        editText.owner = new WeakRef(this);
        // this.editText.setSupportBackgroundTintList(android.content.res.ColorStateList.valueOf(new Color('orange').android));
        layoutView.setFocusableInTouchMode(true); // to prevent focus on view creation
        // layout.setFocusable(true);
        // layout.setAddStatesFromChildren(true);
        // layout.setDescendantFocusability(android.view.ViewGroup.FOCUS_AFTER_DESCENDANTS);
        // layout.setDescendantFocusability(android.view.ViewGroup.FOCUS_AFTER_DESCENDANTS);
        return layoutView;
    }

    [borderBottomLeftRadiusProperty.getDefault]() {
        return this.layoutView.getBoxCornerRadiusTopStart();
    }

    // _redrawNativeBackground(value: android.graphics.drawable.Drawable | Background): void {
    //     // trick for the background to be applied to the editText so that it removes the border line
    //     this.drawingBackground = true;
    //     super._redrawNativeBackground(value);
    //     this.drawingBackground = false;
    // }

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

        this.layoutView.setDefaultHintTextColor(getDefaultHintTextColorStateList(floatingColor, placeholderColor));
    }
    [floatingColorProperty.setNative](value: Color) {
        const floatingColor = value instanceof Color ? value.android : value;
        const placeholderColor = this.placeholderColor instanceof Color ? this.placeholderColor.android : undefined;
        this.layoutView.setDefaultHintTextColor(getDefaultHintTextColorStateList(floatingColor, placeholderColor));
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

    [strokeColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        this.layoutView.setBoxStrokeColor(color);
        // this.editText.setBackgroundTintList(android.content.res.ColorStateList.valueOf(color));
    }
    [backgroundInternalProperty.setNative](value: Background) {
        if (this.nativeViewProtected) {
            if (value instanceof android.graphics.drawable.Drawable) {
                this.nativeViewProtected.setBackgroundDrawable(value);
            } else {
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

                // TODO: for now no control over borderRadius because we can't define the default value
                // this.borderTopLeftRadius = value.borderTopLeftRadius;
                // this.borderTopRightRadius = value.borderTopRightRadius;
                // this.borderBottomLeftRadius = value.borderBottomLeftRadius;
                // this.borderBottomRightRadius = value.borderBottomRightRadius;
                // this.layoutView.setBoxCornerRadii(this.borderTopLeftRadius, this.borderTopRightRadius, this.borderBottomLeftRadius, this.borderBottomRightRadius);
            }
        }
    }
}
//
