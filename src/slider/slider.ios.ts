import { elevationProperty, getRippleColor, rippleColorAlphaProperty, rippleColorProperty, themer } from '@nativescript-community/ui-material-core';
import { Color, backgroundColorProperty, colorProperty } from '@nativescript/core';
import { maxValueProperty } from '@nativescript/core/ui/progress';
import { minValueProperty } from '@nativescript/core/ui/slider/slider-common';
import { stepSizeProperty, thumbColorProperty, thumbHollowAtStartProperty, trackBackgroundColorProperty, trackFillColorProperty } from './cssproperties';
import { SliderBase } from './slider-common';

export class Slider extends SliderBase {
    nativeViewProtected: MDCSlider;
    constructor() {
        super();
        // this['css-height'] = 20;
    }
    public createNativeView() {
        const result = MDCSlider.new();
        // (result.subviews[0] as any).shouldDisplayInk = true;
        // (result.subviews[0] as any).shouldDisplayRipple = true;
        result.statefulAPIEnabled = true;
        (result as any).enableRippleBehavior = true;

        const colorScheme = themer.getAppColorScheme() as MDCSemanticColorScheme;
        if (colorScheme) {
            MDCSliderColorThemer.applySemanticColorSchemeToSlider(colorScheme, result);
        }
        return result;
    }
    [colorProperty.setNative](color: Color) {
        // super[colorProperty.setNative](color);
        if (!this.trackBackgroundColor) {
            this.trackBackgroundColor = new Color(66.3, color.r, color.g, color.b);
        }
        if (!this.trackFillColor) {
            this.trackFillColor = color;
        }
        if (!this.thumbColor) {
            this.thumbColor = color;
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.rippleColor = color ? getRippleColor(color, this.rippleColorAlpha) : null;
    }
    [rippleColorAlphaProperty.setNative](value: number) {
        if (this.rippleColor) {
            this[rippleColorProperty.setNative](this.rippleColor);
        }
    }

    [thumbColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setThumbColorForState(color ? color.ios : null, UIControlState.Normal);
        if (!this.rippleColor) {
            this.rippleColor = color;
        }
    }
    [backgroundColorProperty.setNative](value) {
        this[trackBackgroundColorProperty.setNative](value);
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
    [minValueProperty.setNative](value) {
        this.nativeViewProtected.minimumValue = value;
        if (this.stepSize !== 0) {
            // add one to get amount of values and not difference between min and max
            const valuesCount = this.maxValue - this.minValue + 1;
            this.nativeViewProtected.numberOfDiscreteValues = Math.ceil(valuesCount / value);
        }
    }
    [maxValueProperty.setNative](value) {
        this.nativeViewProtected.maximumValue = value;
        if (this.stepSize !== 0) {
            // add one to get amount of values and not difference between min and max
            const valuesCount = this.maxValue - this.minValue + 1;
            this.nativeViewProtected.numberOfDiscreteValues = Math.ceil(valuesCount / value);
        }
    }
    [stepSizeProperty.getDefault]() {
        return 0;
    }
    [stepSizeProperty.setNative](value) {
        if (value === 0) {
            this.nativeViewProtected.discrete = false;
        } else {
            this.nativeViewProtected.discrete = true;

            // add one to get amount of values and not difference between min and max
            const valuesCount = this.maxValue - this.minValue + 1;
            this.nativeViewProtected.numberOfDiscreteValues = Math.ceil(valuesCount / value);

            this.nativeViewProtected.shouldDisplayDiscreteValueLabel = false;
        }
    }
}
