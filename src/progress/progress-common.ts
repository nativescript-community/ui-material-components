import { Color } from '@nativescript/core';
import { CssProperty, Style } from '@nativescript/core';
import { CSSType } from '@nativescript/core';
import { Progress as NSProgress } from '@nativescript/core';

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
