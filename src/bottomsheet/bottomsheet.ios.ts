import { ViewWithBottomSheetBase } from './bottomsheet-common';
import { ios, traceCategories, traceError, traceMessageType, traceWrite, View } from 'tns-core-modules/ui/core/view/view';
import { ViewBase } from 'tns-core-modules/ui/core/view-base';
import { ios as iosUtils, layout } from 'tns-core-modules/utils/utils';
import * as application from 'tns-core-modules/application';
import { BottomSheetOptions } from './bottomsheet';
import { fromObject } from 'tns-core-modules/data/observable';
import { applyMixins } from 'nativescript-material-core/core';

class MDCBottomSheetControllerDelegateImpl extends NSObject implements MDCBottomSheetControllerDelegate {
    public static ObjCProtocols = [MDCBottomSheetControllerDelegate];

    private _owner: WeakRef<ViewWithBottomSheet>;

    public static initWithOwner(owner: WeakRef<ViewWithBottomSheet>): MDCBottomSheetControllerDelegateImpl {
        const impl = <MDCBottomSheetControllerDelegateImpl>MDCBottomSheetControllerDelegateImpl.new();
        impl._owner = owner;
        return impl;
    }
    bottomSheetControllerDidDismissBottomSheet(controller: MDCBottomSheetController) {
        // called when clicked on background
        const owner = this._owner.get();
        if (owner) {
            owner._whenCloseBottomSheetCallback && owner._whenCloseBottomSheetCallback();
            if (owner && owner.isLoaded) {
                owner.callUnloaded();
            }
        }
    }
    bottomSheetControllerStateChangedState(controller: MDCBottomSheetController, state: MDCSheetState) {
        // called when swiped
        if (state === MDCSheetState.Closed) {
            const owner = this._owner.get();
            if (owner) {
                owner._whenCloseBottomSheetCallback && owner._whenCloseBottomSheetCallback();
                if (owner && owner.isLoaded) {
                    owner.callUnloaded();
                }
            }
        }
    }
}

declare module 'tns-core-modules/ui/core/view/view' {
    interface View {
        _setLayoutFlags(left: number, top: number, right: number, bottom: number);
    }
    namespace ios {
        interface UILayoutViewController extends UIViewController {
            owner: WeakRef<View>;
        }
    }
}

class BottomSheetUILayoutViewController extends UIViewController {
    public owner: WeakRef<View>;

    public static initWithOwner(owner: WeakRef<View>): BottomSheetUILayoutViewController {
        const controller = <BottomSheetUILayoutViewController>BottomSheetUILayoutViewController.new();
        controller.owner = owner;
        return controller;
    }

    public viewDidLayoutSubviews(): void {
        super.viewDidLayoutSubviews();
        const owner = this.owner.get();
        if (owner) {
            this.layoutView(this, owner);
        }
    }

    public viewWillAppear(animated: boolean): void {
        super.viewWillAppear(animated);
        const owner = this.owner.get();
        if (!owner) {
            return;
        }

        ios.updateAutoAdjustScrollInsets(this, owner);

        if (!owner.parent) {
            owner.callLoaded();
        }
    }

    layoutView(controller: UIViewController, owner: View): void {
        // the safe area of the controller is not correct. I think materialcomponents ios is changing the safeArea of the controller
        // let s look at the app root controller to get fulllscreen safe area
        let layoutGuide = controller.view.safeAreaLayoutGuide;
        const fullscreen = controller.view.frame;
        const safeArea = layoutGuide.layoutFrame;
        let position = ios.getPositionFromFrame(safeArea);
        const safeAreaSize = safeArea.size;

        const hasChildViewControllers = controller.childViewControllers.count > 0;
        if (hasChildViewControllers) {
            position = ios.getPositionFromFrame(fullscreen);
        }

        const safeAreaWidth = layout.round(layout.toDevicePixels(safeAreaSize.width));
        const safeAreaHeight = layout.round(layout.toDevicePixels(safeAreaSize.height));

        const widthSpec = layout.makeMeasureSpec(safeAreaWidth, layout.EXACTLY);
        const heightSpec = layout.makeMeasureSpec(safeAreaHeight, layout.UNSPECIFIED);

        View.measureChild(null, owner, widthSpec, heightSpec);
        View.layoutChild(null, owner, position.left, -ios.getPositionFromFrame(safeArea).top, position.right, owner.getMeasuredHeight());
        this.preferredContentSize = CGSizeMake(layout.toDeviceIndependentPixels(owner.getMeasuredWidth()), layout.toDeviceIndependentPixels(owner.getMeasuredHeight()));

        this.layoutParent(owner.parent);
    }

    layoutParent(view: ViewBase): void {
        if (!view) {
            return;
        }

        if (view instanceof View && view.nativeViewProtected) {
            const frame = view.nativeViewProtected.frame;
            const origin = frame.origin;
            const size = frame.size;
            const left = layout.toDevicePixels(origin.x);
            const top = layout.toDevicePixels(origin.y);
            const width = layout.toDevicePixels(size.width);
            const height = layout.toDevicePixels(size.height);
            view._setLayoutFlags(left, top, width + left, height + top);
        }

        this.layoutParent(view.parent);
    }

