import { CardViewBase } from './cardview-common';
import { elevationProperty, rippleColorProperty } from './cssproperties';
import { Length, Color } from 'tns-core-modules/ui/page/page';

export class CardView extends CardViewBase {
    nativeViewProtected: MDCCard;
    _backgroundColor: Color;

    getRippleColor(color: string) {
        let temp = new Color(color);
        return new Color(36, temp.r, temp.g, temp.b).ios; // default alpha is 0.14
    }

    public createNativeView() {
        let view = MDCCard.new();
        if (this._backgroundColor) {
            view.backgroundColor = this._backgroundColor.ios;
        }
        if (this._borderRadius !== undefined) {
            view.layer.cornerRadius = this._borderRadius;
        }
        // if (this.style['rippleColor']) {
        //     view.inkView.inkColor = this.getRippleColor(this.style['rippleColor']);
        // }
        // view.layer.masksToBounds = true;
        // view.clipsToBounds = false;
        return view;
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setShadowElevationForState(value, UIControlState.Normal);
        this.nativeViewProtected.setShadowElevationForState(value * 2, UIControlState.Highlighted);
    }
    set borderRadius(value: string | Length) {
        let newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this._borderRadius = newValue;
        if (this.nativeViewProtected) {
            this.nativeViewProtected.layer.cornerRadius = newValue;
        }
    }
    set borderWidth(value: string | Length) {
        let newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
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
        console.log('rippleColorProperty', color);
        this.nativeViewProtected.inkView.inkColor = this.getRippleColor(color);
    }
}
