import {
    View,
    View as ViewDefinition,
    EventData,
    eachDescendant
} from "tns-core-modules/ui/core/view"
import { ViewRef_ } from "@angular/core/src/view"
import { createViewFromEntry } from "tns-core-modules/ui/builder"
import { fromObject } from "tns-core-modules/data/observable/observable"
import { Frame } from "tns-core-modules/ui/frame/frame";

let BottomSheetDialogFragment: BottomSheetDialogFragment

interface BottomSheetDialogFragment {
    new (): android.support.design.widget.BottomSheetDialogFragment
}

interface BottomSheetOptions {
    owner: View
    // fullscreen: boolean;
    // stretched: boolean;
    shownCallback: () => void
    dismissCallback: () => void
}
const DOMID = "_domId"
const androidBackPressedEvent = "androidBackPressed"
const bottomSheetMap = new Map<number, BottomSheetOptions>()

function saveBottomSheet(options: BottomSheetOptions) {
    bottomSheetMap.set(options.owner._domId, options)
}

function removeBottomSheet(domId: number) {
    bottomSheetMap.delete(domId)
}

function getBottomSheetOptions(domId: number): BottomSheetOptions {
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

export interface ShownBottomSheetData extends EventData {
    /**
     * The context (optional, may be undefined) passed to the view when shown modally.
     */
    context?: any

    /**
     * A callback to call when you want to close the modally shown view.
     * Pass in any kind of arguments and you will receive when the callback parameter
     * of View.showModal is executed.
     */
    closeCallback?: Function
}
export const shownInBottomSheetEvent = "shownInBottomSheet"
export const showingInBottomSheetEvent = "showingInBottomSheet"

export class ViewWithBottomSheet extends ViewDefinition {
    protected _closeBottomSheetCallback: Function;
    protected _bottomSheetContext: any;
    _raiseShownBottomSheetEvent() {
        console.log('_raiseShownBottomSheetEvent', this);
        const args: ShownBottomSheetData = {
            eventName: shownInBottomSheetEvent,
            object: this,
            context:this._bottomSheetContext,
            closeCallback:this._closeBottomSheetCallback
        }

        this.notify(args)
    }
    protected _raiseShowingBottomSheetEvent() {
        console.log('_raiseShowingBottomSheetEvent');
        const args: ShownBottomSheetData = {
            eventName: showingInBottomSheetEvent,
            object: this,
            context:this._bottomSheetContext,
            closeCallback:this._closeBottomSheetCallback
        }
        this.notify(args)
    }
    protected _hideNativeBottomSheet(parent: View, whenClosedCallback: () => void) {
        const manager = this._bottomSheetFragment.getFragmentManager();
        if (manager) {
            this._bottomSheetFragment.dismissAllowingStateLoss();
        }

        this._bottomSheetFragment = null;
        whenClosedCallback();
    }
    public closeBottomSheet(...args) {
        let closeCallback = this._closeBottomSheetCallback;
        if (closeCallback) {
            closeCallback.apply(undefined, arguments);
        } else {
            let parent = this.parent as ViewWithBottomSheet;
            if (parent) {
                parent.closeBottomSheet(...args);
            }
        }
    }
    public _bottomSheetClosed(): void {
        if (this instanceof Frame) {
            this._removeFromFrameStack();
        }
        eachDescendant(this, (child: ViewWithBottomSheet) => {
            child._bottomSheetClosed();
            return true;
        });
    }
    protected _showNativeBottomSheet(
        parent: View,
        context: any,
        closeCallback: Function
    ) {
        // super._showNativeModalView(parent, context, closeCallback)
        // if (!this.backgroundColor) {
        //     this.backgroundColor = new Color("White");
        // }

        this._bottomSheetContext = context;
        const that = this;
        this._closeBottomSheetCallback = function (...originalArgs) {
            if (that._closeBottomSheetCallback) {
                // const modalIndex = _rootModalViews.indexOf(that);
                // _rootModalViews.splice(modalIndex);
                // that._modalParent = null;
                that._bottomSheetContext = null;
                that._closeBottomSheetCallback = null;
                that._bottomSheetClosed();
                // parent._modal = null;

                const whenClosedCallback = () => {
                    if (typeof closeCallback === "function") {
                        closeCallback.apply(undefined, originalArgs);
                    }
                }

                that._hideNativeBottomSheet(parent, whenClosedCallback);
            }
        };
        context.closeCallback = this._closeBottomSheetCallback;

        initializeBottomSheetDialogFragment()

        const df = new BottomSheetDialogFragment()
        const args = new android.os.Bundle()
        args.putInt(DOMID, this._domId)
        df.setArguments(args)

        const bottomSheetOptions: BottomSheetOptions = {
            owner: this,
            // fullscreen: !!fullscreen,
            // stretched: !!stretched,
            shownCallback: () => {
                this.bindingContext = fromObject(context)
                this._raiseShownBottomSheetEvent();
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
    public showBottomSheet(): ViewWithBottomSheet {
        if (arguments.length === 0) {
            throw new Error(
                "showModal without parameters is deprecated. Please call showModal on a view instance instead."
            )
        } else {
            const firstAgrument = arguments[0]
            const context: any = arguments[1]
            const closeCallback: Function = arguments[2]
            // const fullscreen: boolean = arguments[3];
            // const animated = arguments[4];
            // const stretched = arguments[5];

            const view =
                firstAgrument instanceof ViewWithBottomSheet
                    ? firstAgrument
                    : <ViewWithBottomSheet>(
                          createViewFromEntry({ moduleName: firstAgrument })
                      )

            view._showNativeBottomSheet(this, context, closeCallback)
            return view
        }
    }
}
