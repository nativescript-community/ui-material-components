import { CSSType } from 'tns-core-modules/ui/core/view/view';
import { Button } from 'tns-core-modules/ui/button/button';
import { cssProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/color';
import { Property } from 'tns-core-modules/ui/core/properties';
import { VerticalTextAlignment } from 'nativescript-material-core';

@CSSType('MDButton')
export abstract class ButtonBase extends Button {
    public variant: string = 'contained';
    @cssProperty elevation: number;
    @cssProperty dynamicElevationOffset: number;
    @cssProperty rippleColor: Color | string;
    @cssProperty verticalTextAlignment: VerticalTextAlignment;

    constructor() {
        super();
    }
}

export const variantProperty = new Property<ButtonBase, string>({
    name: 'variant'
});
variantProperty.register(ButtonBase);
