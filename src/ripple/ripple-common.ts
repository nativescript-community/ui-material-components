import { CSSType, Color, StackLayout } from '@nativescript/core';
import { cssProperty } from '@nativescript-community/ui-material-core';

@CSSType('MDRipple')
export abstract class RippleBase extends StackLayout {
    @cssProperty rippleColor: Color;
}
