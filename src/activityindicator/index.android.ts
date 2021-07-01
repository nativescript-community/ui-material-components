import { ActivityIndicatorBase, indeterminateProperty, maxValueProperty, valueProperty } from './index-common';

export class ActivityIndicator extends ActivityIndicatorBase {
    // nativeViewProtected: com.google.android.material.progressindicator.CircularProgressIndicator;

    // createNativeView() {
    //     const progressBar = new com.google.android.material.progressindicator.CircularProgressIndicator(this._context);
    //     progressBar.setVisibility(android.view.View.INVISIBLE);
    //     progressBar.setIndeterminate(true);
    //     return progressBar;
    // }

    [valueProperty.getDefault](): number {
        return 0;
    }
    [valueProperty.setNative](value: number) {
        this.nativeViewProtected.setProgress(value);
    }

    [maxValueProperty.getDefault](): number {
        return 100;
    }
    [maxValueProperty.setNative](value: number) {
        this.nativeViewProtected.setMax(value);
    }

    [indeterminateProperty.setNative](value: boolean) {
        this.nativeViewProtected.setIndeterminate(value);
    }
}
