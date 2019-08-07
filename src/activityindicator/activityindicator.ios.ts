import { ActivityIndicatorBase } from './activityindicator-common';
import { themer } from 'nativescript-material-core';
import { colorProperty } from 'tns-core-modules/ui/styling/style-properties';
import { Color } from 'tns-core-modules/color';
import { screen } from 'tns-core-modules/platform';

declare module 'tns-core-modules/ui/core/view/view' {
    interface View {
        _onSizeChanged();
    }
}
export class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: MDCActivityIndicator;
    autoSize = true;

    get ios(): MDCActivityIndicator {
        return this.nativeViewProtected;
    }
    public createNativeView() {
        const view = MDCActivityIndicator.new();
        const colorScheme = this.colorThemer || themer.getAppColorScheme();
        if (colorScheme) {
            MDCActivityIndicatorColorThemer.applySemanticColorSchemeToActivityIndicator(
                colorScheme,
                view
            );
        }
        return view;
    }
    colorThemer: MDCSemanticColorScheme;
    getColorThemer() {
        if (!this.colorThemer) {
            this.colorThemer = MDCSemanticColorScheme.new();
        }
        return this.colorThemer;
    }

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
        const scale = screen.mainScreen.scale;

        const radius = min / 2 - strokeWidth / 2;
        this.nativeViewProtected.strokeWidth = strokeWidth;
        this.nativeViewProtected.radius = radius / scale;
    }

    // public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {

    //     let nativeView = this.nativeViewProtected;
    //     if (nativeView) {
    //         const width = layout.getMeasureSpecSize(widthMeasureSpec);
    //         const widthMode = layout.getMeasureSpecMode(widthMeasureSpec);
    //         const height = layout.getMeasureSpecSize(heightMeasureSpec);
    //         const heightMode = layout.getMeasureSpecMode(heightMeasureSpec);

    //         const horizontalPadding = this.effectivePaddingLeft + this.effectiveBorderLeftWidth + this.effectivePaddingRight + this.effectiveBorderRightWidth;
    //         let verticalPadding = this.effectivePaddingTop + this.effectiveBorderTopWidth + this.effectivePaddingBottom + this.effectiveBorderBottomWidth;

    //         const desiredSize = layout.measureNativeView(
    //             nativeView,
    //             width - horizontalPadding, widthMode,
    //             height - verticalPadding, heightMode);

    //         desiredSize.width = desiredSize.width + horizontalPadding;
    //         desiredSize.height = desiredSize.height + verticalPadding;

    //         const measureWidth = Math.max(desiredSize.width, this.effectiveMinWidth);
    //         const measureHeight = Math.max(desiredSize.height, this.effectiveMinHeight);

    //         const widthAndState = View.resolveSizeAndState(measureWidth, width, widthMode, 0);
    //         const heightAndState = View.resolveSizeAndState(measureHeight, height, heightMode, 0);

    //         this.setMeasuredDimension(widthAndState, heightAndState);
    //     }
    // }

    // public startAnimating() {
    //     this.nativeView.startAnimating();
    // }
    // public stopAnimating() {
    //     this.nativeView.stopAnimating();
    // }

    [colorProperty.getDefault](): UIColor {
        return null;
    }
    [colorProperty.setNative](value: UIColor | Color) {
        this.getColorThemer().primaryColor = value instanceof Color ? value.ios : value;
        MDCActivityIndicatorColorThemer.applySemanticColorSchemeToActivityIndicator(
            this.getColorThemer(),
            this.nativeViewProtected
        );
    }
}
