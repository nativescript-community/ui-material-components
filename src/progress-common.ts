import { Color, CSSType, Property } from 'tns-core-modules/ui/core/view';
import { Progress as NSProgress } from 'tns-core-modules/ui/progress';

@CSSType('MDCSlider')
export abstract class ProgressBase extends NSProgress {}

export const progressColorProperty = new Property<ProgressBase, Color>({
    name: 'progressColor',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
export const progressBackgroundColorProperty = new Property<ProgressBase, Color>({
    name: 'progressBackgroundColor',
    equalityComparer: Color.equals,
    valueConverter: v => new Color(v)
});
