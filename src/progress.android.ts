import { progressBackgroundColorProperty, ProgressBase, progressColorProperty } from './progress-common';
import { Color } from 'tns-core-modules/color/color';

export class Progress extends ProgressBase {
    [progressColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setProgressTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
    }
    [progressBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.setProgressBackgroundTintList(color ? android.content.res.ColorStateList.valueOf(color.android) : null);
    }
}
