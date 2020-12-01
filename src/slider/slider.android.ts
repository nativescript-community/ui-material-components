import { cssProperty, rippleColorProperty, themer } from '@nativescript-community/ui-material-core';
import { state } from '@nativescript-community/ui-material-core/android/utils';
import { CoercibleProperty, Color, Property, View, backgroundColorProperty, backgroundInternalProperty, colorProperty } from '@nativescript/core';
import { thumbColorProperty, trackBackgroundColorProperty, trackFillColorProperty } from './cssproperties';

let ASlider: typeof com.google.android.material.slider.Slider;
export function getEnabledColorStateList(color: Color, alpha = 255) {
    if (!color) {
        return null;
    }
    const states = Array.create('[I', 2);
    // const SELECTED_PRESSED_STATE_SET = Array.create("int",1);
    // SELECTED_PRESSED_STATE_SET[0] =  state.enabled;
    states[0] = Array.create('int', 1);
    states[0][0] = -state.enabled;
    states[1] = android.util.StateSet.NOTHING;
    // states[1][0] = new java.lang.Integer(-state.enabled);
    // const states = [
    //     getSELECTED_PRESSED_STATE_SET(),
    //     []]
    // ;
    const colors = Array.create('int', 2);
    colors[0] = new Color(alpha, 158, 158, 158).android;
    colors[1] = color.android;
    return new android.content.res.ColorStateList(states, colors);
}
export const valueProperty = new CoercibleProperty<Slider, number>({
    name: 'value',
    defaultValue: 0,
    coerceValue: (target, value) => {
        value = Math.max(value, target.minValue);
        value = Math.min(value, target.maxValue);

        return value;
    },
    valueConverter: (v) => parseFloat(v)
});
/**
 * Represents the observable property backing the minValue property of each Slider instance.
 */
export const minValueProperty = new Property<Slider, number>({
    name: 'minValue',
    defaultValue: 0,
    valueChanged: (target, oldValue, newValue) => {
        maxValueProperty.coerce(target);
        valueProperty.coerce(target);
    },
    valueConverter: (v) => parseFloat(v)
});
/**
 * Represents the observable property backing the maxValue property of each Slider instance.
 */
export const maxValueProperty = new CoercibleProperty<Slider, number>({
    name: 'maxValue',
    defaultValue: 100,
    coerceValue: (target, value) => {
        const minValue = target.minValue;
        if (value < minValue) {
            value = minValue;
        }

        return value;
    },
    valueChanged: (target, oldValue, newValue) => valueProperty.coerce(target),
    valueConverter: (v) => parseFloat(v)
});
export class Slider extends View {
    nativeViewProtected: com.google.android.material.slider.Slider;
    @cssProperty rippleColor: Color;
    @cssProperty trackBackgroundColor: Color;
    @cssProperty trackFillColor: Color;
    @cssProperty thumbColor: Color;
    @cssProperty elevation: number;
    _supressNativeValue: boolean;
    public value: number;
    public minValue: number;
    public maxValue: number;
    listener: com.google.android.material.slider.Slider.OnChangeListener;
    constructor() {
        super();
        this.color = themer.getPrimaryColor() as Color;
    }

    createNativeView() {
        if (!ASlider) {
            ASlider = com.google.android.material.slider.Slider;
        }
        const result = new ASlider(this._context);
        result.setLabelBehavior(2); // com.google.android.material.slider.LabelFormatter.LABEL_GONE
        return result;
    }
    initNativeView() {
        super.initNativeView();
        const nativeView = this.nativeViewProtected;
        this.listener = new com.google.android.material.slider.Slider.OnChangeListener({
            onValueChange: (param0: any, value: number, fromUser: boolean) => {
                if (fromUser) {
                    valueProperty.nativeValueChange(this as any, value);
                }
            }
        });
        nativeView.addOnChangeListener(this.listener);
    }
    disposeNativeView() {
        if (this.listener) {
            this.nativeViewProtected.removeOnChangeListener(this.listener);
            this.listener = null;
        }
        super.disposeNativeView();
    }

    /**
     * There is no minValue in Android. We simulate this by subtracting the minValue from the native value and maxValue.
     * We need this method to call native setMax and setProgress methods when minValue property is changed,
     * without handling the native value changed callback.
     */
    // setNativeValuesSilently() {
    //     this._supressNativeValue = true;
    //     const nativeView = this.nativeViewProtected;
    //     try {
    //         nativeView.setMax(this.maxValue - this.minValue);
    //         nativeView.setProgress(this.value - this.minValue);
    //     } finally {
    //         this._supressNativeValue = false;
    //     }
    // }

    [colorProperty.setNative](color: Color) {
        if (color) {
            this.nativeViewProtected.setTrackTintList(getEnabledColorStateList(color));
            if (!this.trackBackgroundColor) {
                this.trackBackgroundColor = new Color(61.2, color.r, color.g, color.b);
            }
        } else {
            this.nativeViewProtected.setTrackTintList(null);
            if (!this.trackBackgroundColor) {
                this.trackBackgroundColor = null;
            }
        }

        // if (!this.trackFillColor) {
        //     this.trackFillColor = color;
        // }
        if (!this.thumbColor) {
            this.thumbColor = color;
        } else {
            // trackFillColor overrides also the thumbColor
            this[thumbColorProperty.setNative](this.thumbColor);
        }
    }
    [valueProperty.setNative](value) {
        this.nativeViewProtected.setValueTo(this.maxValue);
        this.nativeViewProtected.setValue(value);
    }
    [minValueProperty.setNative](value) {
        this.nativeViewProtected.setValueFrom(value);
    }
    [maxValueProperty.getDefault]() {
        return 100;
    }
    [maxValueProperty.setNative](value) {
        this.nativeViewProtected.setValueTo(value);
    }
    // [colorProperty.getDefault]() {
    //     return -1;
    // }

    // [backgroundColorProperty.getDefault]() {
    //     return -1;
    // }
    [backgroundColorProperty.setNative](value) {
        this[trackBackgroundColorProperty.setNative](value);
    }

    [backgroundInternalProperty.setNative](value) {
        //
    }

    [rippleColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setHaloTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
    }
    [thumbColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setThumbTintList(getEnabledColorStateList(color));
        if (!this.rippleColor) {
            this.rippleColor = color;
        } else {
            // trackFillColor overrides also the thumbColor
            this[rippleColorProperty.setNative](this.rippleColor);
        }
    }
    [trackBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setTrackInactiveTintList(getEnabledColorStateList(color, 61.2));
    }
    [trackFillColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setTrackActiveTintList(getEnabledColorStateList(color));
    }

    // [elevationProperty.setNative](value: number) {
    //     this.nativeViewProtected.thumbElevation = value;
    // }
}

valueProperty.register(Slider);

minValueProperty.register(Slider);

maxValueProperty.register(Slider);
