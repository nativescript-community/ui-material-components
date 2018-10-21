import { ButtonBase } from './button-common';
import { themer } from './material';
import { Length } from 'tns-core-modules/ui/core/view';

import { backgroundColorProperty, backgroundInternalProperty, Color, fontInternalProperty } from 'tns-core-modules/ui/page/page';
import { Font } from 'tns-core-modules/ui/styling/font';
import { elevationProperty, rippleColorProperty } from './cssproperties';
import { Background } from 'tns-core-modules/ui/styling/background';
import { screen } from 'tns-core-modules/platform';

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
        const temp = new Color(color);
        return new Color(36, temp.r, temp.g, temp.b).ios; // default alpha is 0.14
    }

    public createNativeView() {
        const view = MDCButton.new();
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCTextButtonColorThemer.applySemanticColorSchemeToButton(colorScheme, view);
        }

        // console.log('create material button', this.variant, this._backgroundColor, this._borderRadius);
        if (this.variant === 'text') {
            MDCTextButtonThemer.applySchemeToButton(getButtonScheme(), view);
        } else if (this.variant === 'flat') {
        } else if (this.variant === 'outline') {
            MDCOutlinedButtonThemer.applySchemeToButton(getButtonScheme(), view);
        } else {
            MDCContainedButtonThemer.applySchemeToButton(getButtonScheme(), view);
        }
        // console.log('creating button', this._borderRadius, this.style.borderRadius);
        // if (this._borderRadius !== undefined) {
        //     this.setCornerRadius(this._borderRadius);
        // } else if (this.style.borderRadius) {
        //     this.borderRadius = this.style.borderRadius;
        //     this.setCornerRadius(this._borderRadius);
        // }
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

    private setCornerRadius(value: number) {
        // console.log('setCornerRadius', value, !!this.nativeViewProtected);
        if (this.nativeViewProtected) {
            this.nativeViewProtected.layer.cornerRadius = value;
        }
    }

    set borderRadius(value: string | Length) {
        this.style.borderRadius = value;
        const newValue = (this._borderRadius = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0));
        // console.log('set borderRadius', value, newValue);
        this.setCornerRadius(newValue);
        // if (this.nativeViewProtected) {
        //     this.nativeViewProtected.layer.cornerRadius = newValue;
        // }
    }
    [backgroundInternalProperty.setNative](value: UIColor | Background) {
        // this._nativeBackgroundState = "invalid";
        if (this.nativeViewProtected) {
            console.log('set backgroundInternalProperty', value);
            if (value instanceof UIColor) {
                this.nativeViewProtected.backgroundColor = value;
            } else if (typeof value === 'string') {
                this.nativeViewProtected.backgroundColor = new Color(value).ios;
            } else if (value instanceof Background) {
                this.nativeViewProtected.backgroundColor = value.color ? value.color.ios : null;
                // this is a trick for now. Though we can't have borderRadius=0 with that :s
                // we need a way to know borderRadius was actually set
                this._borderRadius = value.borderTopLeftRadius / screen.mainScreen.scale;
                // console.log('borderTopLeftRadius', value.borderTopLeftRadius, this.defaultBorderRadius, value.borderTopLeftRadius / screen.mainScreen.scale);
                if (value.borderTopLeftRadius !== this.defaultBorderRadius) {
                    this.setCornerRadius(this._borderRadius);
                // this.nativeViewProtected.layer.cornerRadius = value.borderTopLeftRadius;
                }
            } else {
                this.nativeViewProtected.backgroundColor = null;
            }
        }
    }

    [fontInternalProperty.setNative](value: Font | UIFont) {
        if (!(value instanceof Font) || !this.formattedText) {
            const nativeView = this.nativeViewProtected;
            const font = value instanceof Font ? value.getUIFont(nativeView.font) : value;
            nativeView.setTitleFontForState(font, UIControlState.Normal);
        }
    }
}
