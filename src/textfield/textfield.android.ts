import { VerticalTextAlignment, verticalTextAlignmentProperty } from '@nativescript-community/text';
import { themer } from '@nativescript-community/ui-material-core';
import { getColorStateList, getFullColorStateList, getHorizontalGravity, getLayout, getVerticalGravity } from '@nativescript-community/ui-material-core/android/utils';
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
    strokeInactiveColorProperty,
    strokeWidthFocusedProperty,
    strokeWidthProperty
} from '@nativescript-community/ui-material-core/textbase/cssproperties';
import {
    Background,
    Color,
    CoreTypes,
    Font,
    Length,
    Utils,
    backgroundInternalProperty,
    borderBottomLeftRadiusProperty,
    editableProperty,
    fontInternalProperty,
    hintProperty,
    paddingBottomProperty,
    paddingLeftProperty,
    paddingRightProperty,
    paddingTopProperty,
    placeholderColorProperty,
    profile,
    textAlignmentProperty
} from '@nativescript/core';
import { secureProperty } from '@nativescript/core/ui/text-field';
import { TextFieldBase } from './textfield.common';

let LayoutInflater: typeof android.view.LayoutInflater;
let FrameLayoutLayoutParams: typeof android.widget.FrameLayout.LayoutParams;
let filledId;
let outlineId;
let noneId;
let inflater;
export class TextField extends TextFieldBase {
    editText: com.nativescript.material.textfield.TextInputEditText;
    layoutView: com.google.android.material.textfield.TextInputLayout;

    constructor() {
        super();
    }
    // @ts-ignore
    get nativeTextViewProtected() {
        return this.editText;
    }

    // @ts-ignore
    get nativeViewProtected() {
        return this.layoutView;
    }
    set nativeViewProtected(view) {
        this.layoutView = view;
    }

    @profile
    public createNativeView() {
        let layoutId = 0;
        const variant = this.variant;
        let needsTransparent = false;
        if (variant === 'filled') {
            if (!filledId) {
                filledId = getLayout(this._context, 'material_text_field_filled');
            }
            layoutId = filledId;
        } else if (variant === 'outline') {
            if (!outlineId) {
                outlineId = getLayout(this._context, 'material_text_field_outline');
            }
            layoutId = outlineId;
        } else {
            if (!noneId) {
                noneId = getLayout(this._context, 'material_text_field');
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
            if (!inflater) {
                inflater = LayoutInflater.from(this._context);
            }
            layoutView = this.layoutView = inflater.inflate(layoutId, null) as com.google.android.material.textfield.TextInputLayout;
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
            // layoutView.setHintEnabled(false);
        }
        try {
            layoutView.setErrorIconDrawable(null);
        } catch (error) {}

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
        try {
            this.layoutView.setHint(text);
        } catch (error) {}
    }

    [placeholderColorProperty.setNative](value: Color) {
        const placeholderColor = value instanceof Color ? value.android : value;
        const floatingColor = this.floatingColor instanceof Color ? this.floatingColor.android : placeholderColor;
        this.layoutView.setDefaultHintTextColor(getFullColorStateList(floatingColor, placeholderColor));
    }

    [floatingColorProperty.setNative](value: Color) {
        const floatingColor = value instanceof Color ? value.android : value;
        const placeholderColor = this.floatingInactiveColor instanceof Color ? this.floatingInactiveColor.android : undefined;
        this.layoutView.setHintTextColor(getFullColorStateList(floatingColor, placeholderColor));
    }

    [floatingInactiveColorProperty.setNative](value: Color) {
        const floatingInactiveColor = value instanceof Color ? value.android : value;

        const primaryColor = themer.getPrimaryColor();
        const floatingColor = this.floatingColor || (primaryColor instanceof Color ? primaryColor : new Color(primaryColor));
        this.layoutView.setHintTextColor(getFullColorStateList(floatingColor instanceof Color ? floatingColor.android : floatingColor, floatingInactiveColor));
    }
    [helperColorProperty.setNative](value) {
        const color = value instanceof Color ? value.android : value;
        this.layoutView.setHelperTextColor(getColorStateList(color));
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
        const nColor = getColorStateList(color);
        this.layoutView.setErrorTextColor(nColor);
        // TODO: find why it fails in cli build
        //@ts-ignore
        this.layoutView.setBoxStrokeErrorColor(nColor);
    }

    [helperProperty.setNative](value: string) {
        (this.layoutView as any).setHelperText(value ? value : null);
    }
    [errorProperty.setNative](value: string) {
        this.layoutView.setError(value ? value : null);
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
    [strokeWidthProperty.setNative](value: CoreTypes.LengthType) {
        // TODO: find why it fails in cli build
        //@ts-ignore
        this.layoutView.setBoxStrokeWidth(Length.toDevicePixels(value, 0));
    }

    [strokeWidthFocusedProperty.setNative](value: CoreTypes.LengthType) {
        // TODO: find why it fails in cli build
        //@ts-ignore
        this.layoutView.setBoxStrokeWidthFocused(Length.toDevicePixels(value, 0));
    }

    [strokeColorProperty.setNative](value: Color | string) {
        const color = value ? (value instanceof Color ? value.android : new Color(value).android) : null;
        // TODO: find why it fails in cli build
        //@ts-ignore
        if (this.layoutView.setBoxStrokeColorStateList) {
            const inactiveColor = this.strokeInactiveColor instanceof Color ? this.strokeInactiveColor.android : undefined;
            const disabledColor = this.strokeDisabledColor instanceof Color ? this.strokeDisabledColor.android : undefined;
            const colorStateList = getFullColorStateList(color, inactiveColor, disabledColor);
            //@ts-ignore
            this.layoutView.setBoxStrokeColorStateList(colorStateList);
        } else {
            this.layoutView.setBoxStrokeColor(color);
        }
    }

    [strokeInactiveColorProperty.setNative](value: Color | string) {
        const color = value ? (value instanceof Color ? value.android : new Color(value).android) : null;

        // TODO: find why it fails in cli build
        //@ts-ignore
        if (this.layoutView.setBoxStrokeColorStateList) {
            const activeColor = this.strokeColor instanceof Color ? this.strokeColor.android : this.layoutView.getBoxStrokeColor();
            const disabledColor = this.strokeDisabledColor instanceof Color ? this.strokeDisabledColor.android : undefined;
            const colorStateList = getFullColorStateList(activeColor, color, disabledColor);
            //@ts-ignore
            this.layoutView.setBoxStrokeColorStateList(colorStateList);
        }
    }

    [strokeDisabledColorProperty.setNative](value: Color | string) {
        const color = value ? (value instanceof Color ? value.android : new Color(value).android) : null;
        // TODO: find why it fails in cli build
        //@ts-ignore
        if (this.layoutView.setBoxStrokeColorStateList) {
            const activeColor = this.strokeColor instanceof Color ? this.strokeColor.android : this.layoutView.getBoxStrokeColor();
            const inactiveColor = this.strokeInactiveColor instanceof Color ? this.strokeInactiveColor.android : undefined;
            const colorStateList = getFullColorStateList(activeColor, inactiveColor, color);
            //@ts-ignore
            this.layoutView.setBoxStrokeColorStateList(colorStateList);
        }
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
                    const background = this.editText.getBackground();
                    if (background instanceof com.google.android.material.shape.MaterialShapeDrawable) {
                        background.setTintList(getColorStateList(value.color.android));
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
                    const background = this.editText.getBackground();
                    if (background instanceof com.google.android.material.shape.MaterialShapeDrawable) {
                        background.setTintList(getColorStateList(value.color.android));
                        this.layoutView.setBoxBackgroundColor(android.graphics.Color.TRANSPARENT);
                        this.layoutView.setBackgroundColor(android.graphics.Color.TRANSPARENT);
                    } else {
                        this.layoutView.setBoxBackgroundColor(value.color.android);
                    }
                }
                if (value.borderTopColor) {
                    this.nativeViewProtected.setBoxStrokeColor(value.borderTopColor.android);
                }
                if (value.borderTopWidth) {
                    this.nativeViewProtected.setBoxStrokeColor(value.borderTopColor.android);
                }
                break;
            }
        }
    }

