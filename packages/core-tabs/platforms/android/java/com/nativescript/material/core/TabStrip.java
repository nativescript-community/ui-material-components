/*
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.nativescript.material.core;


import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.util.Log;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

class TabStrip extends LinearLayout {

    private static final int DEFAULT_BOTTOM_BORDER_THICKNESS_DIPS = 0;
    private static final byte DEFAULT_BOTTOM_BORDER_COLOR_ALPHA = 0x26;
    private static final int SELECTED_INDICATOR_THICKNESS_DIPS = 3;
    private static final int DEFAULT_SELECTED_INDICATOR_COLOR = 0xFF33B5E5;

    private final int mBottomBorderThickness;
    private final Paint mBottomBorderPaint;

    private final int mSelectedIndicatorThickness;
    private final Paint mSelectedIndicatorPaint;

    private final int mDefaultBottomBorderColor;

    // selected tab position (final)
    private int mSelectedPosition;
    // current tab position for when the view is animating (scrolling)
    private int mSelectionTabPosition;
    // scrolling offset in relation to the current tab position
    private float mSelectionOffset;

    private final SimpleTabColorizer mDefaultTabColorizer;

    private int mTabTextColor;
    private int mSelectedTabTextColor;
    private float mTabTextFontSize;

    private boolean mShouldUpdateTabsTextColor;

    TabStrip(Context context) {
        this(context, null);
    }

    TabStrip(Context context, AttributeSet attrs) {
        super(context, attrs);

        setWillNotDraw(false);

        final float density = getResources().getDisplayMetrics().density;

        TypedValue outValue = new TypedValue();
        context.getTheme().resolveAttribute(android.R.attr.colorForeground, outValue, true);
        final int themeForegroundColor = outValue.data;

        mDefaultBottomBorderColor = setColorAlpha(themeForegroundColor,
                DEFAULT_BOTTOM_BORDER_COLOR_ALPHA);

        mDefaultTabColorizer = new SimpleTabColorizer();
        mDefaultTabColorizer.setIndicatorColors(DEFAULT_SELECTED_INDICATOR_COLOR);

        mBottomBorderThickness = (int) (DEFAULT_BOTTOM_BORDER_THICKNESS_DIPS * density);
        mBottomBorderPaint = new Paint();
        mBottomBorderPaint.setColor(mDefaultBottomBorderColor);

        mSelectedIndicatorThickness = (int) (SELECTED_INDICATOR_THICKNESS_DIPS * density);
        mSelectedIndicatorPaint = new Paint();

        TextView defaultTextView = new TextView(context);
        mTabTextColor = defaultTextView.getTextColors().getDefaultColor();
        mTabTextFontSize = defaultTextView.getTextSize();

        // Default selected color is the same as mTabTextColor
        mSelectedTabTextColor = mTabTextColor;

        mShouldUpdateTabsTextColor = true;

        setMeasureWithLargestChildEnabled(true);
    }

    void setSelectedIndicatorColors(int... colors) {
        mDefaultTabColorizer.setIndicatorColors(colors);
        invalidate();
    }

    void setTabTextColor(int color){
        mTabTextColor = color;
        updateTabsTextColor();
    }

    int getTabTextColor(){
        return mTabTextColor;
    }

    void setSelectedTabTextColor(int color){
        mSelectedTabTextColor = color;
        updateTabsTextColor();
    }

    int getSelectedTabTextColor(){
        return mSelectedTabTextColor;
    }

    void setShouldUpdateTabsTextColor(boolean value) {
        mShouldUpdateTabsTextColor = value;
    }


    private void updateTabTextColor(int index, boolean selected){
        if (mShouldUpdateTabsTextColor) {
            TextView textView = getTextViewAt(index);
            if (selected){
                textView.setTextColor(mSelectedTabTextColor);
            }
            else {
                textView.setTextColor(mTabTextColor);
            }
        }
    }

    private void updateTabsTextColor(){
        if (mShouldUpdateTabsTextColor) {
            final int childCount = getChildCount();
            for (int i = 0; i < childCount; i++){
                TextView textView = getTextViewAt(i);
                if (i == mSelectedPosition){
                    textView.setTextColor(mSelectedTabTextColor);
                }
                else {
                    textView.setTextColor(mTabTextColor);
                }
            }
        }
    }

    void setTabTextFontSize(float fontSize){
        mTabTextFontSize = fontSize;
        updateTabsTextFontSize();
    }

    float getTabTextFontSize(){
        return mTabTextFontSize;
    }

    private TextView getTextViewAt(int index) {
        LinearLayout linearLayout = (LinearLayout)getChildAt(index);
        return (TextView)linearLayout.getChildAt(1);
    }

    private void updateTabsTextFontSize(){
        final int childCount = getChildCount();
        for (int i = 0; i < childCount; i++){
            TextView textView = getTextViewAt(i);
            textView.setTextSize(mTabTextFontSize);
        }
    }


    void onTabsViewPagerPageChanged(int position, float positionOffset) {
        mSelectionTabPosition = position;
        mSelectionOffset = positionOffset;
        invalidate();
    }

    int getSelectedPosition(){
        return mSelectedPosition;
    }

    void setSelectedPosition(int position) {
        if (mSelectedPosition != position) {
            final int childCount = getChildCount();
            if (mSelectedPosition > -1 && mSelectedPosition < childCount ) {
                getChildAt(mSelectedPosition).setSelected(false);
                updateTabTextColor(mSelectedPosition, false);
            }
            if (position > -1 && position < childCount ) {
                getChildAt(position).setSelected(true);
                updateTabTextColor(position, true);
            }
            mSelectedPosition = position;
            invalidate();
        }
    }

    @Override
    protected void dispatchDraw(Canvas canvas) {
        super.dispatchDraw(canvas);

        final int height = getHeight();
        final int childCount = getChildCount();
        final SimpleTabColorizer tabColorizer = mDefaultTabColorizer;

        // Thick colored underline below the current selection
        if (childCount > 0 && mSelectionTabPosition < childCount) {
            View selectedTitle = getChildAt(mSelectionTabPosition);
            int left = selectedTitle.getLeft();
            int width = selectedTitle.getWidth();
            int right = selectedTitle.getRight();
            int color = tabColorizer.getIndicatorColor(mSelectionTabPosition);
            int nextTab = mSelectionTabPosition + 1;

            // we're always at mSelectionTabPosition + mSelectionOffset (ex: 1 + 0.5)
            // if we mSelectionOffset > 0f then we need to mutate the position, width and color of the selection
            // if we're on the last tab, nextTab will be getChildCount() + 1 so it won't enter as there's nothing to animate
            if (mSelectionOffset > 0f && nextTab >= 0 && nextTab < getChildCount()) {
                int nextColor = tabColorizer.getIndicatorColor(nextTab);
                if (color != nextColor) {
                    color = blendColors(nextColor, color, mSelectionOffset);
                }

                // Draw the selection partway between the tabs
                View nextTitle = getChildAt(nextTab);
                // left is the current tab left + it's width * mSelectionOffset ex: 0 + (100 * 0.5) = 50, halfway through the current cell
                left = (int) (left + mSelectionOffset * width);
                // right is the tab right + the next tab's width * mSelectionOffset ex: 100 + (200 * 0.5) = 200, halfway through the next cell
                // this ensures that the width mutates smoothly as we move between cells
                right = (int) (right + mSelectionOffset * nextTitle.getWidth());
            }

            mSelectedIndicatorPaint.setColor(color);

            canvas.drawRect(left, height - mSelectedIndicatorThickness, right,
                    height, mSelectedIndicatorPaint);
        }

        // Thin underline along the entire bottom edge
        canvas.drawRect(0, height - mBottomBorderThickness, getWidth(), height, mBottomBorderPaint);
    }

    /**
     * Set the alpha value of the {@code color} to be the given {@code alpha} value.
     */
    private static int setColorAlpha(int color, byte alpha) {
        return Color.argb(alpha, Color.red(color), Color.green(color), Color.blue(color));
    }

    /**
     * Blend {@code color1} and {@code color2} using the given ratio.
     *
     * @param ratio of which to blend. 1.0 will return {@code color1}, 0.5 will give an even blend,
     *              0.0 will return {@code color2}.
     */
    private static int blendColors(int color1, int color2, float ratio) {
        final float inverseRation = 1f - ratio;
        float r = (Color.red(color1) * ratio) + (Color.red(color2) * inverseRation);
        float g = (Color.green(color1) * ratio) + (Color.green(color2) * inverseRation);
        float b = (Color.blue(color1) * ratio) + (Color.blue(color2) * inverseRation);
        return Color.rgb((int) r, (int) g, (int) b);
    }

    private static class SimpleTabColorizer {
        private int[] mIndicatorColors;

        public final int getIndicatorColor(int position) {
            return mIndicatorColors[position % mIndicatorColors.length];
        }

        void setIndicatorColors(int... colors) {
            mIndicatorColors = colors;
        }
    }
}