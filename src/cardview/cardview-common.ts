import { Color, ContentView, CSSType } from '@nativescript/core';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDCardView')
export abstract class CardViewBase extends ContentView {
    @cssProperty elevation: number;
    @cssProperty dynamicElevationOffset: number;
    @cssProperty rippleColor: Color;
}
