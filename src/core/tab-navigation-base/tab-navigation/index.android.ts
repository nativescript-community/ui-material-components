import { Application, Color, CoreTypes, Font, Frame, ImageSource, Utils, View, getTransformedText } from '@nativescript/core';
import { TabContentItem } from '../tab-content-item';
import { getIconSpecSize, itemsProperty, selectedIndexProperty, tabStripProperty } from '../tab-navigation-base';
import { TabStrip } from '../tab-strip';
import { TabStripItem } from '../tab-strip-item';
import { TabNavigationBase, TabsPosition, animationEnabledProperty, offscreenTabLimitProperty, swipeEnabledProperty } from './index-common';
export * from './index-common';
export { TabContentItem, TabStrip, TabStripItem };

const ACCENT_COLOR = 'colorAccent';
export const PRIMARY_COLOR = 'colorPrimary';
const DEFAULT_ELEVATION = 4;

const TABID = '_tabId';
const INDEX = '_index';
const ownerSymbol = Symbol('_owner');

type PagerAdapter = new (owner: WeakRef<TabNavigation>) => androidx.viewpager.widget.PagerAdapter;

// eslint-disable-next-line no-redeclare
let PagerAdapter: PagerAdapter;
let TabsBar: any;
let appResources: android.content.res.Resources;
let AttachStateChangeListener: any;

function makeFragmentName(viewId: number, id: number): string {
    return 'android:viewpager:' + viewId + ':' + id;
}

/**
 * Gets the parent fragment manager from a fragment to be used in destroying or hiding it.
 * @param fragment target fragment
 * @returns the parent fragment manager or null if none exists.
 */
function _getParentFragmentManagerFromFragment(fragment: androidx.fragment.app.Fragment) {
    if (!fragment) {
        return null;
    }
    try {
        return fragment.getParentFragmentManager();
    } catch (e) {
        return null;
    }
}

function getTabById(id: number): TabNavigation {
    const ref = tabs.find((ref) => {
        const tab = ref.get();

        return tab && tab._domId === id;
    });

    return ref && ref.get();
}
export interface PositionChanger {
    onSelectedPositionChange(position: number, prevPosition: number);
}

