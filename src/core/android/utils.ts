import { Color } from 'tns-core-modules/color/color';
import { ad } from 'tns-core-modules/utils/utils';
import { ViewBase } from 'tns-core-modules/ui/page/page';
import * as application from 'application';

let isPostLollipopVar: boolean = undefined;
export function isPostLollipop() {
    if (isPostLollipopVar === undefined) {
        isPostLollipopVar = android.os.Build.VERSION.SDK_INT >= 21;
    }
    return isPostLollipopVar;
}

let isPostLollipopMR1Var: boolean = undefined;
export function isPostLollipopMR1() {
    if (isPostLollipopMR1Var === undefined) {
        isPostLollipopMR1Var = android.os.Build.VERSION.SDK_INT >= 22;
    }
    return isPostLollipopMR1Var;
}

export const state = {
    get selected() {
        return 16842913;
    },
    get hovered() {
        return 16843623;
    },
    get focused() {
        return 16842908;
    },
    get enabled() {
        return 16842910;
    },
    get pressed() {
        return 16842919;
    },
    get window_focused() {
        return 16842909;
    },
    get checked() {
        return 16842912;
    }
};

function createNativeArray(...args) {
    const result = Array.create('int', args.length);
    args.forEach((a, i) => (result[i] = a));
    return result;
}
export const stateSets = {
    get PRESSED_STATE_SET() {
        if (!this._PRESSED_STATE_SET) {
            this._PRESSED_STATE_SET = createNativeArray(state.pressed);
        }
        return this._PRESSED_STATE_SET as native.Array<number>;
    },
    get HOVERED_FOCUSED_STATE_SET() {
        if (!this._HOVERED_FOCUSED_STATE_SET) {
            this._HOVERED_FOCUSED_STATE_SET = createNativeArray(state.hovered, state.focused);
        }
        return this._PRESSED_STATE_SET as native.Array<number>;
    },
    get FOCUSED_STATE_SET() {
        if (!this._FOCUSED_STATE_SET) {
            this._FOCUSED_STATE_SET = createNativeArray(state.focused);
        }
        return this._FOCUSED_STATE_SET as native.Array<number>;
    },
    get HOVERED_STATE_SET() {
        if (!this._HOVERED_STATE_SET) {
            this._HOVERED_STATE_SET = createNativeArray(state.hovered);
        }
        return this._HOVERED_STATE_SET as native.Array<number>;
    },
    get SELECTED_PRESSED_STATE_SET() {
        if (!this._SELECTED_PRESSED_STATE_SET) {
            this._SELECTED_PRESSED_STATE_SET = createNativeArray(state.enabled, state.pressed);
        }
        return this._SELECTED_PRESSED_STATE_SET as native.Array<number>;
    },
    get SELECTED_HOVERED_FOCUSED_STATE_SET() {
        if (!this._SELECTED_HOVERED_FOCUSED_STATE_SET) {
            this._SELECTED_HOVERED_FOCUSED_STATE_SET = createNativeArray(state.selected, state.hovered, state.focused);
        }
        return this._SELECTED_HOVERED_FOCUSED_STATE_SET as native.Array<number>;
    },
    get SELECTED_FOCUSED_STATE_SET() {
        if (!this._SELECTED_FOCUSED_STATE_SET) {
            this._SELECTED_FOCUSED_STATE_SET = createNativeArray(state.selected, state.focused);
        }
        return this._SELECTED_FOCUSED_STATE_SET as native.Array<number>;
    },
    get SELECTED_HOVERED_STATE_SET() {
        if (!this._SELECTED_HOVERED_STATE_SET) {
            this._SELECTED_HOVERED_STATE_SET = createNativeArray(state.selected, state.hovered);
        }
        return this._SELECTED_HOVERED_STATE_SET as native.Array<number>;
    },
    get SELECTED_STATE_SET() {
        if (!this._SELECTED_STATE_SET) {
            this._SELECTED_STATE_SET = createNativeArray(state.selected);
        }
        return this._SELECTED_STATE_SET as native.Array<number>;
    },
    get BACKGROUND_DEFAULT_STATE_1() {
        if (!this._BACKGROUND_DEFAULT_STATE_1) {
            this._BACKGROUND_DEFAULT_STATE_1 = createNativeArray(state.window_focused, state.enabled);
        }
        return this._BACKGROUND_DEFAULT_STATE_1 as number[];
    },
    get BACKGROUND_DEFAULT_STATE_2() {
        if (!this._BACKGROUND_DEFAULT_STATE_1_SET) {
            this._BACKGROUND_DEFAULT_STATE_1_SET = createNativeArray(state.enabled);
        }
        return this._BACKGROUND_DEFAULT_STATE_1_SET as native.Array<number>;
    },
    get BACKGROUND_SELECTED_STATE() {
        if (!this._BACKGROUND_SELECTED_STATE) {
            this._BACKGROUND_SELECTED_STATE = createNativeArray(state.window_focused, state.enabled, state.pressed);
        }
        return this._BACKGROUND_SELECTED_STATE as native.Array<number>;
    },
    get BACKGROUND_CHECKED_STATE() {
        if (!this._BACKGROUND_CHECKED_STATE) {
            this._BACKGROUND_CHECKED_STATE = createNativeArray(state.window_focused, state.enabled, state.checked);
        }
        return this._BACKGROUND_CHECKED_STATE as native.Array<number>;
    },
    get BACKGROUND_FOCUSED_STATE() {
        if (!this._BACKGROUND_FOCUSED_STATE) {
            this._BACKGROUND_FOCUSED_STATE = createNativeArray(state.focused, state.window_focused, state.enabled);
        }
        return this._BACKGROUND_FOCUSED_STATE as native.Array<number>;
    },
    get BACKGROUND_DISABLED_STATE() {
        if (!this._BACKGROUND_DISABLED_STATE) {
            this._BACKGROUND_DISABLED_STATE = createNativeArray(-state.enabled);
        }
        return this._BACKGROUND_DISABLED_STATE as native.Array<number>;
    }
};

