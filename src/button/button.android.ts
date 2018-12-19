import { ButtonBase } from './button-common';

import * as utils from 'tns-core-modules/utils/utils';
import {
    backgroundInternalProperty,
    borderBottomLeftRadiusProperty,
    borderBottomRightRadiusProperty,
    borderTopLeftRadiusProperty,
    borderTopRightRadiusProperty,
    Color,
    Length
} from 'tns-core-modules/ui/page/page';
import { elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { Background } from 'tns-core-modules/ui/styling/background';
import { getEnabledColorStateList, getRippleColorStateList } from 'nativescript-material-core/android/utils';

let PRE_LOLLIPOP: boolean = undefined;

function isPreLollipop() {
    if (PRE_LOLLIPOP === undefined) {
        PRE_LOLLIPOP = android.os.Build.VERSION.SDK_INT < 21;
    }
    return PRE_LOLLIPOP;
}

export class Button extends ButtonBase {
    nativeViewProtected: android.support.design.button.MaterialButton;

    public isLoading: boolean;

    get android(): android.support.design.button.MaterialButton {
        return this.nativeView;
    }

    getRippleColor(color: Color) {
        return new Color(120, color.r, color.g, color.b).android; // default alpha is 0.14
    }

    public createNativeView() {
        let style = 'AppThemeMaterialButton';
        if (this.variant === 'text' || this.variant === 'outline') {
            style = 'AppThemeTextMaterialButton';
        } else if (this.variant === 'flat') {
            style = 'AppThemeFlatMaterialButton';
        }
        const view = new android.support.design.button.MaterialButton(new android.view.ContextThemeWrapper(this._context, utils.ad.resources.getId(':style/' + style)));
        if (this.variant === 'outline') {
            view.setStrokeWidth(1);
            view.setStrokeColor(android.content.res.ColorStateList.valueOf(new Color('gray').android));
        }
        return view;
    }
    [rippleColorProperty.setNative](color: Color) {
        if (isPreLollipop()) {
            this.nativeViewProtected.setRippleColor(getRippleColorStateList(this.getRippleColor(color)));
        } else {
            this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(color.android));
        }
    }

    [elevationProperty.setNative](value: number) {
        android.support.v4.view.ViewCompat.setElevation(this.nativeViewProtected, value);
    }

    setCornerRadius(value) {
        const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this.nativeViewProtected.setCornerRadius(newValue);
    }
    [borderBottomLeftRadiusProperty.setNative](value) {
        this.setCornerRadius(value);
    }
    [borderBottomRightRadiusProperty.setNative](value) {
        this.setCornerRadius(value);
    }
    [borderTopLeftRadiusProperty.setNative](value) {
        this.setCornerRadius(value);
    }
    [borderTopRightRadiusProperty.setNative](value) {
        this.setCornerRadius(value);
    }
    [backgroundInternalProperty.setNative](value: android.graphics.drawable.Drawable | Background) {
        if (this.nativeViewProtected) {
            if (value instanceof android.graphics.drawable.Drawable) {
                this.nativeViewProtected.setBackgroundDrawable(value);
            } else {
                if (value.color) {
                    // console.log(
                    //     "set background color",
                    //     value.color,
                    //     this.variant
                    // )
                    // if (isPreLollipop()) {
                    this.nativeViewProtected.setBackgroundTintList(getEnabledColorStateList(value.color.android, this.variant));
                    // } else {
                    //     this.nativeViewProtected.setBackgroundTintList(
                    //         android.content.res.ColorStateList.valueOf(
                    //             value.color.android
                    //         )
                    //     )
                    // }
                }
            }
        }
    }
}
