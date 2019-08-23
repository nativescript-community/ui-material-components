import { ActivityIndicatorBase, indeterminateProperty } from './activityindicator-common';

export class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: android.widget.ProgressBar;

    public startAnimating() {
        this.busy = true;
    }
    public stopAnimating() {
        this.busy = false;
    }

    [indeterminateProperty.setNative](value: boolean) {
        this.busy = true;
        // not supported for now with circular progress
        this.nativeViewProtected.setIndeterminate(value);
    }
}
