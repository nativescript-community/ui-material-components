import { RippleBase } from "./ripple-common"
import { rippleColorProperty } from "./cssproperties"
import { Color } from "tns-core-modules/ui/page/page"
import { ad } from "tns-core-modules/utils/utils"

export class Ripple extends RippleBase {
    nativeViewProtected: android.view.View
    ripple: android.graphics.drawable.RippleDrawable

    public createNativeView() {
        const view = super.createNativeView() as android.view.View
        this.setRippleDrawable(view)
        return view
    }

    private getSelectedItemDrawable(context: android.content.Context) {
        const ta = this._context.obtainStyledAttributes([
            ad.resources.getId(":attr/selectableItemBackground")
        ])
        const selectedItemDrawable = ta.getDrawable(0)
        ta.recycle()
        return selectedItemDrawable
    }

    private createRoundRectShape() {
        const radius = this.style.borderRadius
        const radii = Array.create("float", 8)
        for (let index = 0; index < 8; index++) {
            radii[index] = radius
        }
        return new android.graphics.drawable.shapes.RoundRectShape(
            radii,
            null,
            null
        )
    }
    private createForegroundShapeDrawable() {
        const shape = this.createRoundRectShape()
        return new android.graphics.drawable.ShapeDrawable(shape)
    }
    private createCompatRippleDrawable(rippleColor) {
        const rippleDrawable = new android.graphics.drawable.StateListDrawable()
        const foregroundShape = this.createForegroundShapeDrawable()
        foregroundShape.getPaint().setColor(rippleColor)
        rippleDrawable.addState([android.R.attr.state_pressed], foregroundShape)
        return rippleDrawable
    }
    getRippleColor(color: string | Color) {
        const temp = typeof color === "string" ? new Color(color) : color
        return new Color(36, temp.r, temp.g, temp.b).android // default alpha is 0.14
    }
    setRippleDrawable(view: android.view.View) {
        if (android.os.Build.VERSION.SDK_INT >= 23) {
            view.setBackground(this.getSelectedItemDrawable(this._context))
        } else {
            view.setBackground(
                this.createCompatRippleDrawable(
                    this.getRippleColor(this.style["rippleColor"])
                )
            )
            //   view.setForeground(
            //     this.createCompatRippleDrawable(
            //       this.getRippleColor(this.style["rippleColor"])
            //     )
            //   );
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        if (android.os.Build.VERSION.SDK_INT >= 23) {
            ;(this.nativeViewProtected.getBackground() as any).setColor(
                android.content.res.ColorStateList.valueOf(color.android)
            )
        } else {
            this.setRippleDrawable(this.nativeViewProtected)
        }
    }
}
