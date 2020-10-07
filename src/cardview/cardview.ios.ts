import { dynamicElevationOffsetProperty, elevationProperty, getRippleColor, rippleColorProperty, themer } from '@nativescript-community/ui-material-core';
import { Background, Color, Screen, backgroundInternalProperty, isUserInteractionEnabledProperty } from '@nativescript/core';
import { CardViewBase } from './cardview-common';

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

    public createNativeView() {
        const view = Card.new() as Card;
        const colorScheme = themer.getAppColorScheme() as MDCSemanticColorScheme;
        if (colorScheme) {
            const scheme = MDCContainerScheme.alloc().init();
            scheme.colorScheme = colorScheme;
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
            this.nativeViewProtected.setBorderWidthForState(value.borderLeftWidth / scale, MDCCardCellState.Normal);
            this.nativeViewProtected.setBorderColorForState(value.borderTopColor ? value.borderTopColor.ios : null, MDCCardCellState.Normal);
            this.nativeViewProtected.cornerRadius = value.borderTopLeftRadius / scale;
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkView.inkColor = getRippleColor(color);
    }
}
