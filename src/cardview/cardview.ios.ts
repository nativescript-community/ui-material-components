import { dynamicElevationOffsetProperty, elevationProperty, getRippleColor, rippleColorAlphaProperty, rippleColorProperty, shapeProperty, themer } from '@nativescript-community/ui-material-core';
import {
    Background,
    Color,
    Screen,
    backgroundInternalProperty,
    borderBottomLeftRadiusProperty,
    borderBottomRightRadiusProperty,
    borderTopLeftRadiusProperty,
    borderTopRightRadiusProperty,
    isUserInteractionEnabledProperty
} from '@nativescript/core';
import { CardViewBase } from './cardview-common';

declare module '@nativescript/core/ui/core/view' {
    interface View {
        _resumeNativeUpdates(type);
    }
}

// use custom class to get the same behavior as android which is
// highlight even if clicked on subview (which is not a control)

@NativeClass
class Card extends MDCCardCollectionCell {
    touchesBeganWithEvent(touches, event) {
        super.touchesBeganWithEvent(touches, event);
        if (this.interactable) {
            this.highlighted = true;
        }
    }
    touchesEndedWithEvent(touches, event) {
        super.touchesEndedWithEvent(touches, event);
        this.highlighted = false;
    }
}

export class CardView extends CardViewBase {
    nativeViewProtected: Card;
    scheme: MDCContainerScheme;
    public createNativeView() {
        const view = Card.new() as Card;
        const colorScheme = themer.getAppColorScheme() as MDCSemanticColorScheme;
        if (colorScheme) {
            const scheme = MDCContainerScheme.alloc().init();
            scheme.colorScheme = colorScheme;
            this.scheme = scheme;
            if (this.shape) {
                this.scheme.shapeScheme = this.getShapeScheme();
            }
            view.applyThemeWithScheme(scheme);
        }
        view.interactable = this.isUserInteractionEnabled;
        return view;
    }
    _setNativeClipToBounds() {
        // this.ios.clipsToBounds = true;
    }

    getDefaultElevation(): number {
        return 1;
    }

    getDefaultDynamicElevationOffset() {
        return 1;
    }
    applyShapeScheme() {
        if (this.scheme) {
            this.scheme.shapeScheme = this.getShapeScheme();
            this.nativeViewProtected.applyThemeWithScheme(this.scheme);
        }
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
                this.shapeScheme.mediumComponentShape = shapeScheme.smallComponentShape.copy();
            } else {
                this.shapeScheme = MDCShapeScheme.new();
                const shapeCategory = MDCShapeCategory.new();
                this.shapeScheme.mediumComponentShape = shapeCategory;
            }
        }
        return this.shapeScheme;
    }

    private setBottomLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.bottomLeftCorner;
        this.needsElevationSet = true;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.mediumComponentShape.bottomLeftCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.mediumComponentShape.bottomLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    private setBottomRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.bottomRightCorner;
        this.needsElevationSet = true;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.mediumComponentShape.bottomRightCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.mediumComponentShape.bottomRightCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    private setTopLeftCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.topLeftCorner;
        this.needsElevationSet = true;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.mediumComponentShape.topLeftCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.mediumComponentShape.topLeftCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    private setTopRightCornerRadius(value: number) {
        const shapeScheme = this.getShapeScheme();
        const current = shapeScheme.smallComponentShape.topRightCorner;
        this.needsElevationSet = true;
        if (current instanceof MDCCutCornerTreatment) {
            shapeScheme.mediumComponentShape.topRightCorner = MDCCornerTreatment.cornerWithCut(value);
        } else {
            shapeScheme.mediumComponentShape.topRightCorner = MDCCornerTreatment.cornerWithRadius(value);
        }
    }
    needsElevationSet = false;
    public _resumeNativeUpdates(type) {
        super._resumeNativeUpdates(type);
        if (this.needsElevationSet && (this.elevation || this.dynamicElevationOffset)) {
            this.needsElevationSet = false;
            if (this.elevation) {
                this[elevationProperty.setNative](this.elevation);
            }
            if (this.dynamicElevationOffset) {
                this[dynamicElevationOffsetProperty.setNative](this.dynamicElevationOffset);
            }
        }
    }
    // trick to get the same behavior as android (don't disable all children)
    [isUserInteractionEnabledProperty.setNative](value: boolean) {
        this.nativeViewProtected.interactable = value;
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setShadowElevationForState(value, MDCCardCellState.Normal);
        const dynamicElevationOffset = this.dynamicElevationOffset;
        if (typeof dynamicElevationOffset === 'undefined' || dynamicElevationOffset === null) {
            this.nativeViewProtected.setShadowElevationForState(value, MDCCardCellState.Highlighted);
        }
    }

    [dynamicElevationOffsetProperty.setNative](value: number) {
        let elevation = this.elevation;
        if (typeof elevation === 'undefined' || elevation === null) {
            elevation = this.getDefaultElevation();
        }
        this.nativeViewProtected.setShadowElevationForState(value + elevation, MDCCardCellState.Highlighted);
    }
    [backgroundInternalProperty.setNative](value: Background) {
        if (this.nativeViewProtected) {
            const scale = Screen.mainScreen.scale;
            if (value.color) {
                this.nativeViewProtected.backgroundColor = value.color ? value.color.ios : null;
            }
            // this.nativeViewProtected.setBorderWidthForState(value.borderLeftWidth / scale, MDCCardCellState.Normal);
            // this.nativeViewProtected.setBorderColorForState(value.borderTopColor ? value.borderTopColor.ios : null, MDCCardCellState.Normal);
            // this.nativeViewProtected.cornerRadius = value.borderTopLeftRadius / scale;
        }
    }

    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkView.inkColor = getRippleColor(color, this.rippleColorAlpha);
    }

    [rippleColorAlphaProperty.setNative](value: number) {
        const rippleColor = this.rippleColor;
        if (rippleColor) {
            this.nativeViewProtected.inkView.inkColor = getRippleColor(rippleColor, value);
        }
    }

    [shapeProperty.setNative](shape) {
        this.applyShapeScheme();
    }
}
