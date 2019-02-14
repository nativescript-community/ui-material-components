import { CSSType, layout } from 'tns-core-modules/ui/core/view';
import { ActivityIndicator as NSActivityIndicator } from 'tns-core-modules/ui/activity-indicator';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDActivityIndicator')
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

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        // const view = this.nativeViewProtected;
        const width = layout.getMeasureSpecSize(widthMeasureSpec);
        const widthMode = layout.getMeasureSpecMode(widthMeasureSpec);

        const height = layout.getMeasureSpecSize(heightMeasureSpec);
        const heightMode = layout.getMeasureSpecMode(heightMeasureSpec);

        // console.log('onMeasure', width, widthMode, height, heightMode);
        // let nativeWidth = 0;
        // let nativeHeight = 0;
        const finiteWidth: boolean = widthMode === layout.EXACTLY;
        const finiteHeight: boolean = heightMode === layout.EXACTLY;
        if (finiteWidth || finiteHeight) {
            let nativeWidth = finiteWidth ? width : height;
            let nativeHeight = finiteHeight ? height : width;
            nativeWidth = nativeHeight = Math.min(nativeWidth, nativeHeight);
            super.onMeasure(layout.makeMeasureSpec(nativeWidth, layout.EXACTLY), layout.makeMeasureSpec(nativeHeight, layout.EXACTLY));
        } else {
            super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        }
    }

    // public setMeasuredDimension(measuredWidth: number, measuredHeight: number): void {
    //     const actual = Math.min(measuredWidth, measuredHeight)
    //     console.log('setMeasuredDimension', measuredWidth, measuredHeight);
    //     super.setMeasuredDimension(actual, actual);
    // }
}
