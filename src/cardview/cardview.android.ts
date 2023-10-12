import { dynamicElevationOffsetProperty, elevationProperty, getRippleColor, rippleColorProperty, shapeProperty, themer } from '@nativescript-community/ui-material-core';
import { createStateListAnimator, getAttrColor, getColorStateList, isPostLollipop } from '@nativescript-community/ui-material-core/android/utils';
import { Color, Length, backgroundInternalProperty } from '@nativescript/core';
import { CardViewBase } from './cardview-common';

let MDCCardView: typeof com.google.android.material.card.MaterialCardView;

const DEFAULT_STROKE_VALUE = -1;
function initMDCCardView() {
    if (!MDCCardView) {
        // if (android.os.Build.VERSION.SDK_INT >= 23) {
        MDCCardView = com.google.android.material.card.MaterialCardView;
        // } else {
        //     initializePreLollipopCardView()
        //     MDCCardView = PreLollipopCardView as any
        // }
    }
}

// interface PreLollipopCardView extends com.google.android.material.card.MaterialCardView {
//     // tslint:disable-next-line:no-misused-new
//     new (context): PreLollipopCardView;
// }
// let PreLollipopCardView: PreLollipopCardView;

// function initializePreLollipopCardView() {
//     if (PreLollipopCardView) {
//         return;
//     }
//     class PreLollipopCardViewImpl extends com.google.android.material.card.MaterialCardView {
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
//          * views in the frame Utils.layout.  Any padding in the Drawable will be taken
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

interface ViewOutlineProvider extends android.view.ViewOutlineProvider {
    // tslint:disable-next-line:no-misused-new
    new (context): ViewOutlineProvider;
}
// eslint-disable-next-line no-redeclare
let ViewOutlineProvider: ViewOutlineProvider;

function initializeOutlineProvider() {
    if (ViewOutlineProvider) {
        return;
    }
    @NativeClass
    class OutlineProvider extends android.view.ViewOutlineProvider {
        constructor(private owner: WeakRef<CardView>) {
            super();
            return global.__native(this);
        }
        getOutline(view: android.view.View, outline: any) {
            const cardView = this.owner && this.owner.get();
            if (cardView) {
                outline.setRoundRect(0, 0, view.getWidth(), view.getHeight(), cardView._borderRadius - cardView._strokeWidth);
            }
        }
    }
    ViewOutlineProvider = OutlineProvider as any;
}

export class CardView extends CardViewBase {
    nativeViewProtected: com.google.android.material.card.MaterialCardView;

    // fgDrawable: android.graphics.drawable.GradientDrawable;
    // rippleDrawable: android.graphics.drawable.StateListDrawable | android.graphics.drawable.RippleDrawable;
    // rippleShape: android.graphics.drawable.ShapeDrawable;
    _strokeWidth = 0;
    _borderRadius = 0;

    getDefaultElevation(): number {
        if (isPostLollipop) {
            return 1; // 1dp @dimen/mtrl_card_elevation
        }
        return 0; // 1dp @dimen/mtrl_card_elevation
    }

    getDefaultDynamicElevationOffset(): number {
        if (isPostLollipop) {
            return 5; // 5dp @dimen/mtrl_card_dragged_z
        }

        return 0;
    }

    public createNativeView() {
        initMDCCardView();
        initializeOutlineProvider();
        const view = new MDCCardView(this._context);
        if (isPostLollipop) {
            createStateListAnimator(this, view);
        }
        view.setClickable(this.isUserInteractionEnabled);
        // view.setUseCompatPadding(true)
        // store the default radius
        // this._borderRadius = view.getRadius();

        // set the view outline
        // view.setClipToOutline(false);
        // const contentView = view.getChildAt(0) || view;
        // contentView.setClipToOutline(true);
        // contentView.setOutlineProvider(new ViewOutlineProvider(new WeakRef(this)));
        // this.createForegroundDrawable(view, this.style.borderWidth, this.style.borderColor as any);
        return view;
    }

    getCardRippleColor() {
        if (this.rippleColor) {
            return getRippleColor(this.rippleColor);
        }
        return getRippleColor(themer.getAccentColor());
    }
    // createForegroundDrawable(view: com.google.android.material.card.MaterialCardView, strokeWidth, strokeColor: Color) {
    //     this.fgDrawable = new android.graphics.drawable.GradientDrawable();
    //     const radius = view.getRadius();
    //     this.fgDrawable.setCornerRadius(radius);

