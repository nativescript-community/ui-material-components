import { CSSType } from 'tns-core-modules/ui/core/view';
import { cssProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/color';
import { ContentView } from 'tns-core-modules/ui/page';

@CSSType('MDCardView')
export abstract class CardViewBase extends ContentView {
    // protected _borderRadius: number;
    // protected _borderColor: Color;
    // protected _borderWidth: number;

    @cssProperty elevation: number;
    @cssProperty dynamicElevationOffset: number;
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
