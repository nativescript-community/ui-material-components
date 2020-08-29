import { ActivityIndicator as NSActivityIndicator, Progress as NSProgress, Utils } from '@nativescript/core';
import { CSSType, Property, booleanConverter } from '@nativescript/core/ui/core/view';
import { applyMixins } from 'nativescript-material-core';

@CSSType('MDActivityIndicator')
export class ActivityIndicatorBase extends NSActivityIndicator {
    public indeterminate: boolean;
    public startAnimating() {
        this.busy = true;
    }
    public stopAnimating() {
        this.busy = false;
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        const width = Utils.layout.getMeasureSpecSize(widthMeasureSpec);
        const widthMode = Utils.layout.getMeasureSpecMode(widthMeasureSpec);

        const height = Utils.layout.getMeasureSpecSize(heightMeasureSpec);
        const heightMode = Utils.layout.getMeasureSpecMode(heightMeasureSpec);
        const finiteWidth: boolean = widthMode === Utils.layout.EXACTLY;
        const finiteHeight: boolean = heightMode === Utils.layout.EXACTLY;
        if (finiteWidth || finiteHeight) {
            let nativeWidth = finiteWidth ? width : height;
            let nativeHeight = finiteHeight ? height : width;
            nativeWidth = nativeHeight = Math.min(nativeWidth, nativeHeight);
            super.onMeasure(Utils.layout.makeMeasureSpec(nativeWidth, Utils.layout.EXACTLY), Utils.layout.makeMeasureSpec(nativeHeight, Utils.layout.EXACTLY));
        } else {
            super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        }
    }
}

applyMixins(ActivityIndicatorBase, [NSProgress], { omit: ['createNativeView'] });

export const indeterminateProperty = new Property<ActivityIndicatorBase, boolean>({
    name: 'indeterminate',
    valueConverter: booleanConverter,
});
indeterminateProperty.register(ActivityIndicatorBase);
