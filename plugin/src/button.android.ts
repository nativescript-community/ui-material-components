import { ButtonBase } from './button-common';

import * as utils from 'tns-core-modules/utils/utils';
import { CSSType, Color, Length } from 'tns-core-modules/ui/page/page';
import { rippleColorProperty } from './cssproperties';
import { elevationProperty } from './floatingactionbutton-common';

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
        let newValue = this._borderRadius = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
        if (this.nativeViewProtected) {
            this.nativeViewProtected.setCornerRadius(newValue);
        }
    }
}
