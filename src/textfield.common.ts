import { TextField as NTextField } from 'tns-core-modules/ui/text-field/text-field';
import { Color } from 'tns-core-modules/color/color';
import { CSSType } from 'tns-core-modules/ui/page/page';
import { cssProperty } from './cssproperties';

@CSSType('MDCTextField')
export abstract class TextField extends NTextField {
    constructor() {
        super();
    }
    abstract blur();

    @cssProperty helper: string;
    @cssProperty maxLength: number;
    @cssProperty errorColor: Color;
    @cssProperty floating: boolean;
    @cssProperty placeholderColor: Color;
    @cssProperty variant: string;
    @cssProperty error: string;
}
