import { Color, CSSType } from 'tns-core-modules/ui/core/view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDCardView')
export abstract class CardViewBase extends StackLayout {
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
