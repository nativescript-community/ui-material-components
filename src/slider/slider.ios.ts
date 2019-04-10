import { SliderBase, thumbColorProperty, thumbHollowAtStartProperty, trackFillColorProperty } from './slider-common';
import { themer } from 'nativescript-material-core';
import { Color } from 'tns-core-modules/color';
import { elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { trackBackgroundColorProperty } from './cssproperties';

export class Slider extends SliderBase {
    nativeViewProtected: MDCSlider;
    constructor() {
        super();
        this.height = 20;
    }
    public createNativeView() {
        const result = MDCSlider.new();
        result.statefulAPIEnabled = true;
        const colorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCSliderColorThemer.applySemanticColorSchemeToSlider(colorScheme, result);
        }
        return result;
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.inkColor = color ? color.ios : null;
    }

    [thumbColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setThumbColorForState(color ? color.ios : null, UIControlState.Normal);
    }
    [trackBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setTrackBackgroundColorForState(color ? color.ios : null, UIControlState.Normal);
    }
    [trackFillColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setTrackFillColorForState(color ? color.ios : null, UIControlState.Normal);
    }
    [thumbHollowAtStartProperty.setNative](value: boolean) {
        this.nativeViewProtected.thumbHollowAtStart = value;
    }
    [elevationProperty.setNative](value: number) {
        this.nativeViewProtected.thumbElevation = value;
    }
}
