/**
 * Material SpeedDial component
 * @module @nativescript-community/ui-material-speedial
 */

import {
    Animation,
    AnimationDefinition,
    CSSType,
    Color,
    EventData,
    FlexboxLayout,
    GestureTypes,
    GridLayout,
    HorizontalAlignment,
    ImageSource,
    View,
    backgroundColorProperty,
    colorProperty,
    isUserInteractionEnabledProperty
} from '@nativescript/core';
import { Button } from '@nativescript-community/ui-material-button';
import { LinearGradient } from '@nativescript/core/ui/styling/gradient';
import { AnimationCurve } from '@nativescript/core/ui/enums';
import { NotifyData } from '@nativescript/core/data/observable';

export class SpeedDialItemBase extends GridLayout {}

const OPEN_DURATION = 200;
const CLOSE_DURATION = 100;

function transformAnimationValues(values: AnimationDefinition[]) {
    return values.map((value) => {
        const data: any = {};
        if (value.translate) {
            data.translationX = value.translate.x;
            data.translationY = value.translate.y;
        }
        if (value.scale) {
            data.scaleX = value.scale.x;
            data.scaleY = value.scale.y;
        }
        const { translate, scale, duration, curve, ...others } = value;
        Object.assign(data, others);
        return data;
    });
}

const defaultSpeedDialItemTitleRippleColor = new Color('#797979');
const defaultSpeedDialItemTitleBackgroundColor = new Color('white');

@CSSType('MDSpeedDialItemTitle')
export class SpeedDialItemTitle extends Button {
    constructor() {
        super();
        this.verticalAlignment = 'middle';
        this.style['css:text-transform'] = 'none';
        this.style['css:background-color'] = defaultSpeedDialItemTitleBackgroundColor;
        // this.style['css:ripple-color'] = defaultSpeedDialItemTitleRippleColor;
        this.style['css:color'] = defaultSpeedDialItemTitleRippleColor;
        this.style['css:elevation'] = 1;
        // this.style['css:border-radius'] = 6;
        this.style['css:font-size'] = 10;
        this.style['css:min-width'] = 0;
        this.style['css:min-height'] = 0;
        this.style['css:padding'] = 4;
    }
    getDefaultElevation(): number {
        return 1;
    }

    getDefaultDynamicElevationOffset(): number {
        return 2;
    }
}
@CSSType('MDSpeedDialItemButton')
export class SpeedDialItemButton extends Button {
    constructor() {
        super();
        this.verticalAlignment = 'middle';
        this.style['css:font-size'] = 24;
        this.style['css:elevation'] = 6;
        this.style['css:padding'] = 2;
        // this.style['css:dynamic-elevation-offset'] = 6;
    }
    getDefaultElevation(): number {
        return 6;
    }

    getDefaultDynamicElevationOffset(): number {
        return 6;
    }
}
@CSSType('MDSpeedDialButton')
export class SpeedDialButton extends SpeedDialItemButton {}

@CSSType('MDSpeedDialItem')
export class SpeedDialItem extends SpeedDialItemBase {
    public actualActive = false;
    titleView: SpeedDialItemTitle;
    button: SpeedDialItemButton;
    fabmenu: WeakRef<SpeedDial>;
    constructor(size = 'mini', private isMain = false) {
        super();
        // this._fabsHolder.isPassThroughParentEnabled = true;
        this.isPassThroughParentEnabled = true;
        this.titleView = new SpeedDialItemTitle();
        this.titleView.notify = this.notifyChildEvent(this.titleView, this.titleView.notify);
        this.titleView.col = 1;
        this.titleView.text = this.title;
        this.button = isMain ? new SpeedDialButton() : new SpeedDialItemButton();
        this.button.notify = this.notifyChildEvent(this.button, this.button.notify);
        this.button.horizontalAlignment = 'center';
        // this.fabButtonTitle.style['css:elevation'] = 4;this.fabButtonTitle.style['css:elevation'] = 2;
        this.button.col = this.fabButtonCol;
        if (size === 'mini') {
            // this.button.style['css:border-radius'] = 20;
            this.button.style['css:width'] = 40;
            this.button.style['css:height'] = 40;
            this.button.style['css:margin'] = 16;
        } else {
            // this.button.style['css:border-radius'] = 28;
            this.button.style['css:width'] = 56;
            this.button.style['css:height'] = 56;
            this.button.style['css:margin'] = 16;
        }
        (this as any).columns = this.fabColumns;
        this.addChild(this.titleView);
        this.addChild(this.button);
    }
    updateAlignment() {
        (this as any).columns = this.fabColumns;
        this.button.col = this.fabButtonCol;
    }
    initNativeView() {
        super.initNativeView();
        this.titleView.on('tap', this.onButtonTap, this);
        this.button.on('tap', this.onButtonTap, this);
    }
    disposeNativeView() {
        super.disposeNativeView();
        this.titleView.off('tap', this.onButtonTap, this);
        this.button.off('tap', this.onButtonTap, this);
    }

