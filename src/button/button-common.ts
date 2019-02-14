import { Color, CSSType, Length, Property } from 'tns-core-modules/ui/core/view';
import { Button } from 'tns-core-modules/ui/button/button';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDButton')
export abstract class ButtonBase extends Button {
    public variant: string;
    @cssProperty elevation: number;
    @cssProperty rippleColor: Color | string;

    constructor() {
        super();
        this.style.margin = 5;
    }
}

export const variantProperty = new Property<ButtonBase, string>({
    name: 'variant'
});
variantProperty.register(ButtonBase);
