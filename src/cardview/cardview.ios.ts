import { CardViewBase } from './cardview-common';
import { elevationHighlightedProperty, elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { backgroundInternalProperty } from 'tns-core-modules/ui/styling/style-properties';
import { isUserInteractionEnabledProperty } from 'tns-core-modules/ui/core/view/view';
import { Color } from 'tns-core-modules/color';
import { getRippleColor, themer } from 'nativescript-material-core/core';
import { Background } from 'tns-core-modules/ui/styling/background';
import { screen } from 'tns-core-modules/platform/platform';

// use custom class to get the same behavior as android which is
// highlight even if clicked on subview (which is not a control)
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
    nativeViewProtected: MDCCardCollectionCell;

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

    // trick to get the same behavior as android (don't disable all children)
    [isUserInteractionEnabledProperty.setNative](value: boolean) {
        this.nativeViewProtected.interactable = value;
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setShadowElevationForState(value, MDCCardCellState.Normal);
        if (this.elevationHighlighted === undefined) {
            this.nativeViewProtected.setShadowElevationForState(value * 2, MDCCardCellState.Highlighted);
        }
    }
    [elevationHighlightedProperty.setNative](value: number) {
        this.nativeViewProtected.setShadowElevationForState(value, MDCCardCellState.Highlighted);
    }
    [backgroundInternalProperty.setNative](value: Background) {
        if (this.nativeViewProtected) {
            const scale = screen.mainScreen.scale;
            console.log('backgroundInternalProperty', value.color);
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
