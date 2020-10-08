import { VerticalTextAlignment, verticalTextAlignmentProperty } from '@nativescript-community/text';
import { dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty } from '@nativescript-community/ui-material-core';
import { createStateListAnimator, getLayout, isPostLollipop } from '@nativescript-community/ui-material-core/android/utils';
import {
    Background,
    Color,
    Length,
    TextTransform,
    androidDynamicElevationOffsetProperty,
    androidElevationProperty,
    backgroundInternalProperty,
    profile,
    textTransformProperty,
} from '@nativescript/core';
import { ButtonBase } from './button-common';

let LayoutInflater: typeof android.view.LayoutInflater;

let textId;
let containedId;
let flatId;
let outlineId;
let grayColorStateList: android.content.res.ColorStateList;

export class Button extends ButtonBase {
    nativeViewProtected: com.google.android.material.button.MaterialButton;
    nativeTextViewProtected: com.google.android.material.button.MaterialButton;

    public isLoading: boolean;

    @profile
    public createNativeView() {
        let layoutId;
        const variant = this.variant;
        // let layoutIdName = 'material_button';
        if (variant === 'text') {
            if (!textId) {
                textId = getLayout('material_button_text');
            }
            layoutId = textId;
        } else if (variant === 'flat') {
            if (!flatId) {
                flatId = getLayout('material_button_flat');
            }
            layoutId = flatId;
        } else if (variant === 'outline') {
            if (!outlineId) {
                outlineId = getLayout('material_button_outline');
            }
            layoutId = outlineId;
        } else {
            if (!containedId) {
                containedId = getLayout('material_button');
            }
            layoutId = containedId;
            // contained
            // we need to set the default through css or user would not be able to overload it through css...
            this.style['css:margin-left'] = 10;
            this.style['css:margin-right'] = 10;
            this.style['css:margin-top'] = 12;
            this.style['css:margin-bottom'] = 12;
        }
        // const layoutId = getLayout(layoutIdName);
        if (!LayoutInflater) {
            LayoutInflater = android.view.LayoutInflater;
        }
        const view = android.view.LayoutInflater.from(this._context).inflate(layoutId, null, false) as com.google.android.material.button.MaterialButton;

        // if (variant === 'outline') {
        //     view.setStrokeWidth(1);
        //     if (!grayColorStateList) {
        //         grayColorStateList = android.content.res.ColorStateList.valueOf(new Color('gray').android);
        //     }
        //     view.setStrokeColor(grayColorStateList);
        // }
        return view;
    }

    // initNativeView() {
    //     TextBase.prototype.initNativeView.call(this);
    //     const nativeView = this.nativeViewProtected;
    //     const clickListener = new android.view.View.OnClickListener({
    //         onClick:()=>{
    //     this._emit(ButtonBase.tapEvent);
    //         }
    //     });
    //     nativeView.setOnClickListener(clickListener);
    //     (<any>nativeView).clickListener = clickListener;
    // }
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
            const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
            androidx.core.view.ViewCompat.setElevation(this.nativeViewProtected, newValue);
        }
    }
    [dynamicElevationOffsetProperty.setNative](value: number) {
        if (isPostLollipop()) {
            createStateListAnimator(this, this.nativeViewProtected);
        } else {
            const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
            androidx.core.view.ViewCompat.setTranslationZ(this.nativeViewProtected, newValue);
        }
    }
    [androidElevationProperty.setNative](value: number) {
        // override to prevent override of elevation
    }
    [androidDynamicElevationOffsetProperty.setNative](value: number) {
        // override to prevent override of dynamicElevationOffset
    }

    setCornerRadius(value) {
        // const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this.nativeViewProtected.setCornerRadius(value);
    }
    setStrokeWidth(value) {
        // const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this.nativeViewProtected.setStrokeWidth(value);
    }
    [textTransformProperty.setNative](value: TextTransform) {
        this.nativeViewProtected.setAllCaps(value !== 'none');
    }
    [backgroundInternalProperty.setNative](value: android.graphics.drawable.Drawable | Background) {
        const view = this.nativeTextViewProtected;
        if (view) {
            if (value instanceof android.graphics.drawable.Drawable) {
                view.setBackgroundDrawable(value);
            } else {
                if (value.color) {
                    // if (value.color.android === 0 && this.variant === 'flat') {
                    view.setBackgroundColor(value.color.android);
                    // } else {
                    // view.setBackgroundTintList(getEnabledColorStateList(value.color.android, this.variant));
                    // }
                }
                this.setCornerRadius(value.borderTopLeftRadius);
                view.setStrokeWidth(value.borderTopWidth);
                if (value.borderTopColor) {
                    view.setStrokeColor(android.content.res.ColorStateList.valueOf(value.borderTopColor.android));
                }
            }
        }
    }

    [verticalTextAlignmentProperty.setNative](value: VerticalTextAlignment) {
        const view = this.nativeTextViewProtected;
        const horizontalGravity = view.getGravity() & android.view.Gravity.HORIZONTAL_GRAVITY_MASK;
        switch (value) {
            case 'initial':
            case 'top':
                view.setGravity(android.view.Gravity.TOP | horizontalGravity);
                break;
            case 'middle':
                view.setGravity(android.view.Gravity.CENTER_VERTICAL | horizontalGravity);
                break;

            case 'bottom':
                view.setGravity(android.view.Gravity.BOTTOM | horizontalGravity);
                break;
        }
    }
}
