import { CardViewBase } from './cardview-common';
import { elevationProperty, rippleColorProperty } from './cssproperties';
import { Length, Color } from 'tns-core-modules/ui/page/page';
import { ad } from 'tns-core-modules/utils/utils';

let MDCCardView: typeof android.support.design.card.MaterialCardView;

export class CardView extends CardViewBase {
    nativeViewProtected: android.support.design.card.MaterialCardView;

    get android(): android.support.design.card.MaterialCardView {
        return this.nativeView;
    }
    private getSelectedItemDrawable(context: android.content.Context) {
        const ta = this._context.obtainStyledAttributes([ad.resources.getId(':attr/selectableItemBackground')]);
        const selectedItemDrawable = ta.getDrawable(0);
        ta.recycle();
        return selectedItemDrawable;
    }
    public createNativeView() {
        if (!MDCCardView) {
            MDCCardView = android.support.design.card.MaterialCardView;
        }
        const view = new MDCCardView(this._context);

        view.setClickable(true);
        // if (this.style['rippleColor']) {
        //     (view.getForeground() as any).setColor(android.content.res.ColorStateList.valueOf(new Color(this.style['rippleColor']).android));
        // }
        if (this._borderRadius !== undefined) {
            view.setRadius(this._borderRadius);
        }
        // needs to be done after setRadius
        view.setForeground(this.getSelectedItemDrawable(this._context));
        return view;
    }

    [elevationProperty.setNative](value: number) {
        android.support.v4.view.ViewCompat.setElevation(this.nativeViewProtected, value);
    }
    [rippleColorProperty.setNative](color: string) {
        if (this.nativeViewProtected) {
            (this.nativeViewProtected.getForeground() as any).setColor(android.content.res.ColorStateList.valueOf(new Color(color).android));
        }
    }
    set borderRadius(value: string | Length) {
        let newValue = (this._borderRadius = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0));
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setRadius(newValue);
        }
    }
    set borderWidth(value: string | Length) {
        let newValue = (this._borderRadius = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0));
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setStrokeWidth(newValue);
        }
    }
    set borderColor(value: Color) {
        this._borderColor = value;
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setStrokeColor(value.android);
        }
    }
}
