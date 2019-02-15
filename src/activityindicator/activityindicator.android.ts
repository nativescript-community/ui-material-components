import { ActivityIndicatorBase } from './activityindicator-common';

// let MDCActivityIndicator: typeof android.support.design.widget.ActivityIndicator;

export class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: android.widget.ProgressBar;

    public startAnimating() {
        this.busy = true;
    }
    public stopAnimating() {
        this.busy = false;
    }
}
