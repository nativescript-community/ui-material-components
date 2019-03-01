// export * from './material.common';
import { Color } from 'tns-core-modules/color/color';
import { ViewBase } from 'tns-core-modules/ui/page/page';

// stub class as we don't use this on android
export class Themer {
    // appColorScheme: MDCSemanticColorScheme;
    getOrcreateAppColorScheme() {
        // if (!this.appColorScheme) {
        // this.appColorScheme = MDCSemanticColorScheme.alloc().init();
        // }
        // return this.appColorScheme;
    }
    getAppColorScheme() {
        // return this.appColorScheme;
    }
    setPrimaryColor(value: string) {
        // this.getOrcreateAppColorScheme().primaryColor = new Color(value).ios;
    }
    setPrimaryColorVariant(value: string) {
        // this.getOrcreateAppColorScheme().primaryColorVariant = new Color(value).ios;
    }
}

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
export const themer = new Themer();

export function install() {
    try {
        require('nativescript-material-bottomsheet').install();
    } catch (e) {
        console.log('error installing bottomsheet', e);
    }
}

export function getRippleColor(color: string | Color) {
    if (color) {
        const temp = typeof color === 'string' ? new Color(color) : color;
        return new Color(temp.a !== 255 ? temp.a : 36, temp.r, temp.g, temp.b).android; // default alpha is 0.14
    }
    return null;
}

let BACKGROUND_DEFAULT_STATE_1: number[];
let BACKGROUND_DEFAULT_STATE_2: number[];
let BACKGROUND_SELECTED_STATE: number[];
let BACKGROUND_CHECKED_STATE: number[];
let BACKGROUND_FOCUSED_STATE: number[];
let BACKGROUND_DISABLED_STATE: number[];

let initDone = false;
function init() {
    if (!initDone) {
        initDone = true;
        // if (android.os.Build.VERSION.SDK_INT >= 23) {
        // } else {
        //     initializePreLollipopCardView()
        //     MDCCardView = PreLollipopCardView as any
        // }
        BACKGROUND_DEFAULT_STATE_1 = [android.R.attr.state_window_focused, android.R.attr.state_enabled];
        BACKGROUND_DEFAULT_STATE_2 = [android.R.attr.state_enabled];
        BACKGROUND_SELECTED_STATE = [android.R.attr.state_window_focused, android.R.attr.state_enabled, android.R.attr.state_pressed];

        BACKGROUND_CHECKED_STATE = [android.R.attr.state_window_focused, android.R.attr.state_enabled, android.R.attr.state_checked];
        BACKGROUND_FOCUSED_STATE = [android.R.attr.state_focused, android.R.attr.state_window_focused, android.R.attr.state_enabled];
        BACKGROUND_DISABLED_STATE = [-android.R.attr.state_enabled];
    }
}
init();

export function createStateListAnimator(view: ViewBase, nativeView: android.view.View) {
    const elevation = android.support.v4.view.ViewCompat.getElevation(nativeView);
    const translationZ = android.support.v4.view.ViewCompat.getTranslationZ(nativeView);
    const elevationSelected = view.style['elevationHighlighted'] !== undefined ? view.style['elevationHighlighted'] : elevation * 2;
    // compute translationSelectedZ base on elevationSelected
    const translationSelectedZ = translationZ + (6 * elevationSelected) / elevation / 2;
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
    listAnimator.addState(BACKGROUND_SELECTED_STATE, set);

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
    listAnimator.addState(BACKGROUND_FOCUSED_STATE, set);

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
    listAnimator.addState(BACKGROUND_DEFAULT_STATE_2, set);

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
