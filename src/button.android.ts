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
import { elevationProperty, rippleColorProperty } from './cssproperties';
import { Background } from 'tns-core-modules/ui/styling/background';

export class Button extends ButtonBase {
    nativeViewProtected: android.support.design.button.MaterialButton;

    public isLoading: boolean;

    get android(): android.support.design.button.MaterialButton {
        return this.nativeView;
    }
    public createNativeView() {
        let style = 'AppThemeMaterialButton';
        if (this.variant === 'text') {
            style = 'AppThemeTextMaterialButton';
        } else if (this.variant === 'flat') {
            style = 'AppThemeFlatMaterialButton';
        }
        const newContext = style ? new android.view.ContextThemeWrapper(this._context, utils.ad.resources.getId(':style/' + style)) : this._context;

        const view = new android.support.design.button.MaterialButton(newContext);
        return view;
    }
    [rippleColorProperty.setNative](color: string) {
        this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(new Color(color).android));
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
                    this.nativeViewProtected.setBackgroundTintList(android.content.res.ColorStateList.valueOf(value.color.android));
                }
                // this is a trick for now. Though we can't have borderRadius=0 with that :s
                // we need a way to know borderRadius was actually set
                // if (value.borderTopLeftRadius !== this.defaultBorderRadius) {
                //     this.nativeViewProtected.setCornerRadius(value.borderTopLeftRadius);
                // }
            }
        }
    }
}
