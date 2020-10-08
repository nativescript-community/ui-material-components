import { Button, CSSType, Color, Property } from '@nativescript/core';
import { cssProperty } from '@nativescript-community/ui-material-core';
import { VerticalTextAlignment } from '@nativescript-community/text';

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
