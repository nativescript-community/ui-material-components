import { ViewWithBottomSheetBase } from './bottomsheet-common';
import { ios as iosApplication } from "@nativescript/core/application";
import { screen } from "@nativescript/core/platform";
import { ios, traceCategories, traceError, traceMessageType, traceWrite, View } from '@nativescript/core/ui/core/view';
import { ViewBase } from '@nativescript/core/ui/core/view-base';
import { layout } from '@nativescript/core/utils/utils';
import { BottomSheetOptions } from './bottomsheet';
import { fromObject } from '@nativescript/core/data/observable';
import { applyMixins } from 'nativescript-material-core/core';
import { ios as iosUtils } from '@nativescript/core/utils/utils';
import { Page } from '@nativescript/core/ui/page';

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

function initLayoutGuide(controller: UIViewController) {
    const rootView = controller.view;
    const layoutGuide = UILayoutGuide.alloc().init();
    rootView.addLayoutGuide(layoutGuide);
    NSLayoutConstraint.activateConstraints(<any>[
        layoutGuide.topAnchor.constraintEqualToAnchor(controller.topLayoutGuide.bottomAnchor),
        layoutGuide.bottomAnchor.constraintEqualToAnchor(controller.bottomLayoutGuide.topAnchor),
        layoutGuide.leadingAnchor.constraintEqualToAnchor(rootView.leadingAnchor),
        layoutGuide.trailingAnchor.constraintEqualToAnchor(rootView.trailingAnchor)
    ]);

    return layoutGuide;
}
function layoutView(controller: UILayoutViewController, owner: View): void {
    let layoutGuide = controller.view.safeAreaLayoutGuide;
    if (!layoutGuide) {
        traceWrite(`safeAreaLayoutGuide during layout of ${owner}. Creating fallback constraints, but layout might be wrong.`, traceCategories.Layout, traceMessageType.error);

        layoutGuide = initLayoutGuide(controller);
    }
    const safeArea = layoutGuide.layoutFrame;
    const safeAreaWidth = layout.round(layout.toDevicePixels(safeArea.size.width));
    const safeAreaHeight = layout.round(layout.toDevicePixels(safeArea.size.height));

    const widthSpec = layout.makeMeasureSpec(safeAreaWidth, layout.EXACTLY);
    const heightSpec = layout.makeMeasureSpec(safeAreaHeight, layout.UNSPECIFIED);

    View.measureChild(null, owner, widthSpec, heightSpec);
    const marginTop = owner.effectiveMarginTop;
    const marginBottom = owner.effectiveMarginBottom;
    const marginLeft = owner.effectiveMarginLeft;
    const marginRight = owner.effectiveMarginRight;

    let childTop = marginTop;
    let childHeight = owner.getMeasuredHeight();
    let width = owner.getMeasuredWidth();
    const safeAreaInsets = {
        bottom: layout.toDevicePixels(iosApplication.window.safeAreaInsets.bottom),
        top: layout.toDevicePixels(iosApplication.window.safeAreaInsets.top),
        right: layout.toDevicePixels(iosApplication.window.safeAreaInsets.right),
        left: layout.toDevicePixels(iosApplication.window.safeAreaInsets.left)
    };

        if (controller.ignoreTopSafeArea) {
        childTop -= safeAreaInsets.top
    } else {
        childHeight += safeAreaInsets.top;
        }
    let contentHeight = childHeight + marginBottom;
        if (controller.ignoreBottomSafeArea) {
        contentHeight -= safeAreaInsets.bottom;
    } else {
        childHeight += safeAreaInsets.bottom;
        }

    View.layoutChild(null, owner, marginLeft, childTop, screen.mainScreen.widthPixels - marginRight, childHeight);
    controller.preferredContentSize = CGSizeMake(screen.mainScreen.widthDIPs, layout.toDeviceIndependentPixels(contentHeight));
    }


class UILayoutViewController extends UIViewController {
    public owner: WeakRef<View>;
    ignoreBottomSafeArea: boolean;
    ignoreTopSafeArea: boolean;

    public static initWithOwner(owner: WeakRef<View>): UILayoutViewController {
        const controller = <UILayoutViewController>UILayoutViewController.new();
        controller.owner = owner;

        return controller;
    }

    public viewDidLoad(): void {
        super.viewDidLoad();

        // Unify translucent and opaque bars layout
        // this.edgesForExtendedLayout = UIRectEdgeBottom;
        this.extendedLayoutIncludesOpaqueBars = true;
    }

    public viewWillLayoutSubviews(): void {
        super.viewWillLayoutSubviews();
        const owner = this.owner.get();
        if (owner) {
            ios.updateConstraints(this, owner);
        }
        // call layout to calculate the new dimensions before layouting subview
        layoutView(this,owner);
    }

