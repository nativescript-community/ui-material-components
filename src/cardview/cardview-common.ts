import { Color, ContentView } from '@nativescript/core';
import { cssProperty } from 'nativescript-material-core/cssproperties';
import { CSSType } from '@nativescript/core/ui/core/view';

@CSSType('MDCardView')
export abstract class CardViewBase extends ContentView {
    @cssProperty elevation: number;
    @cssProperty dynamicElevationOffset: number;
    @cssProperty rippleColor: Color;
}
