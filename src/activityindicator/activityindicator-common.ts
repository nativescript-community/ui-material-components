import { applyMixins } from 'nativescript-material-core';
import { ActivityIndicator as NSActivityIndicator } from 'tns-core-modules/ui/activity-indicator';
import { Property } from 'tns-core-modules/ui/core/properties';
import { CSSType } from 'tns-core-modules/ui/core/view';
import { booleanConverter } from 'tns-core-modules/ui/core/view-base';
import { Progress as NSProgress } from 'tns-core-modules/ui/progress';
import { layout } from 'tns-core-modules/utils/utils';

@CSSType('MDActivityIndicator')
export class ActivityIndicatorBase extends NSActivityIndicator {
    public startAnimating() {
        this.busy = true;
    }
    public stopAnimating() {
        this.busy = false;
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        const width = layout.getMeasureSpecSize(widthMeasureSpec);
        const widthMode = layout.getMeasureSpecMode(widthMeasureSpec);

        const height = layout.getMeasureSpecSize(heightMeasureSpec);
        const heightMode = layout.getMeasureSpecMode(heightMeasureSpec);
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
}

applyMixins(ActivityIndicatorBase, [NSProgress], { omit: ['createNativeView'] });

export const indeterminateProperty = new Property<ActivityIndicatorBase, boolean>({
    name: 'indeterminate',
    valueConverter: booleanConverter
});
indeterminateProperty.register(ActivityIndicatorBase);
