import { applyMixins } from '@nativescript-community/ui-material-core';
import { AndroidActivityBackPressedEventData, Application, View, fromObject } from '@nativescript/core';
import { BottomSheetOptions, ViewWithBottomSheetBase } from './bottomsheet-common';

export { ViewWithBottomSheetBase } from './bottomsheet-common';

interface BottomSheetDataOptions {
    owner: View;
    options: BottomSheetOptions;
    shownCallback: () => void;
    dismissCallback: () => void;
}

function getId(id: string) {
    const context: android.content.Context = Application.android.context;
    return context.getResources().getIdentifier(id, 'id', context.getPackageName());
}

export class ViewWithBottomSheet extends ViewWithBottomSheetBase {
    _bottomSheetFragment: com.nativescript.material.bottomsheet.BottomSheetDialogFragment;
    protected _hideNativeBottomSheet(parent: View, whenClosedCallback: () => void) {
        // call whenClosedCallback first because dismiss will call another one (without result)
        whenClosedCallback();
        const manager = this._bottomSheetFragment.getFragmentManager();
        if (manager) {
            this._bottomSheetFragment.dismissAllowingStateLoss();
        }

        this._bottomSheetFragment = null;
    }

    protected _showNativeBottomSheet(parent: View, options: BottomSheetOptions) {
        this._commonShowNativeBottomSheet(parent, options);
        const owner = this;
        const domId = this._domId;
        const bottomSheetOptions: BottomSheetDataOptions = {
            owner: this,
            options,
            shownCallback: () => {
                this.bindingContext = fromObject(options.context);
                this._raiseShownBottomSheetEvent();
            },
            dismissCallback: () => this._onDismissBottomSheetCallback()
        };
        const dfListener = new com.nativescript.material.bottomsheet.BottomSheetDialogFragment.BottomSheetDialogFragmentListener({
            onCreateDialog(fragment: com.nativescript.material.bottomsheet.BottomSheetDialogFragment, savedInstanceState: android.os.Bundle): android.app.Dialog {
                const theme = fragment.getTheme();
                const dialogListener = new com.nativescript.material.bottomsheet.BottomSheetDialog.BottomSheetDialogListener({
                    onDetachedFromWindow(dialog: com.nativescript.material.bottomsheet.BottomSheetDialog) {
                        (dialog as any).nListener = null;
                    },

                    onBackPressed(dialog: com.nativescript.material.bottomsheet.BottomSheetDialog) {
                        if (!owner) {
                            return false;
                        }
                        const args = {
                            eventName: 'activityBackPressed',
                            object: owner,
                            activity: owner._context,
                            cancel: false
                        } as AndroidActivityBackPressedEventData;

                        // Fist fire application.android global event
                        Application.android.notify(args);
                        if (args.cancel) {
                            return true;
                        }

                        owner.notify(args);
                        if (!args.cancel) {
                            args.cancel = owner.onBackPressed();
                        }
                        return args.cancel;
                    }
                });
                const dialog = new com.nativescript.material.bottomsheet.BottomSheetDialog(fragment.getActivity(), theme);
                dialog.setListener(dialogListener);
                (dialog as any).nListener = dialogListener;
                if (bottomSheetOptions.options) {
                    const creationOptions = bottomSheetOptions.options;
                    if (creationOptions.dismissOnBackgroundTap !== undefined) {
                        dialog.setCanceledOnTouchOutside(creationOptions.dismissOnBackgroundTap);
                    }
                    if (creationOptions.disableDimBackground === true) {
                        dialog.getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_DIM_BEHIND);
                    }
                }
                return dialog;
            },

            onCreateView(
                fragment: com.nativescript.material.bottomsheet.BottomSheetDialogFragment,
                inflater: android.view.LayoutInflater,
                container: android.view.ViewGroup,
                savedInstanceState: android.os.Bundle
            ): android.view.View {
                owner._setupAsRootView(fragment.getActivity());
                owner._isAddedToNativeVisualTree = true;
                return owner.nativeViewProtected;
            },

            onStart(fragment: com.nativescript.material.bottomsheet.BottomSheetDialogFragment): void {
                const color = owner.backgroundColor;
                const contentViewId = getId('design_bottom_sheet');
                const view = fragment.getDialog().findViewById(contentViewId);
                const transparent = bottomSheetOptions.options && bottomSheetOptions.options.transparent;
                if (transparent === true) {
                    // we need delay it just a bit or it wont work
                    setTimeout(() => {
                        view.setBackground(null);
                    }, 0);
                }

                const behavior = com.google.android.material.bottomsheet.BottomSheetBehavior.from(view);
                // prevent hiding the bottom sheet by
                const dismissOnDraggingDownSheet = !bottomSheetOptions.options || bottomSheetOptions.options.dismissOnDraggingDownSheet !== false;
                behavior.setHideable(dismissOnDraggingDownSheet);
                if (!dismissOnDraggingDownSheet) {
                    // directly expand the bottom sheet after start
                    behavior.setState(com.google.android.material.bottomsheet.BottomSheetBehavior.STATE_EXPANDED);
                    // set to maximum possible value to prevent dragging the sheet between peek and expanded height
                    behavior.setPeekHeight(java.lang.Integer.MAX_VALUE);
                }

                if (owner && !owner.isLoaded) {
                    owner.callLoaded();
                }

                bottomSheetOptions.shownCallback();
            },

            onDismiss(fragment: com.nativescript.material.bottomsheet.BottomSheetDialogFragment, dialog: android.content.DialogInterface): void {
                const manager = fragment.getFragmentManager();
                if (manager) {
                    bottomSheetOptions.dismissCallback();
                }

                if (owner && owner.isLoaded) {
                    owner.callUnloaded();
                }
            },

            onDestroy(fragment: com.nativescript.material.bottomsheet.BottomSheetDialogFragment): void {
                (df as any).nListener = null;
                if (owner) {
                    // Android calls onDestroy before onDismiss.
                    // Make sure we unload first and then call _tearDownUI.
                    if (owner.isLoaded) {
                        owner.callUnloaded();
                    }
                    owner._isAddedToNativeVisualTree = false;
                    owner._tearDownUI(true);
                }
            }
        });
        const df = new com.nativescript.material.bottomsheet.BottomSheetDialogFragment();
        df.setListener(dfListener);
        (df as any).nListener = dfListener;
        this._bottomSheetFragment = df;
        this._raiseShowingBottomSheetEvent();
        //@ts-ignore
        df.show(parent._getRootFragmentManager(), domId.toString());
    }
}

let mixinInstalled = false;
export function overrideBottomSheet() {
    applyMixins(View, [ViewWithBottomSheetBase, ViewWithBottomSheet]);
}
export function install() {
    if (!mixinInstalled) {
        mixinInstalled = true;
        // overridePage();
        overrideBottomSheet();
    }
}
