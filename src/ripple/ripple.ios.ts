import { Color } from '@nativescript/core';
import { getRippleColor, themer } from 'nativescript-material-core/core';
import { rippleColorProperty } from 'nativescript-material-core/cssproperties';
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
