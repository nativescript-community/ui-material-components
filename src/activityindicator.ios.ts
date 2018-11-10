import { ActivityIndicatorBase } from './activityindicator-common';
import { themer } from './material';
import { colorProperty } from 'tns-core-modules/ui/styling/style-properties';
import { Color } from 'tns-core-modules/color/color';


export class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: MDCActivityIndicator;

    get ios(): MDCActivityIndicator {
        return this.nativeViewProtected;
    }
    public createNativeView() {

        const view =  MDCActivityIndicator.alloc().init();
        const colorScheme = this.colorThemer || themer.getAppColorScheme();
        if (colorScheme) {
            MDCActivityIndicatorColorThemer.applySemanticColorSchemeToActivityIndicator(colorScheme, view);
        }
        return view;
    }
    colorThemer:MDCSemanticColorScheme
    getColorThemer() {
        if (!this.colorThemer) {
            this.colorThemer = MDCSemanticColorScheme.alloc().init();
        }
        return this.colorThemer;
    }

    // public startAnimating() {
    //     this.nativeView.startAnimating();
    // }
    // public stopAnimating() {
    //     this.nativeView.stopAnimating();
    // }

    [colorProperty.getDefault](): UIColor {
        return null;
    }
    [colorProperty.setNative](value: UIColor | Color) {
        this.getColorThemer().primaryColor =  value instanceof Color ? value.ios : value;
        MDCActivityIndicatorColorThemer.applySemanticColorSchemeToActivityIndicator(this.getColorThemer(), this.nativeViewProtected);
    }
}
