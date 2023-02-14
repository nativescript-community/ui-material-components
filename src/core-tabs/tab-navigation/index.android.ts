import { Application, Color, CoreTypes, Font, ImageSource, Utils, getTransformedText } from '@nativescript/core';
import { TabContentItem } from '../tab-content-item';
import { getIconSpecSize, itemsProperty, selectedIndexProperty, tabStripProperty } from '../tab-navigation-base';
import { TabStrip } from '../tab-strip';
import { TabStripItem } from '../tab-strip-item';
import { TabNavigationBase, TabsPosition, offscreenTabLimitProperty, swipeEnabledProperty } from './index-common';
export * from './index-common';
export { TabContentItem, TabStrip, TabStripItem };

const ACCENT_COLOR = 'colorAccent';
export const PRIMARY_COLOR = 'colorPrimary';
const DEFAULT_ELEVATION = 4;

const TABID = '_tabId';
const INDEX = '_index';

class IconInfo {
    drawable: android.graphics.drawable.BitmapDrawable;
    height: number;
}

type PagerAdapter = new (owner: WeakRef<TabNavigation>, fragmentActivity: androidx.fragment.app.FragmentActivity) => androidx.viewpager2.adapter.FragmentStateAdapter;
type PageChangeCallback = new (owner: WeakRef<TabNavigation>) => androidx.viewpager2.widget.ViewPager2.OnPageChangeCallback;

// eslint-disable-next-line no-redeclare
let PagerAdapter: PagerAdapter;
// eslint-disable-next-line no-redeclare
let PageChangeCallback: PageChangeCallback;
let appResources: android.content.res.Resources;

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
    class PageChangeCallbackImpl extends androidx.viewpager2.widget.ViewPager2.OnPageChangeCallback {
        private readonly owner: WeakRef<TabNavigation>;

        constructor(owner: WeakRef<TabNavigation>) {
            super();
            this.owner = owner;
            return global.__native(this);
        }

        onPageSelected(position: number) {
            const owner = this.owner && this.owner.get();
            if (owner) {
                owner.selectedIndex = position;
                const tabItems = owner.items;
                const newTabItem = tabItems ? tabItems[position] : null;

                if (newTabItem) {
                    owner._loadUnloadTabItems(owner.selectedIndex);
                }
            }
        }
    }

    @NativeClass
    class TabFragmentImplementation extends org.nativescript.widgets.FragmentBase {
        private owner: TabNavigation;
        private index: number;
        // private backgroundBitmap: android.graphics.Bitmap = null;

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
            tabItem.canBeLoaded = true;
            // ensure item is loaded
            tabItem.loadView(tabItem.content);
            return tabItem.nativeViewProtected;
        }

        public onDestroyView() {
            super.onDestroyView();
            const tabItem = this.owner.items[this.index];
            tabItem.canBeLoaded = false;
            tabItem.unloadView(tabItem.content);
        }
    }

    @NativeClass
    class FragmentPagerAdapter extends androidx.viewpager2.adapter.FragmentStateAdapter {
        constructor(public owner: WeakRef<TabNavigation>, fragmentActivity: androidx.fragment.app.FragmentActivity) {
            super(fragmentActivity);
            return global.__native(this);
        }

        getItemCount() {
            const owner = this.owner?.get();
            if (!owner) {
                return 0;
            }
            return owner.items.length;
        }
        createFragment(position: number): androidx.fragment.app.Fragment {
            const owner = this.owner?.get();
            if (!owner) {
                return null;
            }
            const fragment: androidx.fragment.app.Fragment = TabFragmentImplementation.newInstance(owner._domId, position);
            return fragment;
        }
    }

    PagerAdapter = FragmentPagerAdapter;
    PageChangeCallback = PageChangeCallbackImpl;
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

//TODO: move to abstract
export abstract class TabNavigation<T extends android.view.ViewGroup = any> extends TabNavigationBase {
    nativeViewProtected: org.nativescript.widgets.GridLayout;
    protected mTabsBar: T;
    protected mViewPager: androidx.viewpager2.widget.ViewPager2;
    protected mPageListener: androidx.viewpager2.widget.ViewPager2.OnPageChangeCallback;
    protected mPagerAdapter: androidx.viewpager2.adapter.FragmentStateAdapter;
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
        const viewPager = new androidx.viewpager2.widget.ViewPager2(context);
        viewPager.setSaveEnabled(false);
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

        const adapter = (this.mPagerAdapter = new PagerAdapter(new WeakRef(this), this._context));
        viewPager.setAdapter(adapter);
        (viewPager as any).adapter = adapter;
        this.mViewPager = viewPager;
        setElevation(nativeView, null, this.tabsPosition);
        if (this.tabStrip) {
            this.handleTabStripChanged(nativeView, true, this.tabStrip);
        }

