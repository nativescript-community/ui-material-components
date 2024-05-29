/**
 * @module @nativescript-community/ui-material-core-tabs/tab-strip
 */
import { rippleColorAlphaProperty, rippleColorProperty } from '@nativescript-community/ui-material-core/cssproperties';
import { AddArrayFromBuilder, AddChildFromBuilder, CSSType, Color, CssProperty, Property, Style, View, ViewBase, booleanConverter } from '@nativescript/core';
import { backgroundColorProperty, backgroundInternalProperty, colorProperty, fontInternalProperty } from '@nativescript/core/ui/styling/style-properties';
import { textTransformProperty } from '@nativescript/core/ui/text-base';
import { TabNavigationBase } from '../tab-navigation-base';
import { TabStripItem } from '../tab-strip-item';
import { TabStrip as TabStripDefinition } from '.';
import { getRippleColor } from '@nativescript-community/ui-material-core/index.ios';

// Place this on top because the webpack ts-loader doesn't work when export
// is after reference
export const highlightColorProperty = new CssProperty<Style, Color>({
    name: 'highlightColor',
    cssName: 'highlight-color',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v)
});
export const selectedItemColorProperty = new CssProperty<Style, Color>({
    name: 'selectedItemColor',
    cssName: 'selected-item-color',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v)
});
export const unSelectedItemColorProperty = new CssProperty<Style, Color>({
    name: 'unSelectedItemColor',
    cssName: 'un-selected-item-color',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v)
});

@CSSType('MDTabStrip')
export class TabStrip extends View implements TabStripDefinition, AddChildFromBuilder, AddArrayFromBuilder {
    public static itemTapEvent = 'itemTap';
    public items: TabStripItem[];
    public isIconSizeFixed: boolean;
    public iosIconRenderingMode: 'automatic' | 'alwaysOriginal' | 'alwaysTemplate';

    /**
     * defines the highlight color of the TabStrip item
     * can be defined through css `highlight-color`
     */
    public highlightColor: Color;
    public selectedItemColor: Color;
    public unSelectedItemColor: Color;

    /** @hidden */
    _hasImage: boolean;
    /** @hidden */
    _hasTitle: boolean;

    public eachChild(callback: (child: ViewBase) => boolean) {
        const items = this.items;
        if (items) {
            items.forEach((item, i) => {
                callback(item);
            });
        }
    }

    public _addArrayFromBuilder(name: string, value: any[]) {
        if (name === 'items') {
            this.items = value;
        }
    }

    public _addChildFromBuilder(name: string, value: any): void {
        if (value instanceof TabStripItem) {
            if (!this.items) {
                this.items = new Array<TabStripItem>();
            }
            this.items.push(value);
            this._addView(value);
            // selectedIndexProperty.coerce(this);
        }
    }

    public onItemsChanged(oldItems: TabStripItem[], newItems: TabStripItem[]): void {
        if (oldItems) {
            oldItems.forEach((item) => this._removeView(item));
        }

        if (newItems) {
            newItems.forEach((item) => {
                this._addView(item);
            });
        }
    }

    [backgroundColorProperty.getDefault](): Color {
        const parent = this.parent as TabNavigationBase;

        return parent?.getTabBarBackgroundColor();
        // always default to at least a solid white background as fallback
        // building with Xcode 13 causes bgView with no background to be fully transparent unless a css background-color is set - this allows original default behavior to work as it always did
        // bgView.backgroundColor = new Color('#fff').ios;;
    }
    [backgroundColorProperty.setNative](value: Color) {
        const parent = this.parent as TabNavigationBase;

        return parent?.setTabBarBackgroundColor(value);
    }

    [backgroundInternalProperty.getDefault](): any {
        return null;
    }
    [backgroundInternalProperty.setNative](value: any) {
        // disable the background CSS properties
    }

    [colorProperty.getDefault](): Color {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.getTabBarColor();
    }
    [colorProperty.setNative](value: Color) {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.setTabBarColor(value);
    }

    [fontInternalProperty.getDefault](): any {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.getTabBarFontInternal();
    }
    [fontInternalProperty.setNative](value: any) {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.setTabBarFontInternal(value);
    }

    [textTransformProperty.getDefault](): any {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.getTabBarTextTransform();
    }
    [textTransformProperty.setNative](value: any) {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.setTabBarTextTransform(value);
    }

    [highlightColorProperty.getDefault](): number {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.getTabBarHighlightColor();
    }
    [highlightColorProperty.setNative](value: number | Color) {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.setTabBarHighlightColor(value);
    }

    [selectedItemColorProperty.getDefault](): Color {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.getTabBarSelectedItemColor();
    }
    [selectedItemColorProperty.setNative](value: Color) {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.setTabBarSelectedItemColor(value);
    }

    [unSelectedItemColorProperty.getDefault](): Color {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.getTabBarUnSelectedItemColor();
    }
    [unSelectedItemColorProperty.setNative](value: Color) {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.setTabBarUnSelectedItemColor(value);
    }

    [rippleColorProperty.getDefault](): Color {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.getTabBarRippleColor();
    }

    [rippleColorProperty.setNative](value: Color) {
        const parent = this.parent as TabNavigationBase;
        return parent && parent.setTabBarRippleColor(value, this.rippleColorAlpha);
    }
    [rippleColorAlphaProperty.setNative](value: number) {
        const parent = this.parent as TabNavigationBase;
        return parent && parent.setTabBarRippleColor(this.rippleColor, value);
    }
}

const itemsProperty = new Property<TabStrip, TabStripItem[]>({
    name: 'items',
    valueChanged: (target, oldValue, newValue) => {
        target.onItemsChanged(oldValue, newValue);
    }
});
itemsProperty.register(TabStrip);

export const iosIconRenderingModeProperty = new Property<TabStrip, 'automatic' | 'alwaysOriginal' | 'alwaysTemplate'>({ name: 'iosIconRenderingMode', defaultValue: 'automatic' });
iosIconRenderingModeProperty.register(TabStrip);

export const isIconSizeFixedProperty = new Property<TabStrip, boolean>({
    name: 'isIconSizeFixed',
    defaultValue: true,
    valueConverter: booleanConverter
});
isIconSizeFixedProperty.register(TabStrip);

highlightColorProperty.register(Style);
selectedItemColorProperty.register(Style);
unSelectedItemColorProperty.register(Style);
