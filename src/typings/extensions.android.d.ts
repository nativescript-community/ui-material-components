declare namespace com {
    export namespace nativescript {
        export namespace material {
            export namespace textfield {
                class TextInputEditText extends com.google.android.material.textfield.TextInputEditText {
                    fullClearFocus();
                }
            }
            export namespace textview {
                class TextViewInputEditText extends com.google.android.material.textfield.TextInputEditText {
                    fullClearFocus();
                }
            }
            export namespace snackbar {
                class SnackCallback extends com.google.android.material.snackbar.BaseTransientBottomBar.BaseCallback<com.google.android.material.snackbar.Snackbar> {
                    public setListener(listener: SnackCallback.SnackCallbackListener);
                }
                namespace SnackCallback {
                    class SnackCallbackListener {
                        constructor(implementation: {
                            onDismissed(snackbar: com.google.android.material.snackbar.Snackbar, event: number): void;
                            onShown(snackbar: com.google.android.material.snackbar.Snackbar): void;
                        });
                        public onDismissed(snackbar: com.google.android.material.snackbar.Snackbar, event: number): void;
                        public onShown(snackbar: com.google.android.material.snackbar.Snackbar): void;
                    }
                }
            }
            export namespace bottomsheet {
                class BottomSheetDialogFragment extends com.google.android.material.bottomsheet.BottomSheetDialogFragment {
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

                class BottomSheetDialog extends com.google.android.material.bottomsheet.BottomSheetDialog {
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
