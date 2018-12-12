import { CssProperty } from 'tns-core-modules/ui/core/properties';
import { booleanConverter, Color } from 'tns-core-modules/ui/core/view';
import { Style } from 'tns-core-modules/ui/styling/style';


export const cssProperty = (target: Object, key: string | symbol) => {
    // property getter
    const getter = function() {
        return this.style.key;
    };

    // property setter
    const setter = function(newVal) {
        this.style[key] = newVal;
    };

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
    // }
};

export const rippleColorProperty = new CssProperty<Style, Color>({
    name: 'rippleColor',
    cssName: 'ripple-color',
    equalityComparer: Color.equals, valueConverter: (v) => new Color(v)
});
rippleColorProperty.register(Style);
export const errorColorProperty = new CssProperty<Style, Color>({
    name: 'errorColor',
    cssName: 'error-color',
    equalityComparer: Color.equals, valueConverter: (v) => new Color(v)
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
    cssName: 'max-length'
});
maxLengthProperty.register(Style);
export const floatingProperty = new CssProperty<Style, boolean>({
    name: 'floating',
    cssName: 'floating',
    valueConverter: booleanConverter
});
floatingProperty.register(Style);
export const elevationProperty = new CssProperty<Style, number>({
    name: 'elevation',
    cssName: 'elevation'
});
elevationProperty.register(Style);

export const variantProperty = new CssProperty<Style, string>({
    name: 'variant',
    cssName: 'variant'
});
variantProperty.register(Style);

export const trackBackgroundColorProperty = new CssProperty<Style, Color>({
    name: "trackBackgroundColor",
    cssName: 'track-background-color',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
})
trackBackgroundColorProperty.register(Style);
