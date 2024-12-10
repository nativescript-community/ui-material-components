import { Color, Length, PercentLength, backgroundColorProperty, backgroundInternalProperty, colorProperty, heightProperty, visibilityProperty } from '@nativescript/core';
import { ProgressBase, busyProperty, indeterminateProperty, progressBackgroundColorProperty, progressColorProperty, trackCornerRadiusProperty } from './progress-common';
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
        this.nativeViewProtected.setIndeterminate(value);
        this[visibilityProperty.setNative](this.visibility);
    }
    [busyProperty.setNative](value) {
        this[visibilityProperty.setNative](this.visibility);
    }
    [heightProperty.setNative](value) {
        this.nativeViewProtected.setTrackThickness(PercentLength.toDevicePixels(value));
    }
    [visibilityProperty.setNative](value) {
        super[visibilityProperty.setNative](this.busy || !this.indeterminate ? value : 'hidden');
    }
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

    [trackCornerRadiusProperty.setNative](value) {
        this.nativeViewProtected.setTrackCornerRadius(Length.toDevicePixels(value, 0));
    }
}
