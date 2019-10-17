import { CSSType } from 'tns-core-modules/ui/core/view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { cssProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/color';

@CSSType('MDRipple')
export abstract class RippleBase extends StackLayout {
    @cssProperty rippleColor: Color;
}
