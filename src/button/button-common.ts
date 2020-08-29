import { Button, Color } from '@nativescript/core';
import { cssProperty } from 'nativescript-material-core/cssproperties';
import { VerticalTextAlignment } from 'nativescript-material-core';
import { CSSType, Property } from '@nativescript/core/ui/core/view';

@CSSType('MDButton')
export abstract class ButtonBase extends Button {
    public variant: string = 'contained';
    @cssProperty elevation: number;
    @cssProperty dynamicElevationOffset: number;
    @cssProperty rippleColor: Color;
    @cssProperty verticalTextAlignment: VerticalTextAlignment;
}

export const variantProperty = new Property<ButtonBase, string>({
    name: 'variant'
});
variantProperty.register(ButtonBase);
