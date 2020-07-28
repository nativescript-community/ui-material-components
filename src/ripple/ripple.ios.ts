import { getRippleColor, rippleColorProperty, themer } from '@nativescript-community/ui-material-core';
import { Color } from '@nativescript/core';
import { RippleBase } from './ripple-common';

export class Ripple extends RippleBase {
    inkTouchController: MDCInkTouchController;
    public createNativeView() {
        const view = UIView.alloc().init();
        this.inkTouchController = MDCInkTouchController.alloc().initWithView(view);
        this.inkTouchController.addInkView();

        const colorScheme = themer.getAppColorScheme();
        MDCInkColorThemer.applyColorSchemeToInkView(colorScheme, this.inkTouchController.defaultInkView);
        return view;
    }
    [rippleColorProperty.setNative](color: Color) {
        this.inkTouchController.defaultInkView.inkColor = getRippleColor(color);
    }
}
