import { ButtonBase } from './button-common';
import { Length } from 'tns-core-modules/ui/core/view';

import { Color, fontInternalProperty, backgroundColorProperty, backgroundInternalProperty } from 'tns-core-modules/ui/page/page';
import { Font } from 'tns-core-modules/ui/styling/font';
import { rippleColorProperty, elevationProperty } from './cssproperties';
import { Background } from 'tns-core-modules/ui/styling/background';

let buttonScheme: MDCButtonScheme;
function getButtonScheme() {
    if (!buttonScheme) {
        buttonScheme = MDCButtonScheme.new();
    }
    return buttonScheme;
}

export class Button extends ButtonBase {
    defaultBorderRadius;
    constructor() {
        super();
        this.defaultBorderRadius = this.style.borderRadius;
    }
    nativeViewProtected: MDCButton;
    // _backgroundColor: Color;
    getRippleColor(color: string) {
        let temp = new Color(color);
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
        view.addTargetActionForControlEvents(this['_tapHandler'], 'tap', UIControlEvents.TouchUpInside);
        return view;
    }

    [rippleColorProperty.setNative](color: string) {
        this.nativeViewProtected.inkColor = this.getRippleColor(color);
    }

    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.setElevationForState(value, UIControlState.Normal);
        this.nativeViewProtected.setElevationForState(value * 2, UIControlState.Highlighted);
    }

    [backgroundColorProperty.setNative](value: Color) {
        if (this.nativeViewProtected) {
            this.nativeViewProtected.backgroundColor = value.ios;
        }
    }

    set borderRadius(value: string | Length) {
        this.style.borderRadius = value;
        if (this.nativeViewProtected) {
            let newValue = (this._borderRadius = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0));
            this.nativeViewProtected.layer.cornerRadius = newValue;
        }
    }
    [backgroundInternalProperty.setNative](value: UIColor | Background) {
        // this._nativeBackgroundState = "invalid";
        if (this.nativeViewProtected) {
            if (value instanceof UIColor) {
                this.nativeViewProtected.backgroundColor = value;
            } else {
                this.nativeViewProtected.backgroundColor = value.color.ios;
                // this is a trick for now. Though we can't have borderRadius=0 with that :s
                // we need a way to know borderRadius was actually set
                if (value.borderTopLeftRadius !== this.defaultBorderRadius) {
                    this.nativeViewProtected.layer.cornerRadius = value.borderTopLeftRadius / 2;
                }
            }
        }
    }

    [fontInternalProperty.setNative](value: Font | UIFont) {
        if (!(value instanceof Font) || !this.formattedText) {
            let nativeView = this.nativeViewProtected;
            const font = value instanceof Font ? value.getUIFont(nativeView.font) : value;
            nativeView.setTitleFontForState(font, UIControlState.Normal);
        }
    }
}
