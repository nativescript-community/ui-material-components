import ImageButton = android.widget.ImageButton;

declare module android {
	export module support {
		export module design {
			export module widget {
				export class CoordinatorLayout {
					public static class: java.lang.Class<android.support.design.widget.CoordinatorLayout>;
					public onNestedFling(param0: android.view.View, param1: number, param2: number, param3: boolean): boolean;
					public setStatusBarBackgroundResource(param0: number): void;
					public onDraw(param0: android.graphics.Canvas): void;
					public getDependencies(param0: android.view.View): java.util.List<android.view.View>;
					public dispatchDependentViewsChanged(param0: android.view.View): void;
					public onAttachedToWindow(): void;
					public getSuggestedMinimumWidth(): number;
					public onNestedPreFling(param0: android.view.View, param1: number, param2: number): boolean;
					public onTouchEvent(param0: android.view.MotionEvent): boolean;
					public onStopNestedScroll(param0: android.view.View, param1: number): void;
					public doViewsOverlap(param0: android.view.View, param1: android.view.View): boolean;
					public setVisibility(param0: number): void;
					public onNestedScrollAccepted(param0: android.view.View, param1: android.view.View, param2: number, param3: number): void;
					public drawableStateChanged(): void;
					public onNestedScrollAccepted(param0: android.view.View, param1: android.view.View, param2: number): void;
					public onInterceptTouchEvent(param0: android.view.MotionEvent): boolean;
					public onSaveInstanceState(): android.os.Parcelable;
					public onNestedPreScroll(param0: android.view.View, param1: number, param2: number, param3: native.Array<number>): void;
					public onMeasureChild(param0: android.view.View, param1: number, param2: number, param3: number, param4: number): void;
					public onStartNestedScroll(param0: android.view.View, param1: android.view.View, param2: number): boolean;
					public setStatusBarBackground(param0: android.graphics.drawable.Drawable): void;
					public onStartNestedScroll(param0: android.view.View, param1: android.view.View, param2: number, param3: number): boolean;
					public verifyDrawable(param0: android.graphics.drawable.Drawable): boolean;
					public onNestedScroll(param0: android.view.View, param1: number, param2: number, param3: number, param4: number): void;
					public requestDisallowInterceptTouchEvent(param0: boolean): void;
					public requestChildRectangleOnScreen(param0: android.view.View, param1: android.graphics.Rect, param2: boolean): boolean;
					public generateLayoutParams(param0: android.view.ViewGroup.LayoutParams): android.support.design.widget.CoordinatorLayout.LayoutParams;
					public setOnHierarchyChangeListener(param0: android.view.ViewGroup.OnHierarchyChangeListener): void;
					public generateDefaultLayoutParams(): android.support.design.widget.CoordinatorLayout.LayoutParams;
					public onStopNestedScroll(param0: android.view.View): void;
					public setFitsSystemWindows(param0: boolean): void;
					public getSuggestedMinimumHeight(): number;
					public onNestedScroll(param0: android.view.View, param1: number, param2: number, param3: number, param4: number, param5: number): void;
					public onDetachedFromWindow(): void;
					public onMeasure(param0: number, param1: number): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public onRestoreInstanceState(param0: android.os.Parcelable): void;
					public setStatusBarBackgroundColor(param0: number): void;
					public getStatusBarBackground(): android.graphics.drawable.Drawable;
					public onLayoutChild(param0: android.view.View, param1: number): void;
					public constructor(param0: android.content.Context);
					public onNestedPreScroll(param0: android.view.View, param1: number, param2: number, param3: native.Array<number>, param4: number): void;
					public getNestedScrollAxes(): number;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public drawChild(param0: android.graphics.Canvas, param1: android.view.View, param2: number): boolean;
					public checkLayoutParams(param0: android.view.ViewGroup.LayoutParams): boolean;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public getDependents(param0: android.view.View): java.util.List<android.view.View>;
					public generateLayoutParams(param0: android.util.AttributeSet): android.support.design.widget.CoordinatorLayout.LayoutParams;
					public isPointInChildBounds(param0: android.view.View, param1: number, param2: number): boolean;
				}
				export module CoordinatorLayout {
					export abstract class Behavior<V>  extends java.lang.Object {
						public static class: java.lang.Class<android.support.design.widget.CoordinatorLayout.Behavior<any>>;
						public getInsetDodgeRect(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.graphics.Rect): boolean;
						public onNestedPreScroll(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: number, param4: number, param5: native.Array<number>, param6: number): void;
						public onAttachedToLayoutParams(param0: android.support.design.widget.CoordinatorLayout.LayoutParams): void;
						public onNestedScrollAccepted(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: android.view.View, param4: number): void;
						public onDetachedFromLayoutParams(): void;
						public onTouchEvent(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.MotionEvent): boolean;
						public onStopNestedScroll(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: number): void;
						public onStopNestedScroll(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View): void;
						// public onApplyWindowInsets(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.support.v4.view.WindowInsetsCompat): android.support.v4.view.WindowInsetsCompat;
						public onRequestChildRectangleOnScreen(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.graphics.Rect, param3: boolean): boolean;
						public onNestedScrollAccepted(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: android.view.View, param4: number, param5: number): void;
						public constructor();
						public onDependentViewRemoved(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View): void;
						public onStartNestedScroll(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: android.view.View, param4: number): boolean;
						public onNestedScroll(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: number, param4: number, param5: number, param6: number, param7: number): void;
						public onMeasureChild(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: number, param3: number, param4: number, param5: number): boolean;
						public onNestedPreFling(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: number, param4: number): boolean;
						public getScrimOpacity(param0: android.support.design.widget.CoordinatorLayout, param1: V): number;
						public blocksInteractionBelow(param0: android.support.design.widget.CoordinatorLayout, param1: V): boolean;
						public onNestedScroll(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: number, param4: number, param5: number, param6: number): void;
						public static getTag(param0: android.view.View): any;
						public onSaveInstanceState(param0: android.support.design.widget.CoordinatorLayout, param1: V): android.os.Parcelable;
						public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
						public layoutDependsOn(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View): boolean;
						public onNestedPreScroll(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: number, param4: number, param5: native.Array<number>): void;
						public getScrimColor(param0: android.support.design.widget.CoordinatorLayout, param1: V): number;
						public static setTag(param0: android.view.View, param1: any): void;
						public onInterceptTouchEvent(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.MotionEvent): boolean;
						public onNestedFling(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: number, param4: number, param5: boolean): boolean;
						public onLayoutChild(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: number): boolean;
						public onDependentViewChanged(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View): boolean;
						public onStartNestedScroll(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.view.View, param3: android.view.View, param4: number, param5: number): boolean;
						public onRestoreInstanceState(param0: android.support.design.widget.CoordinatorLayout, param1: V, param2: android.os.Parcelable): void;
					}
					export class DefaultBehavior {
						public static class: java.lang.Class<android.support.design.widget.CoordinatorLayout.DefaultBehavior>;
						/**
						 * Constructs a new instance of the android.support.design.widget.CoordinatorLayout$DefaultBehavior interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							value(): java.lang.Class<any>;
						});
						public constructor();
						public value(): java.lang.Class<any>;
					}
					export class DispatchChangeEvent {
						public static class: java.lang.Class<android.support.design.widget.CoordinatorLayout.DispatchChangeEvent>;
						/**
						 * Constructs a new instance of the android.support.design.widget.CoordinatorLayout$DispatchChangeEvent interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
						});
						public constructor();
					}
					export class HierarchyChangeListener {
						public static class: java.lang.Class<android.support.design.widget.CoordinatorLayout.HierarchyChangeListener>;
						public onChildViewAdded(param0: android.view.View, param1: android.view.View): void;
						public onChildViewRemoved(param0: android.view.View, param1: android.view.View): void;
					}
					export class LayoutParams {
						public static class: java.lang.Class<android.support.design.widget.CoordinatorLayout.LayoutParams>;
						public gravity: number;
						public anchorGravity: number;
						public keyline: number;
						public insetEdge: number;
						public dodgeInsetEdges: number;
						public constructor(param0: android.view.ViewGroup.MarginLayoutParams);
						public constructor(param0: android.view.ViewGroup.LayoutParams);
						public constructor(param0: android.support.design.widget.CoordinatorLayout.LayoutParams);
						public getAnchorId(): number;
						public getBehavior(): android.support.design.widget.CoordinatorLayout.Behavior<any>;
						public setBehavior(param0: android.support.design.widget.CoordinatorLayout.Behavior<any>): void;
						public constructor(param0: number, param1: number);
						public setAnchorId(param0: number): void;
					}
					export class OnPreDrawListener {
						public static class: java.lang.Class<android.support.design.widget.CoordinatorLayout.OnPreDrawListener>;
						public onPreDraw(): boolean;
					}
					export class SavedState {
						public static class: java.lang.Class<android.support.design.widget.CoordinatorLayout.SavedState>;
						public static CREATOR: android.os.Parcelable.Creator<android.support.design.widget.CoordinatorLayout.SavedState>;
						public constructor(param0: android.os.Parcelable);
						public writeToParcel(param0: android.os.Parcel, param1: number): void;
						public constructor(param0: android.os.Parcel, param1: java.lang.ClassLoader);
					}
					export class ViewElevationComparator extends java.util.Comparator<android.view.View> {
						public static class: java.lang.Class<android.support.design.widget.CoordinatorLayout.ViewElevationComparator>;
						public compare(param0: android.view.View, param1: android.view.View): number;
					}
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module animation {
				export class AnimationUtils {
					public static class: java.lang.Class<android.support.design.animation.AnimationUtils>;
					public static LINEAR_INTERPOLATOR: android.animation.TimeInterpolator;
					public static FAST_OUT_SLOW_IN_INTERPOLATOR: android.animation.TimeInterpolator;
					public static FAST_OUT_LINEAR_IN_INTERPOLATOR: android.animation.TimeInterpolator;
					public static LINEAR_OUT_SLOW_IN_INTERPOLATOR: android.animation.TimeInterpolator;
					public static DECELERATE_INTERPOLATOR: android.animation.TimeInterpolator;
					public constructor();
					public static lerp(param0: number, param1: number, param2: number): number;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module animation {
				export class AnimatorSetCompat {
					public static class: java.lang.Class<android.support.design.animation.AnimatorSetCompat>;
					public constructor();
					public static playTogether(param0: android.animation.AnimatorSet, param1: java.util.List<android.animation.Animator>): void;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module animation {
				export class ArgbEvaluatorCompat extends android.animation.TypeEvaluator<java.lang.Integer> {
					public static class: java.lang.Class<android.support.design.animation.ArgbEvaluatorCompat>;
					public constructor();
					public static getInstance(): android.support.design.animation.ArgbEvaluatorCompat;
					public evaluate(param0: number, param1: java.lang.Integer, param2: java.lang.Integer): java.lang.Integer;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module animation {
				export class ChildrenAlphaProperty extends android.util.Property<android.view.ViewGroup,java.lang.Float> {
					public static class: java.lang.Class<android.support.design.animation.ChildrenAlphaProperty>;
					public static CHILDREN_ALPHA: android.util.Property<android.view.ViewGroup,java.lang.Float>;
					public set(param0: android.view.ViewGroup, param1: java.lang.Float): void;
					public get(param0: android.view.ViewGroup): java.lang.Float;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module animation {
				export class DrawableAlphaProperty extends android.util.Property<android.graphics.drawable.Drawable,java.lang.Integer> {
					public static class: java.lang.Class<android.support.design.animation.DrawableAlphaProperty>;
					public static DRAWABLE_ALPHA_COMPAT: android.util.Property<android.graphics.drawable.Drawable,java.lang.Integer>;
					public get(param0: android.graphics.drawable.Drawable): java.lang.Integer;
					public set(param0: android.graphics.drawable.Drawable, param1: java.lang.Integer): void;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module animation {
				export class ImageMatrixProperty extends android.util.Property<android.widget.ImageView,android.graphics.Matrix> {
					public static class: java.lang.Class<android.support.design.animation.ImageMatrixProperty>;
					public get(param0: android.widget.ImageView): android.graphics.Matrix;
					public constructor();
					public set(param0: android.widget.ImageView, param1: android.graphics.Matrix): void;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module animation {
				export class MatrixEvaluator extends android.animation.TypeEvaluator<android.graphics.Matrix> {
					public static class: java.lang.Class<android.support.design.animation.MatrixEvaluator>;
					public constructor();
					public evaluate(param0: number, param1: android.graphics.Matrix, param2: android.graphics.Matrix): android.graphics.Matrix;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module animation {
				export class MotionSpec {
					public static class: java.lang.Class<android.support.design.animation.MotionSpec>;
					public equals(param0: any): boolean;
					public toString(): string;
					public hasTiming(param0: string): boolean;
					public static createFromAttribute(param0: android.content.Context, param1: android.content.res.TypedArray, param2: number): android.support.design.animation.MotionSpec;
					public constructor();
					public setTiming(param0: string, param1: android.support.design.animation.MotionTiming): void;
					public getTotalDuration(): number;
					public getTiming(param0: string): android.support.design.animation.MotionTiming;
					public static createFromResource(param0: android.content.Context, param1: number): android.support.design.animation.MotionSpec;
					public hashCode(): number;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module animation {
				export class MotionTiming {
					public static class: java.lang.Class<android.support.design.animation.MotionTiming>;
					public equals(param0: any): boolean;
					public constructor(param0: number, param1: number, param2: android.animation.TimeInterpolator);
					public getDuration(): number;
					public toString(): string;
					public getInterpolator(): android.animation.TimeInterpolator;
					public getDelay(): number;
					public getRepeatCount(): number;
					public getRepeatMode(): number;
					public apply(param0: android.animation.Animator): void;
					public hashCode(): number;
					public constructor(param0: number, param1: number);
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module animation {
				export class Positioning {
					public static class: java.lang.Class<android.support.design.animation.Positioning>;
					public gravity: number;
					public xAdjustment: number;
					public yAdjustment: number;
					public constructor(param0: number, param1: number, param2: number);
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module widget {
				export class ShadowViewDelegate {
					public static class: java.lang.Class<android.support.design.widget.ShadowViewDelegate>;
					/**
					 * Constructs a new instance of the android.support.design.widget.ShadowViewDelegate interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						getRadius(): number;
						setShadowPadding(param0: number, param1: number, param2: number, param3: number): void;
						setBackgroundDrawable(param0: android.graphics.drawable.Drawable): void;
						isCompatPaddingEnabled(): boolean;
					});
					public constructor();
					public setBackgroundDrawable(param0: android.graphics.drawable.Drawable): void;
					public isCompatPaddingEnabled(): boolean;
					public setShadowPadding(param0: number, param1: number, param2: number, param3: number): void;
					public getRadius(): number;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module expandable {
				export class ExpandableTransformationWidget extends android.support.design.expandable.ExpandableWidget {
					public static class: java.lang.Class<android.support.design.expandable.ExpandableTransformationWidget>;
					/**
					 * Constructs a new instance of the android.support.design.expandable.ExpandableTransformationWidget interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						getExpandedComponentIdHint(): number;
						setExpandedComponentIdHint(param0: number): void;
						isExpanded(): boolean;
						setExpanded(param0: boolean): boolean;
					});
					public constructor();
					public isExpanded(): boolean;
					public setExpandedComponentIdHint(param0: number): void;
					public setExpanded(param0: boolean): boolean;
					public getExpandedComponentIdHint(): number;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module expandable {
				export class ExpandableWidget {
					public static class: java.lang.Class<android.support.design.expandable.ExpandableWidget>;
					/**
					 * Constructs a new instance of the android.support.design.expandable.ExpandableWidget interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						isExpanded(): boolean;
						setExpanded(param0: boolean): boolean;
					});
					public constructor();
					public isExpanded(): boolean;
					public setExpanded(param0: boolean): boolean;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module expandable {
				export class ExpandableWidgetHelper {
					public static class: java.lang.Class<android.support.design.expandable.ExpandableWidgetHelper>;
					public onRestoreInstanceState(param0: android.os.Bundle): void;
					public isExpanded(): boolean;
					public setExpandedComponentIdHint(param0: number): void;
					public setExpanded(param0: boolean): boolean;
					public constructor(param0: android.support.design.expandable.ExpandableWidget);
					public getExpandedComponentIdHint(): number;
					public onSaveInstanceState(): android.os.Bundle;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module widget {
				export class VisibilityAwareImageButton extends android.widget.ImageButton{
					public static class: java.lang.Class<android.support.design.widget.VisibilityAwareImageButton>;
					public getUserSetVisibility(): number;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public constructor(param0: android.content.Context);
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public setVisibility(param0: number): void;
					public internalSetVisibility(param0: number, param1: boolean): void;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module widget {
				export class FloatingActionButton extends android.support.design.widget.VisibilityAwareImageButton implements android.support.design.expandable.ExpandableTransformationWidget {
					public static class: java.lang.Class<android.support.design.widget.FloatingActionButton>;
					public static SIZE_MINI: number;
					public static SIZE_NORMAL: number;
					public static SIZE_AUTO: number;
					public static NO_CUSTOM_SIZE: number;
					public addOnHideAnimationListener(param0: android.animation.Animator.AnimatorListener): void;
					public isOrWillBeHidden(): boolean;
					public hide(param0: android.support.design.widget.FloatingActionButton.OnVisibilityChangedListener): void;
					public getCompatPressedTranslationZ(): number;
					public setCompatHoveredFocusedTranslationZ(param0: number): void;
					public isExpanded(): boolean;
					public addOnShowAnimationListener(param0: android.animation.Animator.AnimatorListener): void;
					public setExpanded(param0: boolean): boolean;
					public onAttachedToWindow(): void;
					public jumpDrawablesToCurrentState(): void;
					public getSize(): number;
					public setShowMotionSpecResource(param0: number): void;
					public setSupportBackgroundTintList(param0: android.content.res.ColorStateList): void;
					public getMeasuredContentRect(param0: android.graphics.Rect): void;
					public setCompatElevationResource(param0: number): void;
					public getRippleColor(): number;
					public isOrWillBeShown(): boolean;
					public setImageResource(param0: number): void;
					public getSupportBackgroundTintList(): android.content.res.ColorStateList;
					public setCustomSize(param0: number): void;
					public setBackgroundTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public onTouchEvent(param0: android.view.MotionEvent): boolean;
					public setRippleColor(param0: number): void;
					public show(): void;
					public setRippleColor(param0: android.content.res.ColorStateList): void;
					public getHideMotionSpec(): android.support.design.animation.MotionSpec;
					public removeOnHideAnimationListener(param0: android.animation.Animator.AnimatorListener): void;
					public setCompatHoveredFocusedTranslationZResource(param0: number): void;
					public setSupportImageTintList(param0: android.content.res.ColorStateList): void;
					public setBackgroundResource(param0: number): void;
					public hide(): void;
					public getRippleColorStateList(): android.content.res.ColorStateList;
					public getSupportBackgroundTintMode(): android.graphics.PorterDuff.Mode;
					public setImageDrawable(param0: android.graphics.drawable.Drawable): void;
					public drawableStateChanged(): void;
					public setHideMotionSpecResource(param0: number): void;
					public onSaveInstanceState(): android.os.Parcelable;
					public setCompatElevation(param0: number): void;
					public setSize(param0: number): void;
					public setUseCompatPadding(param0: boolean): void;
					public setShowMotionSpec(param0: android.support.design.animation.MotionSpec): void;
					public getSupportImageTintList(): android.content.res.ColorStateList;
					public setSupportImageTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public getCompatElevation(): number;
					public getContentBackground(): android.graphics.drawable.Drawable;
					public onDetachedFromWindow(): void;
					public onMeasure(param0: number, param1: number): void;
					public removeOnShowAnimationListener(param0: android.animation.Animator.AnimatorListener): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public setBackgroundDrawable(param0: android.graphics.drawable.Drawable): void;
					public getCustomSize(): number;
					public setExpandedComponentIdHint(param0: number): void;
					public onRestoreInstanceState(param0: android.os.Parcelable): void;
					public setCompatPressedTranslationZ(param0: number): void;
					public setBackgroundColor(param0: number): void;
					public getShowMotionSpec(): android.support.design.animation.MotionSpec;
					public setSupportBackgroundTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public show(param0: android.support.design.widget.FloatingActionButton.OnVisibilityChangedListener): void;
					public constructor(param0: android.content.Context);
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public getSupportImageTintMode(): android.graphics.PorterDuff.Mode;
					public setHideMotionSpec(param0: android.support.design.animation.MotionSpec): void;
					public getBackgroundTintList(): android.content.res.ColorStateList;
					public setCompatPressedTranslationZResource(param0: number): void;
					public getContentRect(param0: android.graphics.Rect): boolean;
					public setBackgroundTintList(param0: android.content.res.ColorStateList): void;
					public getBackgroundTintMode(): android.graphics.PorterDuff.Mode;
					public getExpandedComponentIdHint(): number;
					public getUseCompatPadding(): boolean;
					public getCompatHoveredFocusedTranslationZ(): number;
				}
				export module FloatingActionButton {
					export class BaseBehavior<T>  extends android.support.design.widget.CoordinatorLayout.Behavior<any> {
						public static class: java.lang.Class<android.support.design.widget.FloatingActionButton.BaseBehavior<any>>;
						public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
						public constructor();
						public setInternalAutoHideListener(param0: android.support.design.widget.FloatingActionButton.OnVisibilityChangedListener): void;
						public isAutoHideEnabled(): boolean;
						public onLayoutChild(param0: android.support.design.widget.CoordinatorLayout, param1: android.support.design.widget.FloatingActionButton, param2: number): boolean;
						public onAttachedToLayoutParams(param0: android.support.design.widget.CoordinatorLayout.LayoutParams): void;
						public getInsetDodgeRect(param0: android.support.design.widget.CoordinatorLayout, param1: android.support.design.widget.FloatingActionButton, param2: android.graphics.Rect): boolean;
						public setAutoHideEnabled(param0: boolean): void;
						public onDependentViewChanged(param0: android.support.design.widget.CoordinatorLayout, param1: android.support.design.widget.FloatingActionButton, param2: android.view.View): boolean;
					}
					export class Behavior extends android.support.design.widget.FloatingActionButton.BaseBehavior<android.support.design.widget.FloatingActionButton> {
						public static class: java.lang.Class<android.support.design.widget.FloatingActionButton.Behavior>;
						public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
						public constructor();
					}
					export abstract class OnVisibilityChangedListener {
						public static class: java.lang.Class<android.support.design.widget.FloatingActionButton.OnVisibilityChangedListener>;
						public constructor();
						public onHidden(param0: android.support.design.widget.FloatingActionButton): void;
						public onShown(param0: android.support.design.widget.FloatingActionButton): void;
					}
					export class ShadowDelegateImpl extends android.support.design.widget.ShadowViewDelegate {
						public static class: java.lang.Class<android.support.design.widget.FloatingActionButton.ShadowDelegateImpl>;
						public isCompatPaddingEnabled(): boolean;
						public getRadius(): number;
						public setBackgroundDrawable(param0: android.graphics.drawable.Drawable): void;
						public setShadowPadding(param0: number, param1: number, param2: number, param3: number): void;
					}
					export class Size {
						public static class: java.lang.Class<android.support.design.widget.FloatingActionButton.Size>;
						/**
						 * Constructs a new instance of the android.support.design.widget.FloatingActionButton$Size interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
						});
						public constructor();
					}
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module v7 {
			export module widget {
				export class AppCompatEditText extends android.widget.EditText {
					public static class: java.lang.Class<android.support.v7.widget.AppCompatEditText>;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public setSupportBackgroundTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public constructor(param0: android.content.Context);
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public setBackgroundDrawable(param0: android.graphics.drawable.Drawable): void;
					public setBackgroundResource(param0: number): void;
					public setTextAppearance(param0: android.content.Context, param1: number): void;
					public getSupportBackgroundTintMode(): android.graphics.PorterDuff.Mode;
					public drawableStateChanged(): void;
					public getSupportBackgroundTintList(): android.content.res.ColorStateList;
					public setSupportBackgroundTintList(param0: android.content.res.ColorStateList): void;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module widget {
				export class TextInputEditText extends	android.support.v7.widget.AppCompatEditText {
					public static class: java.lang.Class<android.support.design.widget.TextInputEditText>;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public constructor(param0: android.content.Context);
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public getHint(): string;
					public onCreateInputConnection(param0: android.view.inputmethod.EditorInfo): android.view.inputmethod.InputConnection;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module widget {
				export class TextInputLayout extends android.widget.LinearLayout {
					public static class: java.lang.Class<android.support.design.widget.TextInputLayout>;
					public static BOX_BACKGROUND_NONE: number;
					public static BOX_BACKGROUND_FILLED: number;
					public static BOX_BACKGROUND_OUTLINE: number;
					public setErrorEnabled(param0: boolean): void;
					public isPasswordVisibilityToggleEnabled(): boolean;
					public setHintEnabled(param0: boolean): void;
					public getBoxBackgroundColor(): number;
					public dispatchRestoreInstanceState(param0: android.util.SparseArray<android.os.Parcelable>): void;
					public isCounterEnabled(): boolean;
					public getHint(): string;
					public getTypeface(): android.graphics.Typeface;
					public getCounterMaxLength(): number;
					public getBoxStrokeColor(): number;
					public setTypeface(param0: android.graphics.Typeface): void;
					public setEnabled(param0: boolean): void;
					public setTextInputAccessibilityDelegate(param0: android.support.design.widget.TextInputLayout.AccessibilityDelegate): void;
					public getDefaultHintTextColor(): android.content.res.ColorStateList;
					public getBoxCornerRadiusTopEnd(): number;
					public dispatchProvideAutofillStructure(param0: any, param1: number): void;
					public isErrorEnabled(): boolean;
					public setErrorTextAppearance(param0: number): void;
					public isHintAnimationEnabled(): boolean;
					public setPasswordVisibilityToggleContentDescription(param0: string): void;
					public setHelperTextColor(param0: android.content.res.ColorStateList): void;
					public getError(): string;
					public getBoxCornerRadiusBottomEnd(): number;
					public getHelperText(): string;
					public setErrorTextColor(param0: android.content.res.ColorStateList): void;
					public getBoxCornerRadiusBottomStart(): number;
					public setCounterMaxLength(param0: number): void;
					public setPasswordVisibilityToggleContentDescription(param0: number): void;
					public getPasswordVisibilityToggleContentDescription(): string;
					public drawableStateChanged(): void;
					public setCounterEnabled(param0: boolean): void;
					public onSaveInstanceState(): android.os.Parcelable;
					public getBoxCornerRadiusTopStart(): number;
					public setDefaultHintTextColor(param0: android.content.res.ColorStateList): void;
					public setHelperTextEnabled(param0: boolean): void;
					public setBoxBackgroundColorResource(param0: number): void;
					public setPasswordVisibilityToggleEnabled(param0: boolean): void;
					// public addView(param0: android.view.View, param1: number, param2: android.view.ViewGroup.LayoutParams): void;
					public setPasswordVisibilityToggleTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public setBoxBackgroundColor(param0: number): void;
					public setHintAnimationEnabled(param0: boolean): void;
					public isHelperTextEnabled(): boolean;
					// public draw(param0: android.graphics.Canvas): void;
					public passwordVisibilityToggleRequested(param0: boolean): void;
					public onMeasure(param0: number, param1: number): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public setBoxCornerRadii(param0: number, param1: number, param2: number, param3: number): void;
					public setBoxBackgroundMode(param0: number): void;
					public onRestoreInstanceState(param0: android.os.Parcelable): void;
					public setHelperTextTextAppearance(param0: number): void;
					public setPasswordVisibilityToggleTintList(param0: android.content.res.ColorStateList): void;
					public setHintTextAppearance(param0: number): void;
					public isHintEnabled(): boolean;
					public setBoxCornerRadiiResources(param0: number, param1: number, param2: number, param3: number): void;
					public setHelperText(param0: string): void;
					public setBoxStrokeColor(param0: number): void;
					public getPasswordVisibilityToggleDrawable(): android.graphics.drawable.Drawable;
					public constructor(param0: android.content.Context);
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public getHelperTextCurrentTextColor(): number;
					public getEditText(): android.widget.EditText;
					public getErrorCurrentTextColors(): number;
					public setPasswordVisibilityToggleDrawable(param0: android.graphics.drawable.Drawable): void;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public setError(param0: string): void;
					public setPasswordVisibilityToggleDrawable(param0: number): void;
					public setHint(param0: string): void;
				}
				export module TextInputLayout {
					export class androidsupportdesignwidgetTextInputLayoutAccessibilityDelegate {
						public static class: java.lang.Class<android.support.design.widget.TextInputLayout.AccessibilityDelegate>;
						public onPopulateAccessibilityEvent(param0: android.view.View, param1: android.view.accessibility.AccessibilityEvent): void;
						public onInitializeAccessibilityNodeInfo(param0: android.view.View, param1: android.support.v4.view.accessibility.AccessibilityNodeInfoCompat): void;
						public constructor(param0: android.support.design.widget.TextInputLayout);
					}
					export type AccessibilityDelegate = androidsupportdesignwidgetTextInputLayoutAccessibilityDelegate
					export class BoxBackgroundMode {
						public static class: java.lang.Class<android.support.design.widget.TextInputLayout.BoxBackgroundMode>;
						/**
						 * Constructs a new instance of the android.support.design.widget.TextInputLayout$BoxBackgroundMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
						});
						public constructor();
					}
					export class SavedState {
						public static class: java.lang.Class<android.support.design.widget.TextInputLayout.SavedState>;
						public static CREATOR: android.os.Parcelable.Creator<android.support.design.widget.TextInputLayout.SavedState>;
						public writeToParcel(param0: android.os.Parcel, param1: number): void;
						public toString(): string;
					}
				}
			}
		}
	}
}


declare module android {
	export module support {
		export module v7 {
			export module widget {
				export class AppCompatButton extends android.widget.Button {
					public static class: java.lang.Class<android.support.v7.widget.AppCompatButton>;
					public onTextChanged(param0: string, param1: number, param2: number, param3: number): void;
					public getAutoSizeTextAvailableSizes(): native.Array<number>;
					public getAutoSizeStepGranularity(): number;
					public onInitializeAccessibilityEvent(param0: android.view.accessibility.AccessibilityEvent): void;
					public setAutoSizeTextTypeUniformWithPresetSizes(param0: native.Array<number>, param1: number): void;
					public setSupportBackgroundTintList(param0: android.content.res.ColorStateList): void;
					public getSupportBackgroundTintList(): android.content.res.ColorStateList;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public setBackgroundDrawable(param0: android.graphics.drawable.Drawable): void;
					public onInitializeAccessibilityNodeInfo(param0: android.view.accessibility.AccessibilityNodeInfo): void;
					public getAutoSizeTextType(): number;
					public setTextAppearance(param0: android.content.Context, param1: number): void;
					public setAutoSizeTextTypeWithDefaults(param0: number): void;
					// public setTextSize(param0: number, param1: number): void;
					public setSupportBackgroundTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public constructor(param0: android.content.Context);
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public getAutoSizeMaxTextSize(): number;
					public setBackgroundResource(param0: number): void;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public getSupportBackgroundTintMode(): android.graphics.PorterDuff.Mode;
					public drawableStateChanged(): void;
					public setSupportAllCaps(param0: boolean): void;
					public setAutoSizeTextTypeUniformWithConfiguration(param0: number, param1: number, param2: number, param3: number): void;
					public getAutoSizeMinTextSize(): number;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module button {
				export class MaterialButton extends android.support.v7.widget.AppCompatButton {
					public static class: java.lang.Class<android.support.design.button.MaterialButton>;
					public setButtonPadding(param0: number, param1: number, param2: number, param3: number): void;
					public getButtonPaddingBottom(): number;
					public setAdditionalPaddingEndForIcon(param0: number): void;
					public getCornerRadius(): number;
					public getAdditionalPaddingEndForIcon(): number;
					public getStrokeColor(): android.content.res.ColorStateList;
					public setSupportBackgroundTintList(param0: android.content.res.ColorStateList): void;
					public setStrokeColor(param0: android.content.res.ColorStateList): void;
					public getButtonPaddingStart(): number;
					public setIcon(param0: android.graphics.drawable.Drawable): void;
					public getSupportBackgroundTintList(): android.content.res.ColorStateList;
					public setBackgroundTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public getStrokeWidth(): number;
					public setIconTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public setRippleColor(param0: android.content.res.ColorStateList): void;
					public setCornerRadius(param0: number): void;
					public setIconPadding(param0: number): void;
					public getIconTint(): android.content.res.ColorStateList;
					public getRippleColor(): android.content.res.ColorStateList;
					public setAdditionalPaddingStartForIcon(param0: number): void;
					public setIconTint(param0: android.content.res.ColorStateList): void;
					public getIcon(): android.graphics.drawable.Drawable;
					public getIconTintMode(): android.graphics.PorterDuff.Mode;
					public setBackground(param0: android.graphics.drawable.Drawable): void;
					public setBackgroundResource(param0: number): void;
					public setRippleColorResource(param0: number): void;
					public getSupportBackgroundTintMode(): android.graphics.PorterDuff.Mode;
					public setStrokeWidth(param0: number): void;
					public getIconPadding(): number;
					public setIconResource(param0: number): void;
					public setIconSize(param0: number): void;
					public setStrokeWidthResource(param0: number): void;
					public setCornerRadiusResource(param0: number): void;
					// public draw(param0: android.graphics.Canvas): void;
					public getButtonPaddingEnd(): number;
					public setStrokeColorResource(param0: number): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public setIconTintResource(param0: number): void;
					public setBackgroundDrawable(param0: android.graphics.drawable.Drawable): void;
					public getAdditionalPaddingStartForIcon(): number;
					public setBackgroundColor(param0: number): void;
					public getButtonPaddingTop(): number;
					public setSupportBackgroundTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public constructor(param0: android.content.Context);
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public getBackgroundTintList(): android.content.res.ColorStateList;
					public getIconSize(): number;
					public setBackgroundTintList(param0: android.content.res.ColorStateList): void;
					public getBackgroundTintMode(): android.graphics.PorterDuff.Mode;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module button {
				export class MaterialButtonBackgroundDrawable {
					public static class: java.lang.Class<android.support.design.button.MaterialButtonBackgroundDrawable>;
					public setColorFilter(param0: android.graphics.ColorFilter): void;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module button {
				export class MaterialButtonHelper {
					public static class: java.lang.Class<android.support.design.button.MaterialButtonHelper>;
					public loadFromAttributes(param0: android.content.res.TypedArray): void;
					public constructor(param0: android.support.design.button.MaterialButton);
				}
			}
		}
	}
}
