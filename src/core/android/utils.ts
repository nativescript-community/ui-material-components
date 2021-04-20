import { VerticalTextAlignment } from '@nativescript-community/text';
import { Application, Color, Utils, ViewBase, profile, CoreTypes } from '@nativescript/core';

let isPostLollipopVar: boolean;
export function isPostLollipop() {
    if (isPostLollipopVar === undefined) {
        isPostLollipopVar = android.os.Build.VERSION.SDK_INT >= 21;
    }
    return isPostLollipopVar;
}

let isPostLollipopMR1Var: boolean;
export function isPostLollipopMR1() {
    if (isPostLollipopMR1Var === undefined) {
        isPostLollipopMR1Var = android.os.Build.VERSION.SDK_INT >= 22;
    }
    return isPostLollipopMR1Var;
}
let isPostMarshmallowVar: boolean;
export function isPostMarshmallow() {
    if (isPostMarshmallowVar === undefined) {
        isPostMarshmallowVar = android.os.Build.VERSION.SDK_INT >= 23;
    }
    return isPostMarshmallowVar;
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
        return this._PRESSED_STATE_SET as Array<number>;
    },
    get HOVERED_FOCUSED_STATE_SET() {
        if (!this._HOVERED_FOCUSED_STATE_SET) {
            this._HOVERED_FOCUSED_STATE_SET = createNativeArray(state.hovered, state.focused);
        }
        return this._PRESSED_STATE_SET as Array<number>;
    },
    get FOCUSED_STATE_SET() {
        if (!this._FOCUSED_STATE_SET) {
            this._FOCUSED_STATE_SET = createNativeArray(state.focused);
        }
        return this._FOCUSED_STATE_SET as Array<number>;
    },
    get HOVERED_STATE_SET() {
        if (!this._HOVERED_STATE_SET) {
            this._HOVERED_STATE_SET = createNativeArray(state.hovered);
        }
        return this._HOVERED_STATE_SET as Array<number>;
    },
    get SELECTED_PRESSED_STATE_SET() {
        if (!this._SELECTED_PRESSED_STATE_SET) {
            this._SELECTED_PRESSED_STATE_SET = createNativeArray(state.enabled, state.pressed);
        }
        return this._SELECTED_PRESSED_STATE_SET as Array<number>;
    },
    get SELECTED_HOVERED_FOCUSED_STATE_SET() {
        if (!this._SELECTED_HOVERED_FOCUSED_STATE_SET) {
            this._SELECTED_HOVERED_FOCUSED_STATE_SET = createNativeArray(state.selected, state.hovered, state.focused);
        }
        return this._SELECTED_HOVERED_FOCUSED_STATE_SET as Array<number>;
    },
    get SELECTED_FOCUSED_STATE_SET() {
        if (!this._SELECTED_FOCUSED_STATE_SET) {
            this._SELECTED_FOCUSED_STATE_SET = createNativeArray(state.selected, state.focused);
        }
        return this._SELECTED_FOCUSED_STATE_SET as Array<number>;
    },
    get SELECTED_HOVERED_STATE_SET() {
        if (!this._SELECTED_HOVERED_STATE_SET) {
            this._SELECTED_HOVERED_STATE_SET = createNativeArray(state.selected, state.hovered);
        }
        return this._SELECTED_HOVERED_STATE_SET as Array<number>;
    },
    get SELECTED_STATE_SET() {
        if (!this._SELECTED_STATE_SET) {
            this._SELECTED_STATE_SET = createNativeArray(state.selected);
        }
        return this._SELECTED_STATE_SET as Array<number>;
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
        return this._BACKGROUND_DEFAULT_STATE_1_SET as Array<number>;
    },
    get BACKGROUND_SELECTED_STATE() {
        if (!this._BACKGROUND_SELECTED_STATE) {
            this._BACKGROUND_SELECTED_STATE = createNativeArray(state.window_focused, state.enabled, state.pressed);
        }
        return this._BACKGROUND_SELECTED_STATE as Array<number>;
    },
    get BACKGROUND_CHECKED_STATE() {
        if (!this._BACKGROUND_CHECKED_STATE) {
            this._BACKGROUND_CHECKED_STATE = createNativeArray(state.window_focused, state.enabled, state.checked);
        }
        return this._BACKGROUND_CHECKED_STATE as Array<number>;
    },
    get BACKGROUND_FOCUSED_STATE() {
        if (!this._BACKGROUND_FOCUSED_STATE) {
            this._BACKGROUND_FOCUSED_STATE = createNativeArray(state.focused, state.window_focused, state.enabled);
        }
        return this._BACKGROUND_FOCUSED_STATE as Array<number>;
    },
    get BACKGROUND_DISABLED_STATE() {
        if (!this._BACKGROUND_DISABLED_STATE) {
            this._BACKGROUND_DISABLED_STATE = createNativeArray(-state.enabled);
        }
        return this._BACKGROUND_DISABLED_STATE as Array<number>;
    }
};

