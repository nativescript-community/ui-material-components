import { CSSType, CoercibleProperty, ActivityIndicator as NSActivityIndicator, Progress as NSProgress, Property, Utils, booleanConverter } from '@nativescript/core';
import { applyMixins } from '@nativescript-community/ui-material-core';

@CSSType('MDActivityIndicator')
export class ActivityIndicatorBase extends NSActivityIndicator {
    public indeterminate: boolean;
    public maxValue: number;
    public value: number;
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
    valueConverter: booleanConverter
});
indeterminateProperty.register(ActivityIndicatorBase);
/**
 * Represents the observable property backing the value property of each Progress instance.
 */
export const valueProperty = new CoercibleProperty<ActivityIndicatorBase, number>({
    name: 'value',
    defaultValue: 0,
    coerceValue: (t, v) => (v < 0 ? 0 : Math.min(v, t.maxValue)),
    valueConverter: (v) => parseInt(v, 10)
});
valueProperty.register(ActivityIndicatorBase);

/**
 * Represents the observable property backing the maxValue property of each Progress instance.
 */
export const maxValueProperty = new Property<ActivityIndicatorBase, number>({
    name: 'maxValue',
    defaultValue: 100,
    valueChanged: (target, oldValue, newValue) => {
        valueProperty.coerce(target);
    },
    valueConverter: (v) => parseInt(v, 10)
});
maxValueProperty.register(ActivityIndicatorBase);
