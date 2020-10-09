import { getLayout, stateSets } from '@nativescript-community/ui-material-core/android/utils';
import {
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
import { Background, Color, Font, Utils, backgroundInternalProperty, borderBottomLeftRadiusProperty, fontInternalProperty, hintProperty, placeholderColorProperty, profile } from '@nativescript/core';
import { secureProperty } from '@nativescript/core/ui/text-field';
import { TextFieldBase } from './textfield.common';

function getColorStateList(activeColor: number, inactiveColor = 1627389952, disabledColor = 1627389952) {
    const states = Array.create('[I', 3);
    states[0] = stateSets.FOCUSED_STATE_SET;
    states[1] = Array.create('int', 0);
    states[2] = stateSets.BACKGROUND_DISABLED_STATE;
    const colors = Array.create('int', 3);
    colors[0] = activeColor;
    colors[1] = inactiveColor;
    colors[2] = disabledColor;
    return new android.content.res.ColorStateList(states, colors);
}

let LayoutInflater: typeof android.view.LayoutInflater;
let FrameLayoutLayoutParams: typeof android.widget.FrameLayout.LayoutParams;
let filledId;
let outlineId;
let noneId;
export class TextField extends TextFieldBase {
    editText: com.nativescript.material.textfield.TextInputEditText;
    layoutView: com.google.android.material.textfield.TextInputLayout;

    constructor() {
        super();
    }
    get nativeTextViewProtected() {
        return this.editText;
    }

    drawingBackground = false;
    get nativeViewProtected() {
        return this.layoutView;
    }
    set nativeViewProtected(view) {
        this.layoutView = view;
    }

    @profile
    public createNativeView() {
        let layoutId;
        const variant = this.variant;
        let needsTransparent = false;
        if (variant === 'filled') {
            if (!filledId) {
                filledId = getLayout('material_text_field_filled');
            }
            layoutId = filledId;
        } else if (variant === 'outline') {
            if (!outlineId) {
                outlineId = getLayout('material_text_field_outline');
            }
            layoutId = outlineId;
        } else {
            if (!noneId) {
                noneId = getLayout('material_text_field');
            }
            layoutId = noneId;
            needsTransparent = true;
        }

        let layoutView: com.google.android.material.textfield.TextInputLayout;
        let editText: com.nativescript.material.textfield.TextInputEditText;
        if (layoutId !== 0) {
            if (!LayoutInflater) {
                LayoutInflater = android.view.LayoutInflater;
            }
            layoutView = this.layoutView = LayoutInflater.from(this._context).inflate(layoutId, null) as com.google.android.material.textfield.TextInputLayout;
            editText = this.editText = layoutView.getEditText() as com.nativescript.material.textfield.TextInputEditText;
        } else {
            layoutView = this.layoutView = new com.google.android.material.textfield.TextInputLayout(this._context);
            editText = this.editText = new com.nativescript.material.textfield.TextInputEditText(layoutView.getContext());
            if (!FrameLayoutLayoutParams) {
                FrameLayoutLayoutParams = android.widget.FrameLayout.LayoutParams;
            }
            editText.setLayoutParams(new android.widget.LinearLayout.LayoutParams(FrameLayoutLayoutParams.MATCH_PARENT, FrameLayoutLayoutParams.WRAP_CONTENT));
            layoutView.addView(editText);
        }
        if (needsTransparent) {
            layoutView.setBoxBackgroundColor(0); // android.graphics.Color.TRANSPARENT
            editText.setBackground(null);
        }
        // layoutView.setFocusableInTouchMode(true); // to prevent focus on view creation
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
    [helperColorProperty.setNative](value) {
        const color = value instanceof Color ? value.android : value;
        this.layoutView.setHelperTextColor(android.content.res.ColorStateList.valueOf(color));
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
                Utils.android.showSoftInput(this.nativeTextViewProtected);
                // this.focus();
            }, 0);
        }

        return false;
    }
    public clearFocus() {
        if (this.nativeTextViewProtected) {
            this.nativeTextViewProtected.fullClearFocus();
        }
    }

    public setSelection(start: number, stop?: number) {
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

    [counterMaxLengthProperty.setNative](value: number) {
        this.layoutView.setCounterEnabled(value > 0);
        this.layoutView.setCounterMaxLength(value);
    }

    [secureProperty.setNative](value) {
        const cursorPos = this.editText.getSelectionStart();
        super[secureProperty.setNative](value);
        this.editText.setSelection(cursorPos);
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
    [strokeDisabledColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        // @ts-ignore This check can be removed once this package is updated to rely on 1.2.0 of material components
        if (this.layoutView.setBoxStrokeColorStateList) {
            const activeColor = this.strokeColor instanceof Color ? this.strokeColor.android : this.layoutView.getBoxStrokeColor();
            const inactiveColor = this.strokeInactiveColor instanceof Color ? this.strokeColor.android : this.layoutView.getBoxStrokeColor();
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

    [digitsProperty.setNative](value: string) {
        if (value && value.length > 0) {
            this.nativeTextViewProtected.setKeyListener(android.text.method.DigitsKeyListener.getInstance(value));
        } else {
            this.nativeTextViewProtected.setKeyListener(null);
        }
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
                if (value.borderTopColor) {
                    this.nativeViewProtected.setBoxStrokeColor(value.borderTopColor.android);
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
                    this.nativeViewProtected.setBoxStrokeColor(value.borderTopColor.android);
                }
                break;
            }
        }
    }

    [fontInternalProperty.setNative](value: Font | UIFont) {
        super[fontInternalProperty.setNative](value);
        if (!this.formattedText || !(value instanceof Font)) {
            this.nativeViewProtected.setTypeface(value instanceof Font ? value.getAndroidTypeface() : value);
        }
    }
}
//
