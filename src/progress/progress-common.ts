import { cssProperty } from '@nativescript-community/ui-material-core';
import { CSSType, Color, CssProperty, Progress as NSProgress, Property, Style, booleanConverter } from '@nativescript/core';

@CSSType('MDProgress')
export abstract class ProgressBase extends NSProgress {
    @cssProperty progressColor: Color;
    @cssProperty progressBackgroundColor: Color;
    public indeterminate: boolean;
    public busy: boolean;
    public startAnimating() {
        this.busy = true;
    }
    public stopAnimating() {
        this.busy = false;
    }
}

export const progressColorProperty = new CssProperty<Style, Color>({
    cssName: 'progress-color',
    name: 'progressColor',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
export const progressBackgroundColorProperty = new CssProperty<Style, Color>({
    cssName: 'progress-background-color',
    name: 'progressBackgroundColor',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
export const busyProperty = new Property<ProgressBase, boolean>({
    name: 'busy',
    defaultValue: false,
    valueConverter: booleanConverter
});
export const indeterminateProperty = new Property<ProgressBase, boolean>({
    name: 'indeterminate',
    valueConverter: booleanConverter
});
busyProperty.register(ProgressBase);
indeterminateProperty.register(ProgressBase);
progressColorProperty.register(Style);
progressBackgroundColorProperty.register(Style);
