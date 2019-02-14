import { borderColorProperty, borderRadiusProperty, borderWidthProperty, CardViewBase, interactableProperty } from './cardview-common';
import { elevationProperty, rippleColorProperty } from 'nativescript-material-core/cssproperties';
import * as application from 'tns-core-modules/application/application';
import { Color, Length } from 'tns-core-modules/ui/page/page';
import { ad, layout } from 'tns-core-modules/utils/utils';
import { backgroundColorProperty, backgroundInternalProperty } from 'tns-core-modules/ui/core/view/view';

let MDCCardView: typeof android.support.design.card.MaterialCardView;
let BACKGROUND_DEFAULT_STATE_1: number[];
let BACKGROUND_DEFAULT_STATE_2: number[];
let BACKGROUND_SELECTED_STATE: number[];
let BACKGROUND_CHECKED_STATE: number[];
let BACKGROUND_FOCUSED_STATE: number[];
let BACKGROUND_DISABLED_STATE: number[];

function initMDCCardView() {
    if (!MDCCardView) {
        // if (android.os.Build.VERSION.SDK_INT >= 23) {
        MDCCardView = android.support.design.card.MaterialCardView;
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

// interface PreLollipopCardView extends android.support.design.card.MaterialCardView {
//     // tslint:disable-next-line:no-misused-new
//     new (context): PreLollipopCardView;
// }
// let PreLollipopCardView: PreLollipopCardView;

// function initializePreLollipopCardView() {
//     if (PreLollipopCardView) {
//         return;
//     }
//     class PreLollipopCardViewImpl extends android.support.design.card.MaterialCardView {
//         constructor(context) {
//             super(context);
//             return global.__native(this);
//         }
//         private mForeground;

//         private mSelfBounds = new android.graphics.Rect();

//         private mOverlayBounds = new android.graphics.Rect();

//         private mForegroundGravity = android.view.Gravity.FILL;

//         protected mForegroundInPadding = true;

//         mForegroundBoundsChanged = false;

//         /**
//          * Describes how the foreground is positioned.
//          *
//          * @return foreground gravity.
//          * @see #setForegroundGravity(int)
//          */
//         getForegroundGravity() {
//             return this.mForegroundGravity;
//         }

//         /**
//          * Describes how the foreground is positioned. Defaults to START and TOP.
//          *
//          * @param foregroundGravity See {@link android.view.Gravity}
//          * @see #getForegroundGravity()
//          */
//         setForegroundGravity(foregroundGravity) {
//             if (this.mForegroundGravity !== foregroundGravity) {
//                 if ((foregroundGravity & android.view.Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK) === 0) {
//                     foregroundGravity |= android.view.Gravity.START;
//                 }

//                 if ((foregroundGravity & android.view.Gravity.VERTICAL_GRAVITY_MASK) === 0) {
//                     foregroundGravity |= android.view.Gravity.TOP;
//                 }

//                 this.mForegroundGravity = foregroundGravity;

//                 if (this.mForegroundGravity === android.view.Gravity.FILL && this.mForeground != null) {
//                     const padding = new android.graphics.Rect();
//                     this.mForeground.getPadding(padding);
//                 }

//                 this.requestLayout();
//             }
//         }

//         verifyDrawable(who) {
//             return super.verifyDrawable(who) || who === this.mForeground;
//         }

//         jumpDrawablesToCurrentState() {
//             super.jumpDrawablesToCurrentState();
//             if (this.mForeground != null) {
//                 this.mForeground.jumpToCurrentState();
//             }
//         }

//         drawableStateChanged() {
//             super.drawableStateChanged();
//             if (this.mForeground != null && this.mForeground.isStateful()) {
//                 this.mForeground.setState(this.getDrawableState());
//             }
//         }

//         /**
//          * Supply a Drawable that is to be rendered on top of all of the child
//          * views in the frame layout.  Any padding in the Drawable will be taken
//          * into account by ensuring that the children are inset to be placed
//          * inside of the padding area.
//          *
//          * @param drawable The Drawable to be drawn on top of the children.
//          */
//         setForeground(drawable) {
//             if (this.mForeground !== drawable) {
//                 if (this.mForeground != null) {
//                     this.mForeground.setCallback(null);
//                     this.unscheduleDrawable(this.mForeground);
//                 }

//                 this.mForeground = drawable;

//                 if (drawable != null) {
//                     this.setWillNotDraw(false);
//                     drawable.setCallback(this);
//                     if (drawable.isStateful()) {
//                         drawable.setState(this.getDrawableState());
//                     }
//                     if (this.mForegroundGravity === android.view.Gravity.FILL) {
//                         const padding = new android.graphics.Rect();
//                         drawable.getPadding(padding);
//                     }
//                 } else {
//                     this.setWillNotDraw(true);
//                 }
//                 this.requestLayout();
//                 this.invalidate();
//             }
//         }

//         /**
//          * Returns the drawable used as the foreground of this FrameLayout. The
//          * foreground drawable, if non-null, is always drawn on top of the children.
//          *
//          * @return A Drawable or null if no foreground was set.
//          */
//         getForeground() {
//             return this.mForeground;
//         }

//         onLayout(changed: boolean, left, top, right, bottom) {
//             super.onLayout(changed, left, top, right, bottom);
//             this.mForegroundBoundsChanged = this.mForegroundBoundsChanged || changed;
//         }

//         onSizeChanged(w, h, oldw, oldh) {
//             super.onSizeChanged(w, h, oldw, oldh);
//             this.mForegroundBoundsChanged = true;
//         }

//         draw(canvas) {
//             super.draw(canvas);

//             if (this.mForeground != null) {
//                 const foreground = this.mForeground;

//                 if (this.mForegroundBoundsChanged) {
//                     this.mForegroundBoundsChanged = false;
//                     const selfBounds = this.mSelfBounds;
//                     const overlayBounds = this.mOverlayBounds;

//                     const w = this.getRight() - this.getLeft();
//                     const h = this.getBottom() - this.getTop();

//                     if (this.mForegroundInPadding) {
//                         selfBounds.set(0, 0, w, h);
//                     } else {
//                         selfBounds.set(this.getPaddingLeft(), this.getPaddingTop(), w - this.getPaddingRight(), h - this.getPaddingBottom());
//                     }

//                     android.view.Gravity.apply(this.mForegroundGravity, foreground.getIntrinsicWidth(), foreground.getIntrinsicHeight(), selfBounds, overlayBounds);
//                     foreground.setBounds(overlayBounds);
//                 }

//                 foreground.draw(canvas);
//             }
//         }

//         drawableHotspotChanged(x, y) {
//             super.drawableHotspotChanged(x, y);
//             if (this.mForeground != null) {
//                 this.mForeground.setHotspot(x, y);
//             }
//         }
//     }
//     PreLollipopCardView = PreLollipopCardViewImpl as any;
// }

export class CardView extends CardViewBase {
    nativeViewProtected: android.support.design.card.MaterialCardView;

    get android(): android.support.design.card.MaterialCardView {
        return this.nativeView;
    }
    private getSelectedItemDrawable(context: android.content.Context) {
        const ta = this._context.obtainStyledAttributes([ad.resources.getId(':attr/selectableItemBackground')]);
        const selectedItemDrawable = ta.getDrawable(0);
        ta.recycle();
        return selectedItemDrawable;
    }

    private createRoundRectShape() {
        const radius = this.borderRadius;
        const radii = Array.create('float', 8);
        for (let index = 0; index < 8; index++) {
            radii[index] = radius;
        }
        return new android.graphics.drawable.shapes.RoundRectShape(radii, null, null);
    }
    private createForegroundShapeDrawable() {
        const shape = this.createRoundRectShape();
        return new android.graphics.drawable.ShapeDrawable(shape);
    }
    // private createCompatRippleDrawable(rippleColor) {
    //     const rippleDrawable = new android.graphics.drawable.StateListDrawable()
    //     const foregroundShape = this.createForegroundShapeDrawable()
    //     foregroundShape.getPaint().setColor(rippleColor)
    //     rippleDrawable.addState([android.R.attr.state_pressed], foregroundShape)
    //     return rippleDrawable
    // }
    private createStateListAnimator(view: android.view.View) {
        const elevation = android.support.v4.view.ViewCompat.getElevation(view);
        const translationZ = android.support.v4.view.ViewCompat.getTranslationZ(view);
        const elevationSelected = elevation * 2; // for now to be the same as iOS
        const translationSelectedZ = translationZ + 6;
        const animationDuration = 100;
        const listAnimator = new android.animation.StateListAnimator();
        let animators = new java.util.ArrayList<android.animation.Animator>();
        let set = new android.animation.AnimatorSet();
        let animator = android.animation.ObjectAnimator.ofFloat(view, 'translationZ', [translationSelectedZ]);
        animators.add(animator);
        animator = android.animation.ObjectAnimator.ofFloat(view, 'elevation', [elevationSelected]);
        // animator.setDuration(0)
        animators.add(animator);
        set.playTogether(animators);
        set.setDuration(animationDuration);
        listAnimator.addState(BACKGROUND_SELECTED_STATE, set);

        animators.clear();
        set = new android.animation.AnimatorSet();
        animator = android.animation.ObjectAnimator.ofFloat(view, 'translationZ', [translationSelectedZ]);
        // animator.setDuration(animationDuration)
        animators.add(animator);
        animator = android.animation.ObjectAnimator.ofFloat(view, 'elevation', [elevationSelected]);
        // animator.setDuration(0)
        animators.add(animator);
        set.playTogether(animators);
        set.setDuration(animationDuration);
        listAnimator.addState(BACKGROUND_FOCUSED_STATE, set);

        animators.clear();
        set = new android.animation.AnimatorSet();
        animator = android.animation.ObjectAnimator.ofFloat(view, 'translationZ', [translationZ]);
        // animator.setDuration(animationDuration)
        // animator.setStartDelay(animationDuration)
        animators.add(animator);
        animator = android.animation.ObjectAnimator.ofFloat(view, 'elevation', [elevation]);
        // animator.setDuration(0)
        animators.add(animator);
        set.playTogether(animators);
        set.setDuration(animationDuration);
        set.setStartDelay(animationDuration);
        listAnimator.addState(BACKGROUND_DEFAULT_STATE_2, set);

        animators.clear();
        set = new android.animation.AnimatorSet();
        animator = android.animation.ObjectAnimator.ofFloat(view, 'translationZ', [translationZ]);
        // animator.setDuration(0)
        animators.add(animator);
        animator = android.animation.ObjectAnimator.ofFloat(view, 'elevation', [elevation]);
        animator.setDuration(0);
        animators.add(animator);
        set.playTogether(animators);
        set.setDuration(animationDuration);
        set.setStartDelay(animationDuration);
        listAnimator.addState([], set);

        view.setStateListAnimator(listAnimator);
    }

    public createNativeView() {
        initMDCCardView();
        // const newContext = new android.view.ContextThemeWrapper(this._context, ad.resources.getId('@style/Widget.MaterialComponents.CardView'));
        const view = new MDCCardView(this._context);
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            this.createStateListAnimator(view);
        }
        view.setClickable(true); // Give it same default as iOS
        this.setRippleDrawable(view);
        return view;
    }

    setRippleDrawable(view) {
        if (android.os.Build.VERSION.SDK_INT >= 23) {
            const currentDrawable = view.getForeground();
            const rippleDrawable = this.getSelectedItemDrawable(this._context);
            const drawableArray = Array.create(android.graphics.drawable.Drawable, 2);
            drawableArray[0] = rippleDrawable;
            drawableArray[1] = currentDrawable;
            const newForeground = new android.graphics.drawable.LayerDrawable(drawableArray);
            view.setForeground(newForeground);
        } else {
            //       view.setBackground(
            //         this.createCompatRippleDrawable(
            //           this.getRippleColor(this.style["rippleColor"] || 'red')
            //         )
            //       );
        }
    }

    [backgroundColorProperty.setNative](value: Color) {
        try {
            this.nativeView.setCardBackgroundColor(value !== undefined ? value.android : new Color('#FFFFFF').android);
        } catch (error) {
            // do nothing, catch bad color value
            console.log('nativescript-material-cardview --- invalid background-color value:', error);
        }
    }

    [backgroundInternalProperty.setNative](value: any) {
        if (value) {
            try {
                this.nativeView.setCardBackgroundColor(new Color(value.color !== undefined ? value.color + '' : '#FFFFFF').android);
            } catch (error) {
                // do nothing, catch bad color value
                console.log('nativescript-material-cardview --- invalid background-color value:', error);
            }
        }
    }

    [borderColorProperty.setNative](value: Color) {
        this.nativeViewProtected.setStrokeColor(value !== undefined ? value.android : new Color('#FFFFFF').android);
        this.setRippleDrawable(this.nativeViewProtected);
    }

    [borderColorProperty.getDefault](): Color {
        return new Color(this.nativeViewProtected.getStrokeColor());
    }

    [borderRadiusProperty.setNative](value: number) {
        this.nativeViewProtected.setRadius(layout.toDevicePixels(value));
        this.setRippleDrawable(this.nativeViewProtected);
    }

    [borderRadiusProperty.getDefault](): number {
        return layout.toDeviceIndependentPixels(this.nativeViewProtected.getRadius());
    }

    [borderWidthProperty.setNative](value: number) {
        this.nativeViewProtected.setStrokeWidth(layout.toDevicePixels(value));
        this.setRippleDrawable(this.nativeViewProtected);
    }

    [borderWidthProperty.getDefault](): number {
        return layout.toDeviceIndependentPixels(this.nativeViewProtected.getStrokeWidth());
    }

    [elevationProperty.setNative](value: number) {
        android.support.v4.view.ViewCompat.setElevation(this.nativeViewProtected, value);
    }

    [elevationProperty.getDefault](): number {
        return android.support.v4.view.ViewCompat.getElevation(this.nativeViewProtected);
    }

    [interactableProperty.setNative](value: boolean) {
        this.nativeViewProtected.setClickable(value);
    }

    [interactableProperty.getDefault]() {
        this.nativeViewProtected.isClickable();
    }

    [rippleColorProperty.setNative](color: Color) {
        if (android.os.Build.VERSION.SDK_INT >= 23) {
            (this.nativeViewProtected.getForeground() as any).setColor(android.content.res.ColorStateList.valueOf(color.android));
        } else {
            this.setRippleDrawable(this.nativeViewProtected);
        }
    }
}
