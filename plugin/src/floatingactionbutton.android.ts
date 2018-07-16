import {FloatingActionButtonBase, srcCompatProperty} from './floatingactionbutton-common';
import * as utils from 'tns-core-modules/utils/utils';

import { Button } from 'tns-core-modules/ui/button';

function getSystemResourceId(systemIcon: string): number {
    return android.content.res.Resources.getSystem().getIdentifier(systemIcon, 'drawable', 'android');
}

interface ClickListener {
    new (owner: FloatingActionButton): android.view.View.OnClickListener;
}

let ClickListener: ClickListener;
let MDCFabButton: typeof android.support.design.widget.FloatingActionButton;

function initializeClickListener(): void {
    if (ClickListener) {
        return;
    }

    @Interfaces([android.view.View.OnClickListener])
    class ClickListenerImpl extends java.lang.Object implements android.view.View.OnClickListener {
        constructor(public owner: FloatingActionButton) {
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
    MDCFabButton = android.support.design.widget.FloatingActionButton;
}

export class FloatingActionButton extends FloatingActionButtonBase {
    nativeViewProtected: android.support.design.widget.FloatingActionButton;
    constructor() {
        super();
        console.log('create android FloatingActionButton');
    }

    get android(): android.support.design.widget.FloatingActionButton {
        return this.nativeView;
    }
    public createNativeView() {
        console.log('create FAB1');
        initializeClickListener();
        const button = new MDCFabButton(this._context);
        console.log('create FAB', button);
        const clickListener = new ClickListener(this);
        button.setOnClickListener(clickListener);
        (<any>button).clickListener = clickListener;
        button.setImageResource(getSystemResourceId('ic_menu_share'));
        return button;
    }

    public initNativeView(): void {
        const nativeView = this.nativeViewProtected;
        (<any>nativeView).clickListener.owner = this;
        super.initNativeView();
    }
    public disposeNativeView() {
        (<any>this.nativeViewProtected).clickListener.owner = null;
        super.disposeNativeView();
    }

    [srcCompatProperty.setNative](value: string) {
        this.nativeViewProtected.setImageResource(utils.ad.resources.getDrawableId(value));
    }

    public show() {
        this.nativeView.show();
    }
    public hide() {
        this.nativeView.hide();
    }
}
