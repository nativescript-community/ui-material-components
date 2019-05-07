import { CSSType } from 'tns-core-modules/ui/core/view/view';
import { Button } from 'tns-core-modules/ui/button/button';
import { cssProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/color';
import { Property } from 'tns-core-modules/ui/core/properties';

@CSSType('MDButton')
export abstract class ButtonBase extends Button {
    public variant: string;
    @cssProperty elevation: number;
    @cssProperty elevationHighlighted: number;
    @cssProperty rippleColor: Color | string;

    constructor() {
        super();
        // we need to set the default through css or user would not be able to overload it through css...
        this.style['css:margin-left'] = 10;
        this.style['css:margin-right'] = 10;
        this.style['css:margin-top'] = 6;
        this.style['css:margin-bottom'] = 12;
    }
}

export const variantProperty = new Property<ButtonBase, string>({
    name: 'variant'
});
variantProperty.register(ButtonBase);
