import { ViewWithBottomSheetBase } from "./bottomsheet-common"
import {
    View,
    ios,
    traceWrite,
    traceCategories,
    traceError,
    traceMessageType
} from "tns-core-modules/ui/core/view"
import { ios as iosUtils } from "tns-core-modules/utils/utils"
import { BottomSheetOptions } from "./bottomsheet"
import { fromObject } from "tns-core-modules/data/observable/observable"


class MDCBottomSheetControllerDelegateImpl extends NSObject implements MDCBottomSheetControllerDelegate {
    public static ObjCProtocols = [MDCBottomSheetControllerDelegate];

    private _owner: WeakRef<ViewWithBottomSheet>;

    public static initWithOwner(owner: WeakRef<ViewWithBottomSheet>): MDCBottomSheetControllerDelegateImpl {
        const impl = <MDCBottomSheetControllerDelegateImpl>MDCBottomSheetControllerDelegateImpl.new();
        impl._owner = owner;
        return impl;
    }
	bottomSheetControllerDidDismissBottomSheet(controller: MDCBottomSheetController) {
        const owner = this._owner.get();
        console.log('bottomSheetControllerDidDismissBottomSheet', !!owner);
        if (owner) {
            owner.closeBottomSheet()
            if (owner && owner.isLoaded) {
                owner.callUnloaded()
            }
        }
    }
}

export class ViewWithBottomSheet extends ViewWithBottomSheetBase {
    protected _showNativeBottomSheet(
        parent: View,
        options: BottomSheetOptions
    ) {
        const parentWithController = ios.getParentWithViewController(parent)
        if (!parentWithController) {
            traceWrite(
                `Could not find parent with viewController for ${parent} while showing bottom sheet view.`,
                traceCategories.ViewHierarchy,
                traceMessageType.error
            )
            return
        }

        const parentController = parentWithController.viewController
        if (parentController.presentedViewController) {
            traceWrite(
                "Parent is already presenting view controller. Close the current bottom sheet page before showing another one!",
                traceCategories.ViewHierarchy,
                traceMessageType.error
            )
            return
        }

        if (!parentController.view || !parentController.view.window) {
            traceWrite(
                "Parent page is not part of the window hierarchy.",
                traceCategories.ViewHierarchy,
                traceMessageType.error
            )
            return
        }

        this._setupAsRootView({})

        super._showNativeBottomSheet(parentWithController, options)
        let controller = this.viewController
        if (!controller) {
            const nativeView = this.ios || this.nativeViewProtected
            controller = ios.UILayoutViewController.initWithOwner(
                new WeakRef(this)
            )

            if (nativeView instanceof UIView) {
                controller.view.addSubview(nativeView)
            }

            this.viewController = controller
        }

        controller.modalPresentationStyle = UIModalPresentationStyle.FormSheet

        this.horizontalAlignment = "stretch"
        this.verticalAlignment = "stretch"

        this._raiseShowingBottomSheetEvent()
        // animated = animated === undefined ? true : !!animated;
        const bottomSheet = MDCBottomSheetController.alloc().initWithContentViewController(
            controller
        )
        bottomSheet.delegate = MDCBottomSheetControllerDelegateImpl.initWithOwner(new WeakRef(this));
        bottomSheet.isScrimAccessibilityElement = true
        bottomSheet.scrimAccessibilityLabel = "close"
        bottomSheet.dismissOnBackgroundTap =
            options.dismissOnBackgroundTap !== false
        
        if (options.trackingScrollView) {
            const scrollView = this.getViewById(options.trackingScrollView)
            if (
                scrollView &&
                scrollView.nativeViewProtected instanceof UIScrollView
            ) {
                console.log('setting trackingScrollView', options.trackingScrollView);
                bottomSheet.trackingScrollView = scrollView.nativeViewProtected
            }
        }
        ;(<any>controller).animated = true
        parentController.presentViewControllerAnimatedCompletion(
            bottomSheet,
            true,
            null
        )
        if (!this.backgroundColor) {
            this.backgroundColor = "white"
            bottomSheet.view.backgroundColor = UIColor.whiteColor
        } else {
            bottomSheet.view.backgroundColor = this.style.backgroundColor.ios;

        }
        const transitionCoordinator = iosUtils.getter(
            bottomSheet,
            bottomSheet.transitionCoordinator
        )
        if (transitionCoordinator) {
            UIViewControllerTransitionCoordinator.prototype.animateAlongsideTransitionCompletion.call(
                transitionCoordinator,
                null,
                () => {
                    ;(this.bindingContext = fromObject(options.context)),
                        this._raiseShownBottomSheetEvent()
                }
            )
        } else {
            // Apparently iOS 9+ stops all transitions and animations upon application suspend and transitionCoordinator becomes null here in this case.
            // Since we are not waiting for any transition to complete, i.e. transitionCoordinator is null, we can directly raise our shownInBottomSheet event.
            // Take a look at https://github.com/NativeScript/NativeScript/issues/2173 for more info and a sample project.
            this.bindingContext = fromObject(options.context)
            this._raiseShownBottomSheetEvent()
        }
    }


    protected _hideNativeBottomSheet(
        parent: View,
        whenClosedCallback: () => void
    ) {
        console.log('_hideNativeBottomSheet', parent && parent.viewController);
        if (!parent || !parent.viewController) {
            traceError(
                "Trying to hide bottomsheet view but no parent with viewController specified."
            )
            return
        }

        const parentController = parent.viewController
        const animated = (<any>this.viewController).animated
        whenClosedCallback();
        parentController.dismissViewControllerAnimatedCompletion(
            animated,
            whenClosedCallback
        )
    }
}
