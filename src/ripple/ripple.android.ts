import { RippleBase } from './ripple-common';
import { rippleColorProperty } from 'nativescript-material-core/cssproperties';
import { Color } from 'tns-core-modules/ui/page/page';
import { ad } from 'tns-core-modules/utils/utils';
import { getRippleColor } from 'nativescript-material-core';

// function getThemeAccentColor(context: android.content.Context) {
//     const value = new android.util.TypedValue();
//     const attr = java.lang.Class.forName('android.support.v7.appcompat.R$attr');

//     // https://developer.android.com/reference/java/lang/Class#getField(java.lang.String)
//     const field = attr.getField('colorAccent') as java.lang.reflect.Field;
//     context.getTheme().resolveAttribute(field.getInt(null), value, true);
//     return value.data;
// }

export class Ripple extends RippleBase {
    nativeViewProtected: android.view.View;
    ripple: android.graphics.drawable.RippleDrawable;

    public createNativeView() {
        const view = super.createNativeView() as android.view.View;
        this.setRippleDrawable(view);
        return view;
    }
    private getAccentColor(context: android.content.Context) {
        const ta = context.obtainStyledAttributes([ad.resources.getId(':attr/colorAccent')]);
        const color = ta.getColor(0, 0);
        ta.recycle();
        return color;
    }
    private getSelectedItemDrawable(context: android.content.Context) {
        const ta = context.obtainStyledAttributes([ad.resources.getId(':attr/selectableItemBackground')]);
        // getContext().getTheme().applyStyle(R.style.colorControlHighlight_blue, true); //blue ripple color
        const selectedItemDrawable = ta.getDrawable(0);
        ta.recycle();
        return selectedItemDrawable;
    }

    private createRoundRectShape() {
        const radius = this.style.borderRadius;
        const radii = Array.create('float', 8);
        for (let index = 0; index < 8; index++) {
            radii[index] = radius;
        }
        return new android.graphics.drawable.shapes.RoundRectShape(radii, null, null);
    }
    private createForegroundShapeDrawable() {
        const shape = this.createRoundRectShape();
        return new android.graphics.drawable.ShapeDrawable(shape);
    }
    private createCompatRippleDrawable(rippleColor) {
        const rippleDrawable = new android.graphics.drawable.StateListDrawable();
        const foregroundShape = this.createForegroundShapeDrawable();
        foregroundShape.getPaint().setColor(rippleColor);
        rippleDrawable.addState([android.R.attr.state_pressed], foregroundShape);
        return rippleDrawable;
    }
    setRippleDrawable(view: android.view.View) {
        if (android.os.Build.VERSION.SDK_INT >= 22) {
            view.setBackground(this.getSelectedItemDrawable(this._context));
        } else {
            view.setBackground(this.createCompatRippleDrawable(getRippleColor(this.style['rippleColor'] || new Color(this.getAccentColor(this._context)))));
            //   view.setForeground(
            //     this.createCompatRippleDrawable(
            //       this.getRippleColor(this.style["rippleColor"])
            //     )
            //   );
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        // if (android.os.Build.VERSION.SDK_INT >= 22) {
        //     (this.nativeViewProtected.getBackground() as any).setColor(android.content.res.ColorStateList.valueOf(color.android));
        // } else {
        this.setRippleDrawable(this.nativeViewProtected);
        // }
    }
}
