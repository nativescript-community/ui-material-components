import { Color, CSSType, Length, View } from 'tns-core-modules/ui/core/view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { cssProperty } from './cssproperties';

@CSSType('MDCCardView')
export abstract class CardViewBase extends StackLayout {
    protected _borderRadius: number;
    protected _borderColor: Color;
    protected _borderWidth: number;

    @cssProperty elevation: number;
    @cssProperty rippleColor: string | Color;

    get borderRadius(): string | Length {
        return this._borderRadius;
    }
    get borderWidth(): string | Length {
        return this._borderWidth;
    }
    get borderColor(): Color {
        return this._borderColor;
    }
}
