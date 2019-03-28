import { View } from 'tns-core-modules/ui/core/view';
import { createViewFromEntry } from 'tns-core-modules/ui/builder/builder';
import { eachDescendant, EventData, Frame, ViewBase } from 'tns-core-modules/ui/frame/frame';

declare module 'tns-core-modules/ui/core/view' {
    interface View {
        showBottomSheet(options: BottomSheetOptions): ViewBase;
        _setupAsRootView(context: any): void;
        callLoaded(): void;
        callUnloaded(): void;
        _removeFromFrameStack(): void;
    }
}

export interface ShownBottomSheetData extends EventData {
    /**
     * The context (optional, may be undefined) passed to the view when shown modally.
     */
    context?: any;

    /**
     * A callback to call when you want to close the modally shown view.
     * Pass in any kind of arguments and you will receive when the callback parameter
     * of View.showModal is executed.
     */
    closeCallback?: Function;
}

export const shownInBottomSheetEvent = 'shownInBottomSheet';
export const showingInBottomSheetEvent = 'showingInBottomSheet';

export interface BottomSheetOptions {
    view: string | ViewBase; // View instance to be shown in bottom sheet. Or the name of the module to load starting from the application root.
    context?: any; // Any context you want to pass to the view shown in bottom sheet. This same context will be available in the arguments of the shownInBottomSheet event handler.
    animated?: boolean; // An optional parameter specifying whether to show the sheet view with animation.
    dismissOnBackgroundTap?: boolean; // An optional parameter specifying whether to dismiss the sheet when clicking on background.
    closeCallback?: Function; //  A function that will be called when the view is closed. Any arguments provided when calling shownInBottomSheet.closeCallback will be available here.
    trackingScrollView?: string; // optional id of the scroll view to track
}

export abstract class ViewWithBottomSheetBase extends View {
    protected _closeBottomSheetCallback: Function;
    protected abstract _hideNativeBottomSheet(parent, whenClosedCallback);
    protected _bottomSheetContext: any;
    _raiseShownBottomSheetEvent() {
        const args: ShownBottomSheetData = {
            eventName: shownInBottomSheetEvent,
            object: this,
            context: this._bottomSheetContext,
            closeCallback: this._closeBottomSheetCallback
        };

        this.notify(args);
    }
    public _bottomSheetClosed(): void {
        if (this instanceof Frame) {
            this._removeFromFrameStack();
        }
        eachDescendant(this, (child: ViewWithBottomSheetBase) => {
            child._bottomSheetClosed();
            return true;
        });
    }
    protected _showNativeBottomSheet(parent: View, options: BottomSheetOptions) {
        this._bottomSheetContext = options.context;
        const that = this;
        this._closeBottomSheetCallback = function(...originalArgs) {
            if (that._closeBottomSheetCallback) {
                // const modalIndex = _rootModalViews.indexOf(that);
                // _rootModalViews.splice(modalIndex);
                // that._modalParent = null;
                that._bottomSheetContext = null;
                that._closeBottomSheetCallback = null;
                that._bottomSheetClosed();
                // parent._modal = null;

                const whenClosedCallback = () => {
                    if (typeof options.closeCallback === 'function') {
                        options.closeCallback.apply(undefined, originalArgs);
                    }
                };

                that._hideNativeBottomSheet(parent, whenClosedCallback);
            }
        };
        options.context.closeCallback = this._closeBottomSheetCallback;
    }
    protected _raiseShowingBottomSheetEvent() {
        const args: ShownBottomSheetData = {
            eventName: showingInBottomSheetEvent,
            object: this,
            context: this._bottomSheetContext,
            closeCallback: this._closeBottomSheetCallback
        };
        this.notify(args);
    }
    public closeBottomSheet(...args) {
        let closeCallback = this._closeBottomSheetCallback;
        if (closeCallback) {
            closeCallback.apply(undefined, arguments);
        } else {
            let parent = this.parent as ViewWithBottomSheetBase;
            if (parent) {
                parent.closeBottomSheet(...args);
            }
        }
    }

    public showBottomSheet(options: BottomSheetOptions): ViewBase {
        if (arguments.length === 0) {
            throw new Error('showModal without parameters is deprecated. Please call showModal on a view instance instead.');
        } else {
            // const fullscreen: boolean = arguments[3];
            // const animated = arguments[4];
            // const stretched = arguments[5];

            const view = options.view instanceof View ? (options.view as ViewWithBottomSheetBase) : <ViewWithBottomSheetBase>createViewFromEntry({
                          moduleName: options.view as string
                      });

            view._showNativeBottomSheet(this, options);
            return view;
        }
    }
}