        return nativeView;
    }

    protected abstract createNativeTabBar(context: android.content.Context): T;
    protected abstract setTabBarItems(tabItems: com.nativescript.material.core.TabItemSpec[]);
    protected abstract getTabBarItemView(index: number);
    protected abstract getTabBarItemTextView(index: number);
    protected abstract selectTabBar(oldIndex: number, newIndex: number);

    private handleTabStripChanged(nativeView: org.nativescript.widgets.GridLayout, isNewView: boolean, newTabStrip: TabStrip) {
        if (this.mTabsBar) {
            if (!isNewView) nativeView.removeView(this.mTabsBar);
            nativeView['tabsBar'] = null;
            this.mTabsBar = null;
        }

        if (newTabStrip) {
            initializeNativeClasses();
            const context = this._context;
            const tabsBar = (this.mTabsBar = this.createNativeTabBar(context));
            setElevation(null, tabsBar, this.tabsPosition);
            if (this.tabsPosition !== TabsPosition.Top) {
                tabsBar.setLayoutParams(this.tabBarLayoutParams);
            }
            nativeView.addView(tabsBar);
            nativeView['tabsBar'] = tabsBar;
            this.setTabStripItems(newTabStrip?.items || null);
        }
    }
    public onTabStripChanged(oldTabStrip: TabStrip, newTabStrip: TabStrip) {
        super.onTabStripChanged(oldTabStrip, newTabStrip);
        const nativeView = this.nativeViewProtected;
        if (!nativeView) {
            return;
        }
        this.handleTabStripChanged(nativeView, false, newTabStrip);
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

        this.mPageListener = new PageChangeCallback(new WeakRef(this));
        this.mViewPager.setId(this.mAndroidViewId);
        this.mViewPager.registerOnPageChangeCallback(this.mPageListener);
    }

    public disposeNativeView() {
        if (this.mTabsBar) {
            this.setTabBarItems(null);
        }
        // setAdapter(null) will destroy fragments
        this.mViewPager.setAdapter(null);
        this.mViewPager.unregisterOnPageChangeCallback(this.mPageListener);
        this.mPagerAdapter = null;

        super.disposeNativeView();
    }

    public onLoaded(): void {
        super.onLoaded();

        // if (this._originalBackground) {
        //     console.log('setting original background', this._originalBackground);
        //     this.backgroundColor = null;
        //     this.backgroundColor = this._originalBackground;
        //     this._originalBackground = null;
        // }

        // this.setItems(this.items as any);

        if (this.tabStrip) {
            this.setTabStripItems(this.tabStrip.items);
        }
    }

    public onUnloaded(): void {
        super.onUnloaded();

        // this.setItems(null);
        // this.setTabStripItems(null);

        // TODO: needed ?
        // this.items.forEach((item, i) => {
        //     item.unloadView(item.content);
        // });
    }

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
        if (items && items.length) {
            items.forEach((item: TabContentItem, i) => {
                item.index = i;
            });
        }
        this._loadUnloadTabItems(this.selectedIndex);
        if (this.shouldUpdateAdapter(items)) {
            this.mPagerAdapter.notifyDataSetChanged();
        }
    }

    protected setTabStripItems(items: TabStripItem[]) {
        const length = items ? items.length : 0;
        if (length === 0) {
            if (this.mTabsBar) {
                this.setTabBarItems(null);
            }
            return;
        }

        const tabItems = new Array<com.nativescript.material.core.TabItemSpec>();
        items.forEach((tabStripItem: TabStripItem, i, arr) => {
            tabStripItem.index = i;
            const tabItemSpec = this.createTabItemSpec(tabStripItem);
            (tabStripItem as any).tabItemSpec = tabItemSpec;
            tabItems.push(tabItemSpec);
        });

        const tabsBar = this.mTabsBar;
        this.setTabBarItems(tabItems);
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
            const itemColor = this.selectedIndex === tabStripItem.index ? this.mSelectedItemColor : this.mUnSelectedItemColor;
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

            const imageDrawable = new android.graphics.drawable.BitmapDrawable(appResources, image);

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
        const itemColor = tabStripItem.index === this.selectedIndex ? this.mSelectedItemColor : tabStripItem.style.color || this.mUnSelectedItemColor;
        // set label color
        if (itemColor) {
            tabStripItem.nativeViewProtected.setTextColor(itemColor.android || null);
        }
        // set icon color
        this.setIconColor(tabStripItem, itemColor);
    }

    protected setIconColor(tabStripItem: TabStripItem, color?: Color) {
        if (!tabStripItem.nativeViewProtected) {
            return;
        }
        const tabBarItem = this.getTabBarItemView(tabStripItem.index);

        const drawableInfo = this.getIconInfo(tabStripItem, color);
        const imgView = tabBarItem.getChildAt(0) as android.widget.ImageView;
        imgView.setImageDrawable(drawableInfo.drawable);
        imgView.setColorFilter(color?.android || null);
    }

    public setTabBarItemColor(tabStripItem: TabStripItem, value: number | Color): void {
        const itemColor = tabStripItem.index === this.selectedIndex ? this.mSelectedItemColor : this.mUnSelectedItemColor;
        if (itemColor) {
            // the itemColor is set through the selectedItemColor and unSelectedItemColor properties
            // so it does not respect the css color
            return;
        }

        const androidColor = value instanceof Color ? value.android : value;
        tabStripItem.nativeViewProtected.setTextColor(androidColor);
    }

    public setTabBarIconColor(tabStripItem: TabStripItem, value: number | Color): void {
        const itemColor = tabStripItem.index === this.selectedIndex ? this.mSelectedItemColor : this.mUnSelectedItemColor;
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
        this.mViewPager.setCurrentItem(position, this.animationEnabled);
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
        const current = this.mViewPager.getCurrentItem();
        if (current !== value) {
            this.mViewPager.setCurrentItem(value, this.animationEnabled);
        }
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
        this.mViewPager.setUserInputEnabled(value);
    }

    [offscreenTabLimitProperty.getDefault](): number {
        return this.mViewPager.getOffscreenPageLimit();
    }
    [offscreenTabLimitProperty.setNative](value: number) {
        this.mViewPager.setOffscreenPageLimit(value);
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
