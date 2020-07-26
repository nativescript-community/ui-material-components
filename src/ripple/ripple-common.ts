import { Color, StackLayout, CSSType } from '@nativescript/core';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDRipple')
export abstract class RippleBase extends StackLayout {
    @cssProperty rippleColor: Color;
}
