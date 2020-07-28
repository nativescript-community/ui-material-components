import { Color, CSSType, Slider as NSSlider } from '@nativescript/core';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDSlider')
export abstract class SliderBase extends NSSlider {
    @cssProperty rippleColor: Color;
    @cssProperty trackBackgroundColor: Color;
    @cssProperty trackFillColor: Color;
    @cssProperty thumbColor: Color;
    @cssProperty elevation: number;
}
