import { Color } from '@nativescript/core/color';
import { CssProperty } from '@nativescript/core/ui/core/properties';
import { booleanConverter } from '@nativescript/core/ui/core/view-base';
import { Style } from '@nativescript/core/ui/styling/style';

export const trackBackgroundColorProperty = new CssProperty<Style, Color>({
    name: 'trackBackgroundColor',
    cssName: 'track-background-color',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
trackBackgroundColorProperty.register(Style);
export const thumbColorProperty = new CssProperty<Style, Color>({
    cssName: 'thumb-color',
    name: 'thumbColor',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
thumbColorProperty.register(Style);

export const trackFillColorProperty = new CssProperty<Style, Color>({
    cssName: 'track-fill-color',
    name: 'trackFillColor',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
trackFillColorProperty.register(Style);
export const thumbHollowAtStartProperty = new CssProperty<Style, boolean>({
    cssName: 'thumb-hollow-at-start',
    name: 'thumbHollowAtStart',
    valueConverter: booleanConverter
});
thumbHollowAtStartProperty.register(Style);