    public viewDidLayoutSubviews(): void {
        super.viewDidLayoutSubviews();
        const owner = this.owner.get();
        if (owner) {
            if (iosUtils.MajorVersion >= 11) {
                // Handle nested UILayoutViewController safe area application.
                // Currently, UILayoutViewController can be nested only in a TabView.
                // The TabView itself is handled by the OS, so we check the TabView's parent (usually a Page, but can be a Layout).
                const tabViewItem = owner.parent;
                const tabView = tabViewItem && tabViewItem.parent;
                let parent = tabView && tabView.parent;

                // Handle Angular scenario where TabView is in a ProxyViewContainer
                // It is possible to wrap components in ProxyViewContainers indefinitely
                // Not using instanceof ProxyViewContainer to avoid circular dependency
                // TODO: Try moving UILayoutViewController out of view module
                while (parent && !parent.nativeViewProtected) {
                    parent = parent.parent;
                }
                const additionalInsets = { top: 0, left: 0, bottom: 0, right: 0 };

                if (parent) {
                    const parentPageInsetsTop = parent.nativeViewProtected.safeAreaInsets.top;
                    const currentInsetsTop = this.view.safeAreaInsets.top;
                    const additionalInsetsTop = Math.max(parentPageInsetsTop - currentInsetsTop, 0);

                    const parentPageInsetsBottom = parent.nativeViewProtected.safeAreaInsets.bottom;
                    const currentInsetsBottom = this.view.safeAreaInsets.bottom;
                    const additionalInsetsBottom = Math.max(parentPageInsetsBottom - currentInsetsBottom, 0);

                    if (additionalInsetsTop > 0 || additionalInsetsBottom > 0) {
                        additionalInsets.top = additionalInsetsTop;
                        additionalInsets.bottom = additionalInsetsBottom;
                    }
                }
                // if (this.ignoreTopSafeArea === true) {
                //     console.log('ignoreTopSafeArea', additionalInsets.top, this.view.safeAreaLayoutGuide.layoutFrame.origin.x, this.view.safeAreaInsets.top);
                //     additionalInsets.top += this.view.safeAreaLayoutGuide.layoutFrame.origin.x;
                // }

                // if (this.ignoreBottomSafeArea === true) {
                //     additionalInsets.bottom -= this.view.safeAreaInsets.bottom;
                // }

                const insets = new UIEdgeInsets(additionalInsets);
                this.additionalSafeAreaInsets = insets;
            }

            layoutView(this, owner);
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

    public viewDidDisappear(animated: boolean): void {
        super.viewDidDisappear(animated);
        const owner = this.owner.get();
        if (owner && !owner.parent) {
            owner.callUnloaded();
        }
    }

    // Mind implementation for other controllers
    public traitCollectionDidChange(previousTraitCollection: UITraitCollection): void {
        super.traitCollectionDidChange(previousTraitCollection);

        if (iosUtils.MajorVersion >= 13) {
            const owner = this.owner.get();
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

        this._commonShowNativeBottomSheet(parentWithController, options);
        let controller: UILayoutViewController = this.viewController;
        if (!controller) {
            const nativeView = this.ios || this.nativeViewProtected;
            controller = UILayoutViewController.initWithOwner(new WeakRef(this));
            // newController = iosView.UILayoutViewController.initWithOwner(new WeakRef(item.content)) as UIViewController;
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

        controller.modalPresentationStyle = UIModalPresentationStyle.FormSheet;

        // this.horizontalAlignment = 'stretch';
        // this.verticalAlignment = 'stretch';

        this._raiseShowingBottomSheetEvent();
        // animated = animated === undefined ? true : !!animated;
        const bottomSheet = (this.bottomSheetController = MDCBottomSheetController.alloc().initWithContentViewController(controller));
        this.bottomSheetControllerDelegate = bottomSheet.delegate = MDCBottomSheetControllerDelegateImpl.initWithOwner(new WeakRef(this));
        bottomSheet.isScrimAccessibilityElement = true;
        bottomSheet.scrimAccessibilityLabel = 'close';
        bottomSheet.dismissOnBackgroundTap = options.dismissOnBackgroundTap !== false;
        bottomSheet.dismissOnDraggingDownSheet = options.dismissOnDraggingDownSheet !== false;

        if (options.trackingScrollView) {
            const scrollView = this.getViewById(options.trackingScrollView);
            if (scrollView && scrollView.nativeViewProtected instanceof UIScrollView) {
                bottomSheet.trackingScrollView = scrollView.nativeViewProtected;
            }
        }
        (<any>controller).animated = true;
        parentController.presentViewControllerAnimatedCompletion(bottomSheet, true, null);
        if (options.transparent === true) {
            controller.view.backgroundColor = UIColor.clearColor;
            // for it to be more beautiful let s disable elevation
            controller.view['elevation'] = 0;
        } else if (!(this instanceof Page)) {
            controller.view.backgroundColor = iosUtils.MajorVersion <= 12 && !UIColor.systemBackgroundColor ? UIColor.whiteColor : UIColor.systemBackgroundColor;
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
        if (!parent || !parentWithController) {
            traceError('Trying to hide bottom-sheet view but no parent with viewController specified.');
            return;
        }

        const parentController = parentWithController.viewController;
        const animated = (<any>this.viewController).animated;
        parentController.dismissViewControllerAnimatedCompletion(animated, whenClosedCallback);
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
        overrideBottomSheet();
    }
}
