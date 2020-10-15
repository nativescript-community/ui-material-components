import { themer } from '@nativescript-community/ui-material-core';
import { Color, Screen } from '@nativescript/core';
import { ProgressBase, busyProperty, indeterminateProperty, progressBackgroundColorProperty, progressColorProperty } from './progress-common';

export class Progress extends ProgressBase {
    nativeViewProtected: MDCProgressView;

    constructor() {
        super();
        this.effectiveMinHeight = 2 * Screen.mainScreen.scale;
    }

    public createNativeView() {
        const result = MDCProgressView.new();
        const scheme = MDCContainerScheme.new();
        scheme.colorScheme = themer.getAppColorScheme();
        result.applyThemeWithScheme(scheme);
        return result;
    }

    [progressColorProperty.setNative](color: Color) {
        this.nativeViewProtected.progressTintColor = color ? color.ios : null;
    }

    [progressBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.trackTintColor = color ? color.ios : null;
    }
    [indeterminateProperty.setNative](value: boolean) {
        this.nativeViewProtected.mode = value ? MDCProgressViewMode.Indeterminate : MDCProgressViewMode.Determinate;
        if (this.busy) {
            this.nativeViewProtected.startAnimating();
        }
    }
    [busyProperty.setNative](value) {
        const nativeView = this.nativeViewProtected;
        if (nativeView.mode === MDCProgressViewMode.Determinate) {
            return;
        }
        if (value) {
            nativeView.startAnimating();
        } else {
            nativeView.stopAnimating();
        }
        // if (nativeView.hidesWhenStopped) {
        //     this.requestLayout();
        // }
    }
}
