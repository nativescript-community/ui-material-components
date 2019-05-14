import { ButtonBase } from './button-common';
import { getRippleColor } from 'nativescript-material-core/core';

import * as utils from 'tns-core-modules/utils/utils';
import { elevationHighlightedProperty, elevationProperty, rippleColorProperty, translationZHighlightedProperty } from 'nativescript-material-core/cssproperties';
import { Background } from 'tns-core-modules/ui/styling/background';
import { getEnabledColorStateList, getRippleColorStateList } from 'nativescript-material-core/android/utils';
import { createStateListAnimator } from 'nativescript-material-core/android/utils';
import { backgroundInternalProperty } from 'tns-core-modules/ui/styling/style-properties';
import { Color } from 'tns-core-modules/color';
import { Length } from 'tns-core-modules/ui/styling/style-properties';

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

    public createNativeView() {
        let style = 'AppThemeMaterialButton';
        if (this.variant === 'text' || this.variant === 'outline') {
            style = 'AppThemeTextMaterialButton';
        } else if (this.variant === 'flat') {
            style = 'AppThemeFlatMaterialButton';
        } else {
            // we need to set the default through css or user would not be able to overload it through css...
            this.style['css:margin-left'] = 10;
            this.style['css:margin-right'] = 10;
            this.style['css:margin-top'] = 12;
            this.style['css:margin-bottom'] = 12;
        }
        const view = new android.support.design.button.MaterialButton(new android.view.ContextThemeWrapper(this._context, utils.ad.resources.getId(':style/' + style)));
        // view.setElevation(3);
        // view.setTranslationZ(0);
        if (!this.variant) {
            if (android.os.Build.VERSION.SDK_INT >= 21) {
                createStateListAnimator(this, view);
            }
        }

        if (this.variant === 'outline') {
            view.setStrokeWidth(1);
            view.setStrokeColor(android.content.res.ColorStateList.valueOf(new Color('gray').android));
        }
        return view;
    }
    [rippleColorProperty.setNative](color: Color) {
        if (isPreLollipop()) {
            this.nativeViewProtected.setRippleColor(getRippleColorStateList(getRippleColor(color)));
        } else {
            this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(color.android));
        }
    }

    [elevationProperty.setNative](value: number) {
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            createStateListAnimator(this, this.nativeViewProtected);
        } else {
            this.nativeViewProtected.setElevation(value);
        }
    }
    [translationZHighlightedProperty.setNative](value: number) {
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            createStateListAnimator(this, this.nativeViewProtected);
        } else {
            this.nativeViewProtected.setTranslationZ(value);
        }
    }
    [elevationHighlightedProperty.setNative](value: number) {
        console.log('elevationHighlightedProperty', value);
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            createStateListAnimator(this, this.nativeViewProtected);
        }
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
