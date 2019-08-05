import { rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/color';
import { trackBackgroundColorProperty } from './cssproperties';
import { SliderBase, thumbColorProperty, trackFillColorProperty } from './slider-common';

export class Slider extends SliderBase {
    nativeViewProtected: android.widget.SeekBar;

    [rippleColorProperty.setNative](color: Color) {
        this[thumbColorProperty.setNative](color);
    }
    [thumbColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setThumbTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
        if (android.os.Build.VERSION.SDK_INT >= 24) {
            this.nativeViewProtected.setTickMarkTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
        }
    }
    [trackBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setProgressBackgroundTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
    }
    [trackFillColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setProgressTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
    }

    // [elevationProperty.setNative](value: number) {
    //     this.nativeViewProtected.thumbElevation = value;
    // }
}
