import { Color } from '@nativescript/core/color';
import { CssProperty, Style } from '@nativescript/core/ui/core/properties';
import { CSSType } from '@nativescript/core/ui/core/view';
import { Progress as NSProgress } from '@nativescript/core/ui/progress';

@CSSType('MDProgress')
export abstract class ProgressBase extends NSProgress {}

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
progressColorProperty.register(Style);
progressBackgroundColorProperty.register(Style);
