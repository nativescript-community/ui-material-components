import { Background, Button, Color, Length, PercentLength, Utils, View, androidDynamicElevationOffsetProperty, androidElevationProperty, backgroundInternalProperty } from '@nativescript/core';
import { ad } from '@nativescript/core/utils';
import { ShapeProperties } from '.';
import { createRippleDrawable, createStateListAnimator, getAttrColor, getColorStateList, handleClearFocus, isPostLollipop, isPostMarshmallow } from './android/utils';
import { cssProperty, dynamicElevationOffsetProperty, elevationProperty, rippleColorAlphaProperty, rippleColorProperty } from './cssproperties';
import { CornerFamily, applyMixins } from './index.common';
export * from './cssproperties';
export { applyMixins };

function cornerTreat(cornerFamily: CornerFamily): com.google.android.material.shape.CornerTreatment {
    switch (cornerFamily) {
        case CornerFamily.CUT:
            return new com.google.android.material.shape.CutCornerTreatment();
        default:
        case CornerFamily.ROUNDED:
            return new com.google.android.material.shape.RoundedCornerTreatment();
    }
}

let context: android.content.Context;
function getContext() {
    if (!context) {
        context = Utils.ad.getApplicationContext();
    }
    return context;
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
            this.primaryColor = new Color(getAttrColor(getContext(), 'colorPrimary'));
        }
        return this.primaryColor;
    }

    setOnPrimaryColor(value) {
        this.onPrimaryColor = value;
    }
    getOnPrimaryColor() {
        if (!this.onPrimaryColor) {
            this.onPrimaryColor = new Color(getAttrColor(getContext(), 'colorOnPrimary'));
        }
        return this.onPrimaryColor;
    }

    setAccentColor(value: string | Color) {
        this.accentColor = value;
    }
    getAccentColor(): string | Color {
        if (!this.accentColor) {
            this.accentColor = new Color(getAttrColor(getContext(), 'colorAccent'));
        }
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
            this.primaryColorVariant = new Color(getAttrColor(getContext(), 'colorSecondary'));
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
            this.controlHighlightColor = new Color(getAttrColor(getContext(), 'colorControlHighlight'));
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
        const RelativeCornerSize = com.google.android.material.shape.RelativeCornerSize;
        const builder = com.google.android.material.shape.ShapeAppearanceModel.builder();
        if (options.cornerFamily) {
            builder.setAllCorners(cornerTreat(options.cornerFamily));
        }
        if (options.cornerFamilyBottomRight) {
            builder.setBottomRightCorner(cornerTreat(options.cornerFamilyBottomRight));
        }
        if (options.cornerFamilyBottomLeft) {
            builder.setBottomLeftCorner(cornerTreat(options.cornerFamilyBottomLeft));
        }
        if (options.cornerFamilyTopLeft) {
            builder.setTopLeftCorner(cornerTreat(options.cornerFamilyTopLeft));
        }
        if (options.cornerFamilyTopRight) {
            builder.setTopRightCorner(cornerTreat(options.cornerFamilyTopRight));
        }
        if (options.cornerSize !== undefined) {
            if (typeof options.cornerSize === 'object') {
                if (options.cornerSize.unit === '%') {
                    builder.setAllCornerSizes(new RelativeCornerSize(options.cornerSize.value));
                } else {
                    builder.setAllCornerSizes(PercentLength.toDevicePixels(options.cornerSize));
                }
            } else {
                builder.setAllCornerSizes(PercentLength.toDevicePixels(options.cornerSize));
            }
        }
        if (options.cornerSizeBottomLeft !== undefined) {
            if (typeof options.cornerSizeBottomLeft === 'object') {
                if (options.cornerSizeBottomLeft.unit === '%') {
                    builder.setBottomLeftCornerSize(new RelativeCornerSize(options.cornerSizeBottomLeft.value));
                } else {
                    builder.setBottomLeftCornerSize(PercentLength.toDevicePixels(options.cornerSizeBottomLeft));
                }
            } else {
                builder.setBottomLeftCornerSize(PercentLength.toDevicePixels(options.cornerSizeBottomLeft));
            }
        }
        if (options.cornerSizeBottomRight !== undefined) {
            if (typeof options.cornerSizeBottomRight === 'object') {
                if (options.cornerSizeBottomRight.unit === '%') {
                    builder.setBottomRightCornerSize(new RelativeCornerSize(options.cornerSizeBottomRight.value));
                } else {
                    builder.setBottomRightCornerSize(PercentLength.toDevicePixels(options.cornerSizeBottomRight));
                }
            } else {
                builder.setBottomRightCornerSize(PercentLength.toDevicePixels(options.cornerSizeBottomRight));
            }
        }
        if (options.cornerSizeTopRight !== undefined) {
            if (typeof options.cornerSizeTopRight === 'object') {
                if (options.cornerSizeTopRight.unit === '%') {
                    builder.setTopRightCornerSize(new RelativeCornerSize(options.cornerSizeTopRight.value));
                } else {
                    builder.setTopRightCornerSize(PercentLength.toDevicePixels(options.cornerSizeTopRight));
                }
            } else {
                builder.setTopRightCornerSize(PercentLength.toDevicePixels(options.cornerSizeTopRight));
            }
        }
        if (options.cornerSizeTopLeft !== undefined) {
            if (typeof options.cornerSizeTopLeft === 'object') {
                if (options.cornerSizeTopLeft.unit === '%') {
                    builder.setTopLeftCornerSize(new RelativeCornerSize(options.cornerSizeTopLeft.value));
                } else {
                    builder.setTopLeftCornerSize(PercentLength.toDevicePixels(options.cornerSizeTopLeft));
                }
            } else {
                builder.setTopLeftCornerSize(PercentLength.toDevicePixels(options.cornerSizeTopLeft));
            }
        }
        this._shapes[key] = builder.build();
    }
}