function initializeNativeClasses() {
    if (PagerAdapter) {
        return;
    }
    @NativeClass
    class TabFragmentImplementation extends org.nativescript.widgets.FragmentBase {
        private owner: TabNavigation;
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
                throw new Error('Cannot find TabView');
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
            if (hasRemovingParent && this.owner.selectedIndex === this.index && this.owner.nativeViewProtected) {
                const bitmapDrawable = new android.graphics.drawable.BitmapDrawable(appResources, this.backgroundBitmap);
                this.owner._originalBackground = this.owner.backgroundColor || new Color('White');
                this.owner.nativeViewProtected.setBackground(bitmapDrawable);
                this.backgroundBitmap = null;
            }

            super.onDestroyView();
        }

        public onPause(): void {
            const hasRemovingParent = this.getRemovingParentFragment();

            // Get view as bitmap and set it as background. This is workaround for the disapearing nested fragments.
            // TODO: Consider removing it when update to androidx.fragment:1.2.0
            if (hasRemovingParent && this.owner.selectedIndex === this.index && this.owner.nativeViewProtected) {
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

    const POSITION_UNCHANGED = -1;
    const POSITION_NONE = -2;

    @NativeClass
    class FragmentPagerAdapter extends androidx.viewpager.widget.PagerAdapter {
        public items: TabContentItem[];
        private mCurTransaction: androidx.fragment.app.FragmentTransaction;
        private mCurrentPrimaryItem: androidx.fragment.app.Fragment;

        constructor(public owner: WeakRef<TabNavigation>) {
            super();

            return global.__native(this);
        }

        getCount() {
            const items = this.items;

            return items ? items.length : 0;
        }

        getPageTitle(index: number) {
            const items = this.items;
            if (index < 0 || index >= items.length) {
                return '';
            }

            return ''; // items[index].title;
        }

        startUpdate(container: android.view.ViewGroup): void {
            if (container.getId() === android.view.View.NO_ID) {
                throw new Error(`ViewPager with adapter ${this} requires a view containerId`);
            }
        }

        instantiateItem(container: android.view.ViewGroup, position: number): java.lang.Object {
            const owner = this.owner?.get();
            if (!owner) {
                return null;
            }
            const fragmentManager = owner._getFragmentManager();
            if (!this.mCurTransaction) {
                this.mCurTransaction = fragmentManager.beginTransaction();
            }

            const itemId = this.getItemId(position);
            const name = makeFragmentName(container.getId(), itemId);

            let fragment: androidx.fragment.app.Fragment = fragmentManager.findFragmentByTag(name);
            if (fragment != null) {
                this.mCurTransaction.attach(fragment);
            } else {
                fragment = TabFragmentImplementation.newInstance(owner._domId, position);
                owner.fragments.push(fragment);
                this.mCurTransaction.add(container.getId(), fragment, name);
            }

            if (fragment !== this.mCurrentPrimaryItem) {
                fragment.setMenuVisibility(false);
                fragment.setUserVisibleHint(false);
            }

            const tabItems = owner.items;
            const tabItem = tabItems ? tabItems[position] : null;
            if (tabItem) {
                tabItem.canBeLoaded = true;
            }

            return fragment;
        }

        getItemPosition(object: java.lang.Object): number {
            return this.items ? POSITION_UNCHANGED : POSITION_NONE;
        }

        destroyItem(container: android.view.ViewGroup, position: number, object: java.lang.Object): void {
            const owner = this.owner?.get();
            if (!owner) {
                return;
            }
            const fragment: androidx.fragment.app.Fragment = object as androidx.fragment.app.Fragment;
            if (!this.mCurTransaction) {
                const fragmentManager = _getParentFragmentManagerFromFragment(fragment);
                this.mCurTransaction = fragmentManager?.beginTransaction();
            }

            const index = owner.fragments.indexOf(fragment);
            // if (index !== -1) {
            //     this.owner.fragments.splice(index, 1);
            // }
            this.mCurTransaction?.detach(fragment);

            if (this.mCurrentPrimaryItem === fragment) {
                this.mCurrentPrimaryItem = null;
            }

            const tabItems = owner.items;
            const tabItem = tabItems ? tabItems[position] : null;
            if (tabItem) {
                tabItem.canBeLoaded = false;
            }
        }

        setPrimaryItem(container: android.view.ViewGroup, position: number, object: java.lang.Object): void {
            const owner = this.owner?.get();
            if (!owner) {
                return;
            }
            const fragment = object as androidx.fragment.app.Fragment;
            if (fragment !== this.mCurrentPrimaryItem) {
                if (this.mCurrentPrimaryItem != null) {
                    this.mCurrentPrimaryItem.setMenuVisibility(false);
                    this.mCurrentPrimaryItem.setUserVisibleHint(false);
                }

                if (fragment != null) {
                    fragment.setMenuVisibility(true);
                    fragment.setUserVisibleHint(true);
                }

                const tab = owner;
                this.mCurrentPrimaryItem = fragment;
                tab.selectedIndex = position;

                const tabItems = tab.items;
                const newTabItem = tabItems ? tabItems[position] : null;

                if (newTabItem) {
                    tab._loadUnloadTabItems(tab.selectedIndex);
                }
            }
        }

        finishUpdate(container: android.view.ViewGroup): void {
            this._commitCurrentTransaction();
        }

        isViewFromObject(view: android.view.View, object: java.lang.Object): boolean {
            return (object as androidx.fragment.app.Fragment).getView() === view;
        }

        saveState(): android.os.Parcelable {
            // Commit the current transaction on save to prevent "No view found for id 0xa" exception on restore.
            // Related to: https://github.com/NativeScript/NativeScript/issues/6466
            this._commitCurrentTransaction();

            return null;
        }

        restoreState(state: android.os.Parcelable, loader: java.lang.ClassLoader): void {
            //
        }

        getItemId(position: number): number {
            return position;
        }

        private _commitCurrentTransaction() {
            if (this.mCurTransaction != null) {
                this.mCurTransaction.commitNowAllowingStateLoss();
                this.mCurTransaction = null;
            }
        }
    }

    @NativeClass
    class TabsBarImplementation extends com.nativescript.material.core.TabsBar implements PositionChanger {
        constructor(context: android.content.Context, public owner: TabNavigation) {
            super(context);

            return global.__native(this);
        }

        public onSelectedPositionChange(position: number, prevPosition: number): void {
            const owner = this.owner;
            if (!owner) {
                return;
            }
            owner.onTabsBarSelectedPositionChange(position, prevPosition);
        }

        public onTap(position: number): boolean {
            const owner = this.owner;
            if (!owner) {
                return false;
            }
            return owner.onTabsBarTap(position);
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
    PagerAdapter = FragmentPagerAdapter;
    TabsBar = TabsBarImplementation as any;
    AttachStateChangeListener = new AttachListener();
    appResources = Application.android.context.getResources();
}

let defaultAccentColor: number;
export function getDefaultAccentColor(context: android.content.Context): number {
    if (defaultAccentColor === undefined) {
        //Fallback color: https://developer.android.com/samples/SlidingTabsColors/src/com.example.android.common/view/SlidingTabStrip.html
        defaultAccentColor = Utils.android.resources.getPaletteColor(ACCENT_COLOR, context) || 0xff33b5e5;
    }

    return defaultAccentColor;
}

function setElevation(grid: org.nativescript.widgets.GridLayout, tabsBar: android.view.View, tabsPosition: string) {
    const compat = androidx.core.view.ViewCompat as any;
    if (compat.setElevation) {
        const val = DEFAULT_ELEVATION * Utils.layout.getDisplayDensity();

        if (grid && tabsPosition === 'top') {
            compat.setElevation(grid, val);
        }

        if (tabsBar) {
            compat.setElevation(tabsBar, val);
        }
    }
}

export const tabs = new Array<WeakRef<TabNavigation>>();

function iterateIndexRange(index: number, eps: number, lastIndex: number, callback: (i) => void) {
    const rangeStart = Math.max(0, index - eps);
    const rangeEnd = Math.min(index + eps, lastIndex);
    for (let i = rangeStart; i <= rangeEnd; i++) {
        callback(i);
    }
}

//TODO: move to abstract
export abstract class TabNavigation<T extends android.view.ViewGroup = any> extends TabNavigationBase {
    // export abstract class TabNavigation<T extends com.nativescript.material.core.TabsBar> extends TabNavigationBase {
    nativeViewProtected: org.nativescript.widgets.GridLayout;
    protected mTabsBar: T;
    protected mViewPager: com.nativescript.material.core.TabViewPager;
    protected mPagerAdapter: androidx.viewpager.widget.PagerAdapter;
    protected mAndroidViewId = -1;
    // value from N core!!!
    public _originalBackground: any;
    protected mTextTransform: CoreTypes.TextTransformType = 'none';
    protected mSelectedItemColor: Color;
    protected mUnSelectedItemColor: Color;
    fragments: androidx.fragment.app.Fragment[] = [];
    protected tabBarLayoutParams: org.nativescript.widgets.CommonLayoutParams;

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
        const context: android.content.Context = this._context;
        const nativeView = new org.nativescript.widgets.GridLayout(context);
        const viewPager = new com.nativescript.material.core.TabViewPager(context);
        const lp = new org.nativescript.widgets.CommonLayoutParams();
        lp.row = 1;
        if (this.tabsPosition === 'top') {
            nativeView.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.auto));
            nativeView.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.star));

            viewPager.setLayoutParams(lp);
        } else {
            nativeView.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.star));
            nativeView.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.auto));
            this.tabBarLayoutParams = lp;
        }

        nativeView.addView(viewPager);
        (nativeView as any).viewPager = viewPager;

        const adapter = (this.mPagerAdapter = new PagerAdapter(new WeakRef(this)));
        viewPager.setAdapter(adapter);
        (viewPager as any).adapter = adapter;
        this.mViewPager = viewPager;
        setElevation(nativeView, null, this.tabsPosition);

        if (this.tabStrip) {
            this.handleTabStripChanged(nativeView, null, this.tabStrip);
        }

        return nativeView;
    }

    // TODO: mark abstract
    protected createNativeTabBar(context: android.content.Context) {
        const tabsBar = new TabsBar(context, this);
        const primaryColor = Utils.android.resources.getPaletteColor(PRIMARY_COLOR, context);
        const accentColor = getDefaultAccentColor(context);
        if (accentColor) {
            tabsBar.setSelectedIndicatorColors([accentColor]);
        }

        if (primaryColor) {
            tabsBar.setBackgroundColor(primaryColor);
        }
        return tabsBar;
    }

    protected abstract setTabBarItems(tabItems: com.nativescript.material.core.TabItemSpec[], viewPager: com.nativescript.material.core.TabViewPager);
    protected abstract getTabBarItemView(index: number);
    protected abstract getTabBarItemTextView(index: number);
    protected abstract selectTabBar(oldIndex: number, newIndex: number);

    private handleTabStripChanged(nativeView: org.nativescript.widgets.GridLayout, oldTabStrip: TabStrip, newTabStrip: TabStrip) {
        if (this.mTabsBar) {
            nativeView.removeView(this.mTabsBar);
            nativeView['tabsBar'] = null;
            this.mTabsBar = null;
        }

        if (newTabStrip) {
            initializeNativeClasses();
            const context = this._context;
            const tabsBar = (this.mTabsBar = this.createNativeTabBar(context));
            setElevation(null, tabsBar, this.tabsPosition);
            console.log('handleTabStripChanged', this.tabsPosition);
            if (this.tabsPosition !== TabsPosition.Top) {
                tabsBar.setLayoutParams(this.tabBarLayoutParams);
            }
            nativeView.addView(tabsBar);
            nativeView['tabsBar'] = tabsBar;
        }
    }
    public onTabStripChanged(oldTabStrip: TabStrip, newTabStrip: TabStrip) {
        super.onTabStripChanged(oldTabStrip, newTabStrip);
        const nativeView = this.nativeViewProtected;
        if (!nativeView) {
            return;
        }
        this.handleTabStripChanged(nativeView, oldTabStrip, newTabStrip);
    }

    onSelectedIndexChanged(oldIndex: number, newIndex: number) {
        if (this.mTabsBar) {
            this.selectTabBar(oldIndex, newIndex);
        }
        super.onSelectedIndexChanged(oldIndex, newIndex);
    }

    public initNativeView(): void {
        super.initNativeView();
        if (this.mAndroidViewId < 0) {
            this.mAndroidViewId = android.view.View.generateViewId();
        }

        const nativeView: any = this.nativeViewProtected;
        // this._tabsBar = nativeView.tabsBar;

        // nativeView.addOnAttachStateChangeListener(AttachStateChangeListener);
        // nativeView[ownerSymbol] = this;

        const viewPager = nativeView.viewPager;
        viewPager.setId(this.mAndroidViewId);
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

        this.mViewPager.setCurrentItem(this.selectedIndex, false);
    }

    _onDetachedFromWindow(): void {
        super._onDetachedFromWindow();
        this.disposeTabFragments();
    }

    public _loadUnloadTabItems(newIndex: number) {
        const items = this.items;
        if (!items) {
            return;
        }

        const lastIndex = items.length - 1;
        const offsideItems = this.offscreenTabLimit;

        const toUnload = [];
        const toLoad = [];

        iterateIndexRange(newIndex, offsideItems, lastIndex, (i) => toLoad.push(i));

        if (this.unloadOnTabChange) {
            items.forEach((item, i) => {
                const indexOfI = toLoad.indexOf(i);
                if (indexOfI < 0) {
                    toUnload.push(i);
                }
                toUnload.forEach((index) => {
                    const item = items[index];
                    if (items[index]) {
                        item.unloadView(item.content);
                    }
                });
            });
        }

        const newItem = items[newIndex];
        const selectedView = newItem && newItem.content;
        if (selectedView instanceof Frame) {
            selectedView._pushInFrameStackRecursive();
        }

        toLoad.forEach((index) => {
            const item = items[index];
            if (this.isLoaded && items[index]) {
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

        this.setItems(this.items as any);

        if (this.tabStrip) {
            this.setTabStripItems(this.tabStrip.items);
        }

        // this.setAdapterItems(this.items);
    }

    public onUnloaded(): void {
        super.onUnloaded();

        this.setItems(null);
        this.setTabStripItems(null);

        // TODO: needed ?
        this.items.forEach((item, i) => {
            item.unloadView(item.content);
        });
        // this.setAdapterItems(null);
    }

    public disposeNativeView() {
        if (this.mTabsBar) {
            this.setTabBarItems(null, null);
        }
        (this.mPagerAdapter as any).owner = null;
        this.mPagerAdapter = null;

        this.nativeViewProtected.removeOnAttachStateChangeListener(AttachStateChangeListener);
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

    private removeFragment(fragment: androidx.fragment.app.Fragment) {
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
                    const pfm = _getParentFragmentManagerFromFragment(fragment);
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

    // private disposeCurrentFragments(): void {
    //     const fragmentManager = this._getFragmentManager();
    //     const transaction = fragmentManager.beginTransaction();

    //     const fragments = this.fragments;
    //     for (let i = 0; i < fragments.length; i++) {
    //         transaction.remove(fragments[i]);
    //     }
    //     transaction.commitNowAllowingStateLoss();
    //     this.fragments = [];
    // }

    private shouldUpdateAdapter(items: TabContentItem[]) {
        if (!this.mPagerAdapter) {
            return false;
        }

        const currentPagerAdapterItems = (this.mPagerAdapter as any).items;

        // if both values are null, should not update
        if (!items && !currentPagerAdapterItems) {
            return false;
        }

        // if one value is null, should update
        if (!items || !currentPagerAdapterItems) {
            return true;
        }

        // if both are Arrays but length doesn't match, should update
        if (items.length !== currentPagerAdapterItems.length) {
            return true;
        }

        const matchingItems = currentPagerAdapterItems.filter((currentItem) => !!items.filter((item) => item._domId === currentItem._domId)[0]);

        // if both are Arrays and length matches, but not all items are the same, should update
        if (matchingItems.length !== items.length) {
            return true;
        }

        // if both are Arrays and length matches and all items are the same, should not update
        return false;
    }

    private setItems(items: TabContentItem[]) {
        if (this.shouldUpdateAdapter(items)) {
            (this.mPagerAdapter as any).items = items;

            if (items && items.length) {
                items.forEach((item: TabContentItem, i) => {
                    (item as any).index = i;
                });
            }

            this.mPagerAdapter.notifyDataSetChanged();
        }
    }

    private setTabStripItems(items: TabStripItem[]) {
        const length = items ? items.length : 0;
        if (length === 0) {
            if (this.mTabsBar) {
                this.setTabBarItems(null, null);
            }
            return;
        }

        const tabItems = new Array<com.nativescript.material.core.TabItemSpec>();
        items.forEach((tabStripItem: TabStripItem, i, arr) => {
            if (!this.mUnSelectedItemColor) {
                this.mUnSelectedItemColor = tabStripItem.label?.style.color;
            }
            tabStripItem._index = i;
            const tabItemSpec = this.createTabItemSpec(tabStripItem);
            (tabStripItem as any).tabItemSpec = tabItemSpec;
            tabItems.push(tabItemSpec);
        });

        const tabsBar = this.mTabsBar;
        this.setTabBarItems(tabItems, this.mViewPager);
        this.tabStrip.setNativeView(tabsBar);
        items.forEach((item, i, arr) => {
            const tv = this.getTabBarItemTextView(i);
            item.setNativeView(tv);
            this._setItemColor(item);
        });
    }

    protected createTabItemSpec(tabStripItem: TabStripItem): com.nativescript.material.core.TabItemSpec {
        const tabItemSpec = new com.nativescript.material.core.TabItemSpec();

        if (tabStripItem.isLoaded) {
            const nestedLabel = tabStripItem.label;
            let title = nestedLabel.text;

            // TEXT-TRANSFORM
            const textTransform = this.getItemLabelTextTransform(tabStripItem);
            title = getTransformedText(title, textTransform);
            tabItemSpec.title = title;

            // BACKGROUND-COLOR
            const backgroundColor = tabStripItem.style.backgroundColor;
            tabItemSpec.backgroundColor = backgroundColor ? backgroundColor.android : this.getTabBarBackgroundArgbColor();

            // COLOR
            const itemColor = this.selectedIndex === tabStripItem._index ? this.mSelectedItemColor : this.mUnSelectedItemColor;
            const color = itemColor || nestedLabel.style.color;
            tabItemSpec.color = color && color.android;

            // FONT
            const fontInternal = nestedLabel.style.fontInternal;
            if (fontInternal) {
                tabItemSpec.fontSize = fontInternal.fontSize;
                tabItemSpec.typeFace = fontInternal.getAndroidTypeface();
            }

            // ICON
            const iconSource = tabStripItem.image && tabStripItem.image.src;
            if (iconSource) {
                const icon = this.getIcon(tabStripItem, itemColor);

                if (icon) {
                    // TODO: Make this native call that accepts string so that we don't load Bitmap in JS.
                    // tslint:disable-next-line:deprecation
                    tabItemSpec.iconDrawable = icon;
                } else {
                    // TODO:
                    // traceMissingIcon(iconSource);
                }
            }
        }

        return tabItemSpec;
    }

    private getIcon(tabStripItem: TabStripItem, color?: Color): android.graphics.drawable.BitmapDrawable {
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

        let imageDrawable: android.graphics.drawable.BitmapDrawable;
        if (is && is.android) {
            let image = is.android;

            if (this.tabStrip && this.tabStrip.isIconSizeFixed) {
                image = this.getFixedSizeIcon(image);
            }

            imageDrawable = new android.graphics.drawable.BitmapDrawable(appResources, image);
        } else {
            // TODO
            // traceMissingIcon(iconSource);
        }

        return imageDrawable;
    }

    private getFixedSizeIcon(image: android.graphics.Bitmap): android.graphics.Bitmap {
        const inWidth = image.getWidth();
        const inHeight = image.getHeight();

        const iconSpecSize = getIconSpecSize({ width: inWidth, height: inHeight });

        const widthPixels = iconSpecSize.width * Utils.layout.getDisplayDensity();
        const heightPixels = iconSpecSize.height * Utils.layout.getDisplayDensity();

        const scaledImage = android.graphics.Bitmap.createScaledBitmap(image, widthPixels, heightPixels, true);

        return scaledImage;
    }

    // private setAdapterItems(items: Array<TabStripItem>) {
    //     if (this.shouldUpdateAdapter(items)) {
    //         (this._pagerAdapter as any).items = items;

    //         const length = items ? items.length : 0;
    //         if (length === 0) {
    //             this._tabLayout.setItems(null, null);
    //             this._pagerAdapter.notifyDataSetChanged();
    //             return;
    //         }

    //         const tabItems = new Array<com.nativescript.material.core.TabItemSpec>();
    //         items.forEach((item: TabStripItem, i, arr) => {
    //             const tabItemSpec = createTabItemSpec(item);
    //             (item as any).index = i;
    //             (item as any).tabItemSpec = tabItemSpec;
    //             tabItems.push(tabItemSpec);
    //         });

    //         const tabLayout = this._tabLayout;
    //         tabLayout.setItems(tabItems, this._viewPager);
    //         items.forEach((item, i, arr) => {
    //             const tv = tabLayout.getTextViewForItemAt(i);
    //             item.setNativeView(tv);
    //         });

    //         this._pagerAdapter.notifyDataSetChanged();
    //     }
    // }
    protected abstract updateTabsBarItemAt(index: number, spec: com.nativescript.material.core.TabItemSpec);
    protected abstract setTabsBarSelectedIndicatorColors(colors: number[]);
    public updateAndroidItemAt(index: number, spec: com.nativescript.material.core.TabItemSpec) {
        // that try catch is fix for an android NPE error on css change which navigated in (not the current fragment)
        try {
            if (this.mTabsBar) {
                this.updateTabsBarItemAt(index, spec);
            }
        } catch (err) {}
    }

    public getTabBarBackgroundColor(): android.graphics.drawable.Drawable {
        return this.mTabsBar.getBackground();
    }

    public setTabBarBackgroundColor(value: android.graphics.drawable.Drawable | Color): void {
        if (value instanceof Color) {
            this.mTabsBar.setBackgroundColor(value.android);
        } else {
            this.mTabsBar.setBackground(tryCloneDrawable(value, this.nativeViewProtected.getResources()));
        }
    }

    public getTabBarHighlightColor(): number {
        return getDefaultAccentColor(this._context);
    }

    public setTabBarHighlightColor(value: number | Color) {
        const color = value instanceof Color ? value.android : value;
        this.setTabsBarSelectedIndicatorColors([color]);
    }

    public getTabBarSelectedItemColor(): Color {
        return this.mSelectedItemColor;
    }

    public setTabBarSelectedItemColor(value: Color) {
        this.mSelectedItemColor = value;
    }

    public getTabBarUnSelectedItemColor(): Color {
        return this.mUnSelectedItemColor;
    }

    public setTabBarUnSelectedItemColor(value: Color) {
        this.mUnSelectedItemColor = value;
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
        if (!tabStripItem.nativeViewProtected) {
            return;
        }
        const itemColor = tabStripItem._index === this.selectedIndex ? this.mSelectedItemColor : this.mUnSelectedItemColor;
        if (!itemColor) {
            return;
        }

        // set label color
        tabStripItem.nativeViewProtected.setTextColor(itemColor.android);

        // set icon color
        this.setIconColor(tabStripItem, itemColor);
    }

    protected setIconColor(tabStripItem: TabStripItem, color?: Color) {
        if (!tabStripItem.nativeViewProtected) {
            return;
        }
        const tabBarItem = this.getTabBarItemView(tabStripItem._index);

        const drawable = this.getIcon(tabStripItem, color);
        const imgView = tabBarItem.getChildAt(0) as android.widget.ImageView;
        imgView.setImageDrawable(drawable);
        if (color) {
            imgView.setColorFilter(color.android);
        }
    }

    public setTabBarItemColor(tabStripItem: TabStripItem, value: number | Color): void {
        const itemColor = tabStripItem._index === this.selectedIndex ? this.mSelectedItemColor : this.mUnSelectedItemColor;
        if (itemColor) {
            // the itemColor is set through the selectedItemColor and unSelectedItemColor properties
            // so it does not respect the css color
            return;
        }

        const androidColor = value instanceof Color ? value.android : value;
        tabStripItem.nativeViewProtected.setTextColor(androidColor);
    }

    public setTabBarIconColor(tabStripItem: TabStripItem, value: number | Color): void {
        const itemColor = tabStripItem._index === this.selectedIndex ? this.mSelectedItemColor : this.mUnSelectedItemColor;
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
        const nestedLabel = tabStripItem.label;
        const title = getTransformedText(nestedLabel.text, value);
        tabStripItem.nativeViewProtected.setText(title);
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
        this.mTextTransform = value;
    }

    public onTabsBarSelectedPositionChange(position: number, prevPosition: number): void {
        const tabStripItems = this.tabStrip?.items;

        if (position >= 0 && tabStripItems && tabStripItems[position]) {
            tabStripItems[position]._emit(TabStripItem.selectEvent);
            this._setItemColor(tabStripItems[position]);
        }

        if (prevPosition >= 0 && tabStripItems && tabStripItems[prevPosition]) {
            tabStripItems[prevPosition]._emit(TabStripItem.unselectEvent);
            this._setItemColor(tabStripItems[prevPosition]);
        }
    }

    public onTabsBarTap(position: number): boolean {
        const tabStrip = this.tabStrip;
        const tabStripItems = tabStrip && tabStrip.items;

        if (position >= 0 && tabStripItems[position]) {
            tabStripItems[position]._emit(TabStripItem.tapEvent);
            tabStrip.notify({ eventName: TabStrip.itemTapEvent, object: tabStrip, index: position });
        }

        if (!this.items[position]) {
            return false;
        }

        return true;
    }

    [selectedIndexProperty.setNative](value: number) {
        // TODO
        // if (traceEnabled()) {
        //     traceWrite("TabView this._viewPager.setCurrentItem(" + value + ", " + smoothScroll + ");", traceCategory);
        // }
        this.mViewPager.setCurrentItem(value, this.animationEnabled);
    }

    [itemsProperty.getDefault](): TabContentItem[] {
        return null;
    }
    [itemsProperty.setNative](value: TabContentItem[]) {
        this.setItems(value);
        selectedIndexProperty.coerce(this as any);
    }

    [tabStripProperty.getDefault](): TabStrip {
        return null;
    }
    [tabStripProperty.setNative](value: TabStrip) {
        this.setTabStripItems(value?.items || null);
    }

    [swipeEnabledProperty.getDefault](): boolean {
        return true;
    }
    [swipeEnabledProperty.setNative](value: boolean) {
        this.mViewPager.setSwipePageEnabled(value);
    }

    [offscreenTabLimitProperty.getDefault](): number {
        return this.mViewPager.getOffscreenPageLimit();
    }
    [offscreenTabLimitProperty.setNative](value: number) {
        this.mViewPager.setOffscreenPageLimit(value);
    }
    [animationEnabledProperty.setNative](value: number) {
        (this.mViewPager as any).setAnimationEnabled(value);
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
