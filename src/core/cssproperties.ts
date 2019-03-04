import { CssProperty } from 'tns-core-modules/ui/core/properties';
import { booleanConverter, Color, Length } from 'tns-core-modules/ui/core/view';
import { Style } from 'tns-core-modules/ui/styling/style';

function createGetter(key) {
    return function() {
        return this.style[key];
    };
}
function createSetter(key) {
    return function(newVal) {
        this.style[key] = newVal;
    };
}

export const cssProperty = (target: Object, key: string | symbol) => {
    Object.defineProperty(target, key, {
        get: createGetter(key),
        set: createSetter(key),
        enumerable: true,
        configurable: true
    });
};

export const rippleColorProperty = new CssProperty<Style, Color>({
    name: 'rippleColor',
    cssName: 'ripple-color',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
rippleColorProperty.register(Style);
export const elevationProperty = new CssProperty<Style, Length>({
    name: 'elevation',
    cssName: 'elevation',

    valueConverter: v => Length.toDevicePixels(Length.parse(v), 0)
});
elevationProperty.register(Style);
export const elevationHighlightedProperty = new CssProperty<Style, Length>({
    name: 'elevationHighlighted',
    cssName: 'elevation-highlighted',

    valueConverter: v => Length.toDevicePixels(Length.parse(v), 0)
});
elevationHighlightedProperty.register(Style);

export const variantProperty = new CssProperty<Style, string>({
    name: 'variant',
    cssName: 'variant'
});
variantProperty.register(Style);
