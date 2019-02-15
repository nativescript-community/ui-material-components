import { CardViewBase } from './cardview-common';
import { elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { backgroundInternalProperty, Color, Length } from 'tns-core-modules/ui/page/page';
import { getRippleColor, themer } from 'nativescript-material-core';
import { Background } from 'tns-core-modules/ui/styling/background';

export class CardView extends CardViewBase {
    nativeViewProtected: MDCCard;
    _backgroundColor: Color;

    public createNativeView() {
        const view = MDCCard.new();
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCCardsColorThemer.applySemanticColorSchemeToCard(colorScheme, view);
        }
        // if (this._backgroundColor) {
        //     view.backgroundColor = this._backgroundColor.ios;
        // }
        // if (this._borderRadius !== undefined) {
        //     view.layer.cornerRadius = this._borderRadius;
        // }
        return view;
    }
    _setNativeClipToBounds() {
        // this.ios.clipsToBounds = true;
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setShadowElevationForState(value, UIControlState.Normal);
        this.nativeViewProtected.setShadowElevationForState(value * 2, UIControlState.Highlighted);
    }
    [backgroundInternalProperty.setNative](value: Background) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.backgroundColor = value.color ? value.color.ios : null;
            this.nativeViewProtected.setBorderWidthForState(value.borderLeftWidth, UIControlState.Normal);
            this.nativeViewProtected.setBorderColorForState(value.borderTopColor ? value.borderTopColor.ios : null, UIControlState.Normal);
            this.nativeViewProtected.layer.cornerRadius = value.borderTopLeftRadius;
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkView.inkColor = getRippleColor(color);
    }
}
