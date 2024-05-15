import { Application, IOSHelper, Page, Screen, Trace, Utils, View, fromObject } from '@nativescript/core';
import { applyMixins } from '@nativescript-community/ui-material-core';
import { BottomSheetOptions } from './bottomsheet';
import { StateBottomSheet, ViewWithBottomSheetBase } from './bottomsheet-common';

export { ViewWithBottomSheetBase } from './bottomsheet-common';

const majorVersion = Utils.ios.MajorVersion;

declare class IMDCBottomSheetControllerDelegateImpl extends NSObject implements MDCBottomSheetControllerDelegate {
    static new(): IMDCBottomSheetControllerDelegateImpl;
    _owner: WeakRef<ViewWithBottomSheet>;
}

@NativeClass
class MDCBottomSheetControllerDelegateImpl extends NSObject {
    static ObjCProtocols = [MDCBottomSheetControllerDelegate];
    _owner: WeakRef<ViewWithBottomSheet>;
    public static initWithOwner(owner: ViewWithBottomSheet) {
        const delegate = MDCBottomSheetControllerDelegateImpl.new() as MDCBottomSheetControllerDelegateImpl;
        delegate._owner = new WeakRef(owner);

        return delegate;
    }
    bottomSheetControllerDidChangeYOffsetYOffset(controller: MDCBottomSheetController, yOffset: number) {
        const owner = this._owner.get();
        if (owner?._onChangeStateBottomSheetCallback) {
            const presentationController = controller.presentationController as MDCBottomSheetPresentationController;
            const heightScreen = Screen.mainScreen.heightDIPs;
            const heightCollapsedSheet = presentationController.preferredSheetHeight || controller.preferredContentSize.height;
            const window = UIApplication.sharedApplication.windows.firstObject;
            const topPadding = window.safeAreaInsets.top;
            const bottomPadding = window.safeAreaInsets.bottom;

            const isCollapsed = heightScreen - yOffset - bottomPadding === heightCollapsedSheet;
            const isExpanded = yOffset === topPadding;
            if (!isCollapsed && !isExpanded) {
                //normalized = (value - min) / (max - min);
                let normalized = 0;
                if (yOffset + bottomPadding > heightScreen - heightCollapsedSheet) {
                    normalized = (heightScreen - yOffset - bottomPadding - 0) / (heightCollapsedSheet - 0) - 1;
                } else {
                    normalized = (heightScreen - yOffset - heightCollapsedSheet) / (heightScreen - heightCollapsedSheet);
                }
                owner._onChangeStateBottomSheetCallback(StateBottomSheet.DRAGGING, normalized);
            } else {
                owner._onChangeStateBottomSheetCallback(isCollapsed ? StateBottomSheet.COLLAPSED : StateBottomSheet.EXPANDED);
            }
        }
    }
    bottomSheetControllerDidDismissBottomSheet(controller: MDCBottomSheetController) {
        // called when clicked on background
        // this is called too soon to "dispose" the view. But we dont have a way
        // to know when the animation is finished.
        //Consequently with background tap we see the view disappear
        // so we timeout a bit
        setTimeout(() => {
            const owner = this._owner.get();
            owner && owner._unloadBottomSheet();
        }, 200);
    }
    bottomSheetControllerStateChangedState(controller: MDCBottomSheetController, state: MDCSheetState) {
        // called when swiped
        const owner = this._owner.get();
        if (state === MDCSheetState.Closed) {
            if (owner) {
                owner._onChangeStateBottomSheetCallback && owner._onChangeStateBottomSheetCallback(StateBottomSheet.CLOSED);
                owner && owner._unloadBottomSheet();
            }
        } else {
            if (owner && owner._onChangeStateBottomSheetCallback) {
                owner._onChangeStateBottomSheetCallback(state === MDCSheetState.Extended ? StateBottomSheet.EXPANDED : StateBottomSheet.EXPANDED);
            }
        }
    }
}
function initLayoutGuide(controller: UIViewController) {
    const rootView = controller.view;
    const layoutGuide = UILayoutGuide.alloc().init();
    rootView.addLayoutGuide(layoutGuide);
    NSLayoutConstraint.activateConstraints([
        layoutGuide.topAnchor.constraintEqualToAnchor(controller.topLayoutGuide.bottomAnchor),
        layoutGuide.bottomAnchor.constraintEqualToAnchor(controller.bottomLayoutGuide.topAnchor),
        layoutGuide.leadingAnchor.constraintEqualToAnchor(rootView.leadingAnchor),
        layoutGuide.trailingAnchor.constraintEqualToAnchor(rootView.trailingAnchor)
    ] as any);

    return layoutGuide;
}
function layoutView(controller: IMDLayoutViewController, owner: View): void {
    let layoutGuide = controller.view.safeAreaLayoutGuide;
    if (!layoutGuide) {
        Trace.write(`safeAreaLayoutGuide during layout of ${owner}. Creating fallback constraints, but layout might be wrong.`, Trace.categories.Layout, Trace.messageType.error);

        layoutGuide = initLayoutGuide(controller);
    }
    const safeArea = layoutGuide.layoutFrame;
    let position = IOSHelper.getPositionFromFrame(safeArea);
    const safeAreaSize = safeArea.size;

    const hasChildViewControllers = controller.childViewControllers.count > 0;
    if (hasChildViewControllers) {
        const fullscreen = controller.view.frame;
        position = IOSHelper.getPositionFromFrame(fullscreen);
    }

    const safeAreaWidth = Utils.layout.round(Utils.layout.toDevicePixels(safeAreaSize.width));
    const safeAreaHeight = Utils.layout.round(Utils.layout.toDevicePixels(safeAreaSize.height));

    const widthSpec = Utils.layout.makeMeasureSpec(safeAreaWidth, Utils.layout.EXACTLY);
    const heightSpec = Utils.layout.makeMeasureSpec(safeAreaHeight, Utils.layout.UNSPECIFIED);

    // reset _cachedFrame or it will wrongly move the view on subsequent layouts
    // (owner as any)._cachedFrame = null;
    View.measureChild(null, owner, widthSpec, heightSpec);
    const marginTop = owner.effectiveMarginTop;
    const marginBottom = owner.effectiveMarginBottom;
    const marginLeft = owner.effectiveMarginLeft + position.left;
    const marginRight = owner.effectiveMarginRight;
    const top = marginTop + position.top;
    const width = Screen.mainScreen.widthPixels;
    const height = owner.getMeasuredHeight();
    View.layoutChild(null, owner, marginLeft, top, width - marginLeft - marginRight, position.top + height + marginBottom);

    const effectiveWidth = width;
    let effectiveHeight = height + top + marginBottom;
    if (controller.ignoreTopSafeArea || controller.ignoreBottomSafeArea) {
        const frame = CGRectMake(
            Utils.layout.toDeviceIndependentPixels(marginLeft),
            Utils.layout.toDeviceIndependentPixels(top),
            Utils.layout.toDeviceIndependentPixels(width),
            Utils.layout.toDeviceIndependentPixels(height)
        );
        const availableSpace = getAvailableSpaceFromParent(owner, frame);

        if (!availableSpace.fullscreen) {
            // can happen if we get there after the bottomsheet was removed...
            return;
        }

        const startPos = IOSHelper.getPositionFromFrame(frame);
        const fullscreenPosition = IOSHelper.getPositionFromFrame(availableSpace.fullscreen);
        const safeAreaPosition = IOSHelper.getPositionFromFrame(availableSpace.safeArea);

        const adjustedPosition = startPos;

        const orientation = UIDevice.currentDevice.orientation;
        const isLandscape = Application.orientation() === 'landscape';

        // there are still some issues in landscape Right but they seem to come from N

        owner.iosIgnoreSafeArea = true;
        if (controller.ignoreTopSafeArea) {
            const key = 'top';
            const oppositeKey = 'bottom';
            // if (orientation === UIDeviceOrientation.LandscapeLeft) {
            //     key = 'left';
            //     oppositeKey = 'right';
            // } else if (orientation === UIDeviceOrientation.LandscapeRight) {
            //     key = 'right';
            //     oppositeKey = 'left';
            // } else if (orientation === UIDeviceOrientation.PortraitUpsideDown) {
            //     key = 'bottom';
            //     oppositeKey = 'top';
            // }
            const delta = safeAreaPosition[key] - fullscreenPosition[key];
            effectiveHeight -= delta;
            adjustedPosition[oppositeKey] -= delta;
            adjustedPosition[key] -= delta;
        }
        if (controller.ignoreBottomSafeArea) {
            const key = 'bottom';
            // if (orientation === UIDeviceOrientation.LandscapeLeft) {
            //     key = 'right';
            // } else if (orientation === UIDeviceOrientation.LandscapeRight) {
            //     key = 'left';
            // } else if (orientation === UIDeviceOrientation.PortraitUpsideDown) {
            //     key = 'top';
            // }
            const delta = fullscreenPosition[key] - safeAreaPosition[key];
            effectiveHeight -= delta;
        }
        if (orientation === UIDeviceOrientation.LandscapeRight || orientation === UIDeviceOrientation.LandscapeLeft) {
            const key = 'left';
            const oppositeKey = 'right';
            const delta = fullscreenPosition[key] - safeAreaPosition[key];
            adjustedPosition[oppositeKey] += Utils.layout.toDevicePixels(delta);
            // adjustedPosition[key] += (delta);
            // adjustedPosition[oppositeKey] += Utils.layout.toDevicePixels(delta);
            // adjustedPosition[key] += Utils.layout.toDevicePixels(delta);
        }
        if (owner.nativeViewProtected) {
            owner.nativeViewProtected.frame = CGRectMake(
                Utils.layout.toDeviceIndependentPixels(adjustedPosition.left),
                Utils.layout.toDeviceIndependentPixels(adjustedPosition.top),
                Utils.layout.toDeviceIndependentPixels(adjustedPosition.right),
                Utils.layout.toDeviceIndependentPixels(adjustedPosition.bottom)
            );
        }
    }
    controller.preferredContentSize = CGSizeMake(Utils.layout.toDeviceIndependentPixels(effectiveWidth), Utils.layout.toDeviceIndependentPixels(effectiveHeight));

    if (owner.parent) {
        owner.parent._layoutParent();
    }
}
function getAvailableSpaceFromParent(view: View, frame: CGRect): { safeArea: CGRect; fullscreen: CGRect } {
    if (!view) {
        return null;
    }

    let scrollView = null;
    let viewControllerView = null;

    if (view.viewController) {
        viewControllerView = view.viewController.view;
    } else {
        let parent = view.parent as View;
        while (parent && !parent.viewController && !(parent.nativeViewProtected instanceof UIScrollView)) {
            parent = parent.parent as View;
        }
        if (parent) {
            if (parent.nativeViewProtected instanceof UIScrollView) {
                scrollView = parent.nativeViewProtected;
            } else if (parent.viewController) {
                viewControllerView = parent.viewController.view;
            }
        }
    }

    let fullscreen = null;
    let safeArea = null;

    if (viewControllerView) {
        safeArea = viewControllerView.safeAreaLayoutGuide.layoutFrame;
        fullscreen = viewControllerView.frame;
    } else if (scrollView) {
        const insets = scrollView.safeAreaInsets;
        safeArea = CGRectMake(insets.left, insets.top, scrollView.contentSize.width - insets.left - insets.right, scrollView.contentSize.height - insets.top - insets.bottom);
        fullscreen = CGRectMake(0, 0, scrollView.contentSize.width, scrollView.contentSize.height);
    }

    // const locationInWindow = view.getLocationInWindow();
    // let inWindowLeft = locationInWindow.x;
    // let inWindowTop = locationInWindow.y;

    // if (scrollView) {
    //     inWindowLeft += scrollView.contentOffset.x;
    //     inWindowTop += scrollView.contentOffset.y;
    // }

    // const inWindow = CGRectMake(inWindowLeft, inWindowTop, frame.size.width, frame.size.height);

    return { safeArea, fullscreen };
}

