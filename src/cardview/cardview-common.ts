import { CSSType } from 'tns-core-modules/ui/core/view';
import { cssProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/color';
import { ContentView } from 'tns-core-modules/ui/page';

@CSSType('MDCardView')
export abstract class CardViewBase extends ContentView {
    @cssProperty elevation: number;
    @cssProperty dynamicElevationOffset: number;
    @cssProperty rippleColor: Color;
}
