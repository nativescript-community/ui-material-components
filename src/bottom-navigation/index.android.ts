import { TabContentItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-content-item';
import { TabNavigationBase, getIconSpecSize, itemsProperty, selectedIndexProperty, tabStripProperty } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-navigation-base';
import { TabStrip } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip';
import { TabStripItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip-item';
// Types
// Requires
import { Application, CSSType, Color, CoreTypes, Font, Frame, ImageSource, Utils, View } from '@nativescript/core';
import { getTransformedText } from '@nativescript/core/ui/text-base';
export { TabContentItem, TabStrip, TabStripItem };

// TODO: Impl trace
// import { Trace } from "../../../trace";

const PRIMARY_COLOR = 'colorPrimary';
const DEFAULT_ELEVATION = 8;

const TABID = '_tabId';
const INDEX = '_index';
const ownerSymbol = Symbol('_owner');

let TabFragment: any;
let BottomNavigationBar: any;
let AttachStateChangeListener: any;
let appResources: android.content.res.Resources;

class IconInfo {
    drawable: android.graphics.drawable.BitmapDrawable;
    height: number;
}

function makeFragmentName(viewId: number, id: number): string {
    return 'android:bottomnavigation:' + viewId + ':' + id;
}

function getTabById(id: number): BottomNavigation {
    const ref = tabs.find((ref) => {
        const tab = ref.get();

        return tab && tab._domId === id;
    });

    return ref && ref.get();
}

function initializeNativeClasses() {
    if (BottomNavigationBar) {
        return;
    }

    @NativeClass
    class TabFragmentImplementation extends org.nativescript.widgets.FragmentBase {
        private owner: BottomNavigation;
        private index: number;
        private backgroundBitmap: android.graphics.Bitmap = null;

        constructor() {
            super();

            return global.__native(this);
        }

        static newInstance(tabId: number, index: number): TabFragmentImplementation {
            const args = new android.os.Bundle();
            args.putInt(TABID, tabId);
            args.putInt(INDEX, index);
            const fragment = new TabFragmentImplementation();
            fragment.setArguments(args);

            return fragment;
        }

        public onCreate(savedInstanceState: android.os.Bundle): void {
            super.onCreate(savedInstanceState);
            const args = this.getArguments();
            this.owner = getTabById(args.getInt(TABID));
            this.index = args.getInt(INDEX);
            if (!this.owner) {
                throw new Error('Cannot find BottomNavigation');
            }
        }

        public onCreateView(inflater: android.view.LayoutInflater, container: android.view.ViewGroup, savedInstanceState: android.os.Bundle): android.view.View {
            const tabItem = this.owner.items[this.index];

            return tabItem.nativeViewProtected;
        }

        public onDestroyView() {
            const hasRemovingParent = this.getRemovingParentFragment();

            // Get view as bitmap and set it as background. This is workaround for the disapearing nested fragments.
            // TODO: Consider removing it when update to androidx.fragment:1.2.0
            if (hasRemovingParent && this.owner.selectedIndex === this.index) {
                const bitmapDrawable = new android.graphics.drawable.BitmapDrawable(appResources, this.backgroundBitmap);
                this.owner._originalBackground = this.owner.backgroundColor || new Color('White');
                this.owner.nativeViewProtected.setBackgroundDrawable(bitmapDrawable);
                this.backgroundBitmap = null;

                const thisView = this.getView();
                if (thisView) {
                    const thisViewParent = thisView.getParent();
                    if (thisViewParent && thisViewParent instanceof android.view.ViewGroup) {
                        thisViewParent.removeView(thisView);
                    }
                }
            }

            super.onDestroyView();
        }

        public onPause(): void {
            const hasRemovingParent = this.getRemovingParentFragment();

            // Get view as bitmap and set it as background. This is workaround for the disapearing nested fragments.
            // TODO: Consider removing it when update to androidx.fragment:1.2.0
            if (hasRemovingParent && this.owner.selectedIndex === this.index) {
                this.backgroundBitmap = this.loadBitmapFromView(this.owner.nativeViewProtected);
            }

            super.onPause();
        }

        private loadBitmapFromView(view: android.view.View): android.graphics.Bitmap {
            // Another way to get view bitmap. Test performance vs setDrawingCacheEnabled
            // const width = view.getWidth();
            // const height = view.getHeight();
            // const bitmap = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
            // const canvas = new android.graphics.Canvas(bitmap);
            // view.layout(0, 0, width, height);
            // view.draw(canvas);

            view.setDrawingCacheEnabled(true);
            const bitmap = android.graphics.Bitmap.createBitmap(view.getDrawingCache());
            view.setDrawingCacheEnabled(false);

            return bitmap;
        }
    }

    @NativeClass
    class BottomNavigationBarImplementation extends com.nativescript.material.core.BottomNavigationBar {
        constructor(context: android.content.Context, public owner: BottomNavigation) {
            super(context);

            return global.__native(this);
        }

        public onSelectedPositionChange(position: number, prevPosition: number): void {
            const owner = this.owner;
            if (!owner) {
                return;
            }

            owner.changeTab(position);

            const tabStripItems = owner.tabStrip && owner.tabStrip.items;

            if (position >= 0 && tabStripItems && tabStripItems[position]) {
                tabStripItems[position]._emit(TabStripItem.selectEvent);
            }

            if (prevPosition >= 0 && tabStripItems && tabStripItems[prevPosition]) {
                tabStripItems[prevPosition]._emit(TabStripItem.unselectEvent);
            }

            owner._setItemsColors(owner.tabStrip.items);
        }

        public onTap(position: number): boolean {
            const owner = this.owner;
            if (!owner) {
                return false;
            }

            const tabStrip = owner.tabStrip;
            const tabStripItems = tabStrip && tabStrip.items;

            if (position >= 0 && tabStripItems[position]) {
                tabStripItems[position]._emit(TabStripItem.tapEvent);
                tabStrip.notify({
                    eventName: TabStrip.itemTapEvent,
                    object: tabStrip,
                    index: position
                });
            }

            if (!owner.items[position]) {
                return false;
            }

            return true;
        }
    }

    @NativeClass
    @Interfaces([android.view.View.OnAttachStateChangeListener])
    class AttachListener extends java.lang.Object implements android.view.View.OnAttachStateChangeListener {
        constructor() {
            super();

            return global.__native(this);
        }

        onViewAttachedToWindow(view: android.view.View): void {
            const owner: View = view[ownerSymbol];
            if (owner) {
                owner._onAttachedToWindow();
            }
        }

        onViewDetachedFromWindow(view: android.view.View): void {
            const owner: View = view[ownerSymbol];
            if (owner) {
                owner._onDetachedFromWindow();
            }
        }
    }

    TabFragment = TabFragmentImplementation;
    BottomNavigationBar = BottomNavigationBarImplementation;
    AttachStateChangeListener = new AttachListener();
    appResources = Application.android.context.getResources();
}

function setElevation(bottomNavigationBar: com.nativescript.material.core.BottomNavigationBar) {
    const compat = androidx.core.view.ViewCompat;
    if (compat.setElevation) {
        const val = DEFAULT_ELEVATION * Utils.layout.getDisplayDensity();
        compat.setElevation(bottomNavigationBar, val);
    }
}

export const tabs = new Array<WeakRef<BottomNavigation>>();

function iterateIndexRange(index: number, eps: number, lastIndex: number, callback: (i) => void) {
    const rangeStart = Math.max(0, index - eps);
    const rangeEnd = Math.min(index + eps, lastIndex);
    for (let i = rangeStart; i <= rangeEnd; i++) {
        callback(i);
    }
}

@CSSType('BottomNavigation')
export class BottomNavigation extends TabNavigationBase {
    private _contentView: org.nativescript.widgets.ContentLayout;
    private _contentViewId = -1;
    private _bottomNavigationBar: com.nativescript.material.core.BottomNavigationBar;
    private _currentFragment: androidx.fragment.app.Fragment;
    private _currentTransaction: androidx.fragment.app.FragmentTransaction;
    private _attachedToWindow = false;
    public _originalBackground: any;
    private _textTransform: CoreTypes.TextTransformType = 'none';
    private _selectedItemColor: Color;
    private _unSelectedItemColor: Color;
    fragments: androidx.fragment.app.Fragment[] = [];

    constructor() {
        super();
        tabs.push(new WeakRef(this));
    }

    get _hasFragments(): boolean {
        return true;
    }

    public onItemsChanged(oldItems: TabContentItem[], newItems: TabContentItem[]): void {
        super.onItemsChanged(oldItems, newItems);

        if (oldItems) {
            oldItems.forEach((item: TabContentItem, i, arr) => {
                (item as any).index = 0;
                (item as any).tabItemSpec = null;
                item.setNativeView(null);
            });
        }
    }

    public createNativeView() {
        initializeNativeClasses();
        // if (Trace.isEnabled()) {
        //     Trace.write("BottomNavigation._createUI(" + this + ");", traceCategory);
        // }

        const context: android.content.Context = this._context;
        const nativeView = new org.nativescript.widgets.GridLayout(context);

        nativeView.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.star));
        nativeView.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.auto));

        // CONTENT VIEW
        const contentView = new org.nativescript.widgets.ContentLayout(this._context);
        const contentViewLayoutParams = new org.nativescript.widgets.CommonLayoutParams();
        contentViewLayoutParams.row = 0;
        contentView.setLayoutParams(contentViewLayoutParams);
        nativeView.addView(contentView);
        (nativeView as any).contentView = contentView;

        // TABSTRIP
        const bottomNavigationBar = new BottomNavigationBar(context, this);
        const bottomNavigationBarLayoutParams = new org.nativescript.widgets.CommonLayoutParams();
        bottomNavigationBarLayoutParams.row = 1;
        bottomNavigationBar.setLayoutParams(bottomNavigationBarLayoutParams);
        nativeView.addView(bottomNavigationBar);
        (nativeView as any).bottomNavigationBar = bottomNavigationBar;

        setElevation(bottomNavigationBar);

        const primaryColor = Utils.ad.resources.getPaletteColor(PRIMARY_COLOR, context);
        if (primaryColor) {
            bottomNavigationBar.setBackgroundColor(primaryColor);
        }

        return nativeView;
    }

    public initNativeView(): void {
        super.initNativeView();
        if (this._contentViewId < 0) {
            this._contentViewId = android.view.View.generateViewId();
        }

        const nativeView: any = this.nativeViewProtected;

        nativeView.addOnAttachStateChangeListener(AttachStateChangeListener);
        nativeView[ownerSymbol] = this;

        this._contentView = nativeView.contentView;
        this._contentView.setId(this._contentViewId);

        this._bottomNavigationBar = nativeView.bottomNavigationBar;
        (this._bottomNavigationBar as any).owner = this;

        if (this.tabStrip) {
            this.tabStrip.setNativeView(this._bottomNavigationBar);
        }
    }

    public _loadUnloadTabItems(newIndex: number) {
        const items = this.items;
        const lastIndex = this.items.length - 1;
        const offsideItems = 0;

        const toUnload = [];
        const toLoad = [];

        iterateIndexRange(newIndex, offsideItems, lastIndex, (i) => toLoad.push(i));

        if (this.unloadOnTabChange) {
            items.forEach((item, i) => {
                const indexOfI = toLoad.indexOf(i);
                if (indexOfI < 0) {
                    toUnload.push(i);
                }
            });

            toUnload.forEach((index) => {
                const item = items[index];
                if (items[index]) {
                    item.unloadView(item.content);
                }
            });
        }

        const newItem = items[newIndex];
        const selectedView = newItem && newItem.content;
        if (selectedView instanceof Frame) {
            selectedView._pushInFrameStackRecursive();
        }

        toLoad.forEach((index) => {
            const item = items[index];
            if (this.isLoaded && item) {
                item.loadView(item.content);
            }
        });
    }

    public onLoaded(): void {
        super.onLoaded();

        if (this._originalBackground) {
            this.backgroundColor = null;
            this.backgroundColor = this._originalBackground;
            this._originalBackground = null;
        }

        if (this.tabStrip) {
            this.setTabStripItems(this.tabStrip.items);
        } else {
            // manually set the visibility, so that the grid layout remeasures
            this._bottomNavigationBar.setVisibility(android.view.View.GONE);
        }

        if (this._attachedToWindow) {
            this.changeTab(this.selectedIndex);
        }
    }

    _onAttachedToWindow(): void {
        super._onAttachedToWindow();

        // _onAttachedToWindow called from OS again after it was detach
        // still happens with androidx.fragment:1.3.2
        const activity = Application.android.foregroundActivity || Application.android.startActivity;
        const lifecycle = activity?.getLifecycle?.().getCurrentState() || androidx.lifecycle.Lifecycle.State.CREATED;
        if ((this._manager && this._manager.isDestroyed()) || (activity instanceof androidx.fragment.app.FragmentActivity && !lifecycle.isAtLeast(androidx.lifecycle.Lifecycle.State.CREATED))) {
            return;
        }

        this._attachedToWindow = true;
        this.changeTab(this.selectedIndex);
    }

    _onDetachedFromWindow(): void {
        super._onDetachedFromWindow();
        this.disposeTabFragments();
        this._attachedToWindow = false;
    }

    public onUnloaded(): void {
        super.onUnloaded();

        if (this.tabStrip) {
            this.setTabStripItems(null);
        }

        this.items.forEach((item, i) => {
            item.unloadView(item.content);
        });
    }

    public disposeNativeView() {
        this._bottomNavigationBar.setItems(null);
        this._bottomNavigationBar = null;

        this.nativeViewProtected.removeOnAttachStateChangeListener(AttachStateChangeListener);
        this.nativeViewProtected[ownerSymbol] = null;

        super.disposeNativeView();
        this.disposeTabFragments();
    }

    public _onRootViewReset(): void {
        super._onRootViewReset();

        // call this AFTER the super call to ensure descendants apply their rootview-reset logic first
        // i.e. in a scenario with tab frames let the frames cleanup their fragments first, and then
        // cleanup the tab fragments to avoid
        // android.content.res.Resources$NotFoundException: Unable to find resource ID #0xfffffff6
        this.disposeTabFragments();
    }

    private disposeTabFragments(): void {
        const fragments = this.fragments;
        for (let i = 0; i < fragments.length; i++) {
            this.removeFragment(fragments[i]);
        }
        // const items = this.items;
        // items.forEach((item, i) => {
        //     item.unloadView(item.content);
        // });
        // this._currentFragment = null;
        this.fragments = [];
    }
    private attachFragment(fragment: androidx.fragment.app.Fragment, id?: number, name?: string): void {
        //@ts-ignore
        const fragmentManager = this._getFragmentManager();
        if (fragment) {
            if (fragment.isAdded() || fragment.isRemoving()) {
                // ignore
            } else {
                const fragmentExitTransition = fragment.getExitTransition();
                if (fragmentExitTransition && fragmentExitTransition instanceof org.nativescript.widgets.CustomTransition) {
                    fragmentExitTransition.setResetOnTransitionEnd(true);
                }
                if (fragmentManager) {
                    if (!fragmentManager.isDestroyed()) {
                        try {
                            if (fragmentManager.isStateSaved()) {
                                if (id && name) {
                                    fragmentManager.beginTransaction().add(id, fragment, name).commitNowAllowingStateLoss();
                                } else {
                                    fragmentManager.beginTransaction().attach(fragment).commitNowAllowingStateLoss();
                                }
                            } else {
                                if (id && name) {
                                    fragmentManager.beginTransaction().add(id, fragment, name).commitNow();
                                } else {
                                    fragmentManager.beginTransaction().attach(fragment).commitNow();
                                }
                            }
                        } catch (e) {}
                    }
                }
            }
        }
    }

    // TODO: Should we extract adapter-like class?
    // TODO: Rename this?
    public changeTab(index: number) {
        // index is -1 when there are no items
        // bot nav is not attached if you change the tab too early
        if (index === -1 || !this._attachedToWindow) {
            return;
        }

        const fragmentToDetach = this._currentFragment;
        if (fragmentToDetach) {
            if (this.unloadOnTabChange) {
                this.destroyItem((fragmentToDetach as any).index, fragmentToDetach);
            } else {
                this.hideFragment(fragmentToDetach as any);
            }
        }

        const fragment = this.instantiateItem(this._contentView, index);
        this.setPrimaryItem(index, fragment, true);
    }
    private instantiateItem(container: android.view.ViewGroup, position: number): androidx.fragment.app.Fragment {
        const name = makeFragmentName(container.getId(), position);

        //@ts-ignore
        const fragmentManager = this._getFragmentManager();
        let fragment: androidx.fragment.app.Fragment = fragmentManager.findFragmentByTag(name);
        if (fragment != null) {
            this.attachFragment(fragment);
        } else {
            fragment = TabFragment.newInstance(this._domId, position);
            this.fragments.push(fragment);
            this.attachFragment(fragment, container.getId(), name);
        }
        this.items[position].callLoaded();

        // if (fragment !== this._currentFragment) {
        //     fragment.setMenuVisibility(false);
        //     fragment.setUserVisibleHint(false);
        // }

        return fragment;
    }

    private setPrimaryItem(position: number, fragment: androidx.fragment.app.Fragment, force = false): void {
        if (fragment !== this._currentFragment || force) {
            if (this._currentFragment != null) {
                this._currentFragment.setMenuVisibility(false);
                this._currentFragment.setUserVisibleHint(false);
            }

            if (fragment != null) {
                fragment.setMenuVisibility(true);
                fragment.setUserVisibleHint(true);
                if (!this.unloadOnTabChange) {
                    this.showFragment(fragment);
                }
            }

            this._currentFragment = fragment;
            this.selectedIndex = position;

            const tabItems = this.items;
            const tabItem = tabItems ? tabItems[position] : null;
            if (tabItem) {
                tabItem.canBeLoaded = true;
                this._loadUnloadTabItems(position);
            }
        }
    }
    private destroyItem(position: number, fragment: androidx.fragment.app.Fragment): void {
        if (fragment) {
            this.removeFragment(fragment);
            const index = this.fragments.indexOf(fragment);
            if (index !== -1) {
                this.fragments.splice(index, 1);
            }
            if (this._currentFragment === fragment) {
                this._currentFragment = null;
            }
        }
        if (this.items && this.items[position]) {
            this.items[position].canBeLoaded = false;
        }
        this.items[position].callUnloaded();
    }
    private hideFragment(fragment: androidx.fragment.app.Fragment, fragmentManager?: any) {
        if (!fragmentManager) {
            //@ts-ignore
            fragmentManager = this._getFragmentManager();
        }
        if (fragment) {
            if (!fragment.isAdded() || fragment.isRemoving()) {
                // ignore
                return;
            } else {
                const fragmentExitTransition = fragment.getExitTransition();
                if (fragmentExitTransition && fragmentExitTransition instanceof org.nativescript.widgets.CustomTransition) {
                    fragmentExitTransition.setResetOnTransitionEnd(true);
                }
                if (fragment && fragment.isAdded() && !fragment.isRemoving()) {
                    const pfm = (fragment as any).getParentFragmentManager ? (fragment as any).getParentFragmentManager() : null;
                    if (pfm && !pfm.isDestroyed()) {
                        try {
                            if (pfm.isStateSaved()) {
                                pfm.beginTransaction().hide(fragment).commitNowAllowingStateLoss();
                            } else {
                                pfm.beginTransaction().hide(fragment).commitNow();
                            }
                        } catch (e) {}
                    }
                }
            }
        }
    }
    private showFragment(fragment: androidx.fragment.app.Fragment, fragmentManager?: any) {
        if (!fragmentManager) {
            //@ts-ignore
            fragmentManager = this._getFragmentManager();
        }
        if (fragment) {
            if (!fragment.isAdded() || fragment.isRemoving()) {
                // ignore
                return;
            } else {
                const fragmentExitTransition = fragment.getExitTransition();
                if (fragmentExitTransition && fragmentExitTransition instanceof org.nativescript.widgets.CustomTransition) {
                    fragmentExitTransition.setResetOnTransitionEnd(true);
                }
                if (fragment && fragment.isAdded() && !fragment.isRemoving()) {
                    const pfm = (fragment as any).getParentFragmentManager ? (fragment as any).getParentFragmentManager() : null;
                    if (pfm && !pfm.isDestroyed()) {
                        try {
                            if (pfm.isStateSaved()) {
                                pfm.beginTransaction().show(fragment).commitNowAllowingStateLoss();
                            } else {
                                pfm.beginTransaction().show(fragment).commitNow();
                            }
                        } catch (e) {}
                    }
                }
            }
        }
    }
    private removeFragment(fragment: androidx.fragment.app.Fragment, fragmentManager?: any) {
        if (!fragmentManager) {
            //@ts-ignore
            fragmentManager = this._getFragmentManager();
        }
        if (fragment) {
            if (!fragment.isAdded() || fragment.isRemoving()) {
                // ignore
                return;
            } else {
                const fragmentExitTransition = fragment.getExitTransition();
                if (fragmentExitTransition && fragmentExitTransition instanceof org.nativescript.widgets.CustomTransition) {
                    fragmentExitTransition.setResetOnTransitionEnd(true);
                }
                if (fragment && fragment.isAdded() && !fragment.isRemoving()) {
                    const pfm = (fragment as any).getParentFragmentManager ? (fragment as any).getParentFragmentManager() : null;
                    if (pfm && !pfm.isDestroyed()) {
                        try {
                            if (pfm.isStateSaved()) {
                                pfm.beginTransaction().remove(fragment).commitNowAllowingStateLoss();
                            } else {
                                pfm.beginTransaction().remove(fragment).commitNow();
                            }
                        } catch (e) {}
                    }
                }
            }
        }
    }

    private setTabStripItems(items: TabStripItem[]) {
        if (!this.tabStrip || !items) {
            this._bottomNavigationBar.setItems(null);

            return;
        }

        const tabItems = new Array<com.nativescript.material.core.TabItemSpec>();
        items.forEach((tabStripItem, i, arr) => {
            tabStripItem._index = i;
            if (items[i]) {
                const tabItemSpec = this.createTabItemSpec(items[i]);
                tabItems.push(tabItemSpec);
            }
        });

        this._bottomNavigationBar.setItems(tabItems);

        items.forEach((item, i, arr) => {
            const textView = this._bottomNavigationBar.getTextViewForItemAt(i);
            item.setNativeView(textView);
            this._setItemColor(item);
        });
    }

    private getItemLabelTextTransform(tabStripItem: TabStripItem): CoreTypes.TextTransformType {
        const nestedLabel = tabStripItem.label;
        let textTransform: CoreTypes.TextTransformType = null;
        if (nestedLabel && nestedLabel.style.textTransform !== 'initial') {
            textTransform = nestedLabel.style.textTransform;
        } else if (tabStripItem.style.textTransform !== 'initial') {
            textTransform = tabStripItem.style.textTransform;
        }

        return textTransform || this._textTransform;
    }

    private createTabItemSpec(tabStripItem: TabStripItem): com.nativescript.material.core.TabItemSpec {
        const tabItemSpec = new com.nativescript.material.core.TabItemSpec();

        if (tabStripItem.isLoaded) {
            const titleLabel = tabStripItem.label;
            let title = titleLabel.text;

            // TEXT-TRANSFORM
            const textTransform = this.getItemLabelTextTransform(tabStripItem);
            title = getTransformedText(title, textTransform);
            tabItemSpec.title = title;

            // BACKGROUND-COLOR
            const backgroundColor = tabStripItem.style.backgroundColor;
            tabItemSpec.backgroundColor = backgroundColor ? backgroundColor.android : this.getTabBarBackgroundArgbColor();

            // COLOR
            const itemColor = this.selectedIndex === tabStripItem._index ? this._selectedItemColor : this._unSelectedItemColor;
            const color = itemColor || titleLabel.style.color;
            tabItemSpec.color = color && color.android;

            // FONT
            const fontInternal = titleLabel.style.fontInternal;
            if (fontInternal) {
                tabItemSpec.fontSize = fontInternal.fontSize;
                tabItemSpec.typeFace = fontInternal.getAndroidTypeface();
            }

            // ICON
            const iconSource = tabStripItem.image && tabStripItem.image.src;
            if (iconSource) {
                const iconInfo = this.getIconInfo(tabStripItem, itemColor);

                if (iconInfo) {
                    // TODO: Make this native call that accepts string so that we don't load Bitmap in JS.
                    // tslint:disable-next-line:deprecation
                    tabItemSpec.iconDrawable = iconInfo.drawable;
                    tabItemSpec.imageHeight = iconInfo.height;
                } else {
                    // TODO:
                    // traceMissingIcon(iconSource);
                }
            }
        }

        return tabItemSpec;
    }

    private getOriginalIcon(tabStripItem: TabStripItem, color?: Color): android.graphics.Bitmap {
        const iconSource = tabStripItem.image && tabStripItem.image.src;
        if (!iconSource) {
            return null;
        }

        let is: ImageSource;
        if (Utils.isFontIconURI(iconSource)) {
            const fontIconCode = iconSource.split('//')[1];
            const target = tabStripItem.image ? tabStripItem.image : tabStripItem;
            const font = target.style.fontInternal;
            if (!color) {
                color = target.style.color;
            }
            is = ImageSource.fromFontIconCodeSync(fontIconCode, font, color);
        } else {
            is = ImageSource.fromFileOrResourceSync(iconSource);
        }

        return is && is.android;
    }

    private getDrawableInfo(image: android.graphics.Bitmap): IconInfo {
        if (image) {
            if (this.tabStrip && this.tabStrip.isIconSizeFixed) {
                image = this.getFixedSizeIcon(image);
            }

            const imageDrawable = new android.graphics.drawable.BitmapDrawable(Application.android.context.getResources(), image);

            return {
                drawable: imageDrawable,
                height: image.getHeight()
            };
        }

        return new IconInfo();
    }

    private getIconInfo(tabStripItem: TabStripItem, color?: Color): IconInfo {
        const originalIcon = this.getOriginalIcon(tabStripItem, color);

        return this.getDrawableInfo(originalIcon);
    }

    private getFixedSizeIcon(image: android.graphics.Bitmap): android.graphics.Bitmap {
        const inWidth = image.getWidth();
        const inHeight = image.getHeight();

        const iconSpecSize = getIconSpecSize({
            width: inWidth,
            height: inHeight
        });

        const widthPixels = iconSpecSize.width * Utils.layout.getDisplayDensity();
        const heightPixels = iconSpecSize.height * Utils.layout.getDisplayDensity();

        const scaledImage = android.graphics.Bitmap.createScaledBitmap(image, widthPixels, heightPixels, true);

        return scaledImage;
    }

    public updateAndroidItemAt(index: number, spec: com.nativescript.material.core.TabItemSpec) {
        if (this._bottomNavigationBar) {
            this._bottomNavigationBar.updateItemAt(index, spec);
        }
    }

    public getTabBarBackgroundColor(): android.graphics.drawable.Drawable {
        return this._bottomNavigationBar.getBackground();
    }

    public setTabBarBackgroundColor(value: android.graphics.drawable.Drawable | Color): void {
        if (!this._bottomNavigationBar) {
            return;
        }
        if (value instanceof Color) {
            this._bottomNavigationBar.setBackgroundColor(value.android);
        } else {
            this._bottomNavigationBar.setBackground(tryCloneDrawable(value, this.nativeViewProtected.getResources()));
        }

        this.updateTabStripItems();
    }

    private updateTabStripItems(): void {
        this.tabStrip.items.forEach((tabStripItem: TabStripItem) => {
            if (tabStripItem.nativeView) {
                const tabItemSpec = this.createTabItemSpec(tabStripItem);
                this.updateAndroidItemAt(tabStripItem._index, tabItemSpec);
            }
        });
    }

    public _setItemsColors(items: TabStripItem[]): void {
        items.forEach((item) => {
            if (item.nativeView) {
                this._setItemColor(item);
            }
        });
    }

    public getTabBarSelectedItemColor(): Color {
        return this._selectedItemColor;
    }

    public setTabBarSelectedItemColor(value: Color) {
        this._selectedItemColor = value;
        this._setItemsColors(this.tabStrip.items);
    }

    public getTabBarUnSelectedItemColor(): Color {
        return this._unSelectedItemColor;
    }

    public setTabBarUnSelectedItemColor(value: Color) {
        this._unSelectedItemColor = value;
        this._setItemsColors(this.tabStrip.items);
    }

    private updateItem(tabStripItem: TabStripItem): void {
        // TODO: Should figure out a way to do it directly with the the nativeView
        const tabStripItemIndex = this.tabStrip.items.indexOf(tabStripItem);
        const tabItemSpec = this.createTabItemSpec(tabStripItem);
        this.updateAndroidItemAt(tabStripItemIndex, tabItemSpec);
    }

    public setTabBarItemTitle(tabStripItem: TabStripItem, value: string): void {
        this.updateItem(tabStripItem);
    }

    public setTabBarItemBackgroundColor(tabStripItem: TabStripItem, value: android.graphics.drawable.Drawable | Color): void {
        this.updateItem(tabStripItem);
    }

    public _setItemColor(tabStripItem: TabStripItem) {
        const itemColor = tabStripItem._index === this.selectedIndex ? this._selectedItemColor : this._unSelectedItemColor;
        if (!itemColor) {
            return;
        }

        // set label color
        tabStripItem.nativeViewProtected.setTextColor(itemColor.android);

        // set icon color
        this.setIconColor(tabStripItem, itemColor);
    }

    private setIconColor(tabStripItem: TabStripItem, color?: Color) {
        const tabBarItem = this._bottomNavigationBar.getViewForItemAt(tabStripItem._index);
        if (!tabBarItem) {
            return;
        }

        const drawableInfo = this.getIconInfo(tabStripItem, color);
        const imgView = tabBarItem.getChildAt(0) as android.widget.ImageView;
        imgView.setImageDrawable(drawableInfo.drawable);
        if (color) {
            imgView.setColorFilter(color.android);
        }
    }

    public setTabBarItemColor(tabStripItem: TabStripItem, value: number | Color): void {
        const itemColor = tabStripItem._index === this.selectedIndex ? this._selectedItemColor : this._unSelectedItemColor;
        if (itemColor) {
            // the itemColor is set through the selectedItemColor and unSelectedItemColor properties
            // so it does not respect the css color
            return;
        }

        const androidColor = value instanceof Color ? value.android : value;
        tabStripItem.nativeViewProtected.setTextColor(androidColor);
    }

    public setTabBarIconColor(tabStripItem: TabStripItem, value: number | Color): void {
        const itemColor = tabStripItem._index === this.selectedIndex ? this._selectedItemColor : this._unSelectedItemColor;
        if (itemColor) {
            // the itemColor is set through the selectedItemColor and unSelectedItemColor properties
            // so it does not respect the css color
            return;
        }

        this.setIconColor(tabStripItem);
    }

    public setTabBarIconSource(tabStripItem: TabStripItem, value: number | Color): void {
        this.updateItem(tabStripItem);
    }

    public setTabBarItemFontInternal(tabStripItem: TabStripItem, value: Font): void {
        if (value.fontSize) {
            tabStripItem.nativeViewProtected.setTextSize(value.fontSize);
        }

        tabStripItem.nativeViewProtected.setTypeface(value.getAndroidTypeface());
    }

    public setTabBarItemTextTransform(tabStripItem: TabStripItem, value: CoreTypes.TextTransformType): void {
        const titleLabel = tabStripItem.label;
        const title = getTransformedText(titleLabel.text, value);
        tabStripItem.nativeViewProtected.setText(title);
    }

    public getTabBarTextTransform(): CoreTypes.TextTransformType {
        return this._textTransform;
    }

    public setTabBarTextTransform(value: CoreTypes.TextTransformType): void {
        const items = this.tabStrip && this.tabStrip.items;
        if (items) {
            items.forEach((tabStripItem) => {
                if (tabStripItem.label && tabStripItem.nativeViewProtected) {
                    const nestedLabel = tabStripItem.label;
                    const title = getTransformedText(nestedLabel.text, value);
                    tabStripItem.nativeViewProtected.setText(title);
                }
            });
        }
        this._textTransform = value;
    }

    [selectedIndexProperty.setNative](value: number) {
        // const smoothScroll = false;

        // if (Trace.isEnabled()) {
        //     Trace.write("TabView this._viewPager.setCurrentItem(" + value + ", " + smoothScroll + ");", traceCategory);
        // }

        if (this.tabStrip) {
            this._bottomNavigationBar.setSelectedPosition(value);
        } else {
            this.changeTab(value);
        }
    }

    [itemsProperty.getDefault](): TabContentItem[] {
        return null;
    }
    [itemsProperty.setNative](value: TabContentItem[]) {
        if (value) {
            value.forEach((item: TabContentItem, i) => {
                (item as any).index = i;
            });
        }

        selectedIndexProperty.coerce(this);
    }

    [tabStripProperty.getDefault](): TabStrip {
        return null;
    }
    [tabStripProperty.setNative](value: TabStrip) {
        const items = this.tabStrip ? this.tabStrip.items : null;
        this.setTabStripItems(items);
    }
}

function tryCloneDrawable(value: android.graphics.drawable.Drawable, resources: android.content.res.Resources): android.graphics.drawable.Drawable {
    if (value) {
        const constantState = value.getConstantState();
        if (constantState) {
            return constantState.newDrawable(resources);
        }
    }

    return value;
}
