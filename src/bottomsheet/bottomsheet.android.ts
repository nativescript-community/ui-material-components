import { View, Color } from '@nativescript/core/ui/core/view';
import { fromObject } from '@nativescript/core/data/observable';
import { BottomSheetOptions, ViewWithBottomSheetBase } from './bottomsheet-common';
import { applyMixins } from 'nativescript-material-core/core';
import { android as androidApp, AndroidActivityBackPressedEventData } from '@nativescript/core/application';

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

function getId(id: string) {
    const context: android.content.Context = androidApp.context;
    return context.getResources().getIdentifier(id, 'id', context.getPackageName());
}

function saveBottomSheet(options: BottomSheetDataOptions) {
    bottomSheetMap.set(options.owner._domId, options);
}

function removeBottomSheet(domId: number) {
    bottomSheetMap.delete(domId);
}

function getBottomSheetOptions(domId: number): BottomSheetDataOptions {
    return bottomSheetMap.get(domId);
}

declare module '@nativescript/core/ui/core/view' {
    interface View {
        _bottomSheetFragment: com.google.android.material.bottomsheet.BottomSheetDialogFragment;
    }
}

let BottomSheetDialogFragment: BottomSheetDialogFragment;

interface BottomSheetDialogFragment {
    new (): com.google.android.material.bottomsheet.BottomSheetDialogFragment;
}
function initializeBottomSheetDialogFragment() {
    if (BottomSheetDialogFragment) {
        return;
    }

    class DialogImpl extends com.google.android.material.bottomsheet.BottomSheetDialog {
        constructor(public fragment: BottomSheetDialogFragmentImpl, context: android.content.Context, themeResId: number) {
            super(context, themeResId);

            return global.__native(this);
        }

        public onDetachedFromWindow(): void {
            super.onDetachedFromWindow();
            this.fragment = null;
        }

        public onBackPressed(): void {
            const view = this.fragment.owner;
            const args = <AndroidActivityBackPressedEventData>{
                eventName: 'activityBackPressed',
                object: view,
                activity: view._context,
                cancel: false
            };

            // Fist fire application.android global event
            androidApp.notify(args);
            if (args.cancel) {
                return;
            }

            view.notify(args);

            if (!args.cancel && !view.onBackPressed()) {
                super.onBackPressed();
            }
        }
    }

    class BottomSheetDialogFragmentImpl extends com.google.android.material.bottomsheet.BottomSheetDialogFragment {
        public owner: View;
        private _transparent: boolean;
        // private _fullscreen: boolean;
        // private _stretched: boolean;
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
            let theme = this.getTheme();
            // if (this._fullscreen) {
            //     // In fullscreen mode, get the application's theme.
            //     theme = this.getActivity().getApplicationInfo().theme;
            // }

            const dialog = new DialogImpl(this, this.getActivity(), theme);
            // const dialog = super.onCreateDialog(savedInstanceState) as com.google.android.material.bottomsheet.BottomSheetDialog;
            if (options.options) {
                const creationOptions = options.options;
                this._transparent = creationOptions.transparent;
                if (creationOptions.dismissOnBackgroundTap !== undefined) {
                    dialog.setCanceledOnTouchOutside(creationOptions.dismissOnBackgroundTap);
                }
                // if (creationOptions.cancelable !== undefined) {
                //     dialog.setCancelable(creationOptions.cancelable);
                // }
            }
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
            const owner = this.owner;

            const color = owner.backgroundColor;
            // const window = this.getDialog().getWindow();

            // if (this._fullscreen) {
            //     const length = android.view.ViewGroup.LayoutParams.MATCH_PARENT;
            //     window.setLayout(length, length);
            //     window.setBackgroundDrawable(null);
            // }
            if (this._transparent === true) {
                const contentViewId = getId('design_bottom_sheet');
                const view = this.getDialog().findViewById(contentViewId);
                // we need delay it just a bit or it wont work
                setTimeout(() => {
                    view.setBackground(null);
                }, 0);
            }

            

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
    }

    BottomSheetDialogFragment = BottomSheetDialogFragmentImpl;
}

export class ViewWithBottomSheet extends ViewWithBottomSheetBase {
    _bottomSheetFragment: com.google.android.material.bottomsheet.BottomSheetDialogFragment;
    protected _hideNativeBottomSheet(parent: View, whenClosedCallback: () => void) {
        const manager = this._bottomSheetFragment.getFragmentManager();
        if (manager) {
            this._bottomSheetFragment.dismissAllowingStateLoss();
        }

        this._bottomSheetFragment = null;
        whenClosedCallback();
    }

    protected _showNativeBottomSheet(parent: View, options: BottomSheetOptions) {
        this._commonShowNativeBottomSheet(parent, options);
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
            dismissCallback: () => this._whenCloseBottomSheetCallback()
        };

        saveBottomSheet(bottomSheetOptions);

        this._bottomSheetFragment = df;
        this._raiseShowingBottomSheetEvent();

        // const activity = androidApp.foregroundActivity as androidx.appcompat.app.AppCompatActivity;
        // this._bottomSheetFragment.show(activity.getSupportFragmentManager(), this._domId.toString());

        this._bottomSheetFragment.show((<any>parent)._getRootFragmentManager(), this._domId.toString());
    }
}

let mixinInstalled = false;
export function overrideBottomSheet() {
    const NSView = require('@nativescript/core/ui/core/view/view').View;
    applyMixins(NSView, [ViewWithBottomSheetBase, ViewWithBottomSheet]);
}
export function install() {
    if (!mixinInstalled) {
        mixinInstalled = true;
        // overridePage();
        overrideBottomSheet();
    }
}