    notifyChildEvent(child, superNotifyMethod) {
        return <T extends NotifyData>(data: T) => {
            (data as any).speeddialItem = this;
            if (data.eventName === 'tap') {
                if (this.isMain) {
                    this.fabmenu.get().onButtonTap(data);
                } else {
                    this.fabmenu.get().active = false;
                }
            }
            superNotifyMethod.call(child, data);
        };
    }
    get fabButtonCol() {
        return this.isRight ? 2 : 0;
    }
    onButtonTap(args) {
        if (this.isMain) {
            this.fabmenu.get().onButtonTap(args);
        } else {
            this.notify({ object: this, ...args });
            this.fabmenu.get().active = false;
        }
    }
    get isLeft() {
        return this.fabmenu && this.fabmenu.get().isLeft;
    }
    get isRight() {
        return this.fabmenu && this.fabmenu.get().isRight;
    }
    get fabColumns() {
        return this.isRight ? '*,auto,60' : '60,auto,*';
    }
    get active() {
        return this.fabmenu && this.fabmenu.get().active;
    }
    set active(value) {
        if (this.fabmenu) {
            this.fabmenu.get().active = value;
        }
    }

    [isUserInteractionEnabledProperty.setNative](value) {
        super[isUserInteractionEnabledProperty.setNative](value);
        this.button.isUserInteractionEnabled = value;
        this.titleView.isUserInteractionEnabled = value;
    }
    get title() {
        return this.titleView.text;
    }
    set title(value: string) {
        this.titleView.text = value;
    }
    get text() {
        return this.button.text;
    }
    set text(value: string) {
        this.button.text = value;
    }
    //@ts-ignore
    get icon() {
        return this.button.src;
    }
    set icon(value: string | ImageSource) {
        this.button.src = value;
    }
    get buttonClass() {
        return this.button.className;
    }
    set buttonClass(value: string) {
        this.button.className = value;
    }
    get titleClass() {
        return this.titleView.className;
    }
    set titleClass(value: string) {
        this.titleView.className = value;
    }
    //@ts-ignore
    get backgroundColor() {
        return this.button.backgroundColor;
    }
    set backgroundColor(value: string | Color) {
        this.button.backgroundColor = value;
    }

    //@ts-ignore
    get backgroundImage() {
        return this.button.backgroundImage;
    }
    set backgroundImage(value: string | LinearGradient) {
        this.button.backgroundImage = value;
    }
    //@ts-ignore
    get color() {
        return this.button && this.button.color;
    }
    set color(value) {
        if (this.button) {
            this.button.color = value;
        }
    }
    //@ts-ignore
    get buttonFontSize() {
        return this.button.fontSize;
    }
    set buttonFontSize(value) {
        this.button.fontSize = value;
    }
    public addEventListener(arg: string, callback: (data: EventData) => void, thisArg?: any) {
        // we want to trap tap events
        if (arg === 'tap') {
            this.button.addEventListener(arg, callback, thisArg);
            this.titleView.addEventListener(arg, callback, thisArg);
        } else {
            super.addEventListener(arg, callback, thisArg);
        }
    }
}

@CSSType('MDSpeedDial')
export class SpeedDial extends SpeedDialItemBase {
    fabs: SpeedDialItem[] = [];
    private _fabsHolder: FlexboxLayout;
    rows: string;
    columns: string;
    orientation = 'vertical';
    isActive = false;
    actualActive = false;
    private _fabMainButton: SpeedDialItem;
    constructor() {
        super();
        this.actualActive = this.isActive;
        this.width = { unit: '%', value: 100 };
        this.height = { unit: '%', value: 100 };
        this.rows = 'auto,*,auto,auto';
        this.style['css:padding-left'] = 8;
        this.style['css:padding-right'] = 8;
        this._fabsHolder = new FlexboxLayout();
        this._fabsHolder.row = 2;
        this._fabsHolder.horizontalAlignment = this.horizontalAlignment;
        this.isPassThroughParentEnabled = true;
        if (global.isIOS) {
            this._fabsHolder.isPassThroughParentEnabled = true;
        }
        this._fabsHolder.flexDirection = this.orientation === 'vertical' ? 'column-reverse' : 'row-reverse';
        this._fabsHolder.visibility = 'hidden';
        this.backgroundColor = new Color('#00000000');

        this._fabMainButton = new SpeedDialItem(null, true);
        this.prepareItem(this._fabMainButton, true);
        this._fabMainButton.row = 3;

        this.addChild(this._fabMainButton);
        this.addChild(this._fabsHolder);
    }

