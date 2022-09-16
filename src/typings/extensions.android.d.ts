declare namespace com {
    export namespace nativescript {
        export namespace material {
            export namespace core {
                export class TabLayout extends globalAndroid.widget.HorizontalScrollView {
                    constructor(context: globalAndroid.content.Context);
                    constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
                    constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyle: number);

                    setSelectedIndicatorColors(color: Array<number>): void;
                    getSelectedIndicatorColors(): Array<number>;
                    setTabTextColor(color: number): void;
                    getTabTextColor(): number;
                    setSelectedTabTextColor(color: number): void;
                    getSelectedTabTextColor(): number;
                    setTabTextFontSize(fontSize: number): void;
                    getTabTextFontSize(): number;

                    setItems(items: Array<TabItemSpec>, viewPager: androidx.viewpager.widget.ViewPager): void;
                    updateItemAt(position: number, itemSpec: TabItemSpec): void;

                    getTextViewForItemAt(index: number): globalAndroid.widget.TextView;
                    getViewForItemAt(index: number): globalAndroid.widget.LinearLayout;
                    getItemCount(): number;
                }

                export class TabsBar extends globalAndroid.widget.HorizontalScrollView {
                    constructor(context: globalAndroid.content.Context);
                    constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
                    constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyle: number);

                    forceTransitionToPosition(position: number): void;
                    setSelectedIndicatorColors(color: Array<number>): void;
                    getSelectedIndicatorColors(): Array<number>;
                    setTabTextColor(color: number): void;
                    getTabTextColor(): number;
                    setSelectedTabTextColor(color: number): void;
                    getSelectedTabTextColor(): number;
                    setTabTextFontSize(fontSize: number): void;
                    getTabTextFontSize(): number;

                    setViewPager(viewPager: androidx.viewpager2.widget.ViewPager2): void;
                    setItems(items: Array<TabItemSpec>): void;
                    updateItemAt(position: number, itemSpec: TabItemSpec): void;

                    setSelectedPosition(position: number): void;

                    getTextViewForItemAt(index: number): globalAndroid.widget.TextView;
                    getViewForItemAt(index: number): globalAndroid.widget.LinearLayout;
                    getItemCount(): number;
                }

                export class BottomNavigationBar extends globalAndroid.widget.LinearLayout {
                    constructor(context: globalAndroid.content.Context);
                    constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
                    constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet, defStyle: number);

                    setTabTextColor(color: number): void;
                    getTabTextColor(): number;
                    setSelectedTabTextColor(color: number): void;
                    getSelectedTabTextColor(): number;
                    setTabTextFontSize(fontSize: number): void;
                    getTabTextFontSize(): number;

                    onTap(position: number): boolean;
                    onSelectedPositionChange(position: number, prevPosition: number): void;
                    setSelectedPosition(position: number): void;
                    setItems(items: Array<TabItemSpec>): void;
                    updateItemAt(position: number, itemSpec: TabItemSpec): void;

                    getTextViewForItemAt(index: number): globalAndroid.widget.TextView;
                    getViewForItemAt(index: number): globalAndroid.widget.LinearLayout;
                    getItemCount(): number;
                }

                export class TabViewPager extends androidx.viewpager2.widget.ViewPager2 {
                    constructor(context: globalAndroid.content.Context);
                    constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);

                    setSwipePageEnabled(enabled: boolean): void;
                    setAnimationEnabled(enabled: boolean): void;
                }

                export class TabItemSpec {
                    title: string;
                    fontSize: number;
                    typeFace: globalAndroid.graphics.Typeface;
                    iconId: number;
                    iconDrawable: globalAndroid.graphics.drawable.Drawable;
                    imageHeight: number;
                    backgroundColor: number;
                    color: number;
                }
            }
            export namespace textfield {
                class TextInputEditText extends google.android.material.textfield.TextInputEditText {
                    fullClearFocus();
                }
            }
            export namespace textview {
                class TextViewInputEditText extends google.android.material.textfield.TextInputEditText {
                    fullClearFocus();
                }
            }
            export namespace snackbar {
                class SnackCallback extends google.android.material.snackbar.BaseTransientBottomBar.BaseCallback<google.android.material.snackbar.Snackbar> {
                    public setListener(listener: SnackCallback.SnackCallbackListener);
                }
                namespace SnackCallback {
                    class SnackCallbackListener {
                        constructor(implementation: {
                            onDismissed(snackbar: google.android.material.snackbar.Snackbar, event: number): void;
                            onShown(snackbar: google.android.material.snackbar.Snackbar): void;
                        });
                        public onDismissed(snackbar: google.android.material.snackbar.Snackbar, event: number): void;
                        public onShown(snackbar: google.android.material.snackbar.Snackbar): void;
                    }
                }
            }
            export namespace bottomsheet {
                class BottomSheetDialogFragment extends google.android.material.bottomsheet.BottomSheetDialogFragment {
                    public setListener(listener: BottomSheetDialogFragment.BottomSheetDialogFragmentListener);
                }
                namespace BottomSheetDialogFragment {
                    class BottomSheetDialogFragmentListener {
                        constructor(implementation: {
                            onDismiss(param0: BottomSheetDialogFragment, param1: globalAndroid.content.DialogInterface): void;
                            onCreateDialog(param0: BottomSheetDialogFragment, param1: globalAndroid.os.Bundle): globalAndroid.app.Dialog;
                            onStart(param0: BottomSheetDialogFragment): void;
                            onDestroy(param0: BottomSheetDialogFragment): void;
                            onCreateView(
                                param0: BottomSheetDialogFragment,
                                param1: globalAndroid.view.LayoutInflater,
                                param2: globalAndroid.view.ViewGroup,
                                param3: globalAndroid.os.Bundle
                            ): globalAndroid.view.View;
                        });
                        public onDismiss(param0: BottomSheetDialogFragment, param1: globalAndroid.content.DialogInterface): void;
                        public onCreateDialog(param0: BottomSheetDialogFragment, param1: globalAndroid.os.Bundle): globalAndroid.app.Dialog;
                        public onStart(param0: BottomSheetDialogFragment): void;
                        public onDestroy(param0: BottomSheetDialogFragment): void;
                        public onCreateView(
                            param0: BottomSheetDialogFragment,
                            param1: globalAndroid.view.LayoutInflater,
                            param2: globalAndroid.view.ViewGroup,
                            param3: globalAndroid.os.Bundle
                        ): globalAndroid.view.View;
                    }
                }

                class BottomSheetDialog extends google.android.material.bottomsheet.BottomSheetDialog {
                    public setListener(listener: BottomSheetDialog.BottomSheetDialogListener);
                }
                namespace BottomSheetDialog {
                    class BottomSheetDialogListener {
                        constructor(implementation: { onBackPressed(dialog: BottomSheetDialog): void; onDetachedFromWindow(dialog: BottomSheetDialog): void });
                        public onBackPressed(dialog: BottomSheetDialog): void;
                        public onDetachedFromWindow(dialog: BottomSheetDialog): void;
                    }
                }
            }
        }
    }
}
