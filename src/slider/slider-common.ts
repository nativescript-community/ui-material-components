import { CSSType } from 'tns-core-modules/ui/core/view/view';
import { Color } from 'tns-core-modules/color';
import { booleanConverter } from 'tns-core-modules/ui/core/view-base';
import { colorProperty } from 'tns-core-modules/ui/styling/style-properties';
import { Property } from 'tns-core-modules/ui/core/properties';
import { Slider as NSSlider } from 'tns-core-modules/ui/slider';
import { cssProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';

@CSSType('MDSlider')
export abstract class SliderBase extends NSSlider {
    @cssProperty rippleColor: Color | string;
    @cssProperty trackBackgroundColor: Color | string;
    @cssProperty trackFillColor: Color | string;
    @cssProperty thumbColor: Color | string;
    @cssProperty elevation: number;
    constructor() {
        super();
    }

    [colorProperty.setNative](color: Color) {
        super[colorProperty.setNative](color);
        if (!this.trackBackgroundColor) {
            this.trackBackgroundColor = color;
        }
        if (!this.trackFillColor) {
            this.trackFillColor = color;
        }
        if (!this.thumbColor) {
            this.thumbColor = color;
        }
    }
}

export const thumbColorProperty = new Property<SliderBase, Color>({
    name: 'thumbColor',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
thumbColorProperty.register(SliderBase);

export const trackFillColorProperty = new Property<SliderBase, Color>({
    name: 'trackFillColor',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
trackFillColorProperty.register(SliderBase);
export const thumbHollowAtStartProperty = new Property<SliderBase, boolean>({
    name: 'thumbHollowAtStart',
    valueConverter: booleanConverter
});
thumbHollowAtStartProperty.register(SliderBase);