    //     // In order to set a stroke, a size and color both need to be set. We default to a zero-width
    //     // width size, but won't set a default color. This prevents drawing a stroke that blends in with
    //     // the card but that could affect card spacing.
    //     if (strokeColor && strokeColor.android !== DEFAULT_STROKE_VALUE) {
    //         this.fgDrawable.setStroke(strokeWidth, strokeColor.android);
    //     }

    //     this.rippleDrawable = createRippleDrawable(view, this.getCardRippleColor(), radius);
    //     this.rippleShape = (this.rippleDrawable as any).rippleShape;

    //     const result = Array.create(android.graphics.drawable.Drawable, 2);
    //     result[0] = this.rippleDrawable;
    //     result[1] = this.fgDrawable;
    //     view.setForeground(new android.graphics.drawable.LayerDrawable(result));
    // }

    // updateBorderRadius(radius) {
    //     this._borderRadius = radius;
    //     this.fgDrawable.setCornerRadius(this._borderRadius); // for the foreground drawable
    //     const radii = Array.create('float', 8);
    //     java.util.Arrays.fill(radii, this._borderRadius);
    //     this.rippleShape.setShape(new android.graphics.drawable.shapes.RoundRectShape(radii, null, null)); // for the ripple drawable
    // }
    [backgroundInternalProperty.setNative](value: any) {
        if (this.nativeViewProtected) {
            if (value instanceof android.graphics.drawable.Drawable) {
                this.nativeViewProtected.setBackgroundDrawable(value);
            } else {
                if (this._strokeWidth !== value.borderTopWidth) {
                    this._strokeWidth = value.borderTopWidth;
                    this._strokeWidth = value.borderTopWidth;
                }
                this.nativeViewProtected.setStrokeWidth(this._strokeWidth);
                if (value.color) {
                    this.nativeViewProtected.setCardBackgroundColor(value.color.android);
                }
                if (value.borderTopColor && value.borderTopColor.android !== DEFAULT_STROKE_VALUE) {
                    this.nativeViewProtected.setStrokeColor(value.borderTopColor.android);
                    // this.fgDrawable.setStroke(this._strokeWidth, value.borderTopColor.android);
                }
                if (this._borderRadius !== value.borderTopLeftRadius) {
                    this._borderRadius = value.borderTopLeftRadius;
                    this.nativeViewProtected.setRadius(this._borderRadius);
                    // this.updateBorderRadius(value.borderTopLeftRadius);
                }
            }
        }
    }
    defaultAppearanceModel;
    [shapeProperty.setNative](shape: string) {
        const appearanceModel = themer.getShape(shape);
        if (!shape) {
            if (this.defaultAppearanceModel) {
                this.nativeViewProtected.setShapeAppearanceModel(this.defaultAppearanceModel);
            }
        } else {
            if (!this.defaultAppearanceModel) {
                this.defaultAppearanceModel = this.nativeViewProtected.getShapeAppearanceModel();
            }
            this.nativeViewProtected.setShapeAppearanceModel(appearanceModel);
        }
    }

    [elevationProperty.setNative](value: number) {
        if (!this.nativeViewProtected) {
            return;
        }
        if (isPostLollipop) {
            createStateListAnimator(this, this.nativeViewProtected);
        } else {
            const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
            androidx.core.view.ViewCompat.setElevation(this.nativeViewProtected, newValue);
        }
    }
    [dynamicElevationOffsetProperty.setNative](value: number) {
        if (!this.nativeViewProtected) {
            return;
        }
        if (isPostLollipop) {
            createStateListAnimator(this, this.nativeViewProtected);
        } else {
            const newValue = Length.toDevicePixels(typeof value === 'string' ? Length.parse(value) : value, 0);
            androidx.core.view.ViewCompat.setTranslationZ(this.nativeViewProtected, newValue);
        }
    }
    [rippleColorProperty.setNative](color: Color) {
        const rippleColor = color ? color.android : -1;
        // if (isPostLollipopMR1) {
        //     (this.rippleDrawable as android.graphics.drawable.RippleDrawable).setColor(getColorStateList(rippleColor));
        // } else {
        //     this.rippleShape.getPaint().setColor(rippleColor);
        // }
        (this.nativeViewProtected as any).setRippleColor(getColorStateList(rippleColor));
    }
}
