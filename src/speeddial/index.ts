/**
 * Material SpeedDial component
 * @module @nativescript-community/ui-material-speedial
 */

import { Animation, AnimationDefinition, CSSType, Color, CoreTypes, EventData, FlexboxLayout, GridLayout, ImageSource, isUserInteractionEnabledProperty } from '@nativescript/core';
import { Button } from '@nativescript-community/ui-material-button';
import { LinearGradient } from '@nativescript/core/ui/styling/linear-gradient';
import { Optional } from '@nativescript/core/utils/typescript-utils';

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
    mTitleView: WeakRef<SpeedDialItemTitle>;
    mButton: WeakRef<SpeedDialItemButton>;
    mFabmenu: WeakRef<SpeedDial>;

    get titleView() {
        return this.mTitleView?.get();
    }
    get button() {
        return this.mButton?.get();
    }
    get fabmenu() {
        return this.mFabmenu?.get();
    }
    constructor(size = 'mini', private isMain = false) {
        super();
        this.isPassThroughParentEnabled = true;
        const titleView = new SpeedDialItemTitle();
        titleView.notify = this.notifyChildEvent(titleView, titleView.notify);
        titleView.col = 1;
        // titleView.text = this.title;
        this.mTitleView = new WeakRef(titleView);
        const button = isMain ? new SpeedDialButton() : new SpeedDialItemButton();
        button.notify = this.notifyChildEvent(button, button.notify);
        button.horizontalAlignment = 'center';
        // this.fabButtonTitle.style['css:elevation'] = 4;this.fabButtonTitle.style['css:elevation'] = 2;
        button.col = this.fabButtonCol;
        this.mButton = new WeakRef(button);
        if (size === 'mini') {
            // button.style['css:border-radius'] = 20;
            button.style['css:width'] = 40;
            button.style['css:height'] = 40;
            button.style['css:margin'] = 16;
        } else {
            // button.style['css:border-radius'] = 28;
            button.style['css:width'] = 56;
            button.style['css:height'] = 56;
            button.style['css:margin'] = 16;
        }
        (this as any).columns = this.fabColumns;
        this.addChild(titleView);
        this.addChild(button);
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
        return <T extends Optional<EventData, 'object'>>(data: T) => {
            (data as any).speeddialItem = this;
            if (data.eventName === 'tap') {
                if (this.isMain) {
                    this.fabmenu.onButtonTap(data);
                } else {
                    this.fabmenu.active = false;
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
            this.fabmenu.onButtonTap(args);
        } else {
            this.notify({ object: this, ...args });
            this.fabmenu.active = false;
        }
    }
    get isLeft() {
        return this.mFabmenu && this.fabmenu.isLeft;
    }
    get isRight() {
        return this.mFabmenu && this.fabmenu.isRight;
    }
    get fabColumns() {
        return this.isRight ? '*,auto,60' : '60,auto,*';
    }
    get active() {
        return this.mFabmenu && this.fabmenu.active;
    }
    set active(value) {
        if (this.mFabmenu) {
            this.fabmenu.active = value;
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
    private mFabs: WeakRef<SpeedDialItem>[] = [];
    private mFabsHolder: WeakRef<FlexboxLayout>;
    private mFabMainButton: WeakRef<SpeedDialItem>;
    rows: string;
    columns: string;
    orientation = 'vertical';
    isActive = false;
    actualActive = false;

    get fabsHolder() {
        return this.mFabsHolder?.get();
    }
    get fabMainButton() {
        return this.mFabMainButton?.get();
    }
    get fabs() {
        return this.mFabs.map((f) => f?.get()).filter((f) => !!f);
    }
    constructor() {
        super();
        this.actualActive = this.isActive;
        this.width = { unit: '%', value: 100 };
        this.height = { unit: '%', value: 100 };
        this.rows = 'auto,*,auto,auto';
        this.style['css:padding-left'] = 8;
        this.style['css:padding-right'] = 8;
        const fabsHolder = new FlexboxLayout();
        fabsHolder.row = 2;
        fabsHolder.horizontalAlignment = this.horizontalAlignment;
        this.isPassThroughParentEnabled = true;
        if (global.isIOS) {
            fabsHolder.isPassThroughParentEnabled = true;
        }
        fabsHolder.flexDirection = this.orientation === 'vertical' ? 'column-reverse' : 'row-reverse';
        fabsHolder.visibility = 'hidden';
        this.backgroundColor = new Color('#00000000');

        const fabMainButton = new SpeedDialItem(null, true);
        this.prepareItem(fabMainButton, true);
        fabMainButton.row = 3;

        this.mFabsHolder = new WeakRef(fabsHolder);
        this.mFabMainButton = new WeakRef(fabMainButton);
        this.addChild(fabMainButton);
        this.addChild(fabsHolder);
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
        item.mFabmenu = new WeakRef(this);
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
        if (child !== this.fabMainButton && child instanceof SpeedDialItem) {
            this.prepareItem(child);

            this.mFabs.splice(index, 0, new WeakRef(child));
            this.fabsHolder.insertChild(child, index);
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
        if (child !== this.fabMainButton && child instanceof SpeedDialItem) {
            this.prepareItem(child);

            this.mFabs.push(new WeakRef(child));
            this.fabsHolder.addChild(child);
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
        const curve = CoreTypes.AnimationCurve.easeOut;
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
            .concat(this.computeAnimationData('open', this.fabMainButton, 0, length, duration, true))
            .concat([
                {
                    target: this.backDrop,
                    backgroundColor: new Color('#00000099'),
                    curve: CoreTypes.AnimationCurve.easeInOut,
                    duration
                }
            ]);

        try {
            this.fabsHolder.visibility = 'visible';
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
            .concat(this.computeAnimationData('hide', this.fabMainButton, 0, length, duration, true))
            .concat([
                {
                    target: this.backDrop,
                    backgroundColor: new Color('#00000000'),
                    curve: CoreTypes.AnimationCurve.easeInOut,
                    duration
                }
            ]);

        try {
            fabs.forEach((f) => (f.isUserInteractionEnabled = false));
            await new Animation(params).play();
            this.isPassThroughParentEnabled = true;
            this.fabsHolder.visibility = 'hidden';
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
        return this.fabMainButton.icon;
    }
    set icon(value: string | ImageSource) {
        this.fabMainButton.icon = value;
        this.fabMainButton.padding = 0;
    }
    get buttonClass() {
        return this.fabMainButton.buttonClass;
    }
    set buttonClass(value: string) {
        this.fabMainButton.buttonClass = value;
    }
    get buttonFontSize() {
        return this.fabMainButton.buttonFontSize;
    }
    set buttonFontSize(value) {
        this.fabMainButton.buttonFontSize = value;
    }

    //@ts-ignore
    get color() {
        return this.fabMainButton.color;
    }
    set color(value) {
        this.fabMainButton.color = value;
    }
    get text() {
        return this.fabMainButton.text;
    }
    set text(value: string) {
        this.fabMainButton.text = value;
    }
    get title() {
        return this.fabMainButton.title;
    }
    set title(value: string) {
        this.fabMainButton.title = value;
    }
    //@ts-ignore
    get horizontalAlignment() {
        return this.fabsHolder?.horizontalAlignment;
    }
    set horizontalAlignment(value) {
        this.fabsHolder.horizontalAlignment = value;
        this.fabMainButton.updateAlignment();
        this.fabsHolder.eachChild((c) => {
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
        return this.fabMainButton.titleClass;
    }
    set titleClass(value: string) {
        this.fabMainButton.titleClass = value;
    }

    onBackdropTap(args) {
        this.active = false;
    }
}
