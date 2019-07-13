import { View } from 'tns-core-modules/ui/core/view/view';
import { fromObject } from 'tns-core-modules/data/observable';
import { BottomSheetOptions, ViewWithBottomSheetBase } from './bottomsheet-common';
import { applyMixins } from 'nativescript-material-core/core';

interface BottomSheetDataOptions {
    owner: View;
    options: BottomSheetOptions;
    // fullscreen: boolean;
    // stretched: boolean;
    shownCallback: () => void;
    dismissCallback: () => void;
}
const DOMID = '_domId';
const bottomSheetMap = new Map<number, BottomSheetDataOptions>();

function saveBottomSheet(options: BottomSheetDataOptions) {
    bottomSheetMap.set(options.owner._domId, options);
}

function removeBottomSheet(domId: number) {
    bottomSheetMap.delete(domId);
}

function getBottomSheetOptions(domId: number): BottomSheetDataOptions {
    return bottomSheetMap.get(domId);
}

declare module 'tns-core-modules/ui/core/view' {
    interface View {
        _bottomSheetFragment: android.support.design.widget.BottomSheetDialogFragment;
    }
}

let BottomSheetDialogFragment: BottomSheetDialogFragment;

interface BottomSheetDialogFragment {
    new (): android.support.design.widget.BottomSheetDialogFragment;
}
function initializeBottomSheetDialogFragment() {
    if (BottomSheetDialogFragment) {
        return;
    }

    class BottomSheetDialogFragmentImpl extends android.support.design.widget.BottomSheetDialogFragment {
        public owner: View;
        private _fullscreen: boolean;
        private _stretched: boolean;
        private _shownCallback: () => void;
        private _dismissCallback: () => void;

        constructor() {
            super();
            return global.__native(this);
        }

        public onCreateDialog(savedInstanceState: android.os.Bundle): android.app.Dialog {
            const ownerId = this.getArguments().getInt(DOMID);
            const options = getBottomSheetOptions(ownerId);
            this.owner = options.owner;
            // this._fullscreen = options.fullscreen;
            // this._stretched = options.stretched;
            this._dismissCallback = options.dismissCallback;
            this._shownCallback = options.shownCallback;
            (this.owner as ViewWithBottomSheetBase)._bottomSheetFragment = this;
            // this.setStyle(androidx.fragment.app.DialogFragment.STYLE_NO_TITLE, 0);

            const dialog = super.onCreateDialog(savedInstanceState) as android.support.design.widget.BottomSheetDialog;
            if (options.options) {
                const creationOptions = options.options;
                if (creationOptions.dismissOnBackgroundTap !== undefined) {
                    dialog.setCanceledOnTouchOutside(creationOptions.dismissOnBackgroundTap);
                }
                // if (creationOptions.cancelable !== undefined) {
                //     dialog.setCancelable(creationOptions.cancelable);
                // }
            }
            // const dialog = new DialogImpl(this, this.getActivity(), this.getTheme());

            // do not override alignment unless fullscreen modal will be shown;
            // otherwise we might break component-level layout:
            // https://github.com/NativeScript/NativeScript/issues/5392
            // if (!this._fullscreen && !this._stretched) {
            //     this.owner.horizontalAlignment = "center";
            //     this.owner.verticalAlignment = "middle";
            // } else {
            //     this.owner.horizontalAlignment = "stretch";
            //     this.owner.verticalAlignment = "stretch";
            // }

            return dialog;
        }

        public onCreateView(inflater: android.view.LayoutInflater, container: android.view.ViewGroup, savedInstanceState: android.os.Bundle): android.view.View {
            const owner = this.owner;
            owner._setupAsRootView(this.getActivity());
            owner._isAddedToNativeVisualTree = true;

            return owner.nativeViewProtected;
        }

        public onStart(): void {
            super.onStart();
            if (this._fullscreen) {
                const window = this.getDialog().getWindow();
                const length = android.view.ViewGroup.LayoutParams.MATCH_PARENT;
                window.setLayout(length, length);
                // This removes the default backgroundDrawable so there are no margins.
                // window.setBackgroundDrawable(
                //     new android.graphics.drawable.ColorDrawable(
                //         android.graphics.Color.WHITE
                //     )
                // )
            }

            const owner = this.owner;
            if (owner && !owner.isLoaded) {
                owner.callLoaded();
            }

            this._shownCallback();
        }

        public onDismiss(dialog: android.content.DialogInterface): void {
            super.onDismiss(dialog);
            const manager = this.getFragmentManager();
            if (manager) {
                removeBottomSheet(this.owner._domId);
                this._dismissCallback();
            }

            const owner = this.owner;
            if (owner && owner.isLoaded) {
                owner.callUnloaded();
            }
        }

        public onDestroy(): void {
            super.onDestroy();
            const owner = this.owner;
            owner._isAddedToNativeVisualTree = false;
            owner._tearDownUI(true);
        }
    }

    BottomSheetDialogFragment = BottomSheetDialogFragmentImpl;
}

export class ViewWithBottomSheet extends ViewWithBottomSheetBase {
    _bottomSheetFragment: android.support.design.widget.BottomSheetDialogFragment;
    protected _hideNativeBottomSheet(parent: View, whenClosedCallback: () => void) {
        const manager = this._bottomSheetFragment.getFragmentManager();
        if (manager) {
            this._bottomSheetFragment.dismissAllowingStateLoss();
        }

        this._bottomSheetFragment = null;
        whenClosedCallback();
    }

    protected _showNativeBottomSheet(parent: View, options: BottomSheetOptions) {
        super._showNativeBottomSheet(parent, options);
        // if (!this.backgroundColor) {
        //     this.backgroundColor = new Color("White");
        // }

        initializeBottomSheetDialogFragment();

        const df = new BottomSheetDialogFragment();
        const args = new android.os.Bundle();
        args.putInt(DOMID, this._domId);
        df.setArguments(args);

        const bottomSheetOptions: BottomSheetDataOptions = {
            owner: this,
            options: options,
            // fullscreen: !!fullscreen,
            // stretched: !!stretched,
            shownCallback: () => {
                this.bindingContext = fromObject(options.context);
                this._raiseShownBottomSheetEvent();
            },
            dismissCallback: () => this.closeBottomSheet()
        };

        saveBottomSheet(bottomSheetOptions);

        this._bottomSheetFragment = df;
        this._raiseShowingBottomSheetEvent();

        this._bottomSheetFragment.show((<any>parent)._getRootFragmentManager(), this._domId.toString());
    }
}

export function overrideBottomSheet() {
    const NSView = require('tns-core-modules/ui/core/view/view').View;
    console.log('about to override bottom sheet');
    applyMixins(NSView, [ViewWithBottomSheetBase, ViewWithBottomSheet]);
}
export function install() {
    // overridePage();
    overrideBottomSheet();
}
