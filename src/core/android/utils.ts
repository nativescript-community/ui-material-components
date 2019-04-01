import { Color } from 'tns-core-modules/color/color';
import { ad } from 'tns-core-modules/utils/utils';

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

export const stateSets = {
    get PRESSED_STATE_SET() {
        if (!this._PRESSED_STATE_SET) {
            this._PRESSED_STATE_SET = [state.pressed];
        }
        return this._PRESSED_STATE_SET as number[];
    },
    get HOVERED_FOCUSED_STATE_SET() {
        if (!this._HOVERED_FOCUSED_STATE_SET) {
            this._HOVERED_FOCUSED_STATE_SET = [state.hovered, state.focused];
        }
        return this._PRESSED_STATE_SET as number[];
    },
    get FOCUSED_STATE_SET() {
        if (!this._FOCUSED_STATE_SET) {
            this._FOCUSED_STATE_SET = [state.focused];
        }
        return this._FOCUSED_STATE_SET as number[];
    },
    get HOVERED_STATE_SET() {
        if (!this._HOVERED_STATE_SET) {
            this._HOVERED_STATE_SET = [state.hovered];
        }
        return this._HOVERED_STATE_SET as number[];
    },
    get SELECTED_PRESSED_STATE_SET() {
        if (!this._SELECTED_PRESSED_STATE_SET) {
            this._SELECTED_PRESSED_STATE_SET = Array.create('int', 2);
            this._SELECTED_PRESSED_STATE_SET[0] = state.enabled;
            this._SELECTED_PRESSED_STATE_SET[1] = state.pressed;
        }
        return this._SELECTED_PRESSED_STATE_SET as native.Array<number>;
    },
    get SELECTED_HOVERED_FOCUSED_STATE_SET() {
        if (!this._SELECTED_HOVERED_FOCUSED_STATE_SET) {
            this._SELECTED_HOVERED_FOCUSED_STATE_SET = [state.selected, state.hovered, state.focused];
        }
        return this._SELECTED_HOVERED_FOCUSED_STATE_SET as number[];
    },
    get SELECTED_FOCUSED_STATE_SET() {
        if (!this._SELECTED_FOCUSED_STATE_SET) {
            this._SELECTED_FOCUSED_STATE_SET = [state.selected, state.focused];
        }
        return this._SELECTED_FOCUSED_STATE_SET as number[];
    },
    get SELECTED_HOVERED_STATE_SET() {
        if (!this._SELECTED_HOVERED_STATE_SET) {
            this._SELECTED_HOVERED_STATE_SET = [state.selected, state.hovered];
        }
        return this._SELECTED_HOVERED_STATE_SET as number[];
    },
    get SELECTED_STATE_SET() {
        if (!this._SELECTED_STATE_SET) {
            this._SELECTED_STATE_SET = [state.selected];
        }
        return this._SELECTED_STATE_SET as number[];
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
