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


declare module android {
	export module support {
		export module design {
			export module card {
				export class MaterialCardView extends android.widget.FrameLayout {
					public static class: java.lang.Class<android.support.design.card.MaterialCardView>;
					public getStrokeWidth(): number;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public constructor(param0: android.content.Context);
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public setRadius(param0: number): void;
					public getRadius(): number;
					public setStrokeColor(param0: number): void;
					public getStrokeColor(): number;
					public setStrokeWidth(param0: number): void;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module card {
				export class MaterialCardViewHelper {
					public static class: java.lang.Class<android.support.design.card.MaterialCardViewHelper>;
					public constructor(param0: android.support.design.card.MaterialCardView);
					public loadFromAttributes(param0: android.content.res.TypedArray): void;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module resources {
				export class TextAppearance {
					public static class: java.lang.Class<android.support.design.resources.TextAppearance>;
					public textSize: number;
					public textColor: android.content.res.ColorStateList;
					public textColorHint: android.content.res.ColorStateList;
					public textColorLink: android.content.res.ColorStateList;
					public textStyle: number;
					public typeface: number;
					public fontFamily: string;
					public textAllCaps: boolean;
					public shadowColor: android.content.res.ColorStateList;
					public shadowDx: number;
					public shadowDy: number;
					public shadowRadius: number;
					public constructor(param0: android.content.Context, param1: number);
					public getFont(param0: android.content.Context): android.graphics.Typeface;
					public updateDrawState(param0: android.content.Context, param1: android.text.TextPaint): void;
					public updateMeasureState(param0: android.content.Context, param1: android.text.TextPaint): void;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module chip {
				export class Chip implements android.support.design.chip.ChipDrawable.Delegate {
					public static class: java.lang.Class<android.support.design.chip.Chip>;
					public getTextAppearance(): android.support.design.resources.TextAppearance;
					public setChipStrokeColorResource(param0: number): void;
					public getCloseIconContentDescription(): string;
					public setCloseIconEnabledResource(param0: number): void;
					public setShowMotionSpecResource(param0: number): void;
					public getCloseIconSize(): number;
					public setChipStrokeColor(param0: android.content.res.ColorStateList): void;
					public setCloseIconResource(param0: number): void;
					public setCloseIcon(param0: android.graphics.drawable.Drawable): void;
					public setCheckable(param0: boolean): void;
					public isCloseIconEnabled(): boolean;
					public setChipStrokeWidthResource(param0: number): void;
					public setChecked(param0: boolean): void;
					public setBackgroundTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public onTouchEvent(param0: android.view.MotionEvent): boolean;
					public setCompoundDrawablesWithIntrinsicBounds(param0: number, param1: number, param2: number, param3: number): void;
					public setChipEndPaddingResource(param0: number): void;
					public setEllipsize(param0: android.text.TextUtils.TruncateAt): void;
					public setRippleColor(param0: android.content.res.ColorStateList): void;
					public getEllipsize(): android.text.TextUtils.TruncateAt;
					public getCloseIconTint(): android.content.res.ColorStateList;
					public setTextAppearanceResource(param0: number): void;
					public setCompoundDrawablesRelative(param0: android.graphics.drawable.Drawable, param1: android.graphics.drawable.Drawable, param2: android.graphics.drawable.Drawable, param3: android.graphics.drawable.Drawable): void;
					public getChipText(): string;
					public setCompoundDrawables(param0: android.graphics.drawable.Drawable, param1: android.graphics.drawable.Drawable, param2: android.graphics.drawable.Drawable, param3: android.graphics.drawable.Drawable): void;
					public setTextEndPaddingResource(param0: number): void;
					public getIconEndPadding(): number;
					public setChipIconSizeResource(param0: number): void;
					public setCloseIconTintResource(param0: number): void;
					public setBackgroundResource(param0: number): void;
					public setRippleColorResource(param0: number): void;
					public setCloseIconTint(param0: android.content.res.ColorStateList): void;
					public setHideMotionSpecResource(param0: number): void;
					public setLines(param0: number): void;
					public onKeyDown(param0: number, param1: android.view.KeyEvent): boolean;
					public setChipBackgroundColor(param0: android.content.res.ColorStateList): void;
					public setCloseIconEnabled(param0: boolean): void;
					public getTextStartPadding(): number;
					public dispatchKeyEvent(param0: android.view.KeyEvent): boolean;
					public setIconEndPaddingResource(param0: number): void;
					public setChipIconSize(param0: number): void;
					public isCheckable(): boolean;
					public setChipIconEnabledResource(param0: number): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public getChipCornerRadius(): number;
					public setChipCornerRadiusResource(param0: number): void;
					public setChipIcon(param0: android.graphics.drawable.Drawable): void;
					public setIconStartPadding(param0: number): void;
					public setChipMinHeightResource(param0: number): void;
					public getChipStrokeWidth(): number;
					public setTextStartPadding(param0: number): void;
					public constructor(param0: android.content.Context);
					public getChipMinHeight(): number;
					public setCloseIconSize(param0: number): void;
					public setHideMotionSpec(param0: android.support.design.animation.MotionSpec): void;
					public setChipIconEnabled(param0: boolean): void;
					public setBackgroundTintList(param0: android.content.res.ColorStateList): void;
					public setChipStrokeWidth(param0: number): void;
					public getChipStrokeColor(): android.content.res.ColorStateList;
					public setCloseIconStartPadding(param0: number): void;
					public setChipDrawable(param0: android.support.design.chip.ChipDrawable): void;
					public onHoverEvent(param0: android.view.MotionEvent): boolean;
					public setCheckedIcon(param0: android.graphics.drawable.Drawable): void;
					public onChipDrawableSizeChange(): void;
					public setTextAppearance(param0: android.support.design.resources.TextAppearance): void;
					public getCloseIconEndPadding(): number;
					public setCheckedIconResource(param0: number): void;
					public getChipDrawable(): android.graphics.drawable.Drawable;
					public setCloseIconContentDescription(param0: string): void;
					public setTextStartPaddingResource(param0: number): void;
					public getChipIcon(): android.graphics.drawable.Drawable;
					public getRippleColor(): android.content.res.ColorStateList;
					public getHideMotionSpec(): android.support.design.animation.MotionSpec;
					public performCloseIconClick(): boolean;
					public setCheckedIconEnabledResource(param0: number): void;
					public setBackground(param0: android.graphics.drawable.Drawable): void;
					public setMaxLines(param0: number): void;
					public getChipBackgroundColor(): android.content.res.ColorStateList;
					public setCompoundDrawablesWithIntrinsicBounds(param0: android.graphics.drawable.Drawable, param1: android.graphics.drawable.Drawable, param2: android.graphics.drawable.Drawable, param3: android.graphics.drawable.Drawable): void;
					public isChipIconEnabled(): boolean;
					public drawableStateChanged(): void;
					public onFocusChanged(param0: boolean, param1: number, param2: android.graphics.Rect): void;
					public getCloseIconStartPadding(): number;
					public getCheckedIcon(): android.graphics.drawable.Drawable;
					public onResolvePointerIcon(param0: android.view.MotionEvent, param1: number): any;
					public dispatchHoverEvent(param0: android.view.MotionEvent): boolean;
					public setChipStartPadding(param0: number): void;
					public isCheckedIconEnabled(): boolean;
					public setCloseIconStartPaddingResource(param0: number): void;
					public setMinLines(param0: number): void;
					public getChipEndPadding(): number;
					public getIconStartPadding(): number;
					public setShowMotionSpec(param0: android.support.design.animation.MotionSpec): void;
					public setChipMinHeight(param0: number): void;
					public setTextEndPadding(param0: number): void;
					public onCreateDrawableState(param0: number): native.Array<number>;
					public setChipBackgroundColorResource(param0: number): void;
					public setCheckableResource(param0: number): void;
					public setCloseIconEndPaddingResource(param0: number): void;
					public setIconStartPaddingResource(param0: number): void;
					public setBackgroundDrawable(param0: android.graphics.drawable.Drawable): void;
					public setCompoundDrawablesRelativeWithIntrinsicBounds(param0: android.graphics.drawable.Drawable, param1: android.graphics.drawable.Drawable, param2: android.graphics.drawable.Drawable, param3: android.graphics.drawable.Drawable): void;
					public setChipText(param0: string): void;
					public getCloseIcon(): android.graphics.drawable.Drawable;
					public getFocusedRect(param0: android.graphics.Rect): void;
					public setChipEndPadding(param0: number): void;
					public setBackgroundColor(param0: number): void;
					public getChipIconSize(): number;
					public setCheckedIconEnabled(param0: boolean): void;
					public getChipStartPadding(): number;
					public setChipIconResource(param0: number): void;
					public setCloseIconSizeResource(param0: number): void;
					public getShowMotionSpec(): android.support.design.animation.MotionSpec;
					public setIconEndPadding(param0: number): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public setChipStartPaddingResource(param0: number): void;
					public setChipCornerRadius(param0: number): void;
					public setCompoundDrawablesRelativeWithIntrinsicBounds(param0: number, param1: number, param2: number, param3: number): void;
					public setOnCloseIconClickListener(param0: android.view.View.OnClickListener): void;
					public setSingleLine(param0: boolean): void;
					public setChipTextResource(param0: number): void;
					public setCloseIconEndPadding(param0: number): void;
					public getTextEndPadding(): number;
				}
				export module Chip {
					export class ChipTouchHelper {
						public static class: java.lang.Class<android.support.design.chip.Chip.ChipTouchHelper>;
						public getVirtualViewAt(param0: number, param1: number): number;
						public onPopulateNodeForHost(param0: android.support.v4.view.accessibility.AccessibilityNodeInfoCompat): void;
						public onPerformActionForVirtualView(param0: number, param1: number, param2: android.os.Bundle): boolean;
						public getVisibleVirtualViews(param0: java.util.List<java.lang.Integer>): void;
						public onPopulateNodeForVirtualView(param0: number, param1: android.support.v4.view.accessibility.AccessibilityNodeInfoCompat): void;
					}
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module chip {
				export class ChipDrawable {
					public static class: java.lang.Class<android.support.design.chip.ChipDrawable>;
					public getTextAppearance(): android.support.design.resources.TextAppearance;
					public setChipStrokeColorResource(param0: number): void;
					public getCloseIconContentDescription(): string;
					public setTintMode(param0: android.graphics.PorterDuff.Mode): void;
					public setCloseIconEnabledResource(param0: number): void;
					public setShowMotionSpecResource(param0: number): void;
					public getCloseIconSize(): number;
					public setChipStrokeColor(param0: android.content.res.ColorStateList): void;
					public setCloseIconResource(param0: number): void;
					public setText(param0: string): void;
					public setCloseIcon(param0: android.graphics.drawable.Drawable): void;
					public setCheckable(param0: boolean): void;
					public isCloseIconEnabled(): boolean;
					public setChipStrokeWidthResource(param0: number): void;
					public getOpacity(): number;
					public setChipEndPaddingResource(param0: number): void;
					public setRippleColor(param0: android.content.res.ColorStateList): void;
					public setEllipsize(param0: android.text.TextUtils.TruncateAt): void;
					public getEllipsize(): android.text.TextUtils.TruncateAt;
					public getCloseIconTint(): android.content.res.ColorStateList;
					public setAlpha(param0: number): void;
					public setTextAppearanceResource(param0: number): void;
					public setTextEndPaddingResource(param0: number): void;
					public getIconEndPadding(): number;
					public setChipIconSizeResource(param0: number): void;
					public setCloseIconTintResource(param0: number): void;
					public isCloseIconStateful(): boolean;
					public setRippleColorResource(param0: number): void;
					public onSizeChange(): void;
					public setCloseIconTint(param0: android.content.res.ColorStateList): void;
					public setHideMotionSpecResource(param0: number): void;
					public setTextResource(param0: number): void;
					public onStateChange(param0: native.Array<number>): boolean;
					public isStateful(): boolean;
					public setChipBackgroundColor(param0: android.content.res.ColorStateList): void;
					public setCloseIconEnabled(param0: boolean): void;
					public getTextStartPadding(): number;
					public setIconEndPaddingResource(param0: number): void;
					public setCloseIconState(param0: native.Array<number>): boolean;
					public setChipIconSize(param0: number): void;
					public setDelegate(param0: android.support.design.chip.ChipDrawable.Delegate): void;
					public isCheckable(): boolean;
					public setChipIconEnabledResource(param0: number): void;
					public getChipCornerRadius(): number;
					public setChipCornerRadiusResource(param0: number): void;
					public setChipIcon(param0: android.graphics.drawable.Drawable): void;
					public getIntrinsicHeight(): number;
					public setIconStartPadding(param0: number): void;
					public setChipMinHeightResource(param0: number): void;
					public getChipStrokeWidth(): number;
					public setTextStartPadding(param0: number): void;
					public getChipMinHeight(): number;
					public setCloseIconSize(param0: number): void;
					public setHideMotionSpec(param0: android.support.design.animation.MotionSpec): void;
					public setChipIconEnabled(param0: boolean): void;
					public getUseCompatRipple(): boolean;
					public setChipStrokeWidth(param0: number): void;
					public getChipStrokeColor(): android.content.res.ColorStateList;
					public getCloseIconTouchBounds(param0: android.graphics.RectF): void;
					public setCloseIconStartPadding(param0: number): void;
					public setCheckedIcon(param0: android.graphics.drawable.Drawable): void;
					public getIntrinsicWidth(): number;
					public setColorFilter(param0: android.graphics.ColorFilter): void;
					public setTextAppearance(param0: android.support.design.resources.TextAppearance): void;
					public getCloseIconEndPadding(): number;
					public setCheckedIconResource(param0: number): void;
					public setCloseIconContentDescription(param0: string): void;
					public getAlpha(): number;
					public getColorFilter(): android.graphics.ColorFilter;
					public setTextStartPaddingResource(param0: number): void;
					public getCloseIconState(): native.Array<number>;
					public getText(): string;
					public getChipIcon(): android.graphics.drawable.Drawable;
					public getRippleColor(): android.content.res.ColorStateList;
					public getHideMotionSpec(): android.support.design.animation.MotionSpec;
					public setCheckedIconEnabledResource(param0: number): void;
					public getOutline(param0: any): void;
					public setVisible(param0: boolean, param1: boolean): boolean;
					public getChipBackgroundColor(): android.content.res.ColorStateList;
					public isChipIconEnabled(): boolean;
					public getChipTouchBounds(param0: android.graphics.RectF): void;
					public setUseCompatRipple(param0: boolean): void;
					public unscheduleDrawable(param0: android.graphics.drawable.Drawable, param1: java.lang.Runnable): void;
					public getCloseIconStartPadding(): number;
					public getCheckedIcon(): android.graphics.drawable.Drawable;
					public setChipStartPadding(param0: number): void;
					public isCheckedIconEnabled(): boolean;
					public onLevelChange(param0: number): boolean;
					public setCloseIconStartPaddingResource(param0: number): void;
					public static createFromResource(param0: android.content.Context, param1: number): android.support.design.chip.ChipDrawable;
					public getChipEndPadding(): number;
					public getIconStartPadding(): number;
					public setShowMotionSpec(param0: android.support.design.animation.MotionSpec): void;
					public setChipMinHeight(param0: number): void;
					public setTextEndPadding(param0: number): void;
					public scheduleDrawable(param0: android.graphics.drawable.Drawable, param1: java.lang.Runnable, param2: number): void;
					public setChipBackgroundColorResource(param0: number): void;
					public setCheckableResource(param0: number): void;
					public onLayoutDirectionChanged(param0: number): boolean;
					public setCloseIconEndPaddingResource(param0: number): void;
					public setIconStartPaddingResource(param0: number): void;
					public static createFromAttributes(param0: android.content.Context, param1: android.util.AttributeSet, param2: number, param3: number): android.support.design.chip.ChipDrawable;
					public draw(param0: android.graphics.Canvas): void;
					public getCloseIcon(): android.graphics.drawable.Drawable;
					public setChipEndPadding(param0: number): void;
					public invalidateDrawable(param0: android.graphics.drawable.Drawable): void;
					public getChipIconSize(): number;
					public setCheckedIconEnabled(param0: boolean): void;
					public getChipStartPadding(): number;
					public setChipIconResource(param0: number): void;
					public setCloseIconSizeResource(param0: number): void;
					public getShowMotionSpec(): android.support.design.animation.MotionSpec;
					public setIconEndPadding(param0: number): void;
					public setChipStartPaddingResource(param0: number): void;
					public setChipCornerRadius(param0: number): void;
					public setTintList(param0: android.content.res.ColorStateList): void;
					public setCloseIconEndPadding(param0: number): void;
					public getTextEndPadding(): number;
				}
				export module ChipDrawable {
					export class Delegate {
						public static class: java.lang.Class<android.support.design.chip.ChipDrawable.Delegate>;
						/**
						 * Constructs a new instance of the android.support.design.chip.ChipDrawable$Delegate interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onChipDrawableSizeChange(): void;
						});
						public constructor();
						public onChipDrawableSizeChange(): void;
					}
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module internal {
				export class FlexContainer {
					public static class: java.lang.Class<android.support.design.internal.FlexContainer>;
					/**
					 * Constructs a new instance of the android.support.design.internal.FlexContainer interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						getFlexItemCount(): number;
						getFlexItemAt(param0: number): android.view.View;
						getReorderedFlexItemAt(param0: number): android.view.View;
						addView(param0: android.view.View): void;
						addView(param0: android.view.View, param1: number): void;
						removeAllViews(): void;
						removeViewAt(param0: number): void;
						getFlexWrap(): number;
						setFlexWrap(param0: number): void;
						getFlexLines(): java.util.List<android.support.design.internal.FlexLine>;
						isMainAxisDirectionHorizontal(): boolean;
						getDecorationLengthMainAxis(param0: android.view.View, param1: number, param2: number): number;
						getDecorationLengthCrossAxis(param0: android.view.View): number;
						getPaddingTop(): number;
						getPaddingLeft(): number;
						getPaddingRight(): number;
						getPaddingBottom(): number;
						getPaddingStart(): number;
						getPaddingEnd(): number;
						getChildWidthMeasureSpec(param0: number, param1: number, param2: number): number;
						getChildHeightMeasureSpec(param0: number, param1: number, param2: number): number;
						getLargestMainSize(): number;
						getSumOfCrossSize(): number;
						onNewFlexItemAdded(param0: android.view.View, param1: number, param2: number, param3: android.support.design.internal.FlexLine): void;
						onNewFlexLineAdded(param0: android.support.design.internal.FlexLine): void;
						setFlexLines(param0: java.util.List<android.support.design.internal.FlexLine>): void;
						getFlexLinesInternal(): java.util.List<android.support.design.internal.FlexLine>;
						updateViewCache(param0: number, param1: android.view.View): void;
					});
					public constructor();
					public getFlexLinesInternal(): java.util.List<android.support.design.internal.FlexLine>;
					public setFlexLines(param0: java.util.List<android.support.design.internal.FlexLine>): void;
					public getDecorationLengthMainAxis(param0: android.view.View, param1: number, param2: number): number;
					public getFlexLines(): java.util.List<android.support.design.internal.FlexLine>;
					public addView(param0: android.view.View, param1: number): void;
					public getDecorationLengthCrossAxis(param0: android.view.View): number;
					public getFlexWrap(): number;
					public getChildWidthMeasureSpec(param0: number, param1: number, param2: number): number;
					public getPaddingLeft(): number;
					public updateViewCache(param0: number, param1: android.view.View): void;
					public getFlexItemAt(param0: number): android.view.View;
					public onNewFlexItemAdded(param0: android.view.View, param1: number, param2: number, param3: android.support.design.internal.FlexLine): void;
					public getPaddingTop(): number;
					public onNewFlexLineAdded(param0: android.support.design.internal.FlexLine): void;
					public getPaddingRight(): number;
					public getLargestMainSize(): number;
					public getReorderedFlexItemAt(param0: number): android.view.View;
					public getSumOfCrossSize(): number;
					public getPaddingBottom(): number;
					public setFlexWrap(param0: number): void;
					public getFlexItemCount(): number;
					public removeAllViews(): void;
					public removeViewAt(param0: number): void;
					public addView(param0: android.view.View): void;
					public isMainAxisDirectionHorizontal(): boolean;
					public getPaddingStart(): number;
					public getPaddingEnd(): number;
					public getChildHeightMeasureSpec(param0: number, param1: number, param2: number): number;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module internal {
				export class FlexItem {
					public static class: java.lang.Class<android.support.design.internal.FlexItem>;
					/**
					 * Constructs a new instance of the android.support.design.internal.FlexItem interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
						getWidth(): number;
						setWidth(param0: number): void;
						getHeight(): number;
						setHeight(param0: number): void;
						getOrder(): number;
						setOrder(param0: number): void;
						getFlexGrow(): number;
						setFlexGrow(param0: number): void;
						getFlexShrink(): number;
						setFlexShrink(param0: number): void;
						getMinWidth(): number;
						setMinWidth(param0: number): void;
						getMinHeight(): number;
						setMinHeight(param0: number): void;
						getMaxWidth(): number;
						setMaxWidth(param0: number): void;
						getMaxHeight(): number;
						setMaxHeight(param0: number): void;
						isWrapBefore(): boolean;
						setWrapBefore(param0: boolean): void;
						getFlexBasisPercent(): number;
						setFlexBasisPercent(param0: number): void;
						getMarginLeft(): number;
						getMarginTop(): number;
						getMarginRight(): number;
						getMarginBottom(): number;
						getMarginStart(): number;
						getMarginEnd(): number;
					});
					public constructor();
					public static ORDER_DEFAULT: number;
					public static FLEX_BASIS_PERCENT_DEFAULT: number;
					public static FLEX_GROW_DEFAULT: number;
					public static FLEX_SHRINK_DEFAULT: number;
					public static MAX_SIZE: number;
					public getMaxWidth(): number;
					public getMinWidth(): number;
					public setHeight(param0: number): void;
					public setOrder(param0: number): void;
					public setWrapBefore(param0: boolean): void;
					public getMarginTop(): number;
					public getOrder(): number;
					public setMinHeight(param0: number): void;
					public setFlexBasisPercent(param0: number): void;
					public getMaxHeight(): number;
					public getMarginStart(): number;
					public setFlexShrink(param0: number): void;
					public setMaxWidth(param0: number): void;
					public setWidth(param0: number): void;
					public getHeight(): number;
					public getMarginBottom(): number;
					public getWidth(): number;
					public getFlexBasisPercent(): number;
					public getMinHeight(): number;
					public setMaxHeight(param0: number): void;
					public getMarginLeft(): number;
					public getMarginEnd(): number;
					public getFlexShrink(): number;
					public getFlexGrow(): number;
					public setMinWidth(param0: number): void;
					public isWrapBefore(): boolean;
					public setFlexGrow(param0: number): void;
					public getMarginRight(): number;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module internal {
				export class FlexLine {
					public static class: java.lang.Class<android.support.design.internal.FlexLine>;
					public getTotalFlexShrink(): number;
					public getMainSize(): number;
					public getItemCount(): number;
					public getTotalFlexGrow(): number;
					public getFirstIndex(): number;
					public getCrossSize(): number;
					public getItemCountNotGone(): number;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module internal {
				export class FlexWrap {
					public static class: java.lang.Class<android.support.design.internal.FlexWrap>;
					/**
					 * Constructs a new instance of the android.support.design.internal.FlexWrap interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
					 */
					public constructor(implementation: {
					});
					public constructor();
					public static WRAP: number;
					public static NOWRAP: number;
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module internal {
				export class FlexboxHelper {
					public static class: java.lang.Class<android.support.design.internal.FlexboxHelper>;
				}
				export module FlexboxHelper {
					export class FlexLinesResult {
						public static class: java.lang.Class<android.support.design.internal.FlexboxHelper.FlexLinesResult>;
					}
					export class Order extends java.lang.Comparable<android.support.design.internal.FlexboxHelper.Order> {
						public static class: java.lang.Class<android.support.design.internal.FlexboxHelper.Order>;
						public compareTo(param0: android.support.design.internal.FlexboxHelper.Order): number;
						public toString(): string;
					}
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module internal {
				export class FlexboxLayout implements android.support.design.internal.FlexContainer {
					public static class: java.lang.Class<android.support.design.internal.FlexboxLayout>;
					public static SHOW_DIVIDER_NONE: number;
					public static SHOW_DIVIDER_BEGINNING: number;
					public static SHOW_DIVIDER_MIDDLE: number;
					public static SHOW_DIVIDER_END: number;
					public getFlexLinesInternal(): java.util.List<android.support.design.internal.FlexLine>;
					public onDraw(param0: android.graphics.Canvas): void;
					public setFlexLines(param0: java.util.List<android.support.design.internal.FlexLine>): void;
					public getDecorationLengthMainAxis(param0: android.view.View, param1: number, param2: number): number;
					public addView(param0: android.view.View, param1: number, param2: android.view.ViewGroup.LayoutParams): void;
					public getFlexLines(): java.util.List<android.support.design.internal.FlexLine>;
					public getDecorationLengthCrossAxis(param0: android.view.View): number;
					public addView(param0: android.view.View, param1: number): void;
					public getFlexWrap(): number;
					public getChildWidthMeasureSpec(param0: number, param1: number, param2: number): number;
					public setShowDivider(param0: number): void;
					public getPaddingLeft(): number;
					public updateViewCache(param0: number, param1: android.view.View): void;
					public getDividerDrawableVertical(): android.graphics.drawable.Drawable;
					public setDividerDrawableVertical(param0: android.graphics.drawable.Drawable): void;
					public getFlexItemAt(param0: number): android.view.View;
					public onNewFlexItemAdded(param0: android.view.View, param1: number, param2: number, param3: android.support.design.internal.FlexLine): void;
					public getPaddingTop(): number;
					public onNewFlexLineAdded(param0: android.support.design.internal.FlexLine): void;
					public onMeasure(param0: number, param1: number): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public setShowDividerHorizontal(param0: number): void;
					public getPaddingRight(): number;
					public getDividerDrawableHorizontal(): android.graphics.drawable.Drawable;
					public getLargestMainSize(): number;
					public getReorderedFlexItemAt(param0: number): android.view.View;
					public getSumOfCrossSize(): number;
					public generateLayoutParams(param0: android.view.ViewGroup.LayoutParams): android.view.ViewGroup.LayoutParams;
					public getReorderedChildAt(param0: number): android.view.View;
					public getPaddingBottom(): number;
					public setDividerDrawable(param0: android.graphics.drawable.Drawable): void;
					public setFlexWrap(param0: number): void;
					public getFlexItemCount(): number;
					public generateLayoutParams(param0: android.util.AttributeSet): android.support.design.internal.FlexboxLayout.LayoutParams;
					public setShowDividerVertical(param0: number): void;
					public setDividerDrawableHorizontal(param0: android.graphics.drawable.Drawable): void;
					public removeAllViews(): void;
					public removeViewAt(param0: number): void;
					public constructor(param0: android.content.Context);
					public isMainAxisDirectionHorizontal(): boolean;
					public addView(param0: android.view.View): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public checkLayoutParams(param0: android.view.ViewGroup.LayoutParams): boolean;
					public getPaddingStart(): number;
					public getPaddingEnd(): number;
					public onLayout(param0: boolean, param1: number, param2: number, param3: number, param4: number): void;
					public getChildHeightMeasureSpec(param0: number, param1: number, param2: number): number;
				}
				export module FlexboxLayout {
					export class DividerMode {
						public static class: java.lang.Class<android.support.design.internal.FlexboxLayout.DividerMode>;
						/**
						 * Constructs a new instance of the android.support.design.internal.FlexboxLayout$DividerMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
						});
						public constructor();
					}
					export class LayoutParams implements android.support.design.internal.FlexItem {
						public static class: java.lang.Class<android.support.design.internal.FlexboxLayout.LayoutParams>;
						public static CREATOR: android.os.Parcelable.Creator<android.support.design.internal.FlexboxLayout.LayoutParams>;
						public constructor(param0: android.view.ViewGroup.MarginLayoutParams);
						public setOrder(param0: number): void;
						public constructor(param0: android.view.ViewGroup.LayoutParams);
						public setMinHeight(param0: number): void;
						public getMaxWidth(): number;
						public getMaxHeight(): number;
						public setHeight(param0: number): void;
						public setMinWidth(param0: number): void;
						public getMarginTop(): number;
						public getMinHeight(): number;
						public getMarginStart(): number;
						public constructor(param0: android.support.design.internal.FlexboxLayout.LayoutParams);
						public constructor(param0: number, param1: number);
						public setWrapBefore(param0: boolean): void;
						public getOrder(): number;
						public getFlexShrink(): number;
						public getMarginLeft(): number;
						public setWidth(param0: number): void;
						public setFlexGrow(param0: number): void;
						public setMaxHeight(param0: number): void;
						public describeContents(): number;
						public getFlexGrow(): number;
						public setMaxWidth(param0: number): void;
						public getMarginBottom(): number;
						public setFlexBasisPercent(param0: number): void;
						public getHeight(): number;
						public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
						public isWrapBefore(): boolean;
						public setFlexShrink(param0: number): void;
						public getWidth(): number;
						public getMinWidth(): number;
						public constructor(param0: android.os.Parcel);
						public writeToParcel(param0: android.os.Parcel, param1: number): void;
						public getMarginEnd(): number;
						public getFlexBasisPercent(): number;
						public getMarginRight(): number;
					}
				}
			}
		}
	}
}

declare module android {
	export module support {
		export module design {
			export module chip {
				export class ChipGroup extends android.support.design.internal.FlexboxLayout {
					public static class: java.lang.Class<android.support.design.chip.ChipGroup>;
					public setSingleLine(param0: number): void;
					public getFlexLines(): java.util.List<android.support.design.internal.FlexLine>;
					public addView(param0: android.view.View, param1: number): void;
					public getChildWidthMeasureSpec(param0: number, param1: number, param2: number): number;
					public getPaddingLeft(): number;
					public updateViewCache(param0: number, param1: android.view.View): void;
					public getPaddingTop(): number;
					public getChipSpacingVertical(): number;
					public setShowDividerHorizontal(param0: number): void;
					public getPaddingRight(): number;
					public check(param0: number): void;
					public getLargestMainSize(): number;
					public getPaddingBottom(): number;
					public setFlexWrap(param0: number): void;
					public getFlexItemCount(): number;
					public setDividerDrawableHorizontal(param0: android.graphics.drawable.Drawable): void;
					public setChipSpacingResource(param0: number): void;
					public getPaddingStart(): number;
					public getPaddingEnd(): number;
					public isSingleLine(): boolean;
					public setChipSpacingVerticalResource(param0: number): void;
					public getFlexLinesInternal(): java.util.List<android.support.design.internal.FlexLine>;
					public setFlexLines(param0: java.util.List<android.support.design.internal.FlexLine>): void;
					public clearCheck(): void;
					public setChipSpacingHorizontal(param0: number): void;
					public setSingleSelection(param0: boolean): void;
					public setChipSpacingHorizontalResource(param0: number): void;
					public getDecorationLengthMainAxis(param0: android.view.View, param1: number, param2: number): number;
					public addView(param0: android.view.View, param1: number, param2: android.view.ViewGroup.LayoutParams): void;
					public getDecorationLengthCrossAxis(param0: android.view.View): number;
					public setOnCheckedChangeListener(param0: android.support.design.chip.ChipGroup.OnCheckedChangeListener): void;
					public getFlexWrap(): number;
					public setOnHierarchyChangeListener(param0: android.view.ViewGroup.OnHierarchyChangeListener): void;
					public generateDefaultLayoutParams(): android.view.ViewGroup.LayoutParams;
					public setChipSpacingVertical(param0: number): void;
					public setDividerDrawableVertical(param0: android.graphics.drawable.Drawable): void;
					public setSingleSelection(param0: number): void;
					public isSingleSelection(): boolean;
					public getFlexItemAt(param0: number): android.view.View;
					public onNewFlexItemAdded(param0: android.view.View, param1: number, param2: number, param3: android.support.design.internal.FlexLine): void;
					public onFinishInflate(): void;
					public onNewFlexLineAdded(param0: android.support.design.internal.FlexLine): void;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet, param2: number);
					public generateLayoutParams(param0: android.view.ViewGroup.LayoutParams): android.view.ViewGroup.LayoutParams;
					public getReorderedFlexItemAt(param0: number): android.view.View;
					public getSumOfCrossSize(): number;
					public setChipSpacing(param0: number): void;
					public getCheckedChipId(): number;
					public generateLayoutParams(param0: android.util.AttributeSet): android.support.design.internal.FlexboxLayout.LayoutParams;
					public setShowDividerVertical(param0: number): void;
					public removeAllViews(): void;
					public removeViewAt(param0: number): void;
					public constructor(param0: android.content.Context);
					public addView(param0: android.view.View): void;
					public isMainAxisDirectionHorizontal(): boolean;
					public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
					public checkLayoutParams(param0: android.view.ViewGroup.LayoutParams): boolean;
					public getChildHeightMeasureSpec(param0: number, param1: number, param2: number): number;
					public setSingleLine(param0: boolean): void;
					public getChipSpacingHorizontal(): number;
				}
				export module ChipGroup {
					export class CheckedStateTracker {
						public static class: java.lang.Class<android.support.design.chip.ChipGroup.CheckedStateTracker>;
						public onCheckedChanged(param0: android.widget.CompoundButton, param1: boolean): void;
					}
					export class LayoutParams extends android.support.design.internal.FlexboxLayout.LayoutParams {
						public static class: java.lang.Class<android.support.design.chip.ChipGroup.LayoutParams>;
						public constructor(param0: android.view.ViewGroup.MarginLayoutParams);
						public setOrder(param0: number): void;
						public constructor(param0: android.view.ViewGroup.LayoutParams);
						public setMinHeight(param0: number): void;
						public getMaxWidth(): number;
						public getMaxHeight(): number;
						public setHeight(param0: number): void;
						public setMinWidth(param0: number): void;
						public getMarginTop(): number;
						public getMinHeight(): number;
						public getMarginStart(): number;
						public constructor(param0: android.support.design.internal.FlexboxLayout.LayoutParams);
						public constructor(param0: number, param1: number);
						public setWrapBefore(param0: boolean): void;
						public getOrder(): number;
						public getFlexShrink(): number;
						public getMarginLeft(): number;
						public setWidth(param0: number): void;
						public setFlexGrow(param0: number): void;
						public setMaxHeight(param0: number): void;
						public getFlexGrow(): number;
						public setMaxWidth(param0: number): void;
						public getMarginBottom(): number;
						public setFlexBasisPercent(param0: number): void;
						public getHeight(): number;
						public constructor(param0: android.content.Context, param1: android.util.AttributeSet);
						public isWrapBefore(): boolean;
						public setFlexShrink(param0: number): void;
						public getWidth(): number;
						public getMinWidth(): number;
						public constructor(param0: android.os.Parcel);
						public getMarginEnd(): number;
						public getFlexBasisPercent(): number;
						public getMarginRight(): number;
					}
					export class OnCheckedChangeListener {
						public static class: java.lang.Class<android.support.design.chip.ChipGroup.OnCheckedChangeListener>;
						/**
						 * Constructs a new instance of the android.support.design.chip.ChipGroup$OnCheckedChangeListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
						 */
						public constructor(implementation: {
							onCheckedChanged(param0: android.support.design.chip.ChipGroup, param1: number): void;
						});
						public constructor();
						public onCheckedChanged(param0: android.support.design.chip.ChipGroup, param1: number): void;
					}
					export class PassThroughHierarchyChangeListener {
						public static class: java.lang.Class<android.support.design.chip.ChipGroup.PassThroughHierarchyChangeListener>;
						public onChildViewAdded(param0: android.view.View, param1: android.view.View): void;
						public onChildViewRemoved(param0: android.view.View, param1: android.view.View): void;
					}
					export class SpacingDrawable {
						public static class: java.lang.Class<android.support.design.chip.ChipGroup.SpacingDrawable>;
						public draw(param0: android.graphics.Canvas): void;
						public getIntrinsicWidth(): number;
						public setColorFilter(param0: android.graphics.ColorFilter): void;
						public getIntrinsicHeight(): number;
						public getOpacity(): number;
						public setAlpha(param0: number): void;
					}
				}
			}
		}
	}
}
