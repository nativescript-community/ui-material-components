import { ActivityIndicatorBase } from "./activityindicator-common"
import { themer } from "./material"
import { colorProperty } from "tns-core-modules/ui/styling/style-properties"
import { Color } from "tns-core-modules/color/color"
import { screen } from "tns-core-modules/platform/platform"

declare module "tns-core-modules/ui/core/view" {
    interface View {
        _onSizeChanged()
    }
}
export class ActivityIndicator extends ActivityIndicatorBase {
    nativeViewProtected: MDCActivityIndicator
    autoSize = true

    get ios(): MDCActivityIndicator {
        return this.nativeViewProtected
    }
    public createNativeView() {
        const view = MDCActivityIndicator.alloc().init()
        const colorScheme = this.colorThemer || themer.getAppColorScheme()
        if (colorScheme) {
            MDCActivityIndicatorColorThemer.applySemanticColorSchemeToActivityIndicator(
                colorScheme,
                view
            )
        }
        return view
    }
    colorThemer: MDCSemanticColorScheme
    getColorThemer() {
        if (!this.colorThemer) {
            this.colorThemer = MDCSemanticColorScheme.alloc().init()
        }
        return this.colorThemer
    }

    _onSizeChanged(): void {
        if (this.autoSize) {
            this.updateStrokeRadius(
                this.getMeasuredWidth(),
                this.getMeasuredHeight()
            )
        }
        super._onSizeChanged()
    }

    private updateStrokeRadius(width: number, height: number) {
        const min = Math.min(width, height)
        const strokeWidth = (0.9 * min) / 20
        const scale = screen.mainScreen.scale
        const radius = min / 2 - 8 * scale
        this.nativeViewProtected.strokeWidth = strokeWidth
        this.nativeViewProtected.radius = radius / scale
    }

    // public startAnimating() {
    //     this.nativeView.startAnimating();
    // }
    // public stopAnimating() {
    //     this.nativeView.stopAnimating();
    // }

    [colorProperty.getDefault](): UIColor {
        return null
    }
    [colorProperty.setNative](value: UIColor | Color) {
        this.getColorThemer().primaryColor =
            value instanceof Color ? value.ios : value
        MDCActivityIndicatorColorThemer.applySemanticColorSchemeToActivityIndicator(
            this.getColorThemer(),
            this.nativeViewProtected
        )
    }
}
