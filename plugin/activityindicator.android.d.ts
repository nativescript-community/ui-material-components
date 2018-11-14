import { ActivityIndicatorBase } from './activityindicator-common';
export declare class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: android.widget.ProgressBar;
    startAnimating(): void;
    stopAnimating(): void;
}
