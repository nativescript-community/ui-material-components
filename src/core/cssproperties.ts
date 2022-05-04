import { Color, CoreTypes, CssProperty, Style } from '@nativescript/core';

export const cssProperty = (target: Object, key: string | symbol) => {
    Object.defineProperty(target, key, {
        get() {
            return this.style[key];
        },
        set(newVal) {
            this.style[key] = newVal;
        },
        enumerable: true,
        configurable: true
    });
};
export const rippleColorProperty = new CssProperty<Style, Color>({
    name: 'rippleColor',
    cssName: 'ripple-color',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v)
});
rippleColorProperty.register(Style);
export const elevationProperty = new CssProperty<Style, CoreTypes.LengthType>({
    name: 'elevation',
    cssName: 'elevation',

    valueConverter: parseFloat
});
elevationProperty.register(Style);
export const dynamicElevationOffsetProperty = new CssProperty<Style, CoreTypes.LengthType>({
    name: 'dynamicElevationOffset',
    cssName: 'dynamic-elevation-offset',

    valueConverter: parseFloat
});
dynamicElevationOffsetProperty.register(Style);

export const variantProperty = new CssProperty<Style, string>({
    name: 'variant',
    cssName: 'variant'
});
variantProperty.register(Style);

export const shapeProperty = new CssProperty<Style, string>({
    name: 'shape',
    cssName: 'shape'
});
shapeProperty.register(Style);
