import { VerticalTextAlignment, verticalTextAlignmentProperty } from '@nativescript-community/text';
import { themer } from '@nativescript-community/ui-material-core';
import { getColorStateList, getFullColorStateList, getHorizontalGravity, getVerticalGravity, inflateLayout } from '@nativescript-community/ui-material-core/android/utils';
import {
    counterMaxLengthProperty,
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
    CoreTypes,
    Font,
    Utils,
    backgroundInternalProperty,
    borderBottomLeftRadiusProperty,
    fontInternalProperty,
    hintProperty,
    placeholderColorProperty,
    textAlignmentProperty
} from '@nativescript/core';
import { TextViewBase } from './textview.common';

import { accessibilityIdentifierProperty } from '@nativescript/core/accessibility/accessibility-properties';
import { testIDProperty } from '@nativescript/core/ui/core/view/view-common';

let FrameLayoutLayoutParams: typeof android.widget.FrameLayout.LayoutParams;
let filledId;
let outlineId;
let noneId;
export class TextView extends TextViewBase {
    editText: com.nativescript.material.textview.TextViewInputEditText;
    layoutView: com.google.android.material.textfield.TextInputLayout;

    constructor() {
        super();
    }

    //@ts-ignore
    get nativeTextViewProtected() {
        return this.editText;
    }

    //@ts-ignore
    get nativeViewProtected() {
        return this.layoutView;
    }
    set nativeViewProtected(view) {
        this.layoutView = view;
    }