export function getRippleColorStateList(color: number) {
    const states = Array.create('[I', 2);
    states[0] = stateSets.SELECTED_PRESSED_STATE_SET;
    states[1] = Array.create('int', 0);
    // states[1][0] = new java.lang.Integer(state.enabled);
    // states[1][1] = new java.lang.Integer(-state.pressed);
    // const states = [
    //     getSELECTED_PRESSED_STATE_SET(),
    //     []]
    // ;
    const colors = Array.create('int', 2);
    colors[0] = color;
    colors[1] = 0;
    return new android.content.res.ColorStateList(states, colors);
}
export function getEnabledColorStateList(color: number, variant: string) {
    const states = Array.create('[I', 2);
    // const SELECTED_PRESSED_STATE_SET = Array.create("int",1);
    // SELECTED_PRESSED_STATE_SET[0] =  state.enabled;
    states[0] = Array.create('int', 1);
    states[0][0] = -state.enabled;
    states[1] = android.util.StateSet.NOTHING;
    // states[1][0] = new java.lang.Integer(-state.enabled);
    // const states = [
    //     getSELECTED_PRESSED_STATE_SET(),
    //     []]
    // ;
    const colors = Array.create('int', 2);
    colors[0] = variant === 'text' || variant === 'outline' ? 0 : new Color(30, 0, 0, 0).android;
    colors[1] = color;
    return new android.content.res.ColorStateList(states, colors);
}
export function getFocusedColorStateList(color: number, variant: string) {
    const states = Array.create('[I', 3);

    states[0] = Array.create('int', 1);
    states[0][0] = state.pressed;
    states[1] = Array.create('int', 2);
    states[1][0] = state.enabled;
    states[1][1] = state.focused;
    // states[2] = Array.create('int', 1);
    // states[2][0] = state.selected;
    states[2] = android.util.StateSet.NOTHING;
    const colors = Array.create('int', 4);
    colors[0] = color;
    colors[1] = color;
    colors[2] = color;
    colors[2] = new Color(255, 160, 160, 160).android;
    return new android.content.res.ColorStateList(states, colors);
}

