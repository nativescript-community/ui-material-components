import { dynamicElevationOffsetProperty, elevationProperty, getRippleColor, rippleColorProperty, themer } from '@nativescript-community/ui-material-core';
import { Background, Color, Screen, backgroundInternalProperty, isUserInteractionEnabledProperty } from '@nativescript/core';
import { CardViewBase } from './cardview-common';

// use custom class to get the same behavior as android which is
// highlight even if clicked on subview (which is not a control)

declare class ICard extends MDCCardCollectionCell {
    static new(): ICard;
    static alloc(): ICard;
}
const Card = (MDCCardCollectionCell as any).extend({
    touchesBeganWithEvent(touches, event) {
        this.super.touchesBeganWithEvent(touches, event);
        if (this.interactable) {
            this.highlighted = true;
        }
    },
    touchesEndedWithEvent(touches, event) {
        this.super.touchesEndedWithEvent(touches, event);
        this.highlighted = false;
    },
}) as typeof ICard;
export class CardView extends CardViewBase {
    nativeViewProtected: ICard;

    public createNativeView() {
        const view = Card.new();
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCCardsColorThemer.applySemanticColorSchemeToCardCell(colorScheme, view);
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
        return 5;
    }

    // trick to get the same behavior as android (don't disable all children)
    [isUserInteractionEnabledProperty.setNative](value: boolean) {
        this.nativeViewProtected.interactable = value;
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setShadowElevationForState(value, MDCCardCellState.Normal);
        let dynamicElevationOffset = this.dynamicElevationOffset;
        if (typeof dynamicElevationOffset === 'undefined' || dynamicElevationOffset === null) {
            dynamicElevationOffset = this.getDefaultDynamicElevationOffset();
        }
        if (dynamicElevationOffset === undefined) {
            this.nativeViewProtected.setShadowElevationForState(value + dynamicElevationOffset, MDCCardCellState.Highlighted);
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
            this.nativeViewProtected.layer.cornerRadius = value.borderTopLeftRadius / scale;
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkView.inkColor = getRippleColor(color);
    }
}
