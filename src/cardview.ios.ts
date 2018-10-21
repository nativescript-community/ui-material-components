import { CardViewBase } from './cardview-common';
import { elevationProperty, rippleColorProperty } from './cssproperties';
import { Color, Length } from 'tns-core-modules/ui/page/page';
import { themer } from './material';

export class CardView extends CardViewBase {
    nativeViewProtected: MDCCard;
    _backgroundColor: Color;

    getRippleColor(color: string) {
        const temp = new Color(color);
        return new Color(36, temp.r, temp.g, temp.b).ios; // default alpha is 0.14
    }

    public createNativeView() {
        const view = MDCCard.new();
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCCardsColorThemer.applySemanticColorSchemeToCard(colorScheme, view);
        }
        if (this._backgroundColor) {
            view.backgroundColor = this._backgroundColor.ios;
        }
        if (this._borderRadius !== undefined) {
            view.layer.cornerRadius = this._borderRadius;
            // view.layer.masksToBounds = true;
            // view.clipsToBounds = true;
        }
        // if (this.style['rippleColor']) {
        //     view.inkView.inkColor = this.getRippleColor(this.style['rippleColor']);
        // }
        // view.layer.masksToBounds = true;
        // view.clipsToBounds = false;
        return view;
    }
    _setNativeClipToBounds() {
        // this.ios.clipsToBounds = true;
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setShadowElevationForState(value, UIControlState.Normal);
        this.nativeViewProtected.setShadowElevationForState(value * 2, UIControlState.Highlighted);
    }
    set borderRadius(value: string | Length) {
        const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this._borderRadius = newValue;
        if (this.nativeViewProtected) {
            this.nativeViewProtected.layer.cornerRadius = newValue;
        }
    }
    set borderWidth(value: string | Length) {
        const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this._borderRadius = newValue;
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setBorderWidthForState(newValue, UIControlState.Normal);
        }
    }
    set borderColor(value: Color) {
        this._borderColor = value;
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setBorderColorForState(value.ios, UIControlState.Normal);
        }
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value: Color | string) {
        const color = typeof value === 'string' ? new Color(value) : value;
        this._backgroundColor = color;
        if (this.nativeViewProtected) {
            this.nativeViewProtected.backgroundColor = color.ios;
        }
    }
    [rippleColorProperty.setNative](color: string) {
        this.nativeViewProtected.inkView.inkColor = this.getRippleColor(color);
    }
}
