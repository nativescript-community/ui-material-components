﻿// Types
import { TabContentItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-content-item';
import { TabNavigationBase, getIconSpecSize, itemsProperty, selectedIndexProperty, tabStripProperty } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-navigation-base';
import { TabStrip } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip';
import { TabStripItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip-item';
// Types
// Requires
import { CSSType, Color, CoreTypes, Device, Font, Frame, IOSHelper, ImageSource, Property, Utils, View, booleanConverter } from '@nativescript/core';
import { getTransformedText } from '@nativescript/core/ui/text-base';
import { iOSNativeHelper } from '@nativescript/core/utils';
export { TabContentItem, TabStrip, TabStripItem };

// TODO:
// import { profile } from "../../profiling";

const maxTabsCount = 5;
const majorVersion = iOSNativeHelper.MajorVersion;
const isPhone = Device.deviceType === 'Phone';

@NativeClass
class UITabBarControllerImpl extends UITabBarController {
    private _owner: WeakRef<BottomNavigation>;

    public static initWithOwner(owner: WeakRef<BottomNavigation>): UITabBarControllerImpl {
        const handler = UITabBarControllerImpl.alloc().init() as UITabBarControllerImpl;
        handler._owner = owner;

        return handler;
    }

    // TODO
    // @profile
    public viewWillAppear(animated: boolean): void {
        super.viewWillAppear(animated);
        const owner = this._owner.get();
        if (!owner) {
            return;
        }

        // Unify translucent and opaque bars layout
        this.extendedLayoutIncludesOpaqueBars = true;

        IOSHelper.updateAutoAdjustScrollInsets(this, owner);

        if (!owner.parent) {
            owner.callLoaded();
        }
    }

    // TODO
    // @profile
    public viewDidDisappear(animated: boolean): void {
        super.viewDidDisappear(animated);

        if (this._owner) {
            const owner = this._owner.get();
            if (owner && !owner.parent && owner.isLoaded && !this.presentedViewController) {
                owner.callUnloaded();
            }
        }
    }

    public viewWillTransitionToSizeWithTransitionCoordinator(size: CGSize, coordinator: UIViewControllerTransitionCoordinator): void {
        super.viewWillTransitionToSizeWithTransitionCoordinator(size, coordinator);
        coordinator.animateAlongsideTransitionCompletion(() => {
            const owner = this._owner.get();
            if (owner && owner.tabStrip && owner.tabStrip.items) {
                const tabStrip = owner.tabStrip;
                tabStrip.items.forEach((tabStripItem) => {
                    updateBackgroundPositions(tabStrip, tabStripItem);

                    const index = tabStripItem._index;
                    const tabBarItemController = this.viewControllers[index];
                    updateTitleAndIconPositions(tabStripItem, tabBarItemController.tabBarItem, tabBarItemController);
                });
            }
        }, null);
    }

    // Mind implementation for other controllers
    public traitCollectionDidChange(previousTraitCollection: UITraitCollection): void {
        super.traitCollectionDidChange(previousTraitCollection);

        if (majorVersion >= 13) {
            const owner = this._owner.get();
            if (
                owner &&
                this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection &&
                this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection(previousTraitCollection)
            ) {
                owner.notify({
                    eventName: IOSHelper.traitCollectionColorAppearanceChangedEvent,
                    object: owner
                });
            }
        }
    }
}

@NativeClass
class UITabBarControllerDelegateImpl extends NSObject implements UITabBarControllerDelegate {
    public static ObjCProtocols = [UITabBarControllerDelegate];

    private _owner: WeakRef<BottomNavigation>;

    public static initWithOwner(owner: WeakRef<BottomNavigation>): UITabBarControllerDelegateImpl {
        const delegate = UITabBarControllerDelegateImpl.alloc().init() as UITabBarControllerDelegateImpl;
        delegate._owner = owner;

        return delegate;
    }

    public tabBarControllerShouldSelectViewController(tabBarController: UITabBarController, viewController: UIViewController): boolean {
        // TODO
        // if (Trace.isEnabled()) {
        //     Trace.write("TabView.delegate.SHOULD_select(" + tabBarController + ", " + viewController + ");", Trace.categories.Debug);
        // }

        const owner = this._owner.get();
        if (owner) {
            // "< More" cannot be visible after clicking on the main tab bar buttons.
            const backToMoreWillBeVisible = false;
            owner._handleTwoNavigationBars(backToMoreWillBeVisible);

            if (tabBarController.viewControllers) {
                const position = tabBarController.viewControllers.indexOfObject(viewController);
                if (position !== NSNotFound) {
                    const tabStrip = owner.tabStrip;
                    const tabStripItems = tabStrip && tabStrip.items;

                    if (tabStripItems && tabStripItems[position]) {
                        tabStripItems[position]._emit(TabStripItem.tapEvent);
                        tabStrip.notify({
                            eventName: TabStrip.itemTapEvent,
                            object: tabStrip,
                            index: position
                        });
                    }
                }
            }
        }

        if ((tabBarController as any).selectedViewController === viewController) {
            return false;
        }

        (tabBarController as any)._willSelectViewController = viewController;

        return true;
    }

    public tabBarControllerDidSelectViewController(tabBarController: UITabBarController, viewController: UIViewController): void {
        // TODO
        // if (Trace.isEnabled()) {
        //     Trace.write("TabView.delegate.DID_select(" + tabBarController + ", " + viewController + ");", Trace.categories.Debug);
        // }

        const owner = this._owner.get();
        if (owner) {
            owner._onViewControllerShown(viewController);
        }

        (tabBarController as any)._willSelectViewController = undefined;
    }
}

@NativeClass
class UINavigationControllerDelegateImpl extends NSObject implements UINavigationControllerDelegate {
    public static ObjCProtocols = [UINavigationControllerDelegate];

    private _owner: WeakRef<BottomNavigation>;

    public static initWithOwner(owner: WeakRef<BottomNavigation>): UINavigationControllerDelegateImpl {
        const delegate = UINavigationControllerDelegateImpl.alloc().init() as UINavigationControllerDelegateImpl;
        delegate._owner = owner;

        return delegate;
    }

    navigationControllerWillShowViewControllerAnimated(navigationController: UINavigationController, viewController: UIViewController, animated: boolean): void {
        // TODO
        // if (Trace.isEnabled()) {
        //     Trace.write("TabView.moreNavigationController.WILL_show(" + navigationController + ", " + viewController + ", " + animated + ");", Trace.categories.Debug);
        // }

        const owner = this._owner.get();
        if (owner) {
            // If viewController is one of our tab item controllers, then "< More" will be visible shortly.
            // Otherwise viewController is the UIMoreListController which shows the list of all tabs beyond the 4th tab.
            const backToMoreWillBeVisible = owner._ios.viewControllers.containsObject(viewController);
            owner._handleTwoNavigationBars(backToMoreWillBeVisible);
        }
    }

    navigationControllerDidShowViewControllerAnimated(navigationController: UINavigationController, viewController: UIViewController, animated: boolean): void {
        // TODO
        // if (Trace.isEnabled()) {
        //     Trace.write("TabView.moreNavigationController.DID_show(" + navigationController + ", " + viewController + ", " + animated + ");", Trace.categories.Debug);
        // }
        // We don't need Edit button in More screen.
        navigationController.navigationBar.topItem.rightBarButtonItem = null;
        const owner = this._owner.get();
        if (owner) {
            owner._onViewControllerShown(viewController);
        }
    }
}

function updateBackgroundPositions(tabStrip: TabStrip, tabStripItem: TabStripItem) {
    let bgView = (tabStripItem as any).bgView;
    const index = tabStripItem._index;
    const width = tabStrip.nativeView.frame.size.width / tabStrip.items.length;
    const frame = CGRectMake(width * index, 0, width, tabStrip.nativeView.frame.size.width);
    if (!bgView) {
        bgView = UIView.alloc().initWithFrame(frame);
        tabStrip.nativeView.insertSubviewAtIndex(bgView, 0);
        (tabStripItem as any).bgView = bgView;
    } else {
        bgView.frame = frame;
    }

    const backgroundColor = tabStripItem.style.backgroundColor;
    if (backgroundColor) {
        bgView.backgroundColor = backgroundColor instanceof Color ? backgroundColor.ios : backgroundColor;
    } else {
        // always default to at least a solid white background as fallback
        // building with Xcode 13 causes bgView with no background to be fully transparent unless a css background-color is set - this allows original default behavior to work as it always did
        bgView.backgroundColor = new Color('#fff').ios;
    }
}

function updateTitleAndIconPositions(tabStripItem: TabStripItem, tabBarItem: UITabBarItem, controller: UIViewController) {
    if (!tabStripItem || !tabBarItem) {
        return;
    }

    // For iOS <11 icon is *always* above the text.
    // For iOS 11 icon is above the text *only* on phones in portrait mode.
    const orientation = controller.interfaceOrientation;
    const isPortrait = orientation !== UIInterfaceOrientation.LandscapeLeft && orientation !== UIInterfaceOrientation.LandscapeRight;
    const isIconAboveTitle = majorVersion < 11 || (isPhone && isPortrait);

    if (!tabStripItem.iconSource) {
        if (isIconAboveTitle) {
            tabBarItem.titlePositionAdjustment = {
                horizontal: 0,
                vertical: -20
            };
        } else {
            tabBarItem.titlePositionAdjustment = { horizontal: 0, vertical: 0 };
        }
    }

    if (!tabStripItem.title) {
        if (isIconAboveTitle) {
            tabBarItem.imageInsets = new UIEdgeInsets({
                top: 6,
                left: 0,
                bottom: -6,
                right: 0
            });
        } else {
            tabBarItem.imageInsets = new UIEdgeInsets({
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            });
        }
    }
}

export const iosCustomPositioningProperty = new Property<BottomNavigation, boolean>({
    name: 'iosCustomPositioning',
    defaultValue: false,

    valueConverter: booleanConverter
});

@CSSType('BottomNavigation')
export class BottomNavigation extends TabNavigationBase {
    public viewController: UITabBarControllerImpl;
    public items: TabContentItem[];
    public _ios: UITabBarControllerImpl;
    private _delegate: UITabBarControllerDelegateImpl;
    private _moreNavigationControllerDelegate: UINavigationControllerDelegateImpl;
    private _iconsCache = {};
    private _selectedItemColor: Color;
    private _unSelectedItemColor: Color;
    public iosCustomPositioning: boolean;

    constructor() {
        super();
        this.viewController = this._ios = UITabBarControllerImpl.initWithOwner(new WeakRef(this));
        this.nativeViewProtected = this._ios.view;
    }

    initNativeView() {
        super.initNativeView();
        this._delegate = UITabBarControllerDelegateImpl.initWithOwner(new WeakRef(this));
        this._moreNavigationControllerDelegate = UINavigationControllerDelegateImpl.initWithOwner(new WeakRef(this));
        if (!this.tabStrip) {
            this.viewController.tabBar.hidden = true;
        }
    }

    disposeNativeView() {
        this._delegate = null;
        this._moreNavigationControllerDelegate = null;
        super.disposeNativeView();
    }

    // TODO
    // @profile
    public onLoaded() {
        super.onLoaded();

        this.setViewControllers(this.items);

        const selectedIndex = this.selectedIndex;
        const selectedView = this.items && this.items[selectedIndex] && this.items[selectedIndex].content;
        if (selectedView instanceof Frame) {
            selectedView._pushInFrameStackRecursive();
        }

        this._ios.delegate = this._delegate;
        this.onSelectedIndexChanged(selectedIndex, selectedIndex);
    }

    public onUnloaded() {
        this._ios.delegate = null;
        this._ios.moreNavigationController.delegate = null;
        super.onUnloaded();
        this.items.forEach((item, i) => {
            item.unloadView(item.content);
        });
    }

    // @ts-ignore
    get ios(): UITabBarController {
        return this._ios;
    }

    public layoutNativeView(left: number, top: number, right: number, bottom: number): void {
        if (this.iosCustomPositioning) {
            super.layoutNativeView(left, top, right, bottom);
        }
    }

    public _setNativeViewFrame(nativeView: UIView, frame: CGRect) {
        if (this.iosCustomPositioning) {
            super._setNativeViewFrame(nativeView, frame);
        }
    }

    public onSelectedIndexChanged(oldIndex: number, newIndex: number): void {
        const items = this.items;
        if (!items) {
            return;
        }
        if (this.unloadOnTabChange) {
            const oldItem = items[oldIndex];
            if (oldItem) {
                oldItem.canBeLoaded = false;
                oldItem.unloadView(oldItem.content);
            }
        }

        const newItem = items[newIndex];
        if (newItem && this.isLoaded) {
            const selectedView = items[newIndex].content;
            if (selectedView instanceof Frame) {
                selectedView._pushInFrameStackRecursive();
            }

            newItem.canBeLoaded = true;
            newItem.loadView(newItem.content);
        }

        const tabStripItems = this.tabStrip && this.tabStrip.items;
        if (tabStripItems) {
            if (tabStripItems[newIndex]) {
                tabStripItems[newIndex]._emit(TabStripItem.selectEvent);
            }
            if (oldIndex !== newIndex && tabStripItems[oldIndex]) {
                tabStripItems[oldIndex]._emit(TabStripItem.unselectEvent);
            }
        }

        super.onSelectedIndexChanged(oldIndex, newIndex);
    }

    public getTabBarBackgroundColor(): UIColor {
        return this._ios.tabBar.barTintColor;
    }

    public setTabBarBackgroundColor(value: UIColor | Color): void {
        this._ios.tabBar.barTintColor = value instanceof Color ? value.ios : value;
        this.updateAllItemsColors();
    }

    public setTabBarItemTitle(tabStripItem: TabStripItem, value: string): void {
        tabStripItem.nativeView.title = value;
    }

    public setTabBarItemBackgroundColor(tabStripItem: TabStripItem, value: UIColor | Color): void {
        if (!this.tabStrip || !tabStripItem) {
            return;
        }

        updateBackgroundPositions(this.tabStrip, tabStripItem);
    }

    public setTabBarItemColor(tabStripItem: TabStripItem, value: UIColor | Color): void {
        this.setViewAttributes(tabStripItem.nativeView, tabStripItem.label);
    }

    private setItemColors(): void {
        if (this._selectedItemColor) {
            this.viewController.tabBar.selectedImageTintColor = this._selectedItemColor.ios;
        }
        if (this._unSelectedItemColor) {
            this.viewController.tabBar.unselectedItemTintColor = this._unSelectedItemColor.ios;
        }
    }

    private setIconColor(tabStripItem: TabStripItem, forceReload = false): void {
        if (forceReload || (!this._unSelectedItemColor && !this._selectedItemColor)) {
            // if selectedItemColor or unSelectedItemColor is set we don't respect the color from the style
            const tabStripColor = this.selectedIndex === tabStripItem._index ? this._selectedItemColor : this._unSelectedItemColor;

            const image = this.getIcon(tabStripItem, tabStripColor);

            tabStripItem.nativeView.image = image;
            tabStripItem.nativeView.selectedImage = image;
        }
    }

    public setTabBarIconColor(tabStripItem: TabStripItem, value: UIColor | Color): void {
        this.setIconColor(tabStripItem);
    }

    public setTabBarIconSource(tabStripItem: TabStripItem, value: UIColor | Color): void {
        this.updateItemColors(tabStripItem);
    }

    public setTabBarItemFontInternal(tabStripItem: TabStripItem, value: Font): void {
        this.setViewAttributes(tabStripItem.nativeView, tabStripItem.label);
    }

    public setTabBarItemTextTransform(tabStripItem: TabStripItem, value: CoreTypes.TextTransformType): void {
        tabStripItem.nativeView.title = getTransformedText(tabStripItem.label.text, value);
    }

    public getTabBarHighlightColor(): UIColor {
        return this._ios.tabBar.tintColor;
    }

    public setTabBarHighlightColor(value: UIColor | Color) {
        this._ios.tabBar.tintColor = value instanceof Color ? value.ios : value;
    }

    public getTabBarSelectedItemColor(): Color {
        return this._selectedItemColor;
    }

    public setTabBarSelectedItemColor(value: Color) {
        this._selectedItemColor = value;
        this.updateAllItemsColors();
    }

    public getTabBarUnSelectedItemColor(): Color {
        return this._unSelectedItemColor;
    }

    public setTabBarUnSelectedItemColor(value: Color) {
        this._unSelectedItemColor = value;
        this.updateAllItemsColors();
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        const width = Utils.layout.getMeasureSpecSize(widthMeasureSpec);
        const widthMode = Utils.layout.getMeasureSpecMode(widthMeasureSpec);

        const height = Utils.layout.getMeasureSpecSize(heightMeasureSpec);
        const heightMode = Utils.layout.getMeasureSpecMode(heightMeasureSpec);

        const widthAndState = View.resolveSizeAndState(width, width, widthMode, 0);
        const heightAndState = View.resolveSizeAndState(height, height, heightMode, 0);

        this.setMeasuredDimension(widthAndState, heightAndState);
    }

    public _onViewControllerShown(viewController: UIViewController) {
        // This method could be called with the moreNavigationController or its list controller, so we have to check.
        // TODO
        // if (Trace.isEnabled()) {
        //     Trace.write("TabView._onViewControllerShown(" + viewController + ");", Trace.categories.Debug);
        // }
        if (this._ios.viewControllers && this._ios.viewControllers.containsObject(viewController)) {
            this.selectedIndex = this._ios.viewControllers.indexOfObject(viewController);
        } else {
            // TODO
            // if (Trace.isEnabled()) {
            //     Trace.write("TabView._onViewControllerShown: viewController is not one of our viewControllers", Trace.categories.Debug);
            // }
        }
    }

    private _actionBarHiddenByTabView: boolean;
    public _handleTwoNavigationBars(backToMoreWillBeVisible: boolean) {
        // TODO
        // if (Trace.isEnabled()) {
        //     Trace.write(`TabView._handleTwoNavigationBars(backToMoreWillBeVisible: ${backToMoreWillBeVisible})`, Trace.categories.Debug);
        // }

        // The "< Back" and "< More" navigation bars should not be visible simultaneously.
        const page = this.page || (this as any)._selectedView.page || (this as any)._selectedView.currentPage;
        if (!page || !page.frame) {
            return;
        }

        const actionBarVisible = page.frame._getNavBarVisible(page);

        if (backToMoreWillBeVisible && actionBarVisible) {
            page.frame.ios._disableNavBarAnimation = true;
            page.actionBarHidden = true;
            page.frame.ios._disableNavBarAnimation = false;
            this._actionBarHiddenByTabView = true;

            // TODO
            // if (Trace.isEnabled()) {
            //     Trace.write(`TabView hid action bar`, Trace.categories.Debug);
            // }
            return;
        }

        if (!backToMoreWillBeVisible && this._actionBarHiddenByTabView) {
            page.frame.ios._disableNavBarAnimation = true;
            page.actionBarHidden = false;
            page.frame.ios._disableNavBarAnimation = false;
            this._actionBarHiddenByTabView = undefined;

            // TODO
            // if (Trace.isEnabled()) {
            //     Trace.write(`TabView restored action bar`, Trace.categories.Debug);
            // }
            return;
        }
    }

    private getViewController(item: TabContentItem): UIViewController {
        let newController: UIViewController = item.content ? item.content.viewController : null;

        if (newController) {
            (item as any).setViewController(newController, newController.view);

            return newController;
        }

        if (item.content.ios instanceof UIViewController) {
            newController = item.content.ios;
            (item as any).setViewController(newController, newController.view);
        } else if (item.content.ios && item.content.ios.controller instanceof UIViewController) {
            newController = item.content.ios.controller;
            (item as any).setViewController(newController, newController.view);
        } else {
            newController = IOSHelper.UILayoutViewController.initWithOwner(new WeakRef(item.content)) as UIViewController;
            newController.view.addSubview(item.content.nativeViewProtected);
            item.content.viewController = newController;
            (item as any).setViewController(newController, item.content.nativeViewProtected);
        }

        return newController;
    }

    private setViewControllers(items: TabContentItem[]) {
        const length = items ? items.length : 0;
        if (length === 0) {
            this._ios.viewControllers = null;

            return;
        }

        // Limit both tabContentItems and tabStripItems to 5 in order to prevent iOS 'more' button
        items = items.slice(0, maxTabsCount);

        const controllers = NSMutableArray.alloc<UIViewController>().initWithCapacity(length);

        if (this.tabStrip) {
            this.tabStrip.setNativeView(this._ios.tabBar);
        }

        items.forEach((item, i) => {
            const controller = this.getViewController(item);

            if (this.tabStrip && this.tabStrip.items && this.tabStrip.items[i]) {
                const tabStripItem = this.tabStrip.items[i];
                const tabBarItem = this.createTabBarItem(tabStripItem, i);
                updateTitleAndIconPositions(tabStripItem, tabBarItem, controller);

                this.setViewAttributes(tabBarItem, tabStripItem.label);

                controller.tabBarItem = tabBarItem;
                tabStripItem._index = i;
                tabStripItem.setNativeView(tabBarItem);
            }

            controllers.addObject(controller);
        });

        this.setItemImages();

        this._ios.viewControllers = controllers;
        this._ios.customizableViewControllers = null;

        // When we set this._ios.viewControllers, someone is clearing the moreNavigationController.delegate, so we have to reassign it each time here.
        this._ios.moreNavigationController.delegate = this._moreNavigationControllerDelegate;
    }

    private setItemImages() {
        if (this._selectedItemColor || this._unSelectedItemColor) {
            if (this.tabStrip && this.tabStrip.items) {
                this.tabStrip.items.forEach((item) => {
                    if (this._unSelectedItemColor && item.nativeView) {
                        item.nativeView.image = this.getIcon(item, this._unSelectedItemColor);
                        item.nativeView.tintColor = this._unSelectedItemColor;
                    }
                    if (this._selectedItemColor && item.nativeView) {
                        item.nativeView.selectedImage = this.getIcon(item, this._selectedItemColor);
                        item.nativeView.tintColor = this._selectedItemColor;
                    }
                });
            }
        }
    }

    public updateAllItemsColors() {
        this.setItemColors();
        if (this.tabStrip && this.tabStrip.items) {
            this.tabStrip.items.forEach((tabStripItem) => {
                this.updateItemColors(tabStripItem);
            });
        }
    }

    private updateItemColors(tabStripItem: TabStripItem): void {
        updateBackgroundPositions(this.tabStrip, tabStripItem);
        this.setIconColor(tabStripItem, true);
    }

    private createTabBarItem(item: TabStripItem, index: number): UITabBarItem {
        let image: UIImage;
        let title: string;

        if (item.isLoaded) {
            image = this.getIcon(item);
            title = item.label.text;

            const textTransform = item.label.style.textTransform;
            if (textTransform) {
                title = getTransformedText(title, textTransform);
            }
        }

        return UITabBarItem.alloc().initWithTitleImageTag(title, image, index);
    }

    private getIconRenderingMode(): UIImageRenderingMode {
        switch (this.tabStrip && this.tabStrip.iosIconRenderingMode) {
            case 'alwaysOriginal':
                return UIImageRenderingMode.AlwaysOriginal;
            case 'alwaysTemplate':
                return UIImageRenderingMode.AlwaysTemplate;
            case 'automatic':
            default:
                return UIImageRenderingMode.Automatic;
        }
    }

    private getIcon(tabStripItem: TabStripItem, color?: Color): UIImage {
        // Image and Label children of TabStripItem
        // take priority over its `iconSource` and `title` properties
        const iconSource = tabStripItem.image && tabStripItem.image.src;
        if (!iconSource) {
            return null;
        }

        const target = tabStripItem.image;
        const font = target.style.fontInternal || Font.default;
        if (!color) {
            color = target.style.color;
        }
        const iconTag = [iconSource, font.fontStyle, font.fontWeight, font.fontSize, font.fontFamily, color].join(';');

        let isFontIcon = false;
        let image: UIImage = this._iconsCache[iconTag];
        if (!image) {
            let is;
            if (Utils.isFontIconURI(iconSource)) {
                isFontIcon = true;
                const fontIconCode = iconSource.split('//')[1];
                is = ImageSource.fromFontIconCodeSync(fontIconCode, font, color);
            } else {
                is = ImageSource.fromFileOrResourceSync(iconSource);
            }

            if (is && is.ios) {
                image = is.ios;

                if (this.tabStrip && this.tabStrip.isIconSizeFixed) {
                    image = this.getFixedSizeIcon(image);
                }

                let renderingMode: UIImageRenderingMode = UIImageRenderingMode.AlwaysOriginal;
                if (!isFontIcon) {
                    renderingMode = this.getIconRenderingMode();
                }
                const originalRenderedImage = image.imageWithRenderingMode(renderingMode);
                this._iconsCache[iconTag] = originalRenderedImage;
                image = originalRenderedImage;
            } else {
                // TODO
                // traceMissingIcon(iconSource);
            }
        }

        return image;
    }

    private getFixedSizeIcon(image: UIImage): UIImage {
        const inWidth = image.size.width;
        const inHeight = image.size.height;

        const iconSpecSize = getIconSpecSize({
            width: inWidth,
            height: inHeight
        });

        const widthPts = iconSpecSize.width;
        const heightPts = iconSpecSize.height;

        UIGraphicsBeginImageContextWithOptions({ width: widthPts, height: heightPts }, false, Utils.layout.getDisplayDensity());
        image.drawInRect(CGRectMake(0, 0, widthPts, heightPts));
        const resultImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();

        return resultImage;
    }

    // private _updateIOSTabBarColorsAndFonts(): void {
    //     if (!this.tabStrip || !this.tabStrip.items || !this.tabStrip.items.length) {
    //         return;
    //     }

    //     const tabBar = <UITabBar>this.ios.tabBar;
    //     const states = getTitleAttributesForStates(this);
    //     for (let i = 0; i < tabBar.items.count; i++) {
    //         applyStatesToItem(tabBar.items[i], states);
    //     }
    // }

    // TODO: Move this to TabStripItem
    // [fontInternalProperty.getDefault](): Font {
    //     return null;
    // }
    // [fontInternalProperty.setNative](value: Font) {
    //     this._updateIOSTabBarColorsAndFonts();
    // }

    [selectedIndexProperty.setNative](value: number): void {
        // TODO
        // if (Trace.isEnabled()) {
        //     Trace.write("TabView._onSelectedIndexPropertyChangedSetNativeValue(" + value + ")", Trace.categories.Debug);
        // }
        if (value > -1) {
            (this._ios as any)._willSelectViewController = this._ios.viewControllers[value];
            this._ios.selectedIndex = value;
        }
    }

    [itemsProperty.getDefault](): TabContentItem[] {
        return null;
    }
    [itemsProperty.setNative](value: TabContentItem[]): void {
        if (value) {
            value.forEach((item: TabContentItem, i) => {
                (item as any).index = i;
            });
        }

        this.setViewControllers(value);
        selectedIndexProperty.coerce(this);
    }

    [tabStripProperty.getDefault](): TabStrip {
        return null;
    }

    [tabStripProperty.setNative](value: TabStrip): void {
        this.setViewControllers(this.items);
        selectedIndexProperty.coerce(this);
    }

    private setViewAttributes(item: UITabBarItem, view: View): any {
        if (!view) {
            return null;
        }

        const defaultTabItemFontSize = 10;
        const tabItemFontSize = view.style.fontSize || defaultTabItemFontSize;
        const font: UIFont = (view.style.fontInternal || Font.default).getUIFont(UIFont.systemFontOfSize(tabItemFontSize));
        const tabItemTextColor = view.style.color;
        const textColor = tabItemTextColor instanceof Color ? tabItemTextColor.ios : null;
        const attributes: any = { [NSFontAttributeName]: font };

        // if selectedItemColor or unSelectedItemColor is set we don't respect the color from the style
        if (!this._selectedItemColor && !this._unSelectedItemColor) {
            if (textColor) {
                attributes[UITextAttributeTextColor] = textColor;
                attributes[NSForegroundColorAttributeName] = textColor;
            }
        } else {
            this.viewController.tabBar.unselectedItemTintColor = this._unSelectedItemColor && this._unSelectedItemColor.ios;
            this.viewController.tabBar.selectedImageTintColor = this._selectedItemColor && this._selectedItemColor.ios;
        }

        item.setTitleTextAttributesForState(attributes, UIControlState.Selected);
        item.setTitleTextAttributesForState(attributes, UIControlState.Normal);

        // there's a bug when setting the item color on ios 13 if there's no background set to the tabstrip
        // https://books.google.bg/books?id=99_BDwAAQBAJ&q=tabBar.unselectedItemTintColor
        // to fix the above issue we are applying the selected fix only for the case, when there is no background set
        // in that case we have the following known issue:
        // // we will set the color to all unselected items, so you won't be able to set different colors for the different not selected items
        if (!this.viewController.tabBar.barTintColor && attributes[UITextAttributeTextColor] && majorVersion > 9) {
            this.viewController.tabBar.unselectedItemTintColor = attributes[UITextAttributeTextColor];
        }
    }
}
iosCustomPositioningProperty.register(BottomNavigation);
