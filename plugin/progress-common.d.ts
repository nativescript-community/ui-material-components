import { Color, Property } from 'tns-core-modules/ui/core/view';
import { Progress as NSProgress } from 'tns-core-modules/ui/progress';
export declare abstract class ProgressBase extends NSProgress {
}
export declare const progressColorProperty: Property<ProgressBase, Color>;
export declare const progressBackgroundColorProperty: Property<ProgressBase, Color>;
