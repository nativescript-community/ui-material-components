import { Color, CSSType, Length, View } from 'tns-core-modules/ui/core/view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';

@CSSType('MDCCardView')
export abstract class CardViewBase extends StackLayout {
    protected _borderRadius: number;
    protected _borderColor: Color;
    protected _borderWidth: number;
    get borderRadius(): string | Length {
        return this._borderRadius;
    }
    get borderWidth(): string | Length {
        return this._borderWidth;
    }
    get borderColor(): Color {
        return this._borderColor;
    }
    set rippleColor(color: string) {
        this.style['rippleColor'] = color;
    }

    set elevation(value: number) {
        this.style['elevation'] = value;
    }
}
