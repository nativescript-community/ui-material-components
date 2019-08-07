declare module com {
	export module google {
		export module android {
			export module material {
				export module bottomnavigation {
					export class BottomNavigationView extends globalAndroid.widget.FrameLayout {
						public static class: java.lang.Class<com.google.android.material.bottomnavigation.BottomNavigationView>;
						public isLayoutRequested(): boolean;
						public canResolveLayoutDirection(): boolean;
						public constructor(param0: globalAndroid.content.Context);
						public sendAccessibilityEvent(param0: number): void;
						public onStartNestedScroll(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): boolean;
						public onNestedPrePerformAccessibilityAction(param0: globalAndroid.view.View, param1: number, param2: globalAndroid.os.Bundle): boolean;
						public sendAccessibilityEventUnchecked(param0: globalAndroid.view.accessibility.AccessibilityEvent): void;
						public clearChildFocus(param0: globalAndroid.view.View): void;
						public requestChildFocus(param0: globalAndroid.view.View, param1: globalAndroid.view.View): void;
						/** @deprecated */
						public invalidateChild(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect): void;
						public onNestedFling(param0: globalAndroid.view.View, param1: number, param2: number, param3: boolean): boolean;
						public childHasTransientStateChanged(param0: globalAndroid.view.View, param1: boolean): void;
						public isTextAlignmentResolved(): boolean;
                        public getItemTextColor(): globalAndroid.content.res.ColorStateList;
                        public removeBadge(param0: number): void;
						public showBadge(param0: number): com.google.android.material.badge.BadgeDrawable;
						public addView(param0: globalAndroid.view.View, param1: number, param2: number): void;
						public getMaxItemCount(): number;
						public setItemBackgroundResource(param0: number): void;
						public getTextDirection(): number;
						public showContextMenuForChild(param0: globalAndroid.view.View, param1: number, param2: number): boolean;
						public onKeyMultiple(param0: number, param1: number, param2: globalAndroid.view.KeyEvent): boolean;
						public getItemIconSize(): number;
						public onDescendantInvalidated(param0: globalAndroid.view.View, param1: globalAndroid.view.View): void;
						public removeView(param0: globalAndroid.view.View): void;
						public getChildVisibleRect(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect, param2: globalAndroid.graphics.Point): boolean;
						public onKeyUp(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
						public getMenu(): globalAndroid.view.Menu;
						public setOnNavigationItemReselectedListener(param0: com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemReselectedListener): void;
						/** @deprecated */
						public getItemBackgroundResource(): number;
						public onNestedPreScroll(param0: globalAndroid.view.View, param1: number, param2: number, param3: native.Array<number>): void;
						public setItemIconSize(param0: number): void;
						public recomputeViewAttributes(param0: globalAndroid.view.View): void;
						public showContextMenuForChild(param0: globalAndroid.view.View): boolean;
						public canResolveTextDirection(): boolean;
						public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
						public requestDisallowInterceptTouchEvent(param0: boolean): void;
						public isLayoutDirectionResolved(): boolean;
						public onNestedScroll(param0: globalAndroid.view.View, param1: number, param2: number, param3: number, param4: number): void;
						public addView(param0: globalAndroid.view.View, param1: globalAndroid.view.ViewGroup.LayoutParams): void;
						public onKeyLongPress(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
						public onKeyDown(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
						public requestLayout(): void;
						public notifySubtreeAccessibilityStateChanged(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): void;
						public keyboardNavigationClusterSearch(param0: globalAndroid.view.View, param1: number): globalAndroid.view.View;
						public bringChildToFront(param0: globalAndroid.view.View): void;
						public startActionModeForChild(param0: globalAndroid.view.View, param1: globalAndroid.view.ActionMode.Callback): globalAndroid.view.ActionMode;
						public addView(param0: globalAndroid.view.View, param1: number): void;
						public setItemIconTintList(param0: globalAndroid.content.res.ColorStateList): void;
						public requestChildRectangleOnScreen(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect, param2: boolean): boolean;
						public isTextDirectionResolved(): boolean;
						public isItemHorizontalTranslationEnabled(): boolean;
						public startActionModeForChild(param0: globalAndroid.view.View, param1: globalAndroid.view.ActionMode.Callback, param2: number): globalAndroid.view.ActionMode;
						/** @deprecated */
						public requestFitSystemWindows(): void;
						public setOnNavigationItemSelectedListener(param0: com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemSelectedListener): void;
						public setItemHorizontalTranslationEnabled(param0: boolean): void;
						public setLabelVisibilityMode(param0: number): void;
						public getSelectedItemId(): number;
						public getItemTextAppearanceInactive(): number;
						public focusSearch(param0: globalAndroid.view.View, param1: number): globalAndroid.view.View;
						public onStopNestedScroll(param0: globalAndroid.view.View): void;
						public invalidateDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
						public requestTransparentRegion(param0: globalAndroid.view.View): void;
						public getItemIconTintList(): globalAndroid.content.res.ColorStateList;
						public setSelectedItemId(param0: number): void;
						public addView(param0: globalAndroid.view.View, param1: number, param2: globalAndroid.view.ViewGroup.LayoutParams): void;
						public addView(param0: globalAndroid.view.View): void;
						public onNestedPreFling(param0: globalAndroid.view.View, param1: number, param2: number): boolean;
						public createContextMenu(param0: globalAndroid.view.ContextMenu): void;
						public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
						public childDrawableStateChanged(param0: globalAndroid.view.View): void;
						public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable): void;
						public requestFitSystemWindows(): void;
						public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
						public updateViewLayout(param0: globalAndroid.view.View, param1: globalAndroid.view.ViewGroup.LayoutParams): void;
						public inflateMenu(param0: number): void;
						public getParentForAccessibility(): globalAndroid.view.ViewParent;
						public getLabelVisibilityMode(): number;
						public setItemIconSizeRes(param0: number): void;
						public scheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable, param2: number): void;
						public setItemBackground(param0: globalAndroid.graphics.drawable.Drawable): void;
						public getItemBackground(): globalAndroid.graphics.drawable.Drawable;
						public focusableViewAvailable(param0: globalAndroid.view.View): void;
						public focusSearch(param0: number): globalAndroid.view.View;
						public requestSendAccessibilityEvent(param0: globalAndroid.view.View, param1: globalAndroid.view.accessibility.AccessibilityEvent): boolean;
						public getTextAlignment(): number;
						public onNestedScrollAccepted(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): void;
						public setItemTextAppearanceActive(param0: number): void;
						public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
						public onSaveInstanceState(): globalAndroid.os.Parcelable;
						/** @deprecated */
						public invalidateChildInParent(param0: native.Array<number>, param1: globalAndroid.graphics.Rect): globalAndroid.view.ViewParent;
						public getItemTextAppearanceActive(): number;
						public onRestoreInstanceState(param0: globalAndroid.os.Parcelable): void;
						public getParent(): globalAndroid.view.ViewParent;
						public getLayoutDirection(): number;
						public canResolveTextAlignment(): boolean;
						public setItemTextColor(param0: globalAndroid.content.res.ColorStateList): void;
						public setItemTextAppearanceInactive(param0: number): void;
					}
					export module BottomNavigationView {
						export class OnNavigationItemReselectedListener extends java.lang.Object {
							public static class: java.lang.Class<com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemReselectedListener>;
							/**
							 * Constructs a new instance of the com.google.android.material.bottomnavigation.BottomNavigationView$OnNavigationItemReselectedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								onNavigationItemReselected(param0: globalAndroid.view.MenuItem): void;
							});
							public constructor();
							public onNavigationItemReselected(param0: globalAndroid.view.MenuItem): void;
						}
						export class OnNavigationItemSelectedListener extends java.lang.Object {
							public static class: java.lang.Class<com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemSelectedListener>;
							/**
							 * Constructs a new instance of the com.google.android.material.bottomnavigation.BottomNavigationView$OnNavigationItemSelectedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
							 */
							public constructor(implementation: {
								onNavigationItemSelected(param0: globalAndroid.view.MenuItem): boolean;
							});
							public constructor();
							public onNavigationItemSelected(param0: globalAndroid.view.MenuItem): boolean;
						}
						export class SavedState extends androidx.customview.view.AbsSavedState {
							public static class: java.lang.Class<com.google.android.material.bottomnavigation.BottomNavigationView.SavedState>;
							public static CREATOR: globalAndroid.os.Parcelable.Creator<com.google.android.material.bottomnavigation.BottomNavigationView.SavedState>;
							public writeToParcel(param0: globalAndroid.os.Parcel, param1: number): void;
							public describeContents(): number;
							public constructor(param0: globalAndroid.os.Parcel);
							public constructor(param0: globalAndroid.os.Parcelable);
							public constructor(param0: globalAndroid.os.Parcel, param1: java.lang.ClassLoader);
						}
					}
				}
			}
		}
	}
}