    get backDrop() {
        return this;
    }

    initNativeView() {
        super.initNativeView();
        this.backDrop.on('tap', this.onBackdropTap, this);
    }
    disposeNativeView() {
        super.disposeNativeView();
        this.backDrop.off('tap', this.onBackdropTap, this);
    }

    prepareItem(item: SpeedDialItem, isMain = false) {
        item.fabmenu = new WeakRef(this);
        const animationData = this.computeAnimationData('hide', item, this.fabs.length, Math.max(this.fabs.length, 1), OPEN_DURATION, isMain);
        transformAnimationValues(animationData).forEach((d) => {
            const { target, ...others } = d;
            if (target === item.button && !isMain) {
                Object.assign(item.button, others);
            } else if (target === item.titleView) {
                Object.assign(item.titleView, others);
            }
        });
    }
    insertChild(child, index) {
        if (child !== this._fabMainButton && child instanceof SpeedDialItem) {
            this.prepareItem(child);

            this.fabs.splice(index, 0, child);
            this._fabsHolder.insertChild(child, index);
        } else {
            super.insertChild(child, index);
        }
    }
    addChild(child) {
        // for now we ignore this
        // to make sure we add the view in the property change
        // this is to make sure the view does not get "visible" too quickly
        // before we apply the translation
        // super.addChild(child);
        if (child !== this._fabMainButton && child instanceof SpeedDialItem) {
            this.prepareItem(child);

            this.fabs.push(child);
            this._fabsHolder.addChild(child);
        } else {
            super.addChild(child);
        }
    }
    // public _addChildFromBuilder(name: string, value: any) {
    //     if (value instanceof SpeedDialItem) {
    //         value.fabmenu = new WeakRef(this);
    //         this.fabs.push(value);
    //         this._fabsHolder._addView(value);
    //     } else {
    //         this._addView(value);
    //     }
    // }
    get isLeft() {
        return this.horizontalAlignment === 'left';
    }
    get isRight() {
        return this.horizontalAlignment === 'right';
    }
    onButtonTap(args) {
        this.active = !this.active;
    }
    computeAnimationData(way: 'open' | 'hide', fab: SpeedDialItem, index, count, duration, isMain = false): AnimationDefinition[] {
        const delay = (duration / count) * index;
        const curve = AnimationCurve.easeOut;
        if (way === 'open') {
            const result: AnimationDefinition[] = [
                {
                    target: fab.titleView,
                    opacity: fab.titleView.text ? 1 : 0,
                    duration,
                    curve,
                    translate: {
                        y: 0,
                        x: 0
                    },
                    delay
                }
            ];
            if (!isMain) {
                result.push({
                    target: fab.button,
                    duration,
                    curve,
                    opacity: 1,
                    scale: {
                        y: 1,
                        x: 1
                    },
                    delay
                });
            }
            return result;
        } else {
            const result: AnimationDefinition[] = [
                {
                    target: fab.titleView,
                    opacity: 0,
                    curve,
                    duration,
                    translate: {
                        y: 0,
                        x: -20
                    },
                    delay
                }
            ];
            if (!isMain) {
                result.push({
                    target: fab.button,
                    duration,
                    curve,
                    opacity: 0,
                    scale: {
                        y: 0.5,
                        x: 0.5
                    },
                    delay
                });
            }
            return result;
        }
    }
    async show(duration = OPEN_DURATION) {
        this.animating = true;
        const fabs = this.fabs;
        const length = fabs.length;
        const params = fabs
            .reduce((acc, fab, index) => {
                acc.push(...this.computeAnimationData('open', fab, index, length, duration));
                return acc;
            }, [] as AnimationDefinition[])
            .filter((a) => !!a)
            .concat(this.computeAnimationData('open', this._fabMainButton, 0, length, duration, true))
            .concat([
                {
                    target: this.backDrop,
                    backgroundColor: new Color('#99000000'),
                    curve: AnimationCurve.easeInOut,
                    duration
                }
            ]);

        try {
            this._fabsHolder.visibility = 'visible';
            this.isPassThroughParentEnabled = false;
            await new Animation(params).play();
            fabs.forEach((f) => (f.isUserInteractionEnabled = true));
        } catch (err) {
            // console.error(err);
        } finally {
            this.animating = false;
        }
    }
    animating = false;
    async hide(duration = CLOSE_DURATION) {
        this.animating = true;
        const fabs = this.fabs;
        const length = fabs.length;
        const params = fabs
            .reduce((acc, fab, index) => {
                acc.push(...this.computeAnimationData('hide', fab, length - 1 - index, length, duration));
                return acc;
            }, [] as AnimationDefinition[])
            .filter((a) => !!a)
            .concat(this.computeAnimationData('hide', this._fabMainButton, 0, length, duration, true))
            .concat([
                {
                    target: this.backDrop,
                    backgroundColor: new Color('#00000000'),
                    curve: AnimationCurve.easeInOut,
                    duration
                }
            ]);

        try {
            fabs.forEach((f) => (f.isUserInteractionEnabled = false));
            await new Animation(params).play();
            this.isPassThroughParentEnabled = true;
            this._fabsHolder.visibility = 'hidden';
        } catch (err) {
            // console.error(err);
        } finally {
            this.animating = false;
        }
    }
    get active() {
        return this.actualActive;
    }
    set active(value) {
        if (this.animating || value === this.actualActive) {
            return;
        }
        this.actualActive = value;
        if (value) {
            this.show();
        } else {
            this.hide();
        }
        this.notify({
            eventName: 'activeChange',
            object: this,
            propertyName: 'active',
            value
        });
    }