export const themer = new Themer();

export function install() {}

export function getRippleColor(color: string | Color, alpha = 61.5) {
    if (color) {
        const temp = color instanceof Color ? color : new Color(color);
        if (temp.a !== 255) {
            return temp.android;
        }
        return temp.setAlpha(alpha).android;
    }
    return null;
}

let mixinInstalled = false;
export function overrideViewBase() {
    const NSView = require('@nativescript/core').View;
    class ViewWithElevationAndRipple extends View {
        @cssProperty elevation = 0;
        @cssProperty dynamicElevationOffset = 0;
        @cssProperty rippleColor: Color;
        @cssProperty rippleColorAlpha: number;
        rippleDrawable: android.graphics.drawable.Drawable;
        getRippleColor() {
            if (this.rippleColor) {
                return getRippleColor(this.rippleColor);
            }
            return getRippleColor(themer.getAccentColor());
        }

        setRippleDrawable(view: android.view.View, topLeftRadius = 0, topRightRadius = 0, bottomRightRadius = 0, bottomLeftRadius = 0) {
            if (!this.rippleDrawable) {
                this.rippleDrawable = createRippleDrawable(this.getRippleColor(), topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius);
                if (isPostMarshmallow) {
                    view.setForeground(this.rippleDrawable);
                }
            }
        }
        [rippleColorProperty.setNative](color: Color) {
            const rippleColor = getRippleColor(color, this.rippleColorAlpha);
            const nativeViewProtected = this.nativeViewProtected;
            const RippleDrawable = android.graphics.drawable.RippleDrawable;
            if (this instanceof Button && isPostMarshmallow) {
                const foreground = (nativeViewProtected as android.widget.Button).getForeground();
                if (foreground instanceof RippleDrawable) {
                    foreground.setColor(getColorStateList(rippleColor));
                    return;
                }
                const background = (nativeViewProtected as android.widget.Button).getBackground();
                if (background instanceof RippleDrawable) {
                    background.setColor(getColorStateList(rippleColor));
                    return;
                }
            }
            nativeViewProtected.setClickable(this.isUserInteractionEnabled);
            const rippleDrawable = this.rippleDrawable;
            if (!rippleDrawable) {
                this.setRippleDrawable(
                    nativeViewProtected,
                    Length.toDevicePixels(this.style.borderTopLeftRadius),
                    Length.toDevicePixels(this.style.borderTopRightRadius),
                    Length.toDevicePixels(this.style.borderBottomRightRadius),
                    Length.toDevicePixels(this.style.borderBottomLeftRadius)
                );
            } else {
                if (isPostLollipop) {
                    (rippleDrawable as android.graphics.drawable.RippleDrawable).setColor(getColorStateList(rippleColor));
                } else if ((rippleDrawable as any).rippleShape) {
                    (rippleDrawable as any).rippleShape.getPaint().setColor(rippleColor);
                }
            }
        }

    [rippleColorAlphaProperty.setNative](value: number) {
        const rippleColor = this.rippleColor;
        if (rippleColor) {
            this[rippleColorProperty.setNative](rippleColor);
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
                        this.setRippleDrawable(
                            this.nativeViewProtected,
                            Length.toDevicePixels(this.style.borderTopLeftRadius),
                            Length.toDevicePixels(this.style.borderTopRightRadius),
                            Length.toDevicePixels(this.style.borderBottomRightRadius),
                            Length.toDevicePixels(this.style.borderBottomLeftRadius)
                        );
                    }
                }
            }
        }
        public requestFocus() {
            this.focus();
        }
        public clearFocus() {
            ad.dismissSoftInput(this.nativeViewProtected);
            handleClearFocus(this.nativeViewProtected);
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
            if (isPostLollipop) {
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
                    if (this.nativeViewProtected) {
                        createStateListAnimator(this, this.nativeViewProtected);
                    }
                });
            }
        }
        [dynamicElevationOffsetProperty.setNative](value: number) {
            this.nativeViewProtected.setClickable(this.isUserInteractionEnabled);
            if (isPostLollipop) {
                this.createStateListAnimator();
            } else {
                const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
                androidx.core.view.ViewCompat.setTranslationZ(this.nativeViewProtected, newValue);
            }
        }
    }
    applyMixins(NSView, [ViewWithElevationAndRipple]);
    class ViewOverride extends View {
        [androidElevationProperty.setNative](value: number) {
            // override to prevent override of dynamicElevationOffset
            this[elevationProperty.setNative](value);
        }
        [androidDynamicElevationOffsetProperty.setNative](value: number) {
            // override to prevent override of elevation
            this[dynamicElevationOffsetProperty.setNative](value);
        }
    }
    applyMixins(NSView, [ViewOverride], { override: true });
}

export function installMixins() {
    if (!mixinInstalled) {
        mixinInstalled = true;
        overrideViewBase();
    }
}
