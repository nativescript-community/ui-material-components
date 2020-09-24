import { getRippleColor, rippleColorProperty, themer } from '@nativescript-community/ui-material-core';
import { Color } from '@nativescript/core';
import { RippleBase } from './ripple-common';

export class Ripple extends RippleBase {
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
        this.inkTouchController.rippleView.rippleColor = getRippleColor(color);
    }
}
