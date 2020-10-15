import { themer } from '@nativescript-community/ui-material-core';
import { busyProperty } from '@nativescript-community/ui-material-progress/progress-common';
import { Color, Screen, Utils, View, colorProperty } from '@nativescript/core';
import { ActivityIndicatorBase, indeterminateProperty } from './index-common';

export class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: MDCActivityIndicator;
    autoSize = true;

    public createNativeView() {
        const view = MDCActivityIndicator.new();
        const color = (themer.getAppColorScheme() as MDCSemanticColorScheme).primaryColor;
        view.cycleColors  = color ? NSArray.arrayWithObject(color) : null;
        // const colorScheme = this.colorThemer || themer.getAppColorScheme();
        // if (colorScheme) {
        //     MDCActivityIndicatorColorThemer.applySemanticColorSchemeToActivityIndicator(colorScheme, view);
        // }
        return view;
    }
    // colorThemer: MDCSemanticColorScheme;
    // getColorThemer() {
    //     if (!this.colorThemer) {
    //         this.colorThemer = MDCSemanticColorScheme.new();
    //     }
    //     return this.colorThemer;
    // }

    _onSizeChanged(): void {
        if (this.autoSize) {
            this.updateStrokeRadius(this.getMeasuredWidth(), this.getMeasuredHeight());
        }
        super._onSizeChanged();
    }

    private updateStrokeRadius(width: number, height: number) {
        // radius is maxed to 72
        const min = Math.min(Math.min(width, height), 144);
        const strokeWidth = min / 25;
        const scale = Screen.mainScreen.scale;

        const radius = min / 2 - strokeWidth / 2;
        this.nativeViewProtected.strokeWidth = strokeWidth;
        this.nativeViewProtected.radius = radius / scale;
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        const nativeView = this.nativeViewProtected;
        if (nativeView) {
            const width = Utils.layout.getMeasureSpecSize(widthMeasureSpec);
            const widthMode = Utils.layout.getMeasureSpecMode(widthMeasureSpec);
            const height = Utils.layout.getMeasureSpecSize(heightMeasureSpec);
            const heightMode = Utils.layout.getMeasureSpecMode(heightMeasureSpec);

            const horizontalPadding = this.effectivePaddingLeft + this.effectiveBorderLeftWidth + this.effectivePaddingRight + this.effectiveBorderRightWidth;
            const verticalPadding = this.effectivePaddingTop + this.effectiveBorderTopWidth + this.effectivePaddingBottom + this.effectiveBorderBottomWidth;

            const desiredSize = Utils.layout.measureNativeView(nativeView, width - horizontalPadding, widthMode, height - verticalPadding, heightMode);

            desiredSize.width = desiredSize.width + horizontalPadding;
            desiredSize.height = desiredSize.height + verticalPadding;

            const measureWidth = Math.max(desiredSize.width, this.effectiveMinWidth);
            const measureHeight = Math.max(desiredSize.height, this.effectiveMinHeight);

            const widthAndState = View.resolveSizeAndState(measureWidth, width, widthMode, 0);
            const heightAndState = View.resolveSizeAndState(measureHeight, height, heightMode, 0);

            this.setMeasuredDimension(widthAndState, heightAndState);
        }
    }

    // public startAnimating() {
    //     this.nativeView.startAnimating();
    // }
    // public stopAnimating() {
    //     this.nativeView.stopAnimating();
    // }

    [colorProperty.setNative](value: UIColor | Color) {
        const color = value instanceof Color ? value.ios : value;;
        this.nativeViewProtected.cycleColors  = color ? NSArray.arrayWithObject(color) : null;
        // this.getColorThemer().primaryColor = value instanceof Color ? value.ios : value;
        // MDCActivityIndicatorColorThemer.applySemanticColorSchemeToActivityIndicator(this.getColorThemer(), this.nativeViewProtected);
    }
    [indeterminateProperty.setNative](value: boolean) {
        this.nativeViewProtected.indicatorMode = !!value ? MDCActivityIndicatorMode.Indeterminate : MDCActivityIndicatorMode.Determinate;
    }
}
