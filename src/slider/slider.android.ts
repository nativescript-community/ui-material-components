import { cssProperty, rippleColorProperty, themer } from '@nativescript-community/ui-material-core';
import { getColorStateList, getEnabledColorStateList, state } from '@nativescript-community/ui-material-core/android/utils';
import { CoercibleProperty, Color, Property, View, backgroundColorProperty, backgroundInternalProperty, colorProperty } from '@nativescript/core';
import { stepSizeProperty, thumbColorProperty, trackBackgroundColorProperty, trackFillColorProperty } from './cssproperties';

let ASlider: typeof com.google.android.material.slider.Slider;

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 0;
export function sliderGetEnabledColorStateList(color: Color, alpha = 255) {
    if (!color) {
        return null;
    }
    return getEnabledColorStateList(color.android, new Color(alpha, 158, 158, 158).android);
}
export const valueProperty = new Property<Slider, number>({
    name: 'value',
    // defaultValue: 0,
    // coerceValue: (target, value) => {
    //     if (target.minValue !== undefined && target.maxValue !== undefined) {
    //         value = Math.max(value, target.minValue);
    //         value = Math.min(value, target.maxValue);
    //     }

    //     return value;
    // },
    valueConverter: (v) => parseFloat(v)
});
/**
 * Represents the observable property backing the minValue property of each Slider instance.
 */
export const minValueProperty = new Property<Slider, number>({
    name: 'minValue',
    // defaultValue: 0,
    valueChanged: (target, oldValue, newValue) => {
        maxValueProperty.coerce(target);
        // valueProperty.coerce(target);
    },
    valueConverter: (v) => parseFloat(v)
});
/**
 * Represents the observable property backing the maxValue property of each Slider instance.
 */
export const maxValueProperty = new CoercibleProperty<Slider, number>({
    name: 'maxValue',
    // defaultValue: 100,
    coerceValue: (target, value) => {
        const minValue = target.minValue;
        if (value < minValue) {
            value = minValue;
        }

        return value;
    },
    // valueChanged: (target, oldValue, newValue) => valueProperty.coerce(target),
    valueConverter: (v) => parseFloat(v)
});
export class Slider extends View {
    nativeViewProtected: com.google.android.material.slider.Slider;
    @cssProperty rippleColor: Color;
    @cssProperty trackBackgroundColor: Color;
    @cssProperty trackFillColor: Color;
    @cssProperty thumbColor: Color;
    @cssProperty stepSize: number;
    @cssProperty elevation: number;
    mSupressNativeValue: boolean;
    mCanChangeValues: boolean = true;
    mNeedUpdate: boolean = true;
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
        result.setValueFrom(DEFAULT_MIN);
        result.setValueTo(DEFAULT_MAX);
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

    [colorProperty.setNative](color: Color) {
        if (color) {
            this.nativeViewProtected.setTrackTintList(sliderGetEnabledColorStateList(color));
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
    [stepSizeProperty.getDefault]() {
        return DEFAULT_MIN;
    }
    [stepSizeProperty.setNative](value) {
        this.nativeViewProtected.setStepSize(value);
    }
    updateValues() {
        if (!this.mCanChangeValues) {
            this.mNeedUpdate = true;
            return;
        }
        const min = this.minValue || DEFAULT_MIN;
        const max = this.maxValue || DEFAULT_MAX;
        this.nativeViewProtected.setValueFrom(min);
        this.nativeViewProtected.setValueTo(max);
        let value = this.value;
        value = Math.max(value, min);
        value = Math.min(value, max);
        this.nativeViewProtected.setValue(value);
    }

    public onResumeNativeUpdates(): void {
        // {N} suspends properties update on `_suspendNativeUpdates`. So we only need to do this in onResumeNativeUpdates
        this.mCanChangeValues = false;
        super.onResumeNativeUpdates();
        this.mCanChangeValues = true;
        if (this.mNeedUpdate) {
            this.mNeedUpdate = false;
            this.updateValues();
        }
    }
    [valueProperty.setNative](value) {
        this.updateValues();
    }
    [minValueProperty.setNative](value) {
        this.updateValues();
    }
    [maxValueProperty.getDefault]() {
        return DEFAULT_MAX;
    }
    [maxValueProperty.setNative](value) {
        this.updateValues();
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
        this.nativeViewProtected.setHaloTintList(color ? getColorStateList(color.android) : null);
    }
    [thumbColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setThumbTintList(sliderGetEnabledColorStateList(color));
        if (!this.rippleColor) {
            this.rippleColor = color;
        } else {
            // trackFillColor overrides also the thumbColor
            this[rippleColorProperty.setNative](this.rippleColor);
        }
    }
    [trackBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setTrackInactiveTintList(sliderGetEnabledColorStateList(color, 61.2));
    }
    [trackFillColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setTrackActiveTintList(sliderGetEnabledColorStateList(color));
    }

    // [elevationProperty.setNative](value: number) {
    //     this.nativeViewProtected.thumbElevation = value;
    // }
}

valueProperty.register(Slider);

minValueProperty.register(Slider);

maxValueProperty.register(Slider);