    [fontInternalProperty.setNative](value: Font | UIFont) {
        if (!this.formattedText || !(value instanceof Font)) {
            this.nativeViewProtected.setTypeface(value instanceof Font ? value.getAndroidTypeface() : value);
            this.nativeTextViewProtected.setTypeface(value instanceof Font ? value.getAndroidTypeface() : value);
        }
    }
    [paddingTopProperty.setNative](value: CoreTypes.LengthType) {
        org.nativescript.widgets.ViewHelper.setPaddingTop(
            this.nativeTextViewProtected,
            Utils.layout.toDeviceIndependentPixels(Length.toDevicePixels(value, 0) + Length.toDevicePixels(this.style.borderTopWidth, 0))
        );
    }
    [paddingRightProperty.setNative](value: CoreTypes.LengthType) {
        org.nativescript.widgets.ViewHelper.setPaddingRight(
            this.nativeTextViewProtected,
            Utils.layout.toDeviceIndependentPixels(Length.toDevicePixels(value, 0) + Length.toDevicePixels(this.style.borderRightWidth, 0))
        );
    }
    [paddingBottomProperty.setNative](value: CoreTypes.LengthType) {
        org.nativescript.widgets.ViewHelper.setPaddingBottom(
            this.nativeTextViewProtected,
            Utils.layout.toDeviceIndependentPixels(Length.toDevicePixels(value, 0) + Length.toDevicePixels(this.style.borderBottomWidth, 0))
        );
    }
    [paddingLeftProperty.setNative](value: CoreTypes.LengthType) {
        org.nativescript.widgets.ViewHelper.setPaddingLeft(
            this.nativeTextViewProtected,
            Utils.layout.toDeviceIndependentPixels(Length.toDevicePixels(value, 0) + Length.toDevicePixels(this.style.borderLeftWidth, 0))
        );
    }
    [textAlignmentProperty.setNative](value: CoreTypes.TextAlignmentType) {
        this.nativeTextViewProtected.setGravity(getHorizontalGravity(value) | getVerticalGravity(this.verticalTextAlignment));
    }
    [verticalTextAlignmentProperty.setNative](value: VerticalTextAlignment) {
        // TODO: not working for now
        this.nativeTextViewProtected.setGravity(getHorizontalGravity(this.textAlignment) | getVerticalGravity(value));
    }

    [editableProperty.setNative](value: boolean) {
        super[editableProperty.setNative](value);
        const nativeView = this.nativeTextViewProtected;
        nativeView.setFocusable(value);
    }
}
//
