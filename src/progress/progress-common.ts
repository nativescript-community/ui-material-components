import { Color } from 'tns-core-modules/color';
import { CssProperty, Style } from 'tns-core-modules/ui/core/properties';
import { CSSType } from 'tns-core-modules/ui/core/view';
import { Progress as NSProgress } from 'tns-core-modules/ui/progress';

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
