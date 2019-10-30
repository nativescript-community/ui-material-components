import { CSSType } from '@nativescript/core/ui/core/view';
import { Button } from '@nativescript/core/ui/button';
import { cssProperty } from 'nativescript-material-core/cssproperties';
import { Color } from '@nativescript/core/color';
import { Property } from '@nativescript/core/ui/core/properties';
import { VerticalTextAlignment } from 'nativescript-material-core';

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
