import { ActivityIndicator as NSActivityIndicator } from 'tns-core-modules/ui/activity-indicator';
export declare abstract class ActivityIndicatorBase extends NSActivityIndicator {
    startAnimating(): void;
    stopAnimating(): void;
    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void;
}
