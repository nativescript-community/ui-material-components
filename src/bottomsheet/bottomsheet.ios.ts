import { ViewWithBottomSheetBase } from './bottomsheet-common';
import { ios, traceCategories, traceError, traceMessageType, traceWrite, View } from '@nativescript/core/ui/core/view';
import { ViewBase } from '@nativescript/core/ui/core/view-base';
import { layout } from '@nativescript/core/utils/utils';
import { BottomSheetOptions } from './bottomsheet';
import { fromObject } from '@nativescript/core/data/observable';
import { applyMixins } from 'nativescript-material-core/core';
import { ios as iosUtils } from '@nativescript/core/utils/utils';
import { ios as iosView } from '@nativescript/core/ui/core/view/view-helper';
import { Page } from '@nativescript/core/ui/page';

const majorVersion = iosUtils.MajorVersion;

declare class IMDCBottomSheetControllerDelegateImpl extends NSObject implements MDCBottomSheetControllerDelegate {
    static new(): IMDCBottomSheetControllerDelegateImpl;
    _owner: WeakRef<ViewWithBottomSheet>;
}

const MDCBottomSheetControllerDelegateImpl = (NSObject as any).extend(
    {
        // private _owner: WeakRef<ViewWithBottomSheet>;

        // public static initWithOwner(owner: WeakRef<ViewWithBottomSheet>): MDCBottomSheetControllerDelegateImpl {
        //     const impl = <MDCBottomSheetControllerDelegateImpl>MDCBottomSheetControllerDelegateImpl.new();
        //     impl._owner = owner;
        //     return impl;
        // }
        bottomSheetControllerDidDismissBottomSheet(controller: MDCBottomSheetController) {
            // called when clicked on background
            const owner = this._owner.get();
            if (owner) {
                owner._onDismissBottomSheetCallback && owner._onDismissBottomSheetCallback();
                if (owner && owner.isLoaded) {
                    owner.callUnloaded();
                }
            }
        },
        bottomSheetControllerStateChangedState(controller: MDCBottomSheetController, state: MDCSheetState) {
            // called when swiped
            if (state === MDCSheetState.Closed) {
                const owner = this._owner.get();
                if (owner) {
                    owner._onDismissBottomSheetCallback && owner._onDismissBottomSheetCallback();
                    if (owner && owner.isLoaded) {
                        owner.callUnloaded();
                    }
                }
            }
        },
    },
    {
        protocols: [MDCBottomSheetControllerDelegate],
    }
) as typeof IMDCBottomSheetControllerDelegateImpl;

