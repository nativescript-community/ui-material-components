import { getRippleColor, rippleColorProperty } from '@nativescript-community/ui-material-core';
import { Background, Color, backgroundInternalProperty } from '@nativescript/core';
import { createRippleDrawable, getAttrColor, isPostLollipopMR1, isPostMarshmallow } from '@nativescript-community/ui-material-core/android/utils';
import { RippleBase } from './ripple-common';

let MDStackLayout: typeof org.nativescript.widgets.StackLayout;

const DEFAULT_STROKE_VALUE = -1;
function initMDStackLayout() {
    if (!MDStackLayout) {
        if (isPostLollipopMR1()) {
            MDStackLayout = org.nativescript.widgets.StackLayout;
        } else {
            initializePreLollipopStackLayout();
            MDStackLayout = PreLollipopStackLayout as any;
        }
    }
}

interface PreLollipopStackLayout extends org.nativescript.widgets.StackLayout {
    // tslint:disable-next-line:no-misused-new
    new (context): PreLollipopStackLayout;
}
let PreLollipopStackLayout: PreLollipopStackLayout;

function initializePreLollipopStackLayout() {
    if (PreLollipopStackLayout) {
        return;
    }
    @NativeClass
    class PreLollipopStackLayoutImpl extends org.nativescript.widgets.StackLayout {
        constructor(context) {
            super(context);
            return global.__native(this);
        }
        private mForeground;

        private mSelfBounds = new android.graphics.Rect();

        private mOverlayBounds = new android.graphics.Rect();

        private mForegroundGravity = android.view.Gravity.FILL;

        protected mForegroundInPadding = true;

        mForegroundBoundsChanged = false;

        /**
         * Describes how the foreground is positioned.
         *
         * @return foreground gravity.
         * @see #setForegroundGravity(int)
         */
        getForegroundGravity() {
            return this.mForegroundGravity;
        }

        /**
         * Describes how the foreground is positioned. Defaults to START and TOP.
         *
         * @param foregroundGravity See {@link android.view.Gravity}
         * @see #getForegroundGravity()
         */
        setForegroundGravity(foregroundGravity) {
            if (this.mForegroundGravity !== foregroundGravity) {
                if ((foregroundGravity & android.view.Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK) === 0) {
                    foregroundGravity |= android.view.Gravity.START;
                }

                if ((foregroundGravity & android.view.Gravity.VERTICAL_GRAVITY_MASK) === 0) {
                    foregroundGravity |= android.view.Gravity.TOP;
                }

                this.mForegroundGravity = foregroundGravity;

                if (this.mForegroundGravity === android.view.Gravity.FILL && this.mForeground != null) {
                    const padding = new android.graphics.Rect();
                    this.mForeground.getPadding(padding);
                }

                this.requestLayout();
            }
        }

        verifyDrawable(who) {
            return super.verifyDrawable(who) || who === this.mForeground;
        }

        jumpDrawablesToCurrentState() {
            super.jumpDrawablesToCurrentState();
            if (this.mForeground != null) {
                this.mForeground.jumpToCurrentState();
            }
        }

        drawableStateChanged() {
            super.drawableStateChanged();
            if (this.mForeground != null && this.mForeground.isStateful()) {
                this.mForeground.setState(this.getDrawableState());
            }
        }

        /**
         * Supply a Drawable that is to be rendered on top of all of the child
         * views in the frame Utils.layout.  Any padding in the Drawable will be taken
         * into account by ensuring that the children are inset to be placed
         * inside of the padding area.
         *
         * @param drawable The Drawable to be drawn on top of the children.
         */
        setForeground(drawable) {
            if (this.mForeground !== drawable) {
                if (this.mForeground != null) {
                    this.mForeground.setCallback(null);
                    this.unscheduleDrawable(this.mForeground);
                }

                this.mForeground = drawable;

                if (drawable != null) {
                    this.setWillNotDraw(false);
                    drawable.setCallback(this);
                    if (drawable.isStateful()) {
                        drawable.setState(this.getDrawableState());
                    }
                    if (this.mForegroundGravity === android.view.Gravity.FILL) {
                        const padding = new android.graphics.Rect();
                        drawable.getPadding(padding);
                    }
                } else {
                    this.setWillNotDraw(true);
                }
                this.requestLayout();
                this.invalidate();
            }
        }

        /**
         * Returns the drawable used as the foreground of this FrameLayout. The
         * foreground drawable, if non-null, is always drawn on top of the children.
         *
         * @return A Drawable or null if no foreground was set.
         */
        getForeground() {
            return this.mForeground;
        }

        onLayout(changed: boolean, left, top, right, bottom) {
            super.onLayout(changed, left, top, right, bottom);
            this.mForegroundBoundsChanged = this.mForegroundBoundsChanged || changed;
        }

        onSizeChanged(w, h, oldw, oldh) {
            super.onSizeChanged(w, h, oldw, oldh);
            this.mForegroundBoundsChanged = true;
        }

        draw(canvas) {
            super.draw(canvas);

            if (this.mForeground != null) {
                const foreground = this.mForeground;

                if (this.mForegroundBoundsChanged) {
                    this.mForegroundBoundsChanged = false;
                    const selfBounds = this.mSelfBounds;
                    const overlayBounds = this.mOverlayBounds;

                    const w = this.getRight() - this.getLeft();
                    const h = this.getBottom() - this.getTop();

                    if (this.mForegroundInPadding) {
                        selfBounds.set(0, 0, w, h);
                    } else {
                        selfBounds.set(this.getPaddingLeft(), this.getPaddingTop(), w - this.getPaddingRight(), h - this.getPaddingBottom());
                    }

                    android.view.Gravity.apply(this.mForegroundGravity, foreground.getIntrinsicWidth(), foreground.getIntrinsicHeight(), selfBounds, overlayBounds);
                    foreground.setBounds(overlayBounds);
                }

                foreground.draw(canvas);
            }
        }

        drawableHotspotChanged(x, y) {
            super.drawableHotspotChanged(x, y);
            if (this.mForeground != null) {
                this.mForeground.setHotspot(x, y);
            }
        }
    }
    PreLollipopStackLayout = PreLollipopStackLayoutImpl as any;
}

