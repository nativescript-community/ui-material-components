import {Style, CssProperty } from 'tns-core-modules/ui/core/view';
export const rippleColorProperty = new CssProperty<Style, string>({
    name: 'rippleColor',
    cssName: 'ripple-color'
});
rippleColorProperty.register(Style);
export const errorColorProperty = new CssProperty<Style, string>({
    name: 'errorColor',
    cssName: 'error-color'
});
errorColorProperty.register(Style);
export const helperTextProperty = new CssProperty<Style, string>({
    name: 'helperText',
    cssName: 'helper-text'
});
helperTextProperty.register(Style);
export const maxLengthProperty = new CssProperty<Style, number>({
    name: 'maxLength',
    cssName: 'max-length'
});
maxLengthProperty.register(Style);
export const floatingProperty = new CssProperty<Style, boolean>({
    name: 'floating',
    cssName: 'floating'
});
floatingProperty.register(Style);
export const elevationProperty = new CssProperty<Style, number>({
    name: 'elevation',
    cssName: 'elevation'
});
elevationProperty.register(Style);
