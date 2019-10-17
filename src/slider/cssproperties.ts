import { CssProperty } from 'tns-core-modules/ui/core/properties';
import { Color } from 'tns-core-modules/color';
import { Style } from 'tns-core-modules/ui/styling/style';
import { booleanConverter } from 'tns-core-modules/ui/core/view-base';

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
