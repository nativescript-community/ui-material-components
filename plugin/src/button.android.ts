import { ButtonBase, variantProperty, rippleColorProperty } from './button-common';

import * as utils from 'tns-core-modules/utils/utils';
import { CSSType, Color, Length, borderRadiusProperty } from 'tns-core-modules/ui/page/page';

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

    public isLoading: boolean;

    get android(): android.support.design.button.MaterialButton {
        return this.nativeView;
    }
    public createNativeView() {
        initializeClickListener();
        let style;
        if (this.variant === 'text') {
            style = 'AppThemeTextMaterialButton';
        } else if (this.variant === 'flat') {
            style = 'AppThemeFlatMaterialButton';
        }
        const newContext = style ? new android.view.ContextThemeWrapper(this._context, utils.ad.resources.getId(':style/' + style)) : this._context;

        const view = new MDCButton(newContext);
        if (this.style['rippleColor']) {
            view.setRippleColor(android.content.res.ColorStateList.valueOf(new Color(this.style['rippleColor']).android));
        }
        if (this._borderRadius !== undefined) {
            view.setCornerRadius(this._borderRadius);
        }
        const clickListener = new ClickListener(this);
        view.setOnClickListener(clickListener);
        (<any>view).clickListener = clickListener;
        return view;
    }
    get rippleColor(): string {
        return this.style['rippleColor'];
    }
    set rippleColor(color: string) {
        this.style['rippleColor'] = color;
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setRippleColor(android.content.res.ColorStateList.valueOf(new Color(color).android));
        }
    }
    // get elevation(): number {
    //     return this.style['elevation'];
    // }
    // set elevation(value: number) {
    //     this.style['elevation'] = value;
    //     if (this.nativeViewProtected) {
    //         this.nativeViewProtected.setCorner(value);
    //     }
    // }
    _borderRadius: number;
    get borderRadius(): string | Length {
        return this._borderRadius;
    }
    set borderRadius(value: string | Length) {
        let newValue = this._borderRadius = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        console.log('borderRadius', newValue);
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setCornerRadius(newValue);
        }
    }
}
