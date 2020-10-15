import { ActivityIndicatorBase, indeterminateProperty } from './index-common';

export class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: android.widget.ProgressBar;

    [indeterminateProperty.setNative](value: boolean) {
        this.busy = true;
        // not supported for now with circular progress
        this.nativeViewProtected.setIndeterminate(value);
    }
}
