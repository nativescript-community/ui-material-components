import { themer } from '@nativescript-community/ui-material-core';
import { Color, colorProperty } from '@nativescript/core';
import { ProgressBase, progressBackgroundColorProperty, progressColorProperty } from './progress-common';

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
}
