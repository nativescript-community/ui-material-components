import { cssProperty } from 'nativescript-material-core/cssproperties';
import { Color } from '@nativescript/core/color';
import { CssProperty, Style } from '@nativescript/core/ui/core/properties';
import { CSSType, View } from '@nativescript/core/ui/core/view';
import { Slider as NSSlider } from '@nativescript/core/ui/slider';

@CSSType('MDSlider')
export abstract class SliderBase extends NSSlider {
    @cssProperty rippleColor: Color;
    @cssProperty trackBackgroundColor: Color;
    @cssProperty trackFillColor: Color;
    @cssProperty thumbColor: Color;
    @cssProperty elevation: number;
}
