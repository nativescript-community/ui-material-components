import { cssProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/color';
import { CssProperty, Style } from 'tns-core-modules/ui/core/properties';
import { CSSType } from 'tns-core-modules/ui/core/view';
import { Slider as NSSlider } from 'tns-core-modules/ui/slider';

@CSSType('MDSlider')
export abstract class SliderBase extends NSSlider {
    @cssProperty rippleColor: Color;
    @cssProperty trackBackgroundColor: Color;
    @cssProperty trackFillColor: Color;
    @cssProperty thumbColor: Color;
    @cssProperty elevation: number;
    constructor() {
        super();
    }
}

