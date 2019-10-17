import { CSSType } from 'tns-core-modules/ui/core/view';
import { Progress as NSProgress } from 'tns-core-modules/ui/progress';
import { Color } from 'tns-core-modules/color';
import { Property } from 'tns-core-modules/ui/core/properties';

@CSSType('MDProgress')
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
progressColorProperty.register(ProgressBase);
progressBackgroundColorProperty.register(ProgressBase);
