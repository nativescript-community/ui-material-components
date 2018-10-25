import { ButtonBase } from './button-common';
import { themer } from './material';
import { borderBottomLeftRadiusProperty, borderBottomRightRadiusProperty, borderTopLeftRadiusProperty, borderTopRightRadiusProperty, Length } from 'tns-core-modules/ui/core/view';

import { backgroundColorProperty, backgroundInternalProperty, Color, fontInternalProperty } from 'tns-core-modules/ui/page/page';
import { Font } from 'tns-core-modules/ui/styling/font';
import { elevationProperty, rippleColorProperty } from './cssproperties';
import { Background } from 'tns-core-modules/ui/styling/background';
import { screen } from 'tns-core-modules/platform';

const MDCButtonDefaultCornerRadius = 2;
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
    getRippleColor(color: string) {
        const temp = new Color(color);
        return new Color(36, temp.r, temp.g, temp.b).ios; // default alpha is 0.14
    }

    public createNativeView() {
        const view = MDCButton.new();
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCTextButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
        }

        if (this.variant === 'text') {
            MDCTextButtonThemer.applySchemeToButton(getButtonScheme(), view);
        } else if (this.variant === 'flat') {
        } else if (this.variant === 'outline') {
            MDCOutlinedButtonThemer.applySchemeToButton(getButtonScheme(), view);
        } else {
            MDCContainedButtonThemer.applySchemeToButton(getButtonScheme(), view);
        }
        // view.addTargetActionForControlEvents(this['_tapHandler'], 'tap', UIControlEvents.TouchUpInside);
        return view;
    }

    [rippleColorProperty.setNative](color: string) {
        this.nativeViewProtected.inkColor = this.getRippleColor(color);
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setElevationForState(value, UIControlState.Normal);
        this.nativeViewProtected.setElevationForState(value * 2, UIControlState.Highlighted);
    }

    [backgroundColorProperty.setNative](value: Color) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.backgroundColor = value.ios;
        }
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
