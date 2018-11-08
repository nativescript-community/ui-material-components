import { Color, Length } from 'tns-core-modules/ui/core/view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
export declare abstract class CardViewBase extends StackLayout {
    protected _borderRadius: number;
    protected _borderColor: Color;
    protected _borderWidth: number;
    elevation: number;
    rippleColor: string | Color;
    readonly borderRadius: string | Length;
    readonly borderWidth: string | Length;
    readonly borderColor: Color;
}
