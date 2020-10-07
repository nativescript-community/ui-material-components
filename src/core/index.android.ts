import { Application, Background, Button, Color, Length, View, androidDynamicElevationOffsetProperty, androidElevationProperty, backgroundInternalProperty } from '@nativescript/core';
import { createRippleDrawable, createStateListAnimator, getAttrColor, isPostLollipop, isPostLollipopMR1, isPostMarshmallow } from './android/utils';
import { applyMixins } from './index.common';
import { cssProperty, dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty } from './cssproperties';
export * from './cssproperties';
export { applyMixins };

// stub class as we don't use this on android
export class Themer {
    primaryColor: string | Color;
    accentColor: string | Color;
    secondaryColor: string | Color;
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
            this.primaryColor = new Color(getAttrColor(Application.android.startActivity, 'colorPrimary'));
        }
        return this.primaryColor;
    }

    setAccentColor(value: string | Color) {
        if (!this.accentColor) {
            this.accentColor = new Color(getAttrColor(Application.android.startActivity, 'colorAccent'));
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
            this.primaryColorVariant = new Color(getAttrColor(Application.android.context, 'colorSecondary'));
        }
        return this.primaryColorVariant;
    }

    setSecondaryColor(value: string | Color) {
        this.secondaryColor = value;
    }
    getSecondaryColor(): string | Color {
        return this.secondaryColor;
    }
}

export const themer = new Themer();

export function install() {

}

export function getRippleColor(color: string | Color) {
    if (color) {
        const temp = typeof color === 'string' ? new Color(color) : color;
        // return android.graphics.Color.argb(temp.a !== 255 ? temp.a / 255 : 0.14, temp.r / 255, temp.g / 255, temp.b); // default alpha is 0.14
        return new Color(temp.a !== 255 ? temp.a : 61.5, temp.r, temp.g, temp.b).android; // default alpha is 0.24
    }
    return null;
}

class ViewWithElevationAndRipple extends View {
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
            if (isPostMarshmallow()) {
                view.setForeground(this.rippleDrawable);
            }
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        const rippleColor = getRippleColor(color);
        if (this instanceof Button) {
            const foreground = (this.nativeViewProtected as android.widget.Button).getForeground();
            if (foreground instanceof android.graphics.drawable.RippleDrawable) {
                foreground.setColor(android.content.res.ColorStateList.valueOf(rippleColor));
                return;
            }
            const background = (this.nativeViewProtected as android.widget.Button).getBackground();
            if (background instanceof android.graphics.drawable.RippleDrawable) {
                background.setColor(android.content.res.ColorStateList.valueOf(rippleColor));
                return;
            }
        }
        this.nativeViewProtected.setClickable(this.isUserInteractionEnabled);
        this.setRippleDrawable(this.nativeViewProtected, Length.toDevicePixels(this.style.borderTopLeftRadius));
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
                // we recreate the ripple drawable if necessary.
                // native button have on the background. Setting color will remove the ripple!
                if (this.rippleDrawable || (value.color && this instanceof Button && this.rippleColor)) {
                    this.rippleDrawable = null;
                    this.setRippleDrawable(this.nativeViewProtected, value.borderTopLeftRadius);
                }
            }
        }
    }

    // [elevationProperty.setNative](value: number) {
    //     this.style.androidElevation = value;
    // }
    // [dynamicElevationOffsetProperty.setNative](value: number) {
    //     this.style.androidDynamicElevationOffset = value;
    // }
    getDefaultElevation(): number {
        const result = this instanceof Button ? 2 : 0;
        return result;
    }

    getDefaultDynamicElevationOffset() {
        const result = this instanceof Button ? 6 : 0;
        return result;
    }

    // [elevationProperty.getDefault](): number {
    //     return this.getDefaultElevation();
    // }
    [elevationProperty.setNative](value: number) {
        if (isPostLollipop()) {
            createStateListAnimator(this, this.nativeViewProtected);
        } else {
            const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
            androidx.core.view.ViewCompat.setElevation(this.nativeViewProtected, newValue);
        }
    }
    // [dynamicElevationOffsetProperty.getDefault](): number {
    //     return this.getDefaultDynamicElevationOffset();
    // }
    [dynamicElevationOffsetProperty.setNative](value: number) {
        this.nativeViewProtected.setClickable(this.isUserInteractionEnabled);
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
}

let mixinInstalled = false;
export function overrideViewBase() {
    const NSView = require('@nativescript/core').View;
    applyMixins(NSView, [ViewWithElevationAndRipple]);
}

export function installMixins() {
    if (!mixinInstalled) {
        mixinInstalled = true;
        overrideViewBase();
    }
}
