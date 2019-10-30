import { CSSType } from '@nativescript/core/ui/core/view';
import { cssProperty } from 'nativescript-material-core/cssproperties';
import { Color } from '@nativescript/core/color';
import { ContentView } from '@nativescript/core/ui/page';

@CSSType('MDCardView')
export abstract class CardViewBase extends ContentView {
    @cssProperty elevation: number;
    @cssProperty dynamicElevationOffset: number;
    @cssProperty rippleColor: Color;
}
