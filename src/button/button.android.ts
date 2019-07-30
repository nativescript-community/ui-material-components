import { createStateListAnimator, getEnabledColorStateList, getLayout, getRippleColorStateList, isPostLollipop } from 'nativescript-material-core/android/utils';
import { getRippleColor } from 'nativescript-material-core/core';
import { dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/color';
import { Background } from 'tns-core-modules/ui/styling/background';
import { androidDynamicElevationOffsetProperty, androidElevationProperty, backgroundInternalProperty, Length } from 'tns-core-modules/ui/styling/style-properties';
import { ButtonBase } from './button-common';

declare module 'tns-core-modules/ui/styling/style-properties' {
    const androidElevationProperty;
    const androidDynamicElevationOffsetProperty;
}

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
        // if (isPostLollipop()) {
            // this.nativeViewProtected.setRippleColor(getRippleColorStateList(getRippleColor(color)));
        // } else {
            this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(color.android));
        // }
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
}
