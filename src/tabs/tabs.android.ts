import { Application, CoercibleProperty, Color, CoreTypes, Font, Frame, ImageSource, Property, Utils, View, getTransformedText, isIOS } from '@nativescript/core';
import { TabStrip } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip';
import { TabStripItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip-item';
import { TabContentItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-content-item';
import { TabsBase, animationEnabledProperty, offscreenTabLimitProperty, swipeEnabledProperty } from './tabs-common';
import { getIconSpecSize, itemsProperty, selectedIndexProperty, tabStripProperty } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-navigation-base';
export { TabContentItem, TabStrip, TabStripItem };

export * from './tabs-common';

const ACCENT_COLOR = 'colorAccent';
const PRIMARY_COLOR = 'colorPrimary';
const DEFAULT_ELEVATION = 4;

const TABID = '_tabId';
const INDEX = '_index';
const ownerSymbol = Symbol('_owner');

type PagerAdapter = new (owner: Tabs) => androidx.viewpager.widget.PagerAdapter;

// eslint-disable-next-line no-redeclare
let PagerAdapter: PagerAdapter;
let TabsBar: any;
let appResources: android.content.res.Resources;
let AttachStateChangeListener: any;

function makeFragmentName(viewId: number, id: number): string {
    return 'android:viewpager:' + viewId + ':' + id;
}

function getTabById(id: number): Tabs {
    const ref = tabs.find((ref) => {
        const tab = ref.get();

        return tab && tab._domId === id;
    });

    return ref && ref.get();
}
interface PositionChanger {
    onSelectedPositionChange(position: number, prevPosition: number);
}

function initializeNativeClasses() {
    if (PagerAdapter) {
        return;
    }
    @NativeClass
    class TabFragmentImplementation extends org.nativescript.widgets.FragmentBase {
        private owner: Tabs;
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
            if (hasRemovingParent && this.owner.selectedIndex === this.index) {
                const bitmapDrawable = new android.graphics.drawable.BitmapDrawable(appResources, this.backgroundBitmap);
                this.owner._originalBackground = this.owner.backgroundColor || new Color('White');
                this.owner.nativeViewProtected.setBackgroundDrawable(bitmapDrawable);
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

        constructor(public owner: Tabs) {
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
            const fragmentManager = this.owner._getFragmentManager();
            if (!this.mCurTransaction) {
                this.mCurTransaction = fragmentManager.beginTransaction();
            }

            const itemId = this.getItemId(position);
            const name = makeFragmentName(container.getId(), itemId);

            let fragment: androidx.fragment.app.Fragment = fragmentManager.findFragmentByTag(name);
            if (fragment != null) {
                this.mCurTransaction.attach(fragment);
            } else {
                fragment = TabFragmentImplementation.newInstance(this.owner._domId, position);
                this.owner.fragments.push(fragment);
                this.mCurTransaction.add(container.getId(), fragment, name);
            }

            if (fragment !== this.mCurrentPrimaryItem) {
                fragment.setMenuVisibility(false);
                fragment.setUserVisibleHint(false);
            }

            const tabItems = this.owner.items;
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
            const fragment: androidx.fragment.app.Fragment = object as androidx.fragment.app.Fragment;
            if (!this.mCurTransaction) {
                const fragmentManager: androidx.fragment.app.FragmentManager = this.owner._getParentFragmentManagerFromFragment(fragment);
                this.mCurTransaction = fragmentManager?.beginTransaction();
            }

            // detached fragments are still attached to the fragment manager
            // const index = this.owner.fragments.indexOf(fragment);
            // if (index !== -1) {
            //     this.owner.fragments.splice(index, 1);
            // }
            this.mCurTransaction?.detach(fragment);

            if (this.mCurrentPrimaryItem === fragment) {
                this.mCurrentPrimaryItem = null;
            }

            const tabItems = this.owner.items;
            const tabItem = tabItems ? tabItems[position] : null;
            if (tabItem) {
                tabItem.canBeLoaded = false;
            }
        }

        setPrimaryItem(container: android.view.ViewGroup, position: number, object: java.lang.Object): void {
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

                this.mCurrentPrimaryItem = fragment;
                this.owner.selectedIndex = position;

                const tab = this.owner;
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
        constructor(context: android.content.Context, public owner: Tabs) {
            super(context);

            return global.__native(this);
        }

        public onSelectedPositionChange(position: number, prevPosition: number): void {
            const owner = this.owner;
            if (!owner) {
                return;
            }

            const tabStripItems = owner.tabStrip && owner.tabStrip.items;

            if (position >= 0 && tabStripItems && tabStripItems[position]) {
                tabStripItems[position]._emit(TabStripItem.selectEvent);
                owner._setItemColor(tabStripItems[position]);
            }

            if (prevPosition >= 0 && tabStripItems && tabStripItems[prevPosition]) {
                tabStripItems[prevPosition]._emit(TabStripItem.unselectEvent);
                owner._setItemColor(tabStripItems[prevPosition]);
            }
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
                tabStrip.notify({ eventName: TabStrip.itemTapEvent, object: tabStrip, index: position });
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

    PagerAdapter = FragmentPagerAdapter;
    TabsBar = TabsBarImplementation;
    AttachStateChangeListener = new AttachListener();
    appResources = Application.android.context.getResources();
}

let defaultAccentColor: number;
function getDefaultAccentColor(context: android.content.Context): number {
    if (defaultAccentColor === undefined) {
        //Fallback color: https://developer.android.com/samples/SlidingTabsColors/src/com.example.android.common/view/SlidingTabStrip.html
        defaultAccentColor = Utils.android.resources.getPaletteColor(ACCENT_COLOR, context) || 0xff33b5e5;
    }

    return defaultAccentColor;
}

function setElevation(grid: org.nativescript.widgets.GridLayout, tabsBar: com.nativescript.material.core.TabsBar, tabsPosition: string) {
    const compat = androidx.core.view.ViewCompat as any;
    if (compat.setElevation) {
        const val = DEFAULT_ELEVATION * Utils.layout.getDisplayDensity();

        if (tabsPosition === 'top') {
            compat.setElevation(grid, val);
        }

        compat.setElevation(tabsBar, val);
    }
}

export const tabs = new Array<WeakRef<Tabs>>();

function iterateIndexRange(index: number, eps: number, lastIndex: number, callback: (i) => void) {
    const rangeStart = Math.max(0, index - eps);
    const rangeEnd = Math.min(index + eps, lastIndex);
    for (let i = rangeStart; i <= rangeEnd; i++) {
        callback(i);
    }
}

export class Tabs extends TabsBase {
    private _tabsBar: com.nativescript.material.core.TabsBar;
    private _viewPager: com.nativescript.material.core.TabViewPager;
    private _pagerAdapter: androidx.viewpager.widget.PagerAdapter;
    private _androidViewId = -1;
    public _originalBackground: any;
    private _textTransform: CoreTypes.TextTransformType = 'uppercase';
    private _selectedItemColor: Color;
    private _unSelectedItemColor: Color;
    fragments: androidx.fragment.app.Fragment[] = [];
    private _attachedToWindow = false;

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
        // TODO
        // if (traceEnabled()) {
        //     traceWrite("TabView._createUI(" + this + ");", traceCategory);
        // }

        const context: android.content.Context = this._context;
        const nativeView = new org.nativescript.widgets.GridLayout(context);
        const viewPager = new com.nativescript.material.core.TabViewPager(context);
        const tabsBar = new TabsBar(context, this);
        const lp = new org.nativescript.widgets.CommonLayoutParams();
        const primaryColor = Utils.android.resources.getPaletteColor(PRIMARY_COLOR, context);
        const accentColor = getDefaultAccentColor(context);

        lp.row = 1;

        if (this.tabsPosition === 'top') {
            nativeView.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.auto));
            nativeView.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.star));

            viewPager.setLayoutParams(lp);
        } else {
            nativeView.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.star));
            nativeView.addRow(new org.nativescript.widgets.ItemSpec(1, org.nativescript.widgets.GridUnitType.auto));

            tabsBar.setLayoutParams(lp);
        }

        nativeView.addView(viewPager);
        (nativeView as any).viewPager = viewPager;

        const adapter = new PagerAdapter(this);
        viewPager.setAdapter(adapter);
        (viewPager as any).adapter = adapter;

        nativeView.addView(tabsBar);
        (nativeView as any).tabsBar = tabsBar;

        setElevation(nativeView, tabsBar, this.tabsPosition);

        if (accentColor) {
            tabsBar.setSelectedIndicatorColors([accentColor]);
        }

        if (primaryColor) {
            tabsBar.setBackgroundColor(primaryColor);
        }

        return nativeView;
    }
    onSelectedIndexChanged(oldIndex: number, newIndex: number) {
        const tabBarImplementation = this._tabsBar as unknown as PositionChanger;
        if (tabBarImplementation) {
            tabBarImplementation.onSelectedPositionChange(oldIndex, newIndex);
        }
        super.onSelectedIndexChanged(oldIndex, newIndex);
    }

    public initNativeView(): void {
        super.initNativeView();
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }

        const nativeView: any = this.nativeViewProtected;
        this._tabsBar = nativeView.tabsBar;

        // nativeView.addOnAttachStateChangeListener(AttachStateChangeListener);
        nativeView[ownerSymbol] = this;

        const viewPager = nativeView.viewPager;
        viewPager.setId(this._androidViewId);
        this._viewPager = viewPager;
        this._pagerAdapter = viewPager.adapter;
        (this._pagerAdapter as any).owner = this;
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
        this._viewPager.setCurrentItem(this.selectedIndex, false);
    }

    _onDetachedFromWindow(): void {
        super._onDetachedFromWindow();
        this.disposeCurrentFragments();

        this._attachedToWindow = false;
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

        // this.setAdapterItems(null);
    }

    public disposeNativeView() {
        this._tabsBar.setItems(null, null);
        (this._pagerAdapter as any).owner = null;
        this._pagerAdapter = null;

        this.nativeViewProtected.removeOnAttachStateChangeListener(AttachStateChangeListener);
        this.nativeViewProtected[ownerSymbol] = null;

        this._tabsBar = null;
        this._viewPager = null;
        super.disposeNativeView();
        this.disposeCurrentFragments();
    }

    public _onRootViewReset(): void {
        super._onRootViewReset();

        // call this AFTER the super call to ensure descendants apply their rootview-reset logic first
        // i.e. in a scenario with tab frames let the frames cleanup their fragments first, and then
        // cleanup the tab fragments to avoid
        // android.content.res.Resources$NotFoundException: Unable to find resource ID #0xfffffff6
        this.disposeCurrentFragments();
    }

    private disposeCurrentFragments(): void {
        // we need to use this because the destroyItem only detaches the item
        // here we clean up all fragments, even ones that were detached to another manager, which may happen on suspend/resume
        // alternative: actually remove the fragment on destroyItem
        const transactionMap = new Map<androidx.fragment.app.FragmentManager, androidx.fragment.app.FragmentTransaction>();
        for (const fragment of this.fragments) {
            const fragmentManager = this._getParentFragmentManagerFromFragment(fragment);
            if (!fragmentManager || fragmentManager.isDestroyed()) {
                continue;
            }
            if (!transactionMap.has(fragmentManager)) {
                transactionMap.set(fragmentManager, fragmentManager.beginTransaction());
            }
            const transaction = transactionMap.get(fragmentManager);

            transaction.remove(fragment);
        }
        for (const transaction of transactionMap.values()) {
            transaction.commitNowAllowingStateLoss();
        }
        transactionMap.clear(); // let's avoid memory leaks
        this.fragments = [];
    }

    private shouldUpdateAdapter(items: TabContentItem[]) {
        if (!this._pagerAdapter) {
            return false;
        }

        const currentPagerAdapterItems = (this._pagerAdapter as any).items;

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
            (this._pagerAdapter as any).items = items;

            if (items && items.length) {
                items.forEach((item: TabContentItem, i) => {
                    (item as any).index = i;
                });
            }

            this._pagerAdapter.notifyDataSetChanged();
        }
    }

    private setTabStripItems(items: TabStripItem[]) {
        const length = items ? items.length : 0;
        if (length === 0) {
            this._tabsBar.setItems(null, null);

            return;
        }

        const tabItems = new Array<com.nativescript.material.core.TabItemSpec>();
        items.forEach((tabStripItem: TabStripItem, i, arr) => {
            if (!this._unSelectedItemColor) {
                this._unSelectedItemColor = tabStripItem.label?.style.color;
            }
            tabStripItem._index = i;
            const tabItemSpec = this.createTabItemSpec(tabStripItem);
            (tabStripItem as any).tabItemSpec = tabItemSpec;
            tabItems.push(tabItemSpec);
        });

        const tabsBar = this._tabsBar;
        tabsBar.setItems(tabItems, this._viewPager);
        this.tabStrip.setNativeView(tabsBar);
        items.forEach((item, i, arr) => {
            const tv = tabsBar.getTextViewForItemAt(i);
            item.setNativeView(tv);
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
            const itemColor = this.selectedIndex === tabStripItem._index ? this._selectedItemColor : this._unSelectedItemColor;
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

    public updateAndroidItemAt(index: number, spec: com.nativescript.material.core.TabItemSpec) {
        // that try catch is fix for an android NPE error on css change which navigated in (not the current fragment)
        try {
            this._tabsBar.updateItemAt(index, spec);
        } catch (err) {}
    }

    public getTabBarBackgroundColor(): android.graphics.drawable.Drawable {
        return this._tabsBar.getBackground();
    }

    public setTabBarBackgroundColor(value: android.graphics.drawable.Drawable | Color): void {
        if (value instanceof Color) {
            this._tabsBar.setBackgroundColor(value.android);
        } else {
            this._tabsBar.setBackground(tryCloneDrawable(value, this.nativeViewProtected.getResources()));
        }
    }

    public getTabBarHighlightColor(): number {
        return getDefaultAccentColor(this._context);
    }

    public setTabBarHighlightColor(value: number | Color) {
        const color = value instanceof Color ? value.android : value;
        this._tabsBar.setSelectedIndicatorColors([color]);
    }

    public getTabBarSelectedItemColor(): Color {
        return this._selectedItemColor;
    }

    public setTabBarSelectedItemColor(value: Color) {
        this._selectedItemColor = value;
    }

    public getTabBarUnSelectedItemColor(): Color {
        return this._unSelectedItemColor;
    }

    public setTabBarUnSelectedItemColor(value: Color) {
        this._unSelectedItemColor = value;
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
        if (!tabStripItem.nativeViewProtected) {
            return;
        }
        const tabBarItem = this._tabsBar.getViewForItemAt(tabStripItem._index);

        const drawable = this.getIcon(tabStripItem, color);
        const imgView = tabBarItem.getChildAt(0) as android.widget.ImageView;
        imgView.setImageDrawable(drawable);
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

    public getTabBarItemTextTransform(tabStripItem: TabStripItem): CoreTypes.TextTransformType {
        return this.getItemLabelTextTransform(tabStripItem);
    }

    public setTabBarItemTextTransform(tabStripItem: TabStripItem, value: CoreTypes.TextTransformType): void {
        const nestedLabel = tabStripItem.label;
        const title = getTransformedText(nestedLabel.text, value);
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
        // TODO
        // if (traceEnabled()) {
        //     traceWrite("TabView this._viewPager.setCurrentItem(" + value + ", " + smoothScroll + ");", traceCategory);
        // }

        this._viewPager.setCurrentItem(value, this.animationEnabled);
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
        this.setTabStripItems(value.items);
    }

    [swipeEnabledProperty.getDefault](): boolean {
        // TODO: create native method and get native?
        return true;
    }
    [swipeEnabledProperty.setNative](value: boolean) {
        this._viewPager.setSwipePageEnabled(value);
    }

    [offscreenTabLimitProperty.getDefault](): number {
        return this._viewPager.getOffscreenPageLimit();
    }
    [offscreenTabLimitProperty.setNative](value: number) {
        this._viewPager.setOffscreenPageLimit(value);
    }
    [animationEnabledProperty.setNative](value: number) {
        (this._viewPager as any).setAnimationEnabled(value);
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
