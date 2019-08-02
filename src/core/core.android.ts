import { createRippleDrawable, getAttrColor, isPostLollipopMR1 } from 'nativescript-material-core/android/utils';
import { Color } from 'tns-core-modules/color';
import { backgroundInternalProperty, ViewBase } from 'tns-core-modules/ui/core/view';
import { Background } from 'tns-core-modules/ui/styling/background';
import * as application from 'tns-core-modules/application';
import { Length } from 'tns-core-modules/ui/styling/style-properties';
import { applyMixins } from './core.common';
import { cssProperty, dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty } from './cssproperties';
export { applyMixins };

// stub class as we don't use this on android
export class Themer {
    primaryColor: string | Color;
    accentColor: string | Color;
    primaryColorVariant: string | Color;
    surfaceColor: string | Color;
    onSurfaceColor: string | Color;
    // appColorScheme: MDCSemanticColorScheme;
    getOrcreateAppColorScheme() {
        // if (!this.appColorScheme) {
        // this.appColorScheme = MDCSemanticColorScheme.alloc().init();
        // }
        // return this.appColorScheme;
    }
    getAppColorScheme() {
        // return this.appColorScheme;
    }
    setPrimaryColor(value: string | Color) {
        this.primaryColor = value;
    }
    getPrimaryColor(): string | Color {
        if (!this.primaryColor) {
            console.log('getPrimaryColor', application.android, application.android.context, application.android.foregroundActivity, application.android.startActivity);
            this.primaryColor = new Color(getAttrColor(application.android.startActivity, 'colorPrimary'));
        }
        return this.primaryColor;
    }

    setAccentColor(value: string | Color) {
        if (!this.accentColor) {
            this.accentColor = new Color(getAttrColor(application.android.startActivity, 'colorAccent'));
        }
        this.accentColor = value;
    }
    getAccentColor(): string | Color {
        return this.accentColor;
    }

    setSurfaceColor(value: string | Color) {
        this.surfaceColor = value;
    }
    getSurfaceColor(): string | Color {
        return this.surfaceColor;
    }
    setOnSurfaceColor(value: string | Color) {
        this.onSurfaceColor = value;
    }
    getOnSurfaceColor(): string | Color {
        return this.onSurfaceColor;
    }
    setPrimaryColorVariant(value: string | Color) {
        this.primaryColorVariant = value;
    }
    getPrimaryColorVariant(): string | Color {
        if (!this.primaryColorVariant) {
            this.primaryColorVariant = new Color(getAttrColor(application.android.context, 'colorSecondary'));
        }
        return this.primaryColorVariant;
    }
}

export const themer = new Themer();

export function install() {
    // try {
    //     require('nativescript-material-bottomsheet').install();
    // } catch (e) {
    //     console.log('error installing bottomsheet', e);
    // }
}

export function getRippleColor(color: string | Color) {
    if (color) {
        const temp = typeof color === 'string' ? new Color(color) : color;
        // return android.graphics.Color.argb(temp.a !== 255 ? temp.a / 255 : 0.14, temp.r / 255, temp.g / 255, temp.b); // default alpha is 0.14
        return new Color(temp.a !== 255 ? temp.a : 61.5, temp.r, temp.g, temp.b).android; // default alpha is 0.24
    }
    return null;
}

class ViewWithElevationAndRipple extends ViewBase {
    @cssProperty elevation: number = 0;
    @cssProperty dynamicElevationOffset: number = 0;
    @cssProperty rippleColor: Color;
    rippleDrawable: android.graphics.drawable.Drawable;
    getRippleColor() {
        return getRippleColor(this.style['rippleColor'] ? this.style['rippleColor'] : new Color(getAttrColor(this._context, 'colorControlHighlight')));
    }
    getCornerRadius() {
        return getRippleColor(this.style['rippleColor'] ? this.style['rippleColor'] : new Color(getAttrColor(this._context, 'colorControlHighlight')));
    }
    setRippleDrawable(view: android.view.View, radius = 0) {
        if (!this.rippleDrawable) {
            this.rippleDrawable = createRippleDrawable(view, this.getRippleColor(), radius);
            view.setForeground(this.rippleDrawable);
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        this.setRippleDrawable(this.nativeViewProtected, Length.toDevicePixels(this.style.borderTopLeftRadius));
        const rippleColor = getRippleColor(color);
        if (isPostLollipopMR1()) {
            (this.rippleDrawable as android.graphics.drawable.RippleDrawable).setColor(android.content.res.ColorStateList.valueOf(rippleColor));
        } else {
            (this.rippleDrawable as any).rippleShape.getPaint().setColor(rippleColor);
        }
        // }
    }

    [backgroundInternalProperty.setNative](value: android.graphics.drawable.Drawable | Background) {
        if (this.nativeViewProtected) {
            if (value instanceof android.graphics.drawable.Drawable) {
            } else {
                if (this.rippleDrawable) {
                    this.rippleDrawable = null;
                    this.setRippleDrawable(this.nativeViewProtected, value.borderTopLeftRadius);
                }
            }
        }
    }

    [elevationProperty.setNative](value: number) {
        this.style.androidElevation = value;
    }
    [dynamicElevationOffsetProperty.setNative](value: number) {
        this.style.androidDynamicElevationOffset = value;
    }
}

let mixinInstalled = false;
export function overrideViewBase() {
    const NSView = require('tns-core-modules/ui/core/view').View;
    applyMixins(NSView, [ViewWithElevationAndRipple]);
}

export function installMixins() {
    if (!mixinInstalled) {
        mixinInstalled = true;
        overrideViewBase();
    }
}
