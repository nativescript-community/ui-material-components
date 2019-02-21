import { ButtonBase } from './button-common';
import { themer } from 'nativescript-material-core';
import { borderBottomLeftRadiusProperty, borderBottomRightRadiusProperty, borderTopLeftRadiusProperty, borderTopRightRadiusProperty } from 'tns-core-modules/ui/core/view';
import { Background } from 'tns-core-modules/ui/styling/background';

import { backgroundColorProperty, backgroundInternalProperty, Color, fontInternalProperty } from 'tns-core-modules/ui/page/page';
import { Font } from 'tns-core-modules/ui/styling/font';
import { elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { getRippleColor } from 'nativescript-material-core';

let buttonScheme: MDCButtonScheme;
function getButtonScheme() {
    if (!buttonScheme) {
        buttonScheme = MDCButtonScheme.new();
    }
    return buttonScheme;
}

export class Button extends ButtonBase {
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
        this.nativeViewProtected.inkColor = getRippleColor(color);
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setElevationForState(value, UIControlState.Normal);
        this.nativeViewProtected.setElevationForState(value * 2, UIControlState.Highlighted);
    }

    [backgroundColorProperty.setNative](value: Color) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setBackgroundColorForState(value.ios, UIControlState.Normal);
            if (this.variant === 'outline') {
                this.nativeViewProtected.setBackgroundColorForState(new Color('transparent').ios, UIControlState.Disabled);
            }
        }
    }

    [backgroundInternalProperty.setNative](value: Background) {}

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
    }
    private setBottomRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.bottomRightCorner = MDCCornerTreatment.cornerWithRadius(value);
    }
    private setTopLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.topLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
    }
    private setTopRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        shapeScheme.smallComponentShape.topRightCorner = MDCCornerTreatment.cornerWithRadius(value);
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
