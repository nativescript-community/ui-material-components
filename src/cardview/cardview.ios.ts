import { CardViewBase } from './cardview-common';
import { elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { backgroundInternalProperty, Color, isUserInteractionEnabledProperty, Length } from 'tns-core-modules/ui/page/page';
import { getRippleColor, themer } from 'nativescript-material-core';
import { Background } from 'tns-core-modules/ui/styling/background';
import { screen } from 'tns-core-modules/platform/platform';

// use custom class to get the same behavior as android which is
// highlight even if clicked on subview (which is not a control)
class Card extends MDCCard {
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
    nativeViewProtected: MDCCard;
    _backgroundColor: Color;

    public createNativeView() {
        const view = Card.new();
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCCardsColorThemer.applySemanticColorSchemeToCard(colorScheme, view);
        }
        view.interactable = this.isUserInteractionEnabled;
        return view;
    }
    _setNativeClipToBounds() {
        // this.ios.clipsToBounds = true;
    }
    [isUserInteractionEnabledProperty.setNative](value: boolean) {
        this.nativeViewProtected.interactable = value;
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setShadowElevationForState(value, UIControlState.Normal);
        this.nativeViewProtected.setShadowElevationForState(value * 2, UIControlState.Highlighted);
    }
    [backgroundInternalProperty.setNative](value: Background) {
        if (this.nativeViewProtected) {
            const scale = screen.mainScreen.scale;
            this.nativeViewProtected.backgroundColor = value.color ? value.color.ios : null;
            this.nativeViewProtected.setBorderWidthForState(value.borderLeftWidth / scale, UIControlState.Normal);
            this.nativeViewProtected.setBorderColorForState(value.borderTopColor ? value.borderTopColor.ios : null, UIControlState.Normal);
            this.nativeViewProtected.layer.cornerRadius = value.borderTopLeftRadius / scale;
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkView.inkColor = getRippleColor(color);
    }
}
