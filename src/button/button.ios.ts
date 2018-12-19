import { ButtonBase } from './button-common';
import { themer } from 'nativescript-material-core';
import { borderBottomLeftRadiusProperty, borderBottomRightRadiusProperty, borderTopLeftRadiusProperty, borderTopRightRadiusProperty } from 'tns-core-modules/ui/core/view';
import { Background } from 'tns-core-modules/ui/styling/background';

import { backgroundColorProperty, backgroundInternalProperty, Color, fontInternalProperty } from 'tns-core-modules/ui/page/page';
import { Font } from 'tns-core-modules/ui/styling/font';
import { elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';

let buttonScheme: MDCButtonScheme;
function getButtonScheme() {
    if (!buttonScheme) {
        buttonScheme = MDCButtonScheme.new();
    }
    return buttonScheme;
}

export class Button extends ButtonBase {
    // defaultBorderRadius;
    nativeViewProtected: MDCButton;
    _ios: MDCButton;
    applyShapeScheme() {
        MDCButtonShapeThemer.applyShapeSchemeToButton(this.shapeScheme, this.nativeViewProtected);
    }
    [borderBottomLeftRadiusProperty.setNative](value) {
        this.setBottomLeftCornerRadius(value);
        this.applyShapeScheme();
    }
    [borderBottomRightRadiusProperty.setNative](value) {
        this.setBottomRightCornerRadius(value);
        this.applyShapeScheme();
    }
    [borderTopLeftRadiusProperty.setNative](value) {
        this.setTopLeftCornerRadius(value);
        this.applyShapeScheme();
    }
    [borderTopRightRadiusProperty.setNative](value) {
        this.setTopRightCornerRadius(value);
        this.applyShapeScheme();
    }
    getRippleColor(color: Color) {
        return new Color(36, color.r, color.g, color.b).ios; // default alpha is 0.14
    }

    public createNativeView() {
        const view = MDCButton.new();
        const colorScheme = themer.getAppColorScheme();

        if (this.variant === 'text') {
            MDCTextButtonThemer.applySchemeToButton(getButtonScheme(), view);
            if (colorScheme) {
                MDCTextButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
            }
        } else if (this.variant === 'flat') {
            if (colorScheme) {
                MDCButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
            }
        } else if (this.variant === 'outline') {
            MDCOutlinedButtonThemer.applySchemeToButton(getButtonScheme(), view);
            if (colorScheme) {
                MDCOutlinedButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
            }
        } else {
            MDCContainedButtonThemer.applySchemeToButton(getButtonScheme(), view);
            if (colorScheme) {
                MDCContainedButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
            }
        }

        // view.addTargetActionForControlEvents(this['_tapHandler'], 'tap', UIControlEvents.TouchUpInside);
        return view;
    }

    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkColor = this.getRippleColor(color);
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setElevationForState(value, UIControlState.Normal);
        this.nativeViewProtected.setElevationForState(value * 2, UIControlState.Highlighted);
    }

    [backgroundColorProperty.setNative](value: Color) {
        if (this.nativeViewProtected) {
            // console.log('backgroundColorProperty', value);
            this.nativeViewProtected.setBackgroundColorForState(value.ios, UIControlState.Normal);
            if (this.variant === 'outline') {
                this.nativeViewProtected.setBackgroundColorForState(new Color('transparent').ios, UIControlState.Disabled);
            }
            // this.nativeViewProtected.setBackgroundColorForState(
            //     value.ios,
            //     UIControlState.Highlighted
            // )
            // this.nativeViewProtected.setBackgroundColorForState(
            //     value.ios,
            //     UIControlState.Selected
            // )
        }
    }

    [backgroundInternalProperty.setNative](value: Background) {
        // if (this.nativeViewProtected) {
        //         // if (value instanceof android.graphics.drawable.Drawable) {
        //         // this.nativeViewProtected.setBackgroundDrawable(value)
        //         // } else {
        // console.log('backgroundInternalProperty', value.color);
        //     if (value.color) {
        //         const color = value.color
        //         this.nativeViewProtected.setBackgroundColorForState(
        //             color.ios,
        //             UIControlState.Normal
        //         )
        //         this.nativeViewProtected.setBackgroundColorForState(
        //             color.ios,
        //             UIControlState.Highlighted
        //         )
        //         this.nativeViewProtected.setBackgroundColorForState(
        //             color.ios,
        //             UIControlState.Selected
        //         )
        //     }
        // }
    }

    shapeScheme: MDCShapeScheme;
    private getShapeScheme() {
        if (!this.shapeScheme) {
            this.shapeScheme = MDCShapeScheme.new();
            const shapeCategory = MDCShapeCategory.new();
            this.shapeScheme.smallComponentShape = shapeCategory;
        }
        return this.shapeScheme;
    }

    private setBottomLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.bottomLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
        // MDCButtonShapeThemer.applyShapeSchemeToButton(this.shapeScheme, this._ios);
    }
    private setBottomRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.bottomRightCorner = MDCCornerTreatment.cornerWithRadius(value);
        // MDCButtonShapeThemer.applyShapeSchemeToButton(this.shapeScheme, this._ios);
    }
    private setTopLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.topLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
        // MDCButtonShapeThemer.applyShapeSchemeToButton(this.shapeScheme, this._ios);
    }
    private setTopRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.topRightCorner = MDCCornerTreatment.cornerWithRadius(value);
        // MDCButtonShapeThemer.applyShapeSchemeToButton(this.shapeScheme, this._ios);
    }
    _setNativeClipToBounds() {
        // const backgroundInternal = this.style.backgroundInternal;
        // this.nativeViewProtected.clipsToBounds =
        //     this.nativeViewProtected instanceof UIScrollView ||
        //     backgroundInternal.hasBorderWidth() ||
        //     backgroundInternal.hasBorderRadius();
    }

    [fontInternalProperty.setNative](value: Font | UIFont) {
        if (!(value instanceof Font) || !this.formattedText) {
            const nativeView = this.nativeViewProtected;
            const font = value instanceof Font ? value.getUIFont(nativeView.font) : value;
            nativeView.setTitleFontForState(font, UIControlState.Normal);
        }
    }
}