declare class IMDLayoutViewController extends UIViewController {
    static new(): IMDLayoutViewController;
    static alloc(): IMDLayoutViewController;
    owner: WeakRef<View>;
    nsAnimated: boolean;
    ignoreBottomSafeArea: boolean;
    ignoreTopSafeArea: boolean;
}

@NativeClass
class MDLayoutViewController extends UIViewController {
    owner: WeakRef<View>;
    ignoreBottomSafeArea: boolean;
    ignoreTopSafeArea: boolean;
    nsAnimated: boolean;
    public static initWithOwner(owner: View) {
        const delegate = MDLayoutViewController.new() as MDLayoutViewController;
        delegate.owner = new WeakRef(owner);

        return delegate;
    }

    viewDidLoad(): void {
        super.viewDidLoad();
        const owner = this.owner?.get();
        if (!owner) {
            return;
        }
        if (!owner.isLoaded) {
            owner.callLoaded();
        }
        // Unify translucent and opaque bars layout
        this.edgesForExtendedLayout = UIRectEdge.All;
        this.extendedLayoutIncludesOpaqueBars = true;
    }

    viewWillLayoutSubviews(): void {
        super.viewWillLayoutSubviews();
        const owner = this.owner?.get();
        if (owner) {
            owner.iosOverflowSafeArea = true;
            IOSHelper.updateConstraints(this, owner);
        }
    }