    public createNativeView() {
        let layoutIdString = 'ns_material_text_view';
        const variant = this.variant;
        let needsTransparent = false;
        if (variant === 'filled') {
            layoutIdString = 'ns_material_text_view_filled';
        } else if (variant === 'outline') {
            layoutIdString = 'ns_material_text_view_outline';
        } else {
            needsTransparent = true;
        }

        let layoutView: com.google.android.material.textfield.TextInputLayout;
        let editText: com.nativescript.material.textview.TextViewInputEditText;

        if (layoutIdString) {
            layoutView = this.layoutView = inflateLayout(this._context, layoutIdString) as com.google.android.material.textfield.TextInputLayout;
            editText = this.editText = layoutView.getEditText() as com.nativescript.material.textview.TextViewInputEditText;
        } else {
            layoutView = this.layoutView = new com.google.android.material.textfield.TextInputLayout(this._context);
            editText = this.editText = new com.nativescript.material.textview.TextViewInputEditText(layoutView.getContext());
            if (!FrameLayoutLayoutParams) {
                FrameLayoutLayoutParams = android.widget.FrameLayout.LayoutParams;
            }
            editText.setLayoutParams(new android.widget.LinearLayout.LayoutParams(FrameLayoutLayoutParams.MATCH_PARENT, FrameLayoutLayoutParams.MATCH_PARENT));
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
        try {
            this.layoutView.setHint(text);
        } catch (error) {}
    }

    [helperColorProperty.setNative](value) {
        const color = value instanceof Color ? value.android : value;
        this.layoutView.setHelperTextColor(getColorStateList(color));
    }
    [placeholderColorProperty.setNative](value: Color) {
        const placeholderColor = value instanceof Color ? value.android : value;
        const floatingColor = this.floatingColor instanceof Color ? this.floatingColor.android : placeholderColor;

        this.layoutView.setDefaultHintTextColor(getFullColorStateList(floatingColor, placeholderColor));
    }

    [floatingColorProperty.setNative](value: Color) {
        const floatingColor = value instanceof Color ? value.android : value;
        const placeholderColor = this.placeholderColor instanceof Color ? this.placeholderColor.android : undefined;
        this.layoutView.setDefaultHintTextColor(getFullColorStateList(floatingColor, placeholderColor));
    }

    [floatingInactiveColorProperty.setNative](value: Color) {
        const placeholderColor = value instanceof Color ? value.android : value;
        const primaryColor = themer.getPrimaryColor();
        const floatingColor = this.floatingColor || (primaryColor instanceof Color ? primaryColor : new Color(primaryColor));
        this.layoutView.setDefaultHintTextColor(getFullColorStateList(floatingColor instanceof Color ? floatingColor.android : floatingColor, placeholderColor));
    }

    public _configureEditText(editText: android.widget.EditText): void {
        editText.setInputType(
            android.text.InputType.TYPE_CLASS_TEXT |
                android.text.InputType.TYPE_TEXT_VARIATION_NORMAL |
                android.text.InputType.TYPE_TEXT_FLAG_CAP_SENTENCES |
                android.text.InputType.TYPE_TEXT_FLAG_MULTI_LINE |
                android.text.InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS
        );
        editText.setGravity(android.view.Gravity.TOP | android.view.Gravity.START);
    }

    public resetNativeView(): void {
        super.resetNativeView();
        this.nativeTextViewProtected.setGravity(android.view.Gravity.TOP | android.view.Gravity.START);
    }

    public requestFocus() {
        const layoutView = this.layoutView;
        if (layoutView) {
            // because of setFocusableInTouchMode fix we need this for focus to work
            const oldDesc = layoutView.getDescendantFocusability();
            layoutView.setDescendantFocusability(android.view.ViewGroup.FOCUS_AFTER_DESCENDANTS);
            // }
            layoutView.requestFocus();
            setTimeout(() => {
                if (this.layoutView) {
                    layoutView.setDescendantFocusability(oldDesc);
                    Utils.android.showSoftInput(this.nativeTextViewProtected);
                }
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
        (this.layoutView as any).setErrorTextColor(getColorStateList(color));
    }

    [helperProperty.setNative](value: string) {
        (this.layoutView as any).setHelperText(value ? value : null);
    }
    [errorProperty.setNative](value: string) {
        const layoutView = this.layoutView;
        layoutView.setError(value ? value : null);
        layoutView.setErrorEnabled(!!value);
    }

    [counterMaxLengthProperty.setNative](value: number) {
        const layoutView = this.layoutView;
        layoutView.setCounterEnabled(value > 0);
        layoutView.setCounterMaxLength(value);
    }

    [floatingProperty.setNative](value: boolean) {
        this.layoutView.setHintEnabled(!!value);
    }

    [strokeInactiveColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        const layoutView = this.layoutView;
        if (layoutView.setBoxStrokeColorStateList) {
            const activeColor = this.strokeColor instanceof Color ? this.strokeColor.android : layoutView.getBoxStrokeColor();
            const disabledColor = this.strokeDisabledColor instanceof Color ? this.strokeDisabledColor.android : undefined;
            const colorStateList = getFullColorStateList(activeColor, color, disabledColor);
            layoutView.setBoxStrokeColorStateList(colorStateList);
        }
    }

    [strokeDisabledColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        const layoutView = this.layoutView;
        if (layoutView.setBoxStrokeColorStateList) {
            const activeColor = this.strokeColor instanceof Color ? this.strokeColor.android : layoutView.getBoxStrokeColor();
            const inactiveColor = this.strokeInactiveColor instanceof Color ? this.strokeInactiveColor.android : activeColor;
            const colorStateList = getFullColorStateList(activeColor, inactiveColor, color);
            layoutView.setBoxStrokeColorStateList(colorStateList);
        }
    }

    [strokeColorProperty.setNative](value: Color) {
        const color = value instanceof Color ? value.android : value;
        const layoutView = this.layoutView;
        if (layoutView.setBoxStrokeColorStateList) {
            const inactiveColor = this.strokeInactiveColor instanceof Color ? this.strokeInactiveColor.android : color;
            const disabledColor = this.strokeDisabledColor instanceof Color ? this.strokeDisabledColor.android : undefined;
            const colorStateList = getFullColorStateList(color, inactiveColor, disabledColor);
            if (colorStateList) {
                layoutView.setBoxStrokeColorStateList(colorStateList);
            }
        } else {
            layoutView.setBoxStrokeColor(color);
        }
    }
    [backgroundInternalProperty.setNative](value: Background) {
        switch (this.variant) {
            case 'none':
            case 'filled':
                super[backgroundInternalProperty.setNative](value);
                if (value.color) {
                    const background = this.editText.getBackground();
                    const layoutView = this.layoutView;
                    if (background instanceof com.google.android.material.shape.MaterialShapeDrawable) {
                        background.setTintList(getColorStateList(value.color.android));
                        layoutView.setBoxBackgroundColor(android.graphics.Color.TRANSPARENT);
                        layoutView.setBackgroundColor(android.graphics.Color.TRANSPARENT);
                    } else {
                        layoutView.setBoxBackgroundColor(value.color.android);
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
                    const layoutView = this.layoutView;
                    if (background instanceof com.google.android.material.shape.MaterialShapeDrawable) {
                        background.setTintList(getColorStateList(value.color.android));
                        layoutView.setBoxBackgroundColor(android.graphics.Color.TRANSPARENT);
                        layoutView.setBackgroundColor(android.graphics.Color.TRANSPARENT);
                    } else {
                        layoutView.setBoxBackgroundColor(value.color.android);
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
        if (!this.formattedText || !(value instanceof Font)) {
            this.nativeViewProtected.setTypeface(value instanceof Font ? value.getAndroidTypeface() : value);
            this.nativeTextViewProtected.setTypeface(value instanceof Font ? value.getAndroidTypeface() : value);
        }
    }
    // [paddingTopProperty.setNative](value: CoreTypes.LengthType) {
    //     org.nativescript.widgets.ViewHelper.setPaddingTop(this.nativeViewProtected, Length.toDevicePixels(value, 0) + Length.toDevicePixels(this.style.borderTopWidth, 0));
    // }
    // [paddingRightProperty.setNative](value: CoreTypes.LengthType) {
    //     org.nativescript.widgets.ViewHelper.setPaddingRight(this.nativeViewProtected, Length.toDevicePixels(value, 0) + Length.toDevicePixels(this.style.borderRightWidth, 0));
    // }
    // [paddingBottomProperty.setNative](value: CoreTypes.LengthType) {
    //     org.nativescript.widgets.ViewHelper.setPaddingBottom(this.nativeViewProtected, Length.toDevicePixels(value, 0) + Length.toDevicePixels(this.style.borderBottomWidth, 0));
    // }
    // [paddingLeftProperty.setNative](value: CoreTypes.LengthType) {
    //     org.nativescript.widgets.ViewHelper.setPaddingLeft(this.nativeViewProtected, Length.toDevicePixels(value, 0) + Length.toDevicePixels(this.style.borderLeftWidth, 0));
    // }
    [textAlignmentProperty.setNative](value: CoreTypes.TextAlignmentType) {
        this.nativeTextViewProtected.setGravity(getHorizontalGravity(value) | getVerticalGravity(this.verticalTextAlignment));
    }
    [verticalTextAlignmentProperty.setNative](value: VerticalTextAlignment) {
        this.nativeTextViewProtected.setGravity(getHorizontalGravity(this.textAlignment) | getVerticalGravity(value));
    }
    [testIDProperty.setNative](value: string): void {
        this.setAccessibilityIdentifier(this.nativeViewProtected, value);
    }

    [accessibilityIdentifierProperty.setNative](value: string): void {
        this.setAccessibilityIdentifier(this.nativeViewProtected, value);
    }
}
