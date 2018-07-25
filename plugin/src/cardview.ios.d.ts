import { CardViewBase } from './cardview-common';
import { Length, Color } from 'tns-core-modules/ui/page/page';
export declare class CardView extends CardViewBase {
    nativeViewProtected: MDCCard;
    _backgroundColor: Color;
    getRippleColor(color: string): any;
    createNativeView(): MDCCard;
    borderRadius: string | Length;
    borderWidth: string | Length;
    borderColor: Color;
    backgroundColor: Color | string;
}
