import { Property, Style, CssProperty, paddingTopProperty, Length, paddingRightProperty, paddingBottomProperty, paddingLeftProperty } from 'tns-core-modules/ui/core/view';
import { Button } from 'tns-core-modules/ui/button/button';

export abstract class ButtonBase extends Button {
    public variant: string;
    protected _defaultPadding = 5;
    constructor() {
        super();
        this.style.margin = 5;
    }

}

export const variantProperty = new Property<ButtonBase, string>({
    name: 'variant'
});
variantProperty.register(ButtonBase);
export const rippleColorProperty = new CssProperty<Style, string>({
    name: 'rippleColor',
    cssName: 'ripple-color'
});
rippleColorProperty.register(Style);
// export const elevationProperty = new CssProperty<Style, number>({
//     name: 'elevation',
//     cssName: 'elevation',
//     valueConverter: parseFloat
// });
// elevationProperty.register(Style);