export class Ripple extends RippleBase {
    nativeViewProtected: android.view.View;
    ripple: android.graphics.drawable.RippleDrawable;

    public createNativeView() {
        initMDStackLayout();
        const view = new MDStackLayout(this._context);
        this.setRippleDrawable(view); // set default ripple
        return view;
    }

    forceSetOnTouchListener = false;
    hasGestureObservers() {
        if (this.forceSetOnTouchListener) {
            return true;
        }
        return super.hasGestureObservers();
    }
    initNativeView() {
        // we need to force the touch listener even i there is no tap gesture.
        this.forceSetOnTouchListener = true;
        this.setOnTouchListener();
        this.forceSetOnTouchListener = false;
        this.nativeView.setClickable(false);
        super.initNativeView();
    }
    rippleDrawable: android.graphics.drawable.Drawable;
    getRippleColor() {
        return getRippleColor(this.style['rippleColor'] ? this.style['rippleColor'] : new Color(getAttrColor(this._context, 'colorControlHighlight')));
    }
    getCornerRadius() {
        return getRippleColor(this.style['rippleColor'] ? this.style['rippleColor'] : new Color(getAttrColor(this._context, 'colorControlHighlight')));
    }
    setRippleDrawable(view: android.view.View, radius = 0) {
        if (!this.rippleDrawable) {
            this.rippleDrawable = createRippleDrawable(view, this.getRippleColor(), radius);
            if (isPostMarshmallow()) {
                view.setForeground(this.rippleDrawable);
            }
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        this.setRippleDrawable(this.nativeViewProtected);
        if (isPostLollipopMR1()) {
            (this.rippleDrawable as android.graphics.drawable.RippleDrawable).setColor(android.content.res.ColorStateList.valueOf(color.android));
        } else {
            (this.rippleDrawable as any).rippleShape.getPaint().setColor(getRippleColor(color));
        }
        // }
    }

    [backgroundInternalProperty.setNative](value: android.graphics.drawable.Drawable | Background) {
        super[backgroundInternalProperty.setNative](value);
        if (this.nativeViewProtected) {
            if (value instanceof android.graphics.drawable.Drawable) {
            } else {
                this.rippleDrawable = null;
                this.setRippleDrawable(this.nativeViewProtected, value.borderTopLeftRadius);
            }
        }
    }
}
