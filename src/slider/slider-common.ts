import { CSSType, Color, Slider as NSSlider } from '@nativescript/core';
import { cssProperty } from '@nativescript-community/ui-material-core';

@CSSType('MDSlider')
export abstract class SliderBase extends NSSlider {
    @cssProperty rippleColor: Color;
    @cssProperty trackBackgroundColor: Color;
    @cssProperty trackFillColor: Color;
    @cssProperty thumbColor: Color;
    @cssProperty elevation: number;
}
