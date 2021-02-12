// Types
import { AddArrayFromBuilder, AddChildFromBuilder, CSSType, Color, EventData, Property, View, ViewBase, booleanConverter } from '@nativescript/core';
import { backgroundColorProperty, backgroundInternalProperty, colorProperty, fontInternalProperty } from '@nativescript/core/ui/styling/style-properties';
import { textTransformProperty } from '@nativescript/core/ui/text-base';
import { TabNavigationBase } from '../tab-navigation-base';
import { TabStripItem } from '../tab-strip-item';
import { TabStrip as TabStripDefinition } from './';

export const traceCategory = 'TabView';

// Place this on top because the webpack ts-loader doesn't work when export
// is after reference
export const highlightColorProperty = new Property<TabStrip, Color>({
    name: 'highlightColor',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v)
});
export const selectedItemColorProperty = new Property<TabStrip, Color>({
    name: 'selectedItemColor',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v)
});
export const unSelectedItemColorProperty = new Property<TabStrip, Color>({
    name: 'unSelectedItemColor',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v)
});

@CSSType('MDTabStrip')
export class TabStrip extends View implements TabStripDefinition, AddChildFromBuilder, AddArrayFromBuilder {
    public static itemTapEvent = 'itemTap';
    public items: TabStripItem[];
    public isIconSizeFixed: boolean;
    public iosIconRenderingMode: 'automatic' | 'alwaysOriginal' | 'alwaysTemplate';
    public highlightColor: Color;
    public selectedItemColor: Color;
    public unSelectedItemColor: Color;
    public _hasImage: boolean;
    public _hasTitle: boolean;

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

        return parent && parent.getTabBarBackgroundColor();
    }
    [backgroundColorProperty.setNative](value: Color) {
        const parent = this.parent as TabNavigationBase;

        return parent && parent.setTabBarBackgroundColor(value);
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

highlightColorProperty.register(TabStrip);
selectedItemColorProperty.register(TabStrip);
unSelectedItemColorProperty.register(TabStrip);