let ColorStateList: typeof android.content.res.ColorStateList;
export function getColorStateList(color: number) {
    if (!color) {
        return null;
    }
    if (!ColorStateList) {
        ColorStateList = android.content.res.ColorStateList;
    }
    return ColorStateList.valueOf(color);
}

export function getFullColorStateList(activeColor: number, inactiveColor = 1627389952, disabledColor = 1627389952) {
    if (!activeColor) {
        return null;
    }
    if (!NUtils) {
        NUtils = (com as any).nativescript.material.core.Utils;
    }
    return NUtils.getFullColorStateList(activeColor, inactiveColor, disabledColor);
}
export function getEnabledColorStateList(color: number, disabledColor: number) {
    if (!color) {
        return null;
    }
    if (!NUtils) {
        NUtils = (com as any).nativescript.material.core.Utils;
    }
    return NUtils.getEnabledColorStateList(color, disabledColor);
}

let NUtils;
export const createStateListAnimator = profile('createStateListAnimator', function (view: ViewBase, nativeView: android.view.View) {
    let elevation = view['elevation'];
    if (elevation === undefined || elevation === null) {
        elevation = (view as any).getDefaultElevation();
    }
    elevation = Utils.layout.toDevicePixels(elevation);

    let pressedZ = view['dynamicElevationOffset'];
    if (pressedZ === undefined || pressedZ === null) {
        pressedZ = (view as any).getDefaultDynamicElevationOffset();
    }
    pressedZ = Utils.layout.toDevicePixels(pressedZ);
    if (!NUtils) {
        NUtils = (com as any).nativescript.material.core.Utils;
    }
    NUtils.createStateListAnimator(view._context, nativeView, elevation, pressedZ);
});

export function getAttrColor(context: android.content.Context, name: string) {
    const ta = context.obtainStyledAttributes([Utils.android.resources.getId(':attr/' + name)]);
    const color = ta.getColor(0, 0);
    ta.recycle();
    return color;
}

function createForegroundShape(radius) {
    if (!NUtils) {
        NUtils = (com as any).nativescript.material.core.Utils;
    }
    return NUtils.createForegroundShape(radius);
}
export function createRippleDrawable(rippleColor: number, radius = 0) {
    if (!NUtils) {
        NUtils = (com as any).nativescript.material.core.Utils;
    }
    return NUtils.createRippleDrawable(rippleColor, radius);
}

export function handleClearFocus(view: android.view.View) {
    if (!NUtils) {
        NUtils = (com as any).nativescript.material.core.Utils;
    }
    return NUtils.handleClearFocus(view);
}

export function setFocusable(view: android.view.View, focusable: boolean) {
    view.setFocusable(focusable);
    // so dumb setFocusable to false set setFocusableInTouchMode
    // but not when using true :s so we have to do it
    view.setFocusableInTouchMode(focusable);
}

export function getLayout(context: android.content.Context, id: string) {
    if (!id || !context) {
        return 0;
    }
    return context.getResources().getIdentifier(id, 'layout', context.getPackageName());
}

export function getStyle(context: android.content.Context, id: string) {
    if (!id || !context) {
        return 0;
    }
    return context.getResources().getIdentifier(id, 'style', context.getPackageName());
}
export function getAttr(context: android.content.Context, id: string) {
    if (!id || !context) {
        return 0;
    }
    return context.getResources().getIdentifier(id, 'attr', context.getPackageName());
}

export function getHorizontalGravity(textAlignment: CoreTypes.TextAlignmentType) {
    switch (textAlignment) {
        case 'initial':
        case 'left':
            return 8388611; //Gravity.START
        case 'center':
            return 1; //Gravity.CENTER_HORIZONTAL
        case 'right':
            return 8388613; //Gravity.END
    }
}
export function getVerticalGravity(textAlignment: VerticalTextAlignment) {
    switch (textAlignment) {
        case 'initial':
        case 'top':
            return 48; //Gravity.TOP
        case 'middle':
        case 'center':
            return 16; //Gravity.CENTER_VERTICAL

        case 'bottom':
            return 80; //Gravity.BOTTOM
    }
}
