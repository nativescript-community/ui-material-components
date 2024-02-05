import { heightProperty } from '@nativescript/core';
import { ActivityIndicatorBase, indeterminateProperty, maxValueProperty, valueProperty } from './index-common';
import { inflateLayout } from '@nativescript-community/ui-material-core/android/utils';

export class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: com.google.android.material.progressindicator.CircularProgressIndicator;

    // createNativeView() {
    //     const progressBar = new com.google.android.material.progressindicator.CircularProgressIndicator(this._context);
    //     progressBar.setVisibility(android.view.View.INVISIBLE);
    //     progressBar.setIndeterminate(true);
    //     return progressBar;
    // }
    // TODO: we are not using com.google.android.material.progressindicator.CircularProgressIndicator 
    // cause it does not measure as it did before
    // could be solved by subclass which would override onMeasure and try to do it again
    // like this https://github.com/aosp-mirror/platform_frameworks_base/blob/77ff5996acbe3cd2fde0f9eb559d3e77c3b48e3e/core/java/android/widget/ProgressBar.java#L2187
    createNativeView() {
        return inflateLayout(this._context, 'ns_material_circular_progress') as com.google.android.material.progressindicator.CircularProgressIndicator;
    }

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
