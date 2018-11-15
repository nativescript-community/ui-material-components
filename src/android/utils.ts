import { Color } from "tns-core-modules/color/color";

let PRESSED_STATE_SET: number[]
let HOVERED_FOCUSED_STATE_SET: number[]
let FOCUSED_STATE_SET: number[]
let HOVERED_STATE_SET: number[]
let SELECTED_PRESSED_STATE_SET: number[]
let SELECTED_HOVERED_FOCUSED_STATE_SET: number[]
let SELECTED_FOCUSED_STATE_SET: number[]
let SELECTED_HOVERED_STATE_SET: number[]
let SELECTED_STATE_SET: number[]

export function getPRESSED_STATE_SET() {
    if (!PRESSED_STATE_SET) {
        PRESSED_STATE_SET = [android.R.attr.state_pressed]
    }
}
export function getHOVERED_FOCUSED_STATE_SET() {
    if (!HOVERED_FOCUSED_STATE_SET) {
        HOVERED_FOCUSED_STATE_SET = [
            android.R.attr.state_hovered,
            android.R.attr.state_focused
        ]
    }
}
export function getFOCUSED_STATE_SET() {
    if (!FOCUSED_STATE_SET) {
        FOCUSED_STATE_SET = [android.R.attr.state_focused]
    }
}
export function getHOVERED_STATE_SET() {
    if (!HOVERED_STATE_SET) {
        HOVERED_STATE_SET = [android.R.attr.state_hovered]
    }
}
export function getSELECTED_PRESSED_STATE_SET() {
    if (!SELECTED_PRESSED_STATE_SET) {
        SELECTED_PRESSED_STATE_SET = [
            android.R.attr.state_selected,
            android.R.attr.state_pressed
        ]
    }
}
export function getSELECTED_HOVERED_FOCUSED_STATE_SET() {
    if (!SELECTED_HOVERED_FOCUSED_STATE_SET) {
        SELECTED_HOVERED_FOCUSED_STATE_SET = [
            android.R.attr.state_selected,
            android.R.attr.state_hovered,
            android.R.attr.state_focused
        ]
    }
}
export function getSELECTED_FOCUSED_STATE_SET() {
    if (!SELECTED_FOCUSED_STATE_SET) {
        SELECTED_FOCUSED_STATE_SET = [
            android.R.attr.state_selected,
            android.R.attr.state_focused
        ]
    }
}
export function getSELECTED_HOVERED_STATE_SET() {
    if (!SELECTED_HOVERED_STATE_SET) {
        SELECTED_HOVERED_STATE_SET = [
            android.R.attr.state_selected,
            android.R.attr.state_hovered
        ]
    }
}
export function getSELECTED_STATE_SET() {
    if (!SELECTED_STATE_SET) {
        SELECTED_STATE_SET = [android.R.attr.state_selected]
    }
}


export function getRippleColorStateList(color: number) {
    const states = Array.create("[I", 2);
    const SELECTED_PRESSED_STATE_SET = Array.create("int",2);
    SELECTED_PRESSED_STATE_SET[0] =android.R.attr.state_enabled;
    SELECTED_PRESSED_STATE_SET[1] = android.R.attr.state_pressed;
    states[0] = SELECTED_PRESSED_STATE_SET;
    states[1] = Array.create("int", 0);
    // states[1][0] = new java.lang.Integer(android.R.attr.state_enabled);
    // states[1][1] = new java.lang.Integer(-android.R.attr.state_pressed);
    // const states = [
    //     getSELECTED_PRESSED_STATE_SET(),
    //     []]
    // ;
    const colors = Array.create("int", 2);
    colors[0] = color;
    colors[1] = 0;
    return  new android.content.res.ColorStateList(
        states,
        colors
    );
}
export function getEnabledColorStateList(color: number, variant:string) {
    const states = Array.create("[I", 2);
    // const SELECTED_PRESSED_STATE_SET = Array.create("int",1);
    // SELECTED_PRESSED_STATE_SET[0] =  android.R.attr.state_enabled;
    states[0] = Array.create("int", 1);
    states[0][0] = -android.R.attr.state_enabled;
    states[1] = android.util.StateSet.NOTHING;
    // states[1][0] = new java.lang.Integer(-android.R.attr.state_enabled);
    // const states = [
    //     getSELECTED_PRESSED_STATE_SET(),
    //     []]
    // ;
    const colors = Array.create("int", 2);
    colors[0] = (variant === 'text' || variant === 'outline') ? 0 : new Color(30, 0,0,0).android;
    colors[1] = color;
    return  new android.content.res.ColorStateList(
        states,
        colors
    );
}