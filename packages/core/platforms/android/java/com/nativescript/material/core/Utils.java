package com.nativescript.material.core;

import android.animation.StateListAnimator;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.view.View;
import android.view.ViewGroup;
import android.content.Context;
import android.graphics.drawable.ShapeDrawable;
import android.graphics.drawable.shapes.RoundRectShape;
import android.graphics.drawable.RippleDrawable;
import android.graphics.drawable.Drawable;
import android.content.res.ColorStateList;
import android.graphics.drawable.StateListDrawable;
import android.graphics.Color;
import android.os.Build;

public class Utils {
    static final int shortAnimTime = android.R.integer.config_shortAnimTime;
    static final int statePressed = android.R.attr.state_pressed;
    static final int stateEnabled = android.R.attr.state_enabled;

    public static void createStateListAnimator(Context context, View view, float elevation, float pressedZ) {
        int duration = context.getResources().getInteger(shortAnimTime);

        AnimatorSet pressedSet = new AnimatorSet();
        pressedSet.playTogether(ObjectAnimator.ofFloat(view, "translationZ", pressedZ).setDuration(duration),
                ObjectAnimator.ofFloat(view, "elevation", elevation).setDuration(0));

        AnimatorSet notPressedSet = new AnimatorSet();
        notPressedSet.playTogether(ObjectAnimator.ofFloat(view, "translationZ", 0).setDuration(duration),
                ObjectAnimator.ofFloat(view, "elevation", elevation).setDuration(0));

        AnimatorSet defaultSet = new AnimatorSet();
        defaultSet.playTogether(ObjectAnimator.ofFloat(view, "translationZ", 0).setDuration(0),
                ObjectAnimator.ofFloat(view, "elevation", 0).setDuration(0));

        StateListAnimator stateListAnimator = new StateListAnimator();
        stateListAnimator.addState(new int[] { statePressed, stateEnabled }, pressedSet);
        stateListAnimator.addState(new int[] { stateEnabled }, notPressedSet);
        stateListAnimator.addState(new int[] {}, defaultSet);

        view.setStateListAnimator(stateListAnimator);
    }

    public static ColorStateList getEnabledColorStateList(int color, String variant) {
        int[][] states = new int[][] { new int[] { -android.R.attr.state_enabled }, // enabled
                android.util.StateSet.NOTHING, // disabled
        };
        int disabledColor = (variant == "text" || variant == "outline") ? 0 : Color.argb(0.117f, 0f, 0f, 0f);
        int[] colors = new int[] { disabledColor, color };
        return new android.content.res.ColorStateList(states, colors);
    }

    public static ColorStateList getFullColorStateList(int activeColor, int inactiveColor, int disabledColor) {
        int[][] states = new int[][] { new int[] { android.R.attr.state_focused }, // focused
                android.util.StateSet.NOTHING, // other
                new int[] { -android.R.attr.state_enabled } // disabled
        };
        int[] colors = new int[] { activeColor, inactiveColor, disabledColor };
        return new android.content.res.ColorStateList(states, colors);
    }

    public static ShapeDrawable createForegroundShape(float radius) {
        RoundRectShape shape = new RoundRectShape(
                new float[] { radius, radius, radius, radius, radius, radius, radius, radius }, null, null);
        return new ShapeDrawable(shape);
    }

    public static Drawable createRippleDrawable(int rippleColor, float radius) {
        ShapeDrawable rippleShape = radius != 0 ? createForegroundShape(radius) : null;
        if (Build.VERSION.SDK_INT >= 22) {
            return new RippleDrawable(ColorStateList.valueOf(rippleColor), null, rippleShape);
        } else {
            StateListDrawable rippleDrawable = new StateListDrawable();
            rippleShape.getPaint().setColor(rippleColor);
            rippleDrawable.addState(new int[] { statePressed }, rippleShape);
            return rippleShape;
        }
    }

    static void handleClearFocus(View view) {
        final View root = view.getRootView();
        boolean oldValue = true;
        int oldDesc = ViewGroup.FOCUS_BEFORE_DESCENDANTS;

        if (root != null) {
            if (root instanceof ViewGroup) {
                oldDesc = ((ViewGroup) root).getDescendantFocusability();
                ((ViewGroup) root).setDescendantFocusability(ViewGroup.FOCUS_BLOCK_DESCENDANTS);
            }
            oldValue = root.isFocusable();
            root.setFocusable(false);
        }
        view.clearFocus();
        if (root != null) {
            root.setFocusable(oldValue);
            if (root instanceof ViewGroup) {
                ((ViewGroup) root).setDescendantFocusability(oldDesc);
            }
        }
    }
}