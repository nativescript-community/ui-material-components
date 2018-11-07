import { CSSType, Length, Property, Color } from 'tns-core-modules/ui/core/view';
import { Button } from 'tns-core-modules/ui/button/button';
import { cssProperty } from './cssproperties';

@CSSType('MDCButton')
export abstract class ButtonBase extends Button {
    public variant: string;
    @cssProperty elevation: number
    @cssProperty rippleColor: Color | string
    
    constructor() {
        super();
        this.style.margin = 5;
    }


    // protected _borderRadius: number;
    // get borderRadius(): string | Length {
    //     return this._borderRadius;
    // }
}

export const variantProperty = new Property<ButtonBase, string>({
    name: 'variant'
});
variantProperty.register(ButtonBase);
