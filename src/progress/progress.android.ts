import { themer } from '@nativescript-community/ui-material-core';
import { Color, PercentLength, colorProperty, heightProperty, visibilityProperty } from '@nativescript/core';
import { Visibility } from '@nativescript/core/ui/enums';
import { ProgressBase, busyProperty, indeterminateProperty, progressBackgroundColorProperty, progressColorProperty } from './progress-common';

export class Progress extends ProgressBase {
    constructor() {
        super();
        this.color = themer.getPrimaryColor() as Color;
    }
    nativeViewProtected: com.google.android.material.progressindicator.LinearProgressIndicator;

    // added in 1.3.0
    createNativeView() {
        return new com.google.android.material.progressindicator.LinearProgressIndicator(this._context);
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
            this.nativeViewProtected.setVisibility(android.view.View.VISIBLE);
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
}
