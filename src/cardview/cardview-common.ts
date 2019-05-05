import { CSSType, View } from 'tns-core-modules/ui/core/view/view';
import { cssProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/color';

@CSSType('MDCardView')
export abstract class CardViewBase extends View {
    // protected _borderRadius: number;
    // protected _borderColor: Color;
    // protected _borderWidth: number;

    @cssProperty elevation: number;
    @cssProperty elevationHighlighted: number;
    @cssProperty rippleColor: Color;

    // get borderRadius(): string | Length {
    //     return this._borderRadius;
    // }
    // get borderWidth(): string | Length {
    //     return this._borderWidth;
    // }
    // get borderColor(): Color | string {
    //     return this._borderColor;
    // }
}
