import { Application, Background, Button, Color, Length, View, androidDynamicElevationOffsetProperty, androidElevationProperty, backgroundInternalProperty, profile } from '@nativescript/core';
import { createRippleDrawable, createStateListAnimator, getAttrColor, getColorStateList, handleClearFocus, isPostLollipop, isPostLollipopMR1, isPostMarshmallow } from './android/utils';
import { CornerFamily, applyMixins } from './index.common';
import { cssProperty, dynamicElevationOffsetProperty, elevationProperty, rippleColorProperty } from './cssproperties';
import { ad } from '@nativescript/core/utils';
import { ShapeProperties } from '.';
export * from './cssproperties';
export { applyMixins };

function createCornerTreatment(cornerFamily: CornerFamily): com.google.android.material.shape.CornerTreatment {
    switch (cornerFamily) {
        case CornerFamily.CUT:
            return new com.google.android.material.shape.CutCornerTreatment();
        default:
        case CornerFamily.ROUNDED:
            return new com.google.android.material.shape.RoundedCornerTreatment();
    }
}

// stub class as we don't use this on android
export class Themer {
    primaryColor: string | Color;
    onPrimaryColor: string | Color;
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

    setOnPrimaryColor(value) {
        this.onPrimaryColor = value;
    }
    getOnPrimaryColor() {
        if (!this.onPrimaryColor) {
            this.onPrimaryColor = new Color(getAttrColor(Application.android.startActivity, 'colorOnPrimary'));
        }
        return this.onPrimaryColor;
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
    controlHighlightColor: Color;
    getControlHighlightColor(): Color {
        if (!this.controlHighlightColor) {
            this.controlHighlightColor = new Color(getAttrColor(Application.android.context, 'colorControlHighlight'));
        }
        return this.controlHighlightColor;
    }

    _shapes: {
        [k: string]: com.google.android.material.shape.ShapeAppearanceModel;
    } = {};
    getShape(key: string) {
        return this._shapes[key] || null;
    }
    createShape(key: string, options: ShapeProperties) {
        const builder = com.google.android.material.shape.ShapeAppearanceModel.builder();
        if (options.cornerFamily) {
            builder.setAllCorners(createCornerTreatment(options.cornerFamily));
        }
        if (options.cornerFamilyBottomRight) {
            builder.setBottomRightCorner(createCornerTreatment(options.cornerFamilyBottomRight));
        }
        if (options.cornerFamilyBottomLeft) {
            builder.setBottomLeftCorner(createCornerTreatment(options.cornerFamilyBottomLeft));
        }
        if (options.cornerFamilyTopLeft) {
            builder.setTopLeftCorner(createCornerTreatment(options.cornerFamilyTopLeft));
        }
        if (options.cornerFamilyTopRight) {
            builder.setTopRightCorner(createCornerTreatment(options.cornerFamilyTopRight));
        }
        if (options.cornerSize !== undefined) {
            if (typeof options.cornerSize === 'object') {
                builder.setAllCornerSizes(new com.google.android.material.shape.RelativeCornerSize(options.cornerSize.value));
            } else {
                builder.setAllCornerSizes(options.cornerSize);
            }
        }
        if (options.cornerSizeBottomLeft !== undefined) {
            if (typeof options.cornerSizeBottomLeft === 'object') {
                builder.setBottomLeftCornerSize(new com.google.android.material.shape.RelativeCornerSize(options.cornerSizeBottomLeft.value));
            } else {
                builder.setBottomLeftCornerSize(options.cornerSizeBottomLeft);
            }
        }
        if (options.cornerSizeBottomRight !== undefined) {
            if (typeof options.cornerSizeBottomRight === 'object') {
                builder.setBottomRightCornerSize(new com.google.android.material.shape.RelativeCornerSize(options.cornerSizeBottomRight.value));
            } else {
                builder.setBottomRightCornerSize(options.cornerSizeBottomRight);
            }
        }
        if (options.cornerSizeTopRight !== undefined) {
            if (typeof options.cornerSizeTopRight === 'object') {
                builder.setTopRightCornerSize(new com.google.android.material.shape.RelativeCornerSize(options.cornerSizeTopRight.value));
            } else {
                builder.setTopRightCornerSize(options.cornerSizeTopRight);
            }
        }
        if (options.cornerSizeTopLeft !== undefined) {
            if (typeof options.cornerSizeTopLeft === 'object') {
                builder.setTopLeftCornerSize(new com.google.android.material.shape.RelativeCornerSize(options.cornerSizeTopLeft.value));
            } else {
                builder.setTopLeftCornerSize(options.cornerSizeTopLeft);
            }
        }
        this._shapes[key] = builder.build();
    }
}

export const themer = new Themer();

export function install() {}

export function getRippleColor(color: string | Color) {
    if (color) {
        const temp = color instanceof Color ? color : new Color(color);
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
        if (this.rippleColor) {
            return getRippleColor(this.rippleColor);
        }
        return getRippleColor(themer.getAccentColor());
    }

    setRippleDrawable(view: android.view.View, radius = 0) {
        if (!this.rippleDrawable) {
            this.rippleDrawable = createRippleDrawable(this.getRippleColor(), radius);
            if (isPostMarshmallow()) {
                view.setForeground(this.rippleDrawable);
            }
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        const rippleColor = getRippleColor(color);
        const nativeViewProtected = this.nativeViewProtected;
        if (this instanceof Button && isPostMarshmallow()) {
            const foreground = (nativeViewProtected as android.widget.Button).getForeground();
            if (foreground instanceof android.graphics.drawable.RippleDrawable) {
                foreground.setColor(getColorStateList(rippleColor));
                return;
            }
            const background = (nativeViewProtected as android.widget.Button).getBackground();
            if (background instanceof android.graphics.drawable.RippleDrawable) {
                background.setColor(getColorStateList(rippleColor));
                return;
            }
        }
        nativeViewProtected.setClickable(this.isUserInteractionEnabled);
        const rippleDrawable = this.rippleDrawable;
        if (!rippleDrawable) {
            this.setRippleDrawable(nativeViewProtected, Length.toDevicePixels(this.style.borderTopLeftRadius));
        } else {
            if (isPostLollipop()) {
                (rippleDrawable as android.graphics.drawable.RippleDrawable).setColor(getColorStateList(rippleColor));
            } else if ((rippleDrawable as any).rippleShape) {
                (rippleDrawable as any).rippleShape.getPaint().setColor(rippleColor);
            }
        }
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
    public requestFocus() {
        this.focus();
    }
    public clearFocus() {
        handleClearFocus(this.nativeViewProtected);
        ad.dismissSoftInput(this.nativeViewProtected);
    }

    getDefaultElevation(): number {
        const result = this instanceof Button ? 2 : 0;
        return result;
    }

    getDefaultDynamicElevationOffset() {
        const result = this instanceof Button ? 6 : 0;
        return result;
    }

    [elevationProperty.setNative](value: number) {
        if (isPostLollipop()) {
            this.createStateListAnimator();
        } else {
            const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
            androidx.core.view.ViewCompat.setElevation(this.nativeViewProtected, newValue);
        }
    }

    createStateListAnimatorTimeout;
    createStateListAnimator() {
        if (!this.createStateListAnimatorTimeout) {
            this.createStateListAnimatorTimeout = setTimeout(() => {
                this.createStateListAnimatorTimeout = null;
                createStateListAnimator(this, this.nativeViewProtected);
            });
        }
    }
    [dynamicElevationOffsetProperty.setNative](value: number) {
        this.nativeViewProtected.setClickable(this.isUserInteractionEnabled);
        if (isPostLollipop()) {
            this.createStateListAnimator();
        } else {
            const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
            androidx.core.view.ViewCompat.setTranslationZ(this.nativeViewProtected, newValue);
        }
    }
}
class ViewOverride extends View {
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
    applyMixins(NSView, [ViewOverride], { override: true });
}

export function installMixins() {
    if (!mixinInstalled) {
        mixinInstalled = true;
        overrideViewBase();
    }
}
