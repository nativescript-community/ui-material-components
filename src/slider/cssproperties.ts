import { CssProperty } from 'tns-core-modules/ui/core/properties';
import { Color } from 'tns-core-modules/ui/core/view';
import { Style } from 'tns-core-modules/ui/styling/style';

export const trackBackgroundColorProperty = new CssProperty<Style, Color>({
    name: 'trackBackgroundColor',
    cssName: 'track-background-color',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
trackBackgroundColorProperty.register(Style);
