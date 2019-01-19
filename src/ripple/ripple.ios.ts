import { RippleBase } from './ripple-common';
import { rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/ui/page/page';
import { getRippleColor, themer } from 'nativescript-material-core';

export class Ripple extends RippleBase {
    constructor() {
        super();
    }

    inkTouchController: MDCInkTouchController;

    get ios() {
        return this.nativeViewProtected as MDCInkView;
    }
    public createNativeView() {
        const view = UIView.alloc().init();
        this.inkTouchController = MDCInkTouchController.alloc().initWithView(view);
        this.inkTouchController.addInkView();
        // if (this.style['rippleColor']) {
        //     this.inkTouchController.defaultInkView.inkColor = this.getRippleColor(this.style['rippleColor']);
        // } else {
        const colorScheme = themer.getAppColorScheme();
        MDCInkColorThemer.applyColorSchemeToInkView(colorScheme, this.inkTouchController.defaultInkView);
        // }
        return view;
    }
    [rippleColorProperty.setNative](color: Color) {
        this.inkTouchController.defaultInkView.inkColor = getRippleColor(color);
    }
}
