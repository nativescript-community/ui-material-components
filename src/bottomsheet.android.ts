import { View } from "tns-core-modules/ui/core/view"
import { fromObject } from "tns-core-modules/data/observable/observable"
import {
    ViewWithBottomSheetBase
} from "./bottomsheet-common"
import { BottomSheetOptions } from "./bottomsheet";

let BottomSheetDialogFragment: BottomSheetDialogFragment

interface BottomSheetDialogFragment {
    new (): android.support.design.widget.BottomSheetDialogFragment
}

interface BottomSheetDataOptions {
    owner: View
    // fullscreen: boolean;
    // stretched: boolean;
    shownCallback: () => void
    dismissCallback: () => void
}
const DOMID = "_domId"
const androidBackPressedEvent = "androidBackPressed"
const bottomSheetMap = new Map<number, BottomSheetDataOptions>()

function saveBottomSheet(options: BottomSheetDataOptions) {
    bottomSheetMap.set(options.owner._domId, options)
}

function removeBottomSheet(domId: number) {
    bottomSheetMap.delete(domId)
}

function getBottomSheetOptions(domId: number): BottomSheetDataOptions {
    return bottomSheetMap.get(domId)
}

declare module "tns-core-modules/ui/core/view" {
    interface View {
        // _modalContext: any;
        _showNativeModalView(
            parent: View,
            context: any,
            closeCallback: Function,
            fullscreen?: boolean,
            animated?: boolean,
            stretched?: boolean
        )
        _bottomSheetFragment: android.support.design.widget.BottomSheetDialogFragment
        // _closeModalCallback: Function;

        _setupAsRootView(context: any): void
        callLoaded(): void
        callUnloaded(): void
        _removeFromFrameStack(): void
    }
}
function initializeBottomSheetDialogFragment() {
    if (BottomSheetDialogFragment) {
        return
    }

    class BottomSheetDialogFragmentImpl extends android.support.design.widget
        .BottomSheetDialogFragment {
        public owner: View
        private _fullscreen: boolean
        private _stretched: boolean
        private _shownCallback: () => void
        private _dismissCallback: () => void

        constructor() {
            super()
            return global.__native(this)
        }

        public onCreateDialog(
            savedInstanceState: android.os.Bundle
        ): android.app.Dialog {
            const ownerId = this.getArguments().getInt(DOMID)
            const options = getBottomSheetOptions(ownerId)
            this.owner = options.owner
            // this._fullscreen = options.fullscreen;
            // this._stretched = options.stretched;
            this._dismissCallback = options.dismissCallback
            this._shownCallback = options.shownCallback
            this.owner._bottomSheetFragment = this
            // this.setStyle(androidx.fragment.app.DialogFragment.STYLE_NO_TITLE, 0);

            const dialog = super.onCreateDialog(
                savedInstanceState
            ) as android.support.design.widget.BottomSheetDialog
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

            return dialog
        }

        public onCreateView(
            inflater: android.view.LayoutInflater,
            container: android.view.ViewGroup,
            savedInstanceState: android.os.Bundle
        ): android.view.View {
            const owner = this.owner
            owner._setupAsRootView(this.getActivity())
            owner._isAddedToNativeVisualTree = true

            return owner.nativeViewProtected
        }

        public onStart(): void {
            super.onStart()
            if (this._fullscreen) {
                const window = this.getDialog().getWindow()
                const length = android.view.ViewGroup.LayoutParams.MATCH_PARENT
                window.setLayout(length, length)
                // This removes the default backgroundDrawable so there are no margins.
                // window.setBackgroundDrawable(
                //     new android.graphics.drawable.ColorDrawable(
                //         android.graphics.Color.WHITE
                //     )
                // )
            }

            const owner = this.owner
            if (owner && !owner.isLoaded) {
                owner.callLoaded()
            }

            this._shownCallback()
        }

        public onDismiss(dialog: android.content.DialogInterface): void {
            super.onDismiss(dialog)
            const manager = this.getFragmentManager()
            if (manager) {
                removeBottomSheet(this.owner._domId)
                this._dismissCallback()
            }

            const owner = this.owner
            if (owner && owner.isLoaded) {
                owner.callUnloaded()
            }
        }

        public onDestroy(): void {
            super.onDestroy()
            const owner = this.owner
            owner._isAddedToNativeVisualTree = false
            owner._tearDownUI(true)
        }
    }

    BottomSheetDialogFragment = BottomSheetDialogFragmentImpl
}

export class ViewWithBottomSheet extends ViewWithBottomSheetBase {
    protected _hideNativeBottomSheet(
        parent: View,
        whenClosedCallback: () => void
    ) {
        const manager = this._bottomSheetFragment.getFragmentManager()
        if (manager) {
            this._bottomSheetFragment.dismissAllowingStateLoss()
        }

        this._bottomSheetFragment = null
        whenClosedCallback()
    }

    protected _showNativeBottomSheet(
        parent: View,
        options: BottomSheetOptions
    ) {
        super._showNativeBottomSheet(parent, options)
        // if (!this.backgroundColor) {
        //     this.backgroundColor = new Color("White");
        // }

        initializeBottomSheetDialogFragment()

        const df = new BottomSheetDialogFragment()
        const args = new android.os.Bundle()
        args.putInt(DOMID, this._domId)
        df.setArguments(args)

        const bottomSheetOptions: BottomSheetDataOptions = {
            owner: this,
            // fullscreen: !!fullscreen,
            // stretched: !!stretched,
            shownCallback: () => {
                this.bindingContext = fromObject(options.context)
                this._raiseShownBottomSheetEvent()
            },
            dismissCallback: () => this.closeBottomSheet()
        }

        saveBottomSheet(bottomSheetOptions)

        this._bottomSheetFragment = df
        this._raiseShowingBottomSheetEvent()

        this._bottomSheetFragment.show(
            (<any>parent)._getRootFragmentManager(),
            this._domId.toString()
        )
    }
}
