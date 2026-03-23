import { getRippleColor, rippleColorAlphaProperty, rippleColorProperty, themer } from '@nativescript-community/ui-material-core';
import { Color } from '@nativescript/core';
import { RippleBase } from './ripple-common';

export class Ripple extends RippleBase {
    //TODO: remove as it needs to be added after TS 5.7 change https://github.com/microsoft/TypeScript/pull/59860
    [key: symbol]: (...args: any[]) => any | void;
    
    inkTouchController: MDCRippleTouchController;
    public createNativeView() {
        const view = UIView.alloc().init();
        this.inkTouchController = MDCRippleTouchController.alloc().initWithView(view);

        const colorScheme = themer.getAppColorScheme() as MDCSemanticColorScheme;
        if (colorScheme && colorScheme.primaryColor) {
            this.inkTouchController.rippleView.rippleColor =colorScheme.primaryColor.colorWithAlphaComponent(0.24);
        }
        // this.inkTouchController
        // MDCInkColorThemer.applyColorSchemeToInkView(colorScheme, this.inkTouchController.defaultInkView);
        return view;
    }
    [rippleColorProperty.setNative](color: Color) {
        this.inkTouchController.rippleView.rippleColor = getRippleColor(color, this.rippleColorAlpha);
    }
    [rippleColorAlphaProperty.setNative](value: number) {
        if (this.rippleColor) {
            this[rippleColorProperty.setNative](this.rippleColor);
        }
    }
}
