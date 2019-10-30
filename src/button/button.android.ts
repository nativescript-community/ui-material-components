import { createStateListAnimator, getEnabledColorStateList, getLayout, isPostLollipop } from 'nativescript-material-core/android/utils';
import { dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty, verticalTextAlignmentProperty } from 'nativescript-material-core/cssproperties';
import { Color } from '@nativescript/core/color';
import { Background } from '@nativescript/core/ui/styling/background';
import { androidDynamicElevationOffsetProperty, androidElevationProperty, backgroundInternalProperty, Length } from '@nativescript/core/ui/styling/style-properties';
import { ButtonBase } from './button-common';
import { VerticalTextAlignment } from 'nativescript-material-core';

export class Button extends ButtonBase {
    nativeViewProtected: com.google.android.material.button.MaterialButton;

    public isLoading: boolean;

    get android(): com.google.android.material.button.MaterialButton {
        return this.nativeView;
    }

    public createNativeView() {
        let layoutIdName = 'material_button';
        if (this.variant === 'text' || this.variant === 'outline') {
            layoutIdName = 'material_button_text';
        } else if (this.variant === 'flat') {
            layoutIdName = 'material_button_flat';
        } else {
            // contained
            // we need to set the default through css or user would not be able to overload it through css...
            this.style['css:margin-left'] = 10;
            this.style['css:margin-right'] = 10;
            this.style['css:margin-top'] = 12;
            this.style['css:margin-bottom'] = 12;
        }
        const layoutId = getLayout(layoutIdName);
        const view = android.view.LayoutInflater.from(this._context).inflate(layoutId, null, false) as com.google.android.material.button.MaterialButton;

        if (this.variant === 'outline') {
            view.setStrokeWidth(1);
            view.setStrokeColor(android.content.res.ColorStateList.valueOf(new Color('gray').android));
        }
        return view;
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(color.android));
    }

    getDefaultElevation(): number {
        return 2; // 2dp @dimen/mtrl_btn_elevation
    }

    getDefaultDynamicElevationOffset(): number {
        return 6; // 6dp @dimen/mtrl_btn_pressed_z
    }

    [elevationProperty.setNative](value: number) {
        if (isPostLollipop()) {
            createStateListAnimator(this, this.nativeViewProtected);
        } else {
            this.nativeViewProtected.setElevation(value);
        }
    }
    [dynamicElevationOffsetProperty.setNative](value: number) {
        if (isPostLollipop()) {
            createStateListAnimator(this, this.nativeViewProtected);
        } else {
            this.nativeViewProtected.setTranslationZ(value);
        }
    }
    [androidElevationProperty.setNative](value: number) {
        // override to prevent override of elevation
    }
    [androidDynamicElevationOffsetProperty.setNative](value: number) {
        // override to prevent override of dynamicElevationOffset
    }

    setCornerRadius(value) {
        const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this.nativeViewProtected.setCornerRadius(newValue);
    }
    setStrokeWidth(value) {
        const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this.nativeViewProtected.setStrokeWidth(newValue);
    }
    [backgroundInternalProperty.setNative](value: android.graphics.drawable.Drawable | Background) {
        if (this.nativeViewProtected) {
            if (value instanceof android.graphics.drawable.Drawable) {
                this.nativeViewProtected.setBackgroundDrawable(value);
            } else {
                if (value.color) {
                    this.nativeViewProtected.setBackgroundTintList(getEnabledColorStateList(value.color.android, this.variant));
                }
                this.setCornerRadius(value.borderTopLeftRadius);
                this.nativeViewProtected.setStrokeWidth(value.borderTopWidth);
                if (value.borderTopColor) {
                    this.nativeViewProtected.setStrokeColor(android.content.res.ColorStateList.valueOf(value.borderTopColor.android));
                }
            }
        }
    }

    [verticalTextAlignmentProperty.setNative](value: VerticalTextAlignment) {
        const horizontalGravity = this.nativeTextViewProtected.getGravity() & android.view.Gravity.HORIZONTAL_GRAVITY_MASK;
        switch (value) {
            case 'initial':
            case 'top':
                this.nativeTextViewProtected.setGravity(android.view.Gravity.TOP | horizontalGravity);
                break;
            case 'middle':
                this.nativeTextViewProtected.setGravity(android.view.Gravity.CENTER_VERTICAL | horizontalGravity);
                break;

            case 'bottom':
                this.nativeTextViewProtected.setGravity(android.view.Gravity.BOTTOM | horizontalGravity);
                break;
        }
    }
}