    public viewDidDisappear(animated: boolean): void {
        super.viewDidDisappear(animated);
        const owner = this.owner.get();
        if (owner && !owner.parent) {
            owner.callUnloaded();
        }
    }
}

export class ViewWithBottomSheet extends ViewWithBottomSheetBase {
    bottomSheetControllerDelegate: MDCBottomSheetControllerDelegateImpl;
    bottomSheetController: MDCBottomSheetController;
    protected _showNativeBottomSheet(parent: View, options: BottomSheetOptions) {
        options.context = options.context || {};
        const parentWithController = ios.getParentWithViewController(parent);
        if (!parentWithController) {
            traceWrite(`Could not find parent with viewController for ${parent} while showing bottom sheet view.`, traceCategories.ViewHierarchy, traceMessageType.error);
            return;
        }

        const parentController = parentWithController.viewController;
        if (parentController.presentedViewController) {
            traceWrite('Parent is already presenting view controller. Close the current bottom sheet page before showing another one!', traceCategories.ViewHierarchy, traceMessageType.error);
            return;
        }

        if (!parentController.view || !parentController.view.window) {
            traceWrite('Parent page is not part of the window hierarchy.', traceCategories.ViewHierarchy, traceMessageType.error);
            return;
        }

        this._setupAsRootView({});

        super._showNativeBottomSheet(parentWithController, options);
        let controller = this.viewController;
        if (!controller) {
            const nativeView = this.ios || this.nativeViewProtected;
            controller = BottomSheetUILayoutViewController.initWithOwner(new WeakRef(this));
            if (nativeView instanceof UIView) {
                controller.view.addSubview(nativeView);
            }

            this.viewController = controller; // store the viewController so that safeArea overflow is applied correctly
        }

        controller.modalPresentationStyle = UIModalPresentationStyle.FormSheet;

        this.horizontalAlignment = 'stretch';
        this.verticalAlignment = 'stretch';

        this._raiseShowingBottomSheetEvent();
        // animated = animated === undefined ? true : !!animated;
        const bottomSheet = (this.bottomSheetController = MDCBottomSheetController.alloc().initWithContentViewController(controller));
        this.bottomSheetControllerDelegate = bottomSheet.delegate = MDCBottomSheetControllerDelegateImpl.initWithOwner(new WeakRef(this));
        bottomSheet.isScrimAccessibilityElement = true;
        bottomSheet.scrimAccessibilityLabel = 'close';
        bottomSheet.dismissOnBackgroundTap = options.dismissOnBackgroundTap !== false;

        if (options.trackingScrollView) {
            const scrollView = this.getViewById(options.trackingScrollView);
            if (scrollView && scrollView.nativeViewProtected instanceof UIScrollView) {
                bottomSheet.trackingScrollView = scrollView.nativeViewProtected;
            }
        }
        (<any>controller).animated = true;
        parentController.presentViewControllerAnimatedCompletion(bottomSheet, true, null);
        if (!this.backgroundColor) {
            this.backgroundColor = 'white';
            bottomSheet.view.backgroundColor = UIColor.whiteColor;
        } else {
            bottomSheet.view.backgroundColor = this.style.backgroundColor.ios;
        }
        const transitionCoordinator = bottomSheet.transitionCoordinator;
        if (transitionCoordinator) {
            UIViewControllerTransitionCoordinator.prototype.animateAlongsideTransitionCompletion.call(transitionCoordinator, null, () => {
                (this.bindingContext = fromObject(options.context)), this._raiseShownBottomSheetEvent();
            });
        } else {
            // Apparently iOS 9+ stops all transitions and animations upon application suspend and transitionCoordinator becomes null here in this case.
            // Since we are not waiting for any transition to complete, i.e. transitionCoordinator is null, we can directly raise our shownInBottomSheet event.
            // Take a look at https://github.com/NativeScript/NativeScript/issues/2173 for more info and a sample project.
            this.bindingContext = fromObject(options.context);
            this._raiseShownBottomSheetEvent();
        }
    }

    _bottomSheetClosed() {
        if (this.bottomSheetController) {
            this.bottomSheetController.delegate = null;
            this.bottomSheetController = null;
        }
        this.bottomSheetControllerDelegate = null;
    }
    protected _hideNativeBottomSheet(parent: View, whenClosedCallback: () => void) {
        const parentWithController = ios.getParentWithViewController(parent);
        console.log('_hideNativeBottomSheet', parent, parent.viewController, parentWithController, new Error().stack);
        if (!parent || !parentWithController) {
            traceError('Trying to hide bottom-sheet view but no parent with viewController specified.');
            return;
        }

        const parentController = parentWithController.viewController;
        const animated = (<any>this.viewController).animated;
        // whenClosedCallback();
        parentController.dismissViewControllerAnimatedCompletion(animated, whenClosedCallback);
    }
}

export function overrideBottomSheet() {
    const NSView = require('tns-core-modules/ui/core/view').View;
    applyMixins(NSView, [ViewWithBottomSheetBase, ViewWithBottomSheet]);
}
export function install() {
    overrideBottomSheet();
}
