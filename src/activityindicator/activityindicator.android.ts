import { ActivityIndicatorBase } from './activityindicator-common';

export class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: android.widget.ProgressBar;

    public startAnimating() {
        this.busy = true;
    }
    public stopAnimating() {
        this.busy = false;
    }
}
