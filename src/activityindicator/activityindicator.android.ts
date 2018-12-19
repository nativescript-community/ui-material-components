import { ActivityIndicatorBase } from './activityindicator-common';

// let MDCActivityIndicator: typeof android.support.design.widget.ActivityIndicator;

export class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: android.widget.ProgressBar;

    // get android(): android.support.design.widget.ActivityIndicator {
    //     return this.nativeViewProtected;
    // }
    // public createNativeView() {
    //     if (!MDCActivityIndicator) {
    //         MDCActivityIndicator = android.support.design.widget.ActivityIndicator;
    //     }
    //     const view = new MDCActivityIndicator(this._context);
    //     return view;
    // }

    public startAnimating() {
        this.busy = true;
        // this.nativeViewProtected.startAnimating();
    }
    public stopAnimating() {
        this.busy = false;
        // this.nativeViewProtected.stopAnimating();
    }
}
