import { VerticalTextAlignment } from '@nativescript-community/text';
import { CoreTypes, Device, Utils, ViewBase, profile } from '@nativescript/core';

export const sdkVersion = parseInt(Device.sdkVersion, 10);
export const isPostLollipop = sdkVersion >= 21;
export const isPostLollipopMR1 = sdkVersion >= 22;
export const isPostMarshmallow = sdkVersion >= 23;

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
        if (!this.mPRESSED_STATE_SET) {
            this.mPRESSED_STATE_SET = createNativeArray(state.pressed);
        }
        return this.mPRESSED_STATE_SET as number[];
    },
    get HOVERED_FOCUSED_STATE_SET() {
        if (!this.mHOVERED_FOCUSED_STATE_SET) {
            this.mHOVERED_FOCUSED_STATE_SET = createNativeArray(state.hovered, state.focused);
        }
        return this.mPRESSED_STATE_SET as number[];
    },
    get FOCUSED_STATE_SET() {
        if (!this.mFOCUSED_STATE_SET) {
            this.mFOCUSED_STATE_SET = createNativeArray(state.focused);
        }
        return this.mFOCUSED_STATE_SET as number[];
    },
    get HOVERED_STATE_SET() {
        if (!this.mHOVERED_STATE_SET) {
            this.mHOVERED_STATE_SET = createNativeArray(state.hovered);
        }
        return this.mHOVERED_STATE_SET as number[];
    },
    get SELECTED_PRESSED_STATE_SET() {
        if (!this.mSELECTED_PRESSED_STATE_SET) {
            this.mSELECTED_PRESSED_STATE_SET = createNativeArray(state.enabled, state.pressed);
        }
        return this.mSELECTED_PRESSED_STATE_SET as number[];
    },
    get SELECTED_HOVERED_FOCUSED_STATE_SET() {
        if (!this.mSELECTED_HOVERED_FOCUSED_STATE_SET) {
            this.mSELECTED_HOVERED_FOCUSED_STATE_SET = createNativeArray(state.selected, state.hovered, state.focused);
        }
        return this.mSELECTED_HOVERED_FOCUSED_STATE_SET as number[];
    },
    get SELECTED_FOCUSED_STATE_SET() {
        if (!this.mSELECTED_FOCUSED_STATE_SET) {
            this.mSELECTED_FOCUSED_STATE_SET = createNativeArray(state.selected, state.focused);
        }
        return this.mSELECTED_FOCUSED_STATE_SET as number[];
    },
    get SELECTED_HOVERED_STATE_SET() {
        if (!this.mSELECTED_HOVERED_STATE_SET) {
            this.mSELECTED_HOVERED_STATE_SET = createNativeArray(state.selected, state.hovered);
        }
        return this.mSELECTED_HOVERED_STATE_SET as number[];
    },
    get SELECTED_STATE_SET() {
        if (!this.mSELECTED_STATE_SET) {
            this.mSELECTED_STATE_SET = createNativeArray(state.selected);
        }
        return this.mSELECTED_STATE_SET as number[];
    },
    get BACKGROUND_DEFAULT_STATE_1() {
        if (!this.mBACKGROUND_DEFAULT_STATE_1) {
            this.mBACKGROUND_DEFAULT_STATE_1 = createNativeArray(state.window_focused, state.enabled);
        }
        return this.mBACKGROUND_DEFAULT_STATE_1 as number[];
    },
    get BACKGROUND_DEFAULT_STATE_2() {
        if (!this.mBACKGROUND_DEFAULT_STATE_1_SET) {
            this.mBACKGROUND_DEFAULT_STATE_1_SET = createNativeArray(state.enabled);
        }
        return this.mBACKGROUND_DEFAULT_STATE_1_SET as number[];
    },
    get BACKGROUND_SELECTED_STATE() {
        if (!this.mBACKGROUND_SELECTED_STATE) {
            this.mBACKGROUND_SELECTED_STATE = createNativeArray(state.window_focused, state.enabled, state.pressed);
        }
        return this.mBACKGROUND_SELECTED_STATE as number[];
    },
    get BACKGROUND_CHECKED_STATE() {
        if (!this.mBACKGROUND_CHECKED_STATE) {
            this.mBACKGROUND_CHECKED_STATE = createNativeArray(state.window_focused, state.enabled, state.checked);
        }
        return this.mBACKGROUND_CHECKED_STATE as number[];
    },
    get BACKGROUND_FOCUSED_STATE() {
        if (!this.mBACKGROUND_FOCUSED_STATE) {
            this.mBACKGROUND_FOCUSED_STATE = createNativeArray(state.focused, state.window_focused, state.enabled);
        }
        return this.mBACKGROUND_FOCUSED_STATE as number[];
    },
    get BACKGROUND_DISABLED_STATE() {
        if (!this.mBACKGROUND_DISABLED_STATE) {
            this.mBACKGROUND_DISABLED_STATE = createNativeArray(-state.enabled);
        }
        return this.mBACKGROUND_DISABLED_STATE as number[];
    }
};

let ColorStateList: typeof android.content.res.ColorStateList;
export function getColorStateList(color: number) {
    if (color === undefined || color === null) {
        return null;
    }
    if (!ColorStateList) {
        ColorStateList = android.content.res.ColorStateList;
    }
    return ColorStateList.valueOf(color);
}

export function getFullColorStateList(activeColor: number, inactiveColor = 1627389952, disabledColor = 1627389952) {
    if (activeColor === undefined || activeColor === null) {
        return null;
    }
    if (!NUtils) {
        NUtils = (com as any).nativescript.material.core.Utils;
    }
    return NUtils.getFullColorStateList(activeColor, inactiveColor, disabledColor);
}
export function getEnabledColorStateList(color: number, disabledColor: number) {
    if (color === undefined || color === null) {
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
export function createRippleDrawable(rippleColor: number, topLeftRadius = 0, topRightRadius = 0, bottomRightRadius = 0, bottomLeftRadius = 0) {
    if (!NUtils) {
        NUtils = (com as any).nativescript.material.core.Utils;
    }
    return NUtils.createRippleDrawable(rippleColor, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius);
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
        case 'center':
            return 1; //Gravity.CENTER_HORIZONTAL
        case 'right':
            return 8388613; //Gravity.END
        case 'initial':
        case 'left':
        default:
            return 8388611; //Gravity.START
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

export function inflateLayout(context: android.content.Context, layoutId: string) {
    if (!NUtils) {
        NUtils = (com as any).nativescript.material.core.Utils;
    }
    return NUtils.inflateLayout(context, layoutId);
}

let isNewGridAPI: boolean | undefined;

export function addGridLayoutRow(gridLayout: org.nativescript.widgets.GridLayout, value: number, unitType: org.nativescript.widgets.GridUnitType) {
    if (isNewGridAPI === undefined) {
        try {
            gridLayout.addRow(value, unitType);
            isNewGridAPI = true;
            return;
        } catch (e) {
            isNewGridAPI = false;
        }
    }
    if (isNewGridAPI) {
        gridLayout.addRow(value, unitType);
    } else {
        // @ts-expect-error older API
        gridLayout.addRow(new org.nativescript.widgets.ItemSpec(value, unitType));
    }
}