    viewDidLayoutSubviews(): void {
        super.viewDidLayoutSubviews();
        const owner = this.owner?.get();
        if (owner) {
            layoutView(this, owner);
        }
    }

    viewWillAppear(animated: boolean): void {
        super.viewWillAppear(animated);
        const owner = this.owner?.get();
        if (!owner) {
            return;
        }

        IOSHelper.updateAutoAdjustScrollInsets(this, owner);

        // if (!owner.parent) {
        //     owner.callLoaded();
        // }
    }

    viewDidDisappear(animated: boolean): void {
        super.viewDidDisappear(animated);
        // let s not call callUnloaded here in case
        // another modal / sheet is shown on top
        // will be called on dismiss
    }

    // Mind implementation for other controllers
    traitCollectionDidChange(previousTraitCollection: UITraitCollection): void {
        super.traitCollectionDidChange(previousTraitCollection);

        if (majorVersion >= 13) {
            const owner = this.owner?.get();
            if (
                owner &&
                this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection &&
                this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection(previousTraitCollection)
            ) {
                owner.notify({ eventName: 'traitCollectionColorAppearanceChanged', object: owner });
            }
        }
    }
}

export class ViewWithBottomSheet extends ViewWithBottomSheetBase {
    bottomSheetControllerDelegate: IMDCBottomSheetControllerDelegateImpl;
    bottomSheetController: MDCBottomSheetController;
    protected _showNativeBottomSheet(parent: View, options: BottomSheetOptions) {
        options.context = options.context || {};
        let rootView = Application.getRootView();
        if (rootView.parent) {
            rootView = rootView.parent as any;
        }
        let currentView = parent.page || rootView;
        currentView = currentView.modal || currentView;
        let parentController = currentView.viewController;
        if (!parentController.presentedViewController && rootView.viewController.presentedViewController) {
            parentController = rootView.viewController.presentedViewController;
        }
        while (parentController.presentedViewController) {
            while (parentController.presentedViewController instanceof UIAlertController ||
                (parentController.presentedViewController['isAlertController'] && parentController.presentedViewController.presentedViewController)) {
                    parentController = parentController.presentedViewController;
            }
            if (parentController.presentedViewController instanceof UIAlertController || parentController.presentedViewController['isAlertController']) {
                break;
            }
            else {
                parentController = parentController.presentedViewController;
            }
        }

        if (!parentController.view || !parentController.view.window) {
            Trace.write('Parent page is not part of the window hierarchy.', Trace.categories.ViewHierarchy, Trace.messageType.error);
            return;
        }

        this.parent = Application.getRootView();
        this._setupAsRootView({});

        this._commonShowNativeBottomSheet(currentView, options);
        let controller: IMDLayoutViewController = this.viewController;
        if (!controller) {
            const nativeView = this.ios || this.nativeViewProtected;
            controller = MDLayoutViewController.initWithOwner(this);
            // newController = IOSHelper.MDLayoutViewController.initWithOwner(new WeakRef(item.content)) as UIViewController;
            if (options.ignoreBottomSafeArea !== undefined) {
                controller.ignoreBottomSafeArea = options.ignoreBottomSafeArea;
            } else {
                controller.ignoreBottomSafeArea = false;
            }
            if (options.ignoreTopSafeArea !== undefined) {
                controller.ignoreTopSafeArea = options.ignoreTopSafeArea;
            } else {
                controller.ignoreTopSafeArea = true;
            }
            if (nativeView instanceof UIView) {
                controller.view.addSubview(nativeView);
            }

            this.viewController = controller; // store the viewController so that safeArea overflow is applied correctly
        }

        this._raiseShowingBottomSheetEvent();
        const bottomSheet = (this.bottomSheetController = MDCBottomSheetController.alloc().initWithContentViewController(controller));
        this.bottomSheetControllerDelegate = bottomSheet.delegate = MDCBottomSheetControllerDelegateImpl.initWithOwner(this);
        bottomSheet.isScrimAccessibilityElement = true;
        bottomSheet.scrimAccessibilityLabel = 'close';
        bottomSheet.dismissOnBackgroundTap = options.dismissOnBackgroundTap !== false;
        bottomSheet.dismissOnDraggingDownSheet = options.dismissOnDraggingDownSheet !== false;

        const presentationController = bottomSheet.presentationController as MDCBottomSheetPresentationController;
        const peekHeight = options.peekHeight;
        if (peekHeight) {
            presentationController.preferredSheetHeight = peekHeight;
        }
        presentationController.ignoreKeyboardHeight = options.ignoreKeyboardHeight !== false;
        const skipCollapsedState = options?.skipCollapsedState === true;

        if (options.trackingScrollView) {
            const scrollView = this.getViewById(options.trackingScrollView);
            if (scrollView && scrollView.nativeViewProtected instanceof UIScrollView) {
                presentationController.trackingScrollView = scrollView.nativeViewProtected;
            }
        }
        controller.nsAnimated = true;
        parentController.presentViewControllerAnimatedCompletion(bottomSheet, true, null);
        if (options.transparent === true) {
            controller.view.backgroundColor = UIColor.clearColor;
            // for it to be prettier let s disable elevation
            controller.view['elevation'] = 0;
        } else {
            if (!(this instanceof Page)) {
                controller.view.backgroundColor = majorVersion <= 12 && !UIColor.systemBackgroundColor ? UIColor.whiteColor : UIColor.systemBackgroundColor;
            }
            if (options.backgroundOpacity && controller.view.backgroundColor) {
                controller.view.backgroundColor = controller.view.backgroundColor.colorWithAlphaComponent(options.backgroundOpacity);
            }
        }
        const transitionCoordinator = bottomSheet.transitionCoordinator;
        if (transitionCoordinator) {
            UIViewControllerTransitionCoordinator.prototype.animateAlongsideTransitionCompletion.call(transitionCoordinator, null, () => {
                this.bindingContext = fromObject(options.context);
                this._raiseShownBottomSheetEvent();
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
        // super already closed we are just a mixin

        if (this.bottomSheetController) {
            this.bottomSheetController.delegate = null;
            this.bottomSheetController = null;
        }
        this.bottomSheetControllerDelegate = null;
        // it is very important to clear the viewController as N does not do it
        // and the destroy of the view from svelte could trigger a layout pass on the viewController
        this.viewController = null;
    }
    protected _hideNativeBottomSheet(parent: View, whenClosedCallback: () => void) {
        if (!this.viewController) {
            // when clicking on background we dont need to dismiss, already done
            whenClosedCallback?.();
            return;
        }
        let rootView = Application.getRootView();
        if (rootView.parent) {
            rootView = rootView.parent as any;
        }
        let currentView = parent.modal || parent;
        let parentController = currentView.viewController;
        if (!parentController.presentedViewController && rootView.viewController.presentedViewController) {
            parentController = rootView.viewController.presentedViewController;
        }
        while (parentController.presentedViewController) {
            while (parentController.presentedViewController instanceof UIAlertController ||
                (parentController.presentedViewController['isAlertController'] && parentController.presentedViewController.presentedViewController)) {
                    parentController = parentController.presentedViewController;
            }
            if (parentController.presentedViewController instanceof UIAlertController || parentController.presentedViewController['isAlertController']) {
                break;
            }
            else {
                parentController = parentController.presentedViewController;
            }
        }
        const animated = this.viewController.nsAnimated;
        parentController.dismissViewControllerAnimatedCompletion(animated, whenClosedCallback);
    }

    _unloadBottomSheet() {
        if (this.isLoaded) {
            this.callUnloaded();
        }
        this._onDismissBottomSheetCallback && this._onDismissBottomSheetCallback();
    }
}

let mixinInstalled = false;
export function overrideBottomSheet() {
    applyMixins(View, [ViewWithBottomSheetBase, ViewWithBottomSheet]);
}
export function install() {
    if (!mixinInstalled) {
        mixinInstalled = true;
        overrideBottomSheet();
    }
}