export function createStateListAnimator(view: ViewBase, nativeView: android.view.View) {
    const elevation = view.style['elevation'] !== undefined ? view.style['elevation'] : 2;
    const translationZ = view.style['translationZ'] !== undefined ? view.style['translationZ'] : 0;
    const elevationSelected = view.style['elevationHighlighted'] !== undefined ? view.style['elevationHighlighted'] : 3 * elevation;
    // compute translationSelectedZ base on elevationSelected
    const translationSelectedZ = view.style['translationZHighlighted'] ? view.style['translationZHighlighted'] : translationZ + elevationSelected;
    const animationDuration = 100;
    const listAnimator = new android.animation.StateListAnimator();
    let animators = new java.util.ArrayList<android.animation.Animator>();
    let set = new android.animation.AnimatorSet();
    let animator = android.animation.ObjectAnimator.ofFloat(nativeView, 'translationZ', [translationSelectedZ]);
    animators.add(animator);
    animator = android.animation.ObjectAnimator.ofFloat(nativeView, 'elevation', [elevationSelected]);
    // animator.setDuration(0)
    animators.add(animator);
    set.playTogether(animators);
    set.setDuration(animationDuration);
    listAnimator.addState(stateSets.BACKGROUND_SELECTED_STATE, set);

    animators.clear();
    set = new android.animation.AnimatorSet();
    animator = android.animation.ObjectAnimator.ofFloat(nativeView, 'translationZ', [translationSelectedZ]);
    // animator.setDuration(animationDuration)
    animators.add(animator);
    animator = android.animation.ObjectAnimator.ofFloat(nativeView, 'elevation', [elevationSelected]);
    // animator.setDuration(0)
    animators.add(animator);
    set.playTogether(animators);
    set.setDuration(animationDuration);
    listAnimator.addState(stateSets.BACKGROUND_FOCUSED_STATE, set);

    animators.clear();
    set = new android.animation.AnimatorSet();
    animator = android.animation.ObjectAnimator.ofFloat(nativeView, 'translationZ', [translationZ]);
    // animator.setDuration(animationDuration)
    // animator.setStartDelay(animationDuration)
    animators.add(animator);
    animator = android.animation.ObjectAnimator.ofFloat(nativeView, 'elevation', [elevation]);
    // animator.setDuration(0)
    animators.add(animator);
    set.playTogether(animators);
    set.setDuration(animationDuration);
    set.setStartDelay(animationDuration);
    listAnimator.addState(stateSets.BACKGROUND_DEFAULT_STATE_2, set);

    animators.clear();
    set = new android.animation.AnimatorSet();
    animator = android.animation.ObjectAnimator.ofFloat(nativeView, 'translationZ', [0]);
    // animator.setDuration(animationDuration)
    // animator.setStartDelay(animationDuration)
    animators.add(animator);
    animator = android.animation.ObjectAnimator.ofFloat(nativeView, 'elevation', [0]);
    // animator.setDuration(0)
    animators.add(animator);
    set.playTogether(animators);
    set.setDuration(animationDuration);
    set.setStartDelay(animationDuration);
    listAnimator.addState(stateSets.BACKGROUND_DISABLED_STATE, set);

    animators.clear();
    set = new android.animation.AnimatorSet();
    animator = android.animation.ObjectAnimator.ofFloat(nativeView, 'translationZ', [translationZ]);
    // animator.setDuration(0)
    animators.add(animator);
    animator = android.animation.ObjectAnimator.ofFloat(nativeView, 'elevation', [elevation]);
    animator.setDuration(0);
    animators.add(animator);
    set.playTogether(animators);
    set.setDuration(animationDuration);
    set.setStartDelay(animationDuration);
    listAnimator.addState([], set);

    nativeView.setStateListAnimator(listAnimator);
}

export function getAttrColor(context: android.content.Context, name: string) {
    const ta = context.obtainStyledAttributes([ad.resources.getId(':attr/' + name)]);
    const color = ta.getColor(0, 0);
    ta.recycle();
    return color;
}

function createForegroundShape(radius) {
    const radii = Array.create('float', 8);
    java.util.Arrays.fill(radii, radius);
    const shape = new android.graphics.drawable.shapes.RoundRectShape(radii, null, null);
    const shapeDrawable = new android.graphics.drawable.ShapeDrawable(shape);
    return shapeDrawable;
}
export function createRippleDrawable(view: android.view.View, rippleColor: number, radius = 0) {
    const rippleShape = createForegroundShape(radius);
    let rippleDrawable: android.graphics.drawable.StateListDrawable | android.graphics.drawable.RippleDrawable;
    if (isPostLollipopMR1()) {
        //noinspection NewApi
        rippleDrawable = new android.graphics.drawable.RippleDrawable(android.content.res.ColorStateList.valueOf(rippleColor), null, rippleShape);
    } else {
        rippleDrawable = new android.graphics.drawable.StateListDrawable();
        // const foregroundShape = this.createForegroundShape(this._borderRadius);
        rippleShape.getPaint().setColor(rippleColor);
        (rippleDrawable as android.graphics.drawable.StateListDrawable).addState([state.pressed], rippleShape);
        // this.rippleDrawable = this.createCompatRippleDrawable(this.getCardRippleColor());
        // view.setForeground(this.createCompatRippleDrawable(this.getRippleColor(this.style['rippleColor'])));
    }
    // some classes might need this
    (rippleDrawable as any).rippleShape = rippleShape;
    return rippleDrawable;
}

export function handleClearFocus(view: android.view.View) {
    const root = view.getRootView();
    let oldValue = true;
    let oldDesc = android.view.ViewGroup.FOCUS_BEFORE_DESCENDANTS;

    if (root != null) {
        if (root instanceof android.view.ViewGroup) {
            oldDesc = root.getDescendantFocusability();
            root.setDescendantFocusability(android.view.ViewGroup.FOCUS_BLOCK_DESCENDANTS);
        }
        oldValue = root.isFocusable();
        setFocusable(root, false);
    }
    view.clearFocus();
    if (root != null) {
        setFocusable(root, oldValue);
        if (root instanceof android.view.ViewGroup) {
            root.setDescendantFocusability(oldDesc);
        }
    }
}

export function setFocusable(view: android.view.View, focusable: boolean) {
    view.setFocusable(focusable);
    // so dumb setFocusable to false set setFocusableInTouchMode
    // but not when using true :s so we have to do it
    view.setFocusableInTouchMode(focusable);
}

export function getLayout(id: string) {
    if (!id) {
        return 0;
    }
    const context: android.content.Context = application.android.context;
    return context.getResources().getIdentifier(id, 'layout', context.getPackageName());
}
