import { View, Property, CssProperty, Style } from 'tns-core-modules/ui/core/view';
import { TextField as NTextField } from 'tns-core-modules/ui/text-field/text-field';

// export const blurRadiusProperty = new Property<BlurView, number>({
//     name: 'blurRadius',
//     defaultValue: 16,
//     valueConverter: v => parseFloat(v)
// });
export abstract class TextField extends NTextField {
    constructor() {
        super();
    }
    abstract blur();
}
// export const highlightColorProperty = new CssProperty<Style, string>({
//     name: 'highlightColor',
//     cssName: 'highlight-color',
//     // affectsLayout: true,
//     // equalityComparer: Color.equals,
//     // valueConverter: v => new Color(v)
// });
// highlightColorProperty.register(Style);
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