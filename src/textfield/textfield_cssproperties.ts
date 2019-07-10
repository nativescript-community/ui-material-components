import { CssProperty } from 'tns-core-modules/ui/core/properties';
import { Color } from 'tns-core-modules/color';
import { Style } from 'tns-core-modules/ui/styling/style';
import { booleanConverter } from 'tns-core-modules/ui/core/view-base';

export const errorColorProperty = new CssProperty<Style, Color>({
    name: 'errorColor',
    cssName: 'error-color',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
errorColorProperty.register(Style);
export const helperProperty = new CssProperty<Style, string>({
    name: 'helper',
    cssName: 'helper'
});
helperProperty.register(Style);
export const errorProperty = new CssProperty<Style, string>({
    name: 'error',
    cssName: 'error'
});
errorProperty.register(Style);
export const maxLengthProperty = new CssProperty<Style, number>({
    name: 'maxLength',
    cssName: 'max-length',
    valueConverter: v => parseFloat(v)
});
maxLengthProperty.register(Style);
export const floatingProperty = new CssProperty<Style, boolean>({
    name: 'floating',
    cssName: 'floating',
    valueConverter: booleanConverter
});
floatingProperty.register(Style);
export const floatingColorProperty = new CssProperty<Style, Color>({
    name: 'floatingColor',
    cssName: 'floating-color',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
floatingColorProperty.register(Style);
export const highlightColorProperty = new CssProperty<Style, Color>({
    name: 'highlightColor',
    cssName: 'highlight-color',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
highlightColorProperty.register(Style);
