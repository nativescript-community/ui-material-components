import { themer } from '@nativescript-community/ui-material-core';
import { Color, colorProperty, visibilityProperty } from '@nativescript/core';
import { Visibility } from '@nativescript/core/ui/enums';
import { ProgressBase, busyProperty, indeterminateProperty, progressBackgroundColorProperty, progressColorProperty } from './progress-common';

export class Progress extends ProgressBase {
    constructor() {
        super();
        this.color = themer.getPrimaryColor() as Color;
    }
    nativeViewProtected: android.widget.ProgressBar;

    [progressColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setProgressTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
    }
    [progressBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setProgressBackgroundTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
    }
    [indeterminateProperty.setNative](value: boolean) {
        this.nativeViewProtected.setIndeterminate(value);
    }
    [busyProperty.getDefault]() {
        return false;
    }
    [busyProperty.setNative](value) {
        // if (value) {
        this.nativeViewProtected.setVisibility(value ? android.view.View.VISIBLE : android.view.View.INVISIBLE);
        // }
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
