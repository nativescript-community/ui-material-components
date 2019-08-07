import {
    progressBackgroundColorProperty,
    ProgressBase,
    progressColorProperty,
} from './progress-common';
import { themer } from 'nativescript-material-core';
import { screen } from 'tns-core-modules/platform';
import { Color } from 'tns-core-modules/color';

export class Progress extends ProgressBase {
    nativeViewProtected: MDCProgressView;

    constructor() {
        super();
        this.effectiveMinHeight = 2 * screen.mainScreen.scale;
    }

    public createNativeView() {
        const result = MDCProgressView.new();
        const colorScheme: MDCSemanticColorScheme = themer.getAppColorScheme();
        if (colorScheme) {
            MDCProgressViewColorThemer.applyColorSchemeToProgressView(
                colorScheme,
                result
            );
            // light color is not applied
            if (colorScheme.primaryColorVariant) {
                result.trackTintColor = colorScheme.primaryColorVariant;
            }
        }
        return result;
    }

    [progressColorProperty.setNative](color: Color) {
        this.nativeViewProtected.progressTintColor = color ? color.ios : null;
    }

    [progressBackgroundColorProperty.setNative](color: Color) {
        this.nativeViewProtected.trackTintColor = color ? color.ios : null;
    }
}
