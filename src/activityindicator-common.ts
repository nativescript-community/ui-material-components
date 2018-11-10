import { CSSType, Length, Property, Color } from 'tns-core-modules/ui/core/view';
import { ActivityIndicator as NSActivityIndicator } from 'tns-core-modules/ui/activity-indicator';
import { cssProperty } from './cssproperties';

@CSSType('MDCActivityIndicator')
export abstract class ActivityIndicatorBase extends NSActivityIndicator {
    // public variant: string;
    // @cssProperty elevation: number
    // @cssProperty rippleColor: Color | string
    public startAnimating() {
        this.busy = true;
        // this.nativeViewProtected.startAnimating();
    }
    public stopAnimating() {
        this.busy = false;
        // this.nativeViewProtected.stopAnimating();
    }
}

