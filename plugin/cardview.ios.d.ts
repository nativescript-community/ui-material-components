import { CardViewBase } from './cardview-common';
import { Color, Length } from 'tns-core-modules/ui/page/page';
export declare class CardView extends CardViewBase {
    nativeViewProtected: MDCCard;
    _backgroundColor: Color;
    getRippleColor(color: Color): any;
    createNativeView(): MDCCard;
    _setNativeClipToBounds(): void;
    borderRadius: string | Length;
    borderWidth: string | Length;
    borderColor: Color;
    backgroundColor: Color | string;
}
