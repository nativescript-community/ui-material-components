import { ButtonBase, variantProperty, rippleColorProperty } from './button-common';
import { Property, Style, CssProperty, paddingTopProperty, Length, paddingRightProperty, paddingBottomProperty, paddingLeftProperty } from 'tns-core-modules/ui/core/view';

import * as utils from 'tns-core-modules/utils/utils';
import { CSSType, Color, paddingProperty, fontInternalProperty } from 'tns-core-modules/ui/page/page';
import { Font } from 'tns-core-modules/ui/styling/font';

let buttonScheme: MDCButtonScheme;
function getButtonScheme() {
    if (!buttonScheme) {
        buttonScheme = MDCButtonScheme.new();
    }
    return buttonScheme;
}

@CSSType('Button')
export class Button extends ButtonBase {
    nativeViewProtected: MDCButton;
    _borderRadius: string | Length;
    _backgroundColor: Color;
    getRippleColor(color: string) {
        let temp = new Color(color);
        // console.log('getRippleColor', temp, temp.r, temp.g, temp.b, temp.a);
        return new Color(36, temp.r, temp.g, temp.b).ios; // default alpha is 0.14
    }

    public createNativeView() {
        let view = MDCButton.new();
        // console.log('create material button', this.variant, this._backgroundColor, this._borderRadius);
        if (this.variant === 'text') {
            MDCTextButtonThemer.applySchemeToButton(getButtonScheme(), view);
        } else if (this.variant === 'flat') {
        } else if (this.variant === 'outline') {
            MDCOutlinedButtonThemer.applySchemeToButton(getButtonScheme(), view);
        } else {
            MDCContainedButtonThemer.applySchemeToButton(getButtonScheme(), view);
        }

        if (this.style['rippleColor']) {
            view.inkColor = this.getRippleColor(this.style['rippleColor']);
        }
        if (this._backgroundColor) {
            view.backgroundColor = this._backgroundColor.ios;
        }
        if (this._borderRadius !== undefined) {
            let newValue = Length.toDevicePixels(typeof this._borderRadius === 'string' ? Length.parse(this._borderRadius) : this._borderRadius, 0);
            view.layer.cornerRadius = newValue;
        }
        return view;
    }

    get rippleColor(): string {
        return this.style['rippleColor'];
    }
    set rippleColor(color: string) {
        this.style['rippleColor'] = color;
        if (this.nativeViewProtected) {
            this.nativeViewProtected.inkColor = this.getRippleColor(color);
        }
    }
    get elevation(): number {
        return this.style['elevation'];
    }
    set elevation(value: number) {
        this.style['elevation'] = value;
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setElevationForState(value, UIControlState.Normal);
            this.nativeViewProtected.setElevationForState(value * 2, UIControlState.Highlighted);
        }
    }

    get borderRadius(): string | Length {
        return this._borderRadius;
    }
    set borderRadius(value: string | Length) {
        let newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        this._borderRadius = value;
        if (this.nativeViewProtected) {
            this.nativeViewProtected.layer.cornerRadius = newValue;
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
        // this.style.backgroundColor = value;
    }

    [fontInternalProperty.setNative](value: Font | UIFont) {
        if (!(value instanceof Font) || !this.formattedText) {
            let nativeView = this.nativeViewProtected;
            const font = value instanceof Font ? value.getUIFont(nativeView.font) : value;
            nativeView.setTitleFontForState(font, UIControlState.Normal);
        }
    }
}
