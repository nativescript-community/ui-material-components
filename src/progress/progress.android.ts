import { Color, PercentLength, backgroundColorProperty, backgroundInternalProperty, colorProperty, heightProperty } from '@nativescript/core';
import { ProgressBase, busyProperty, indeterminateProperty, progressBackgroundColorProperty, progressColorProperty } from './progress-common';
import { getRippleColor } from '@nativescript-community/ui-material-core';
import { inflateLayout } from '@nativescript-community/ui-material-core/android/utils';

export class Progress extends ProgressBase {
    nativeViewProtected: com.google.android.material.progressindicator.LinearProgressIndicator;

    createNativeView() {
        return inflateLayout(this._context, 'ns_material_linear_progress') as com.google.android.material.progressindicator.LinearProgressIndicator;
    }

    [progressColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setProgressTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
    }
    [progressBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setProgressBackgroundTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
    }
    [indeterminateProperty.setNative](value: boolean) {
        if (this.nativeViewProtected.getVisibility() === android.view.View.VISIBLE) {
            this.nativeViewProtected.setVisibility(android.view.View.GONE);
            this.nativeViewProtected.setIndeterminate(value);
            this.nativeViewProtected.setVisibility(this.busy ? android.view.View.VISIBLE : android.view.View.INVISIBLE);
        } else {
            this.nativeViewProtected.setIndeterminate(value);
        }
    }
    [busyProperty.getDefault]() {
        return false;
    }
    [busyProperty.setNative](value) {
        this.nativeViewProtected.setVisibility(value ? android.view.View.VISIBLE : android.view.View.INVISIBLE);
    }
    [heightProperty.setNative](value) {
        this.nativeViewProtected.setTrackThickness(PercentLength.toDevicePixels(value));
    }
    // [visibilityProperty.setNative](value) {
    //     switch (value) {
    //         case Visibility.VISIBLE:
    //             this.nativeViewProtected.setVisibility(this.busy ? android.view.View.VISIBLE : android.view.View.INVISIBLE);
    //             break;
    //         case Visibility.HIDDEN:
    //             this.nativeViewProtected.setVisibility(android.view.View.INVISIBLE);
    //             break;
    //         case Visibility.COLLAPSE:
    //             this.nativeViewProtected.setVisibility(android.view.View.GONE);
    //             break;
    //         default:
    //             throw new Error(`Invalid visibility value: ${value}. Valid values are: "${Visibility.VISIBLE}", "${Visibility.HIDDEN}", "${Visibility.COLLAPSE}".`);
    //     }
    // }
    public startAnimating() {
        this.busy = true;
    }
    public stopAnimating() {
        this.busy = false;
    }
    [colorProperty.setNative](color) {
        const array = Array.create('int', 1);
        array[0] = color.android;
        this.nativeViewProtected.setIndicatorColor(array);
        if (!this.backgroundColor) {
            this.nativeViewProtected.setTrackColor(getRippleColor(color));
        }
    }
    [backgroundColorProperty.setNative](color) {
        this.nativeViewProtected.setTrackColor(color.android);
    }
    [backgroundInternalProperty.setNative](value) {
        //
    }
}