    //@ts-ignore
    get icon() {
        return this._fabMainButton.icon;
    }
    set icon(value: string | ImageSource) {
        this._fabMainButton.icon = value;
        this._fabMainButton.padding = 0;
    }
    get buttonClass() {
        return this._fabMainButton.buttonClass;
    }
    set buttonClass(value: string) {
        this._fabMainButton.buttonClass = value;
    }
    get buttonFontSize() {
        return this._fabMainButton.buttonFontSize;
    }
    set buttonFontSize(value) {
        this._fabMainButton.buttonFontSize = value;
    }

    //@ts-ignore
    get color() {
        return this._fabMainButton.color;
    }
    set color(value) {
        this._fabMainButton.color = value;
    }
    get text() {
        return this._fabMainButton.text;
    }
    set text(value: string) {
        this._fabMainButton.text = value;
    }
    get title() {
        return this._fabMainButton.title;
    }
    set title(value: string) {
        this._fabMainButton.title = value;
    }
    //@ts-ignore
    get horizontalAlignment() {
        return this._fabsHolder.horizontalAlignment;
    }
    set horizontalAlignment(value) {
        this._fabsHolder.horizontalAlignment = value;
        this._fabMainButton.updateAlignment();
        this._fabsHolder.eachChild((c) => {
            if (c instanceof SpeedDialItem) {
                c.updateAlignment();
            }
            return true;
        });
    }
    //@ts-ignore
    // get backgroundColor() {
    //     return this._fabMainButton.backgroundColor;
    // }
    // set backgroundColor(value: string | Color) {
    //     if (this._fabMainButton) {
    //         this._fabMainButton.backgroundColor = value;
    //     }
    // }
    // get ['css:background-color']() {
    //     return this._fabMainButton.backgroundColor;
    // }
    // set ['css:background-color'](value: string | Color) {
    //     if (this._fabMainButton) {
    //         this._fabMainButton.backgroundColor = value;
    //     }
    // }
    //@ts-ignore
    // get backgroundImage() {
    //     return this._fabMainButton && this._fabMainButton.backgroundImage;
    // }
    // set backgroundImage(value: string | LinearGradient) {
    //     if (this._fabMainButton) {
    //         this._fabMainButton.backgroundImage = value;
    //     }
    // }

    get titleClass() {
        return this._fabMainButton.titleClass;
    }
    set titleClass(value: string) {
        this._fabMainButton.titleClass = value;
    }

    onBackdropTap(args) {
        this.active = false;
    }
}
