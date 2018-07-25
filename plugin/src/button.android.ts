/// <reference path="../references.d.ts" />
import { ButtonBase } from './button-common';

import * as utils from 'tns-core-modules/utils/utils';
import { CSSType, Color, Length, backgroundInternalProperty } from 'tns-core-modules/ui/page/page';
import { rippleColorProperty } from './cssproperties';
import { elevationProperty } from './floatingactionbutton-common';
import { Background } from 'tns-core-modules/ui/styling/background';

interface ClickListener {
    new (owner: Button): android.view.View.OnClickListener;
}

let ClickListener: ClickListener;
let MDCButton: typeof android.support.design.button.MaterialButton;

function initializeClickListener(): void {
    if (ClickListener) {
        return;
    }

    @Interfaces([android.view.View.OnClickListener])
    class ClickListenerImpl extends java.lang.Object implements android.view.View.OnClickListener {
        constructor(public owner: Button) {
            super();
            return global.__native(this);
        }

        public onClick(v: android.view.View): void {
            const owner = this.owner;
            if (owner) {
                owner.notify({ eventName: Button.tapEvent, object: owner });
            }
        }
    }

    ClickListener = ClickListenerImpl;
    MDCButton = android.support.design.button.MaterialButton;
}

@CSSType('Button')
export class Button extends ButtonBase {
    nativeViewProtected: android.support.design.button.MaterialButton;
    defaultBorderRadius;
    constructor() {
        super();
        this.defaultBorderRadius = this.style.borderRadius;
    }
    public isLoading: boolean;

    get android(): android.support.design.button.MaterialButton {
        return this.nativeView;
    }
    public createNativeView() {
        initializeClickListener();
        let style = 'AppThemeMaterialButton';
        if (this.variant === 'text') {
            style = 'AppThemeTextMaterialButton';
        } else if (this.variant === 'flat') {
            style = 'AppThemeFlatMaterialButton';
        }
        const newContext = style ? new android.view.ContextThemeWrapper(this._context, utils.ad.resources.getId(':style/' + style)) : this._context;

        const view = new MDCButton(newContext);
        // view.setPadding(0, 0, 0, 0);
        // view.setPaddingRelative(0, 0, 0, 0);
        // view.setIconPadding(0);
        // if (this.style['rippleColor']) {
        //     view.setRippleColor(android.content.res.ColorStateList.valueOf(new Color(this.style['rippleColor']).android));
        // }
        if (this._borderRadius !== undefined) {
            view.setCornerRadius(this._borderRadius);
        }
        const clickListener = new ClickListener(this);
        view.setOnClickListener(clickListener);
        (<any>view).clickListener = clickListener;
        return view;
    }
    [rippleColorProperty.setNative](color: string) {
        this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(new Color(color).android));
    }

    [elevationProperty.setNative](value: number) {
        android.support.v4.view.ViewCompat.setElevation(this.nativeViewProtected, value);
    }

    set borderRadius(value: string | Length) {
        let newValue = (this._borderRadius = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0));
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setCornerRadius(newValue);
        }
    }
    // [backgroundInternalProperty.setNative](value: android.graphics.drawable.Drawable | Background) {
    //     super[backgroundInternalProperty.setNative](value);
    //     if (value instanceof android.graphics.drawable.Drawable) {
    //         //             this.nativeViewProtected.setBackgroundDrawable(value);
    //                 } else {
    //         //             console.log('backgroundInternalProperty', value);
    //         //             this.nativeViewProtected.setBackgroundTintList(android.content.res.ColorStateList.valueOf(value.color.android));
    //         //             // this is a trick for now. Though we can't have borderRadius=0 with that :s
    //         //             // we need a way to know borderRadius was actually set
    //                     if (value.borderTopLeftRadius !== this.defaultBorderRadius) {
    //                         this.nativeViewProtected.setCornerRadius(value.borderTopLeftRadius);
    //                     }
    //                 }
    // }
    [backgroundInternalProperty.setNative](value: android.graphics.drawable.Drawable | Background) {
        // this._nativeBackgroundState = "invalid";

        console.log('backgroundInternalProperty', value);
        if (this.nativeViewProtected) {
            if (value instanceof android.graphics.drawable.Drawable) {
                this.nativeViewProtected.setBackgroundDrawable(value);
            } else {
                console.log('backgroundInternalProperty', value);
                this.nativeViewProtected.setBackgroundTintList(android.content.res.ColorStateList.valueOf(value.color.android));
                // this is a trick for now. Though we can't have borderRadius=0 with that :s
                // we need a way to know borderRadius was actually set
                if (value.borderTopLeftRadius !== this.defaultBorderRadius) {
                    this.nativeViewProtected.setCornerRadius(value.borderTopLeftRadius);
                }
            }
        }
    }
}