declare module '@nativescript/core/ui/core/view/view' {
    interface View {
        _setLayoutFlags(left: number, top: number, right: number, bottom: number);
    }
    namespace ios {
        interface UILayoutViewController extends UIViewController {
            owner: WeakRef<View>;
        }
    }
}
declare module '@nativescript/core/ui/core/view-base' {
    interface ViewBase {
        _layoutParent();
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
        layoutGuide.trailingAnchor.constraintEqualToAnchor(rootView.trailingAnchor),
    ]);

    return layoutGuide;
}
function layoutView(controller: IUILayoutViewController, owner: View): void {
    let layoutGuide = controller.view.safeAreaLayoutGuide;
    if (!layoutGuide) {
        traceWrite(`safeAreaLayoutGuide during layout of ${owner}. Creating fallback constraints, but layout might be wrong.`, traceCategories.Layout, traceMessageType.error);

        layoutGuide = initLayoutGuide(controller);
    }
    const safeArea = layoutGuide.layoutFrame;
    let position = ios.getPositionFromFrame(safeArea);
    const safeAreaSize = safeArea.size;

    const hasChildViewControllers = controller.childViewControllers.count > 0;
    if (hasChildViewControllers) {
        const fullscreen = controller.view.frame;
        position = ios.getPositionFromFrame(fullscreen);
    }

    const safeAreaWidth = layout.round(layout.toDevicePixels(safeAreaSize.width));
    const safeAreaHeight = layout.round(layout.toDevicePixels(safeAreaSize.height));

    const widthSpec = layout.makeMeasureSpec(safeAreaWidth, layout.EXACTLY);
    const heightSpec = layout.makeMeasureSpec(safeAreaHeight, layout.UNSPECIFIED);

    View.measureChild(null, owner, widthSpec, heightSpec);
    const marginTop = owner.effectiveMarginTop;
    const marginBottom = owner.effectiveMarginBottom;
    const marginLeft = owner.effectiveMarginLeft + position.left;
    const marginRight = owner.effectiveMarginRight;
    let top = marginTop + position.top;
    const width = owner.getMeasuredWidth();
    let height = owner.getMeasuredHeight();

    owner.iosOverflowSafeArea = false;

    View.layoutChild(null, owner, position.left, position.top, position.left + width, position.top + height);

    const effectiveWidth = width + marginLeft + marginRight;
    let effectiveHeight = height + top + marginBottom;
    if (controller.ignoreTopSafeArea || controller.ignoreBottomSafeArea) {
        const frame = owner.nativeViewProtected.frame;
        const availableSpace = getAvailableSpaceFromParent(owner, frame);
        // const safeArea = availableSpace.safeArea;
        // const fullscreen = availableSpace.fullscreen;
        // const inWindow = availableSpace.inWindow;

        const position = ios.getPositionFromFrame(frame);
        const fullscreenPosition = ios.getPositionFromFrame(availableSpace.fullscreen);
        const safeAreaPosition = ios.getPositionFromFrame(availableSpace.safeArea);

        const adjustedPosition = position;

        if (controller.ignoreTopSafeArea) {
            const delta = safeAreaPosition.top - fullscreenPosition.top;
            effectiveHeight -= delta;
            adjustedPosition.bottom -= delta;
            adjustedPosition.top -= delta;
        }
        if (controller.ignoreBottomSafeArea) {
            const delta = fullscreenPosition.bottom - safeAreaPosition.bottom;
            effectiveHeight -= delta;
            // adjustedPosition.bottom += delta * 2;
        }
        owner.nativeViewProtected.frame = CGRectMake(
            layout.toDeviceIndependentPixels(adjustedPosition.left),
            layout.toDeviceIndependentPixels(adjustedPosition.top),
            layout.toDeviceIndependentPixels(adjustedPosition.right - adjustedPosition.left),
            layout.toDeviceIndependentPixels(adjustedPosition.bottom - adjustedPosition.top)
        );
    }
    controller.preferredContentSize = CGSizeMake(layout.toDeviceIndependentPixels(effectiveWidth), layout.toDeviceIndependentPixels(effectiveHeight));

    if (owner.parent) {
        owner.parent._layoutParent();
    }
}
function getAvailableSpaceFromParent(view: View, frame: CGRect): { safeArea: CGRect; fullscreen: CGRect; inWindow: CGRect } {
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

        if (parent.nativeViewProtected instanceof UIScrollView) {
            scrollView = parent.nativeViewProtected;
        } else if (parent.viewController) {
            viewControllerView = parent.viewController.view;
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

    const locationInWindow = view.getLocationInWindow();
    let inWindowLeft = locationInWindow.x;
    let inWindowTop = locationInWindow.y;

    if (scrollView) {
        inWindowLeft += scrollView.contentOffset.x;
        inWindowTop += scrollView.contentOffset.y;
    }

    const inWindow = CGRectMake(inWindowLeft, inWindowTop, frame.size.width, frame.size.height);

    return { safeArea: safeArea, fullscreen: fullscreen, inWindow: inWindow };
}

declare class IUILayoutViewController extends UIViewController {
    static new(): IUILayoutViewController;
    static alloc(): IUILayoutViewController;
    owner: WeakRef<View>;
    ignoreBottomSafeArea: boolean;
    ignoreTopSafeArea: boolean;
}
const UILayoutViewController = (UIViewController as any).extend(
    {
        // public owner: WeakRef<View>;

        // public static initWithOwner(owner: WeakRef<View>): UILayoutViewController {
        //     const controller = <UILayoutViewController>UILayoutViewController.new();
        //     controller.owner = owner;

        //     return controller;
        // }

        viewDidLoad(): void {
            this.super.viewDidLoad();

            // Unify translucent and opaque bars layout
            // this.edgesForExtendedLayout = UIRectEdgeBottom;
            this.extendedLayoutIncludesOpaqueBars = true;
        },

        viewWillLayoutSubviews(): void {
            this.super.viewWillLayoutSubviews();
            const owner = this.owner.get();
            if (owner) {
                iosView.updateConstraints(this, owner);
            }
        },

        viewDidLayoutSubviews(): void {
            this.super.viewDidLayoutSubviews();
            const owner = this.owner.get();
            if (owner) {
                if (majorVersion >= 11) {
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
        },

        viewWillAppear(animated: boolean): void {
            this.super.viewWillAppear(animated);
            const owner = this.owner.get();
            if (!owner) {
                return;
            }

            iosView.updateAutoAdjustScrollInsets(this, owner);

            if (!owner.parent) {
                owner.callLoaded();
            }
        },

        viewDidDisappear(animated: boolean): void {
            this.super.viewDidDisappear(animated);
            const owner = this.owner.get();
            if (owner && !owner.parent) {
                owner.callUnloaded();
            }
        },

        // Mind implementation for other controllers
        traitCollectionDidChange(previousTraitCollection: UITraitCollection): void {
            this.super.traitCollectionDidChange(previousTraitCollection);

            if (majorVersion >= 13) {
                const owner = this.owner.get();
                if (
                    owner &&
                    this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection &&
                    this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection(previousTraitCollection)
                ) {
                    owner.notify({ eventName: 'traitCollectionColorAppearanceChanged', object: owner });
                }
            }
        },
    },
    {}
) as typeof IUILayoutViewController;

export class ViewWithBottomSheet extends ViewWithBottomSheetBase {
    bottomSheetControllerDelegate: IMDCBottomSheetControllerDelegateImpl;
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
        let controller: IUILayoutViewController = this.viewController;
        if (!controller) {
            const nativeView = this.ios || this.nativeViewProtected;
            controller = UILayoutViewController.new();
            controller.owner = new WeakRef(this);
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
        this.bottomSheetControllerDelegate = bottomSheet.delegate = MDCBottomSheetControllerDelegateImpl.new();
        this.bottomSheetControllerDelegate._owner = new WeakRef(this);
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
            controller.view.backgroundColor = majorVersion <= 12 && !UIColor.systemBackgroundColor ? UIColor.whiteColor : UIColor.systemBackgroundColor;
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
