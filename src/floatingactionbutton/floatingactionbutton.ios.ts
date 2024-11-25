import { dynamicElevationOffsetProperty, elevationProperty, getRippleColor, rippleColorAlphaProperty, rippleColorProperty, shapeProperty, themer } from '@nativescript-community/ui-material-core';
import { Color, ImageSource, borderBottomLeftRadiusProperty, borderBottomRightRadiusProperty, borderTopLeftRadiusProperty, borderTopRightRadiusProperty, colorProperty } from '@nativescript/core';
import { textProperty } from '@nativescript/core/ui/text-base';
import { FloatingActionButtonBase, expandedProperty, imageSourceProperty, srcProperty } from './floatingactionbutton-common';

export class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: MDCFloatingButton;

    getDefaultElevation(): number {
        return 6;
    }

    getDefaultDynamicElevationOffset() {
        return 6;
    }

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
    shapeScheme: MDCShapeScheme;
    private getShapeScheme() {
        if (!this.shapeScheme) {
            if (this.shape) {
                // we need to copy it as if we change border radius on this view
                // it will change for everyone else
                this.shapeScheme = MDCShapeScheme.new();
                const shapeScheme = themer.getShape(this.shape);
                this.shapeScheme.smallComponentShape = shapeScheme.smallComponentShape.copy();
            } else {
                this.shapeScheme = MDCShapeScheme.new();
                const shapeCategory = MDCShapeCategory.new();
                this.shapeScheme.smallComponentShape = shapeCategory;
            }
        }
        return this.shapeScheme;
    }

    private setBottomLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.bottomLeftCorner;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.smallComponentShape.bottomLeftCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.smallComponentShape.bottomLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    private setBottomRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.bottomRightCorner;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.smallComponentShape.bottomRightCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.smallComponentShape.bottomRightCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    private setTopLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.topLeftCorner;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.smallComponentShape.topLeftCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.smallComponentShape.topLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    private setTopRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.topRightCorner;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.smallComponentShape.topRightCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.smallComponentShape.topRightCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    public _setNativeImage(nativeImage: UIImage) {
        // this.nativeViewProtected.setImageForState(nativeImage ? nativeImage.imageWithRenderingMode(UIImageRenderingMode.AlwaysTemplate) : nativeImage, UIControlState.Normal);

        this.nativeViewProtected.setImageForState(nativeImage, UIControlState.Normal);
    }
    public createNativeView() {
        const result = MDCFloatingButton.floatingButtonWithShape(this.size === 'mini' ? MDCFloatingButtonShape.Mini : MDCFloatingButtonShape.Default);

        const colorScheme = themer.getAppColorScheme() as MDCSemanticColorScheme;
        const scheme = MDCContainerScheme.new();
        scheme.colorScheme = colorScheme;
        result.applySecondaryThemeWithScheme(scheme);
        // const colorScheme = themer.getAppColorScheme();
        // if (colorScheme) {
        //     MDCFloatingButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, result);
        // }
        return result;
    }
    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setElevationForState(value, UIControlState.Normal);
        let dynamicElevationOffset = this.dynamicElevationOffset;
        if (typeof dynamicElevationOffset === 'undefined' || dynamicElevationOffset === null) {
            dynamicElevationOffset = this.getDefaultDynamicElevationOffset();
        }
        if (this.dynamicElevationOffset === undefined) {
            this.nativeViewProtected.setElevationForState(value + dynamicElevationOffset, UIControlState.Highlighted);
        }
    }

    [dynamicElevationOffsetProperty.setNative](value: number) {
        let elevation = this.elevation;
        if (typeof elevation === 'undefined' || elevation === null) {
            elevation = this.getDefaultElevation();
        }
        this.nativeViewProtected.setElevationForState(value + elevation, UIControlState.Highlighted);
    }
    [imageSourceProperty.setNative](value: ImageSource) {
        this._setNativeImage(value ? value.ios : null);
    }

    [srcProperty.setNative](value: any) {
        this._createImageSourceFromSrc(value);
    }
    [colorProperty.setNative](value: Color) {
        this.nativeViewProtected.tintColor = value.ios;
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkColor = getRippleColor(color, this.rippleColorAlpha);
    }
    [rippleColorAlphaProperty.setNative](value: number) {
        if (this.rippleColor) {
            this[rippleColorProperty.setNative](this.rippleColor);
        }
    }
    [textProperty.setNative](value: string) {
        this.nativeViewProtected.setTitleForState(value, UIControlState.Normal);
    }
    [expandedProperty.setNative](value: boolean) {
        this.nativeViewProtected.setModeAnimated(value ? MDCFloatingButtonMode.Expanded : MDCFloatingButtonMode.Normal, true);
    }

    [shapeProperty.setNative](shape: string) {
        // TODO: for now we cant change after set
        // this.shapeScheme = null;
        this.getShapeScheme();
        this.applyShapeScheme();
    }
}
