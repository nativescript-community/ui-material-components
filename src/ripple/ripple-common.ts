import { Color, CSSType } from 'tns-core-modules/ui/core/view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDRipple')
export abstract class RippleBase extends StackLayout {
    @cssProperty rippleColor: Color | string;
}
