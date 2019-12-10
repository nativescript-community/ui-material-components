import { CssProperty } from '@nativescript/core/ui/core/properties';
import { Color } from '@nativescript/core/color';
import { Style } from '@nativescript/core/ui/styling/style';
import { booleanConverter } from '@nativescript/core/ui/core/view-base';

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
export const strokeColorProperty = new CssProperty<Style, Color>({
    name: 'strokeColor',
    cssName: 'stroke-color',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
strokeColorProperty.register(Style);
export const buttonColorProperty = new CssProperty<Style, Color>({
    name: 'buttonColor',
    cssName: 'button-color',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
buttonColorProperty.register(Style);
