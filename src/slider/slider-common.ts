import { Color } from '@nativescript/core/color';
import { CSSType } from '@nativescript/core/ui/core/view';
import { Slider as NSSlider } from '@nativescript/core/ui/slider';
import { cssProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDSlider')
export abstract class SliderBase extends NSSlider {
    @cssProperty rippleColor: Color;
    @cssProperty trackBackgroundColor: Color;
    @cssProperty trackFillColor: Color;
    @cssProperty thumbColor: Color;
    @cssProperty elevation: number;
}
