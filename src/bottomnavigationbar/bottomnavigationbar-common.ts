import { AddChildFromBuilder, booleanConverter, Color, CssProperty, CSSType, Property, Style, View } from '@nativescript/core/ui/core/view';

import { fromFileOrResource, ImageSource } from '@nativescript/core/image-source';

import { cssProperty } from 'nativescript-material-core/cssproperties';

import { EventData } from '@nativescript/core/data/observable';

/**
 * Event interface for tab pressed event
 *
 * @export
 * @interface TabPressedEventData
 * @extends {EventData}
 */
export interface TabPressedEventData extends EventData {
    index: number;
}

/**
 * Event interface for tab selected event
 *
 * @export
 * @interface TabSelectedEventData
 * @extends {EventData}
 */
export interface TabSelectedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}

/**
 * Event interface for tab reselected event
 *
 * @export
 * @interface TabReselectedEventData
 * @extends {EventData}
 */
export interface TabReselectedEventData extends EventData {
    index: number;
}
/**
 * Enum for Title Visibility options
 *
 * @export
 * @enum {number}
 */
export enum TitleVisibility {
    Selected = 0,
    Always = 1,
    Never = 2
}

@CSSType('BottomNavigationBar')
export abstract class BottomNavigationBarBase extends View implements AddChildFromBuilder {
    static tabPressedEvent = 'tabPressed';
    static tabSelectedEvent = 'tabSelected';
    static tabReselectedEvent = 'tabReselected';

    @cssProperty activeColor: Color;
    @cssProperty inactiveColor: Color;

    selectedTabIndex: number = 0;
    titleVisibility: TitleVisibility = TitleVisibility.Selected;

    protected _items: BottomNavigationTabBase[] = [];

    get items(): BottomNavigationTabBase[] {
        return this._items;
    }

    onLoaded() {
        super.onLoaded();
        this._items.forEach(child => {
            this.loadView(child);
            return true;
        });
    }

    selectTab(index: number): void {
        if (index === this.selectedTabIndex) {
            return;
        }

        this.selectTabNative(index);
    }

    _emitTabPressed(index: number) {
        let eventData: TabPressedEventData = {
            eventName: BottomNavigationBarBase.tabPressedEvent,
            object: this,
            index
        };
        this.notify(eventData);
        this.removeBadge(index);
    }

    _emitTabSelected(index: number) {
        let eventData: TabSelectedEventData = {
            eventName: BottomNavigationBarBase.tabSelectedEvent,
            object: this,
            oldIndex: this.selectedTabIndex,
            newIndex: index
        };
        this.selectedTabIndex = index;
        this.notify(eventData);
        this.removeBadge(index);
    }

    _emitTabReselected(index: number) {
        let eventData: TabReselectedEventData = {
            eventName: BottomNavigationBarBase.tabReselectedEvent,
            object: this,
            index
        };
        this.notify(eventData);
    }

    _addChildFromBuilder(name: string, value: BottomNavigationTabBase): void {
        if (name === 'BottomNavigationTab') {
            if (!this._items) {
                this._items = [];
            }
            this._items.push(value);
        }
    }

    showBadge(index: number, value?: number): void {
        this._items[index] && this._items[index].showBadge(value);
    }

    removeBadge(index: number): void {
        this._items[index] && this._items[index].removeBadge();
    }

    protected abstract selectTabNative(index: number): void;
    protected abstract createTabs(tabs: BottomNavigationTabBase[] | undefined): void;
}

export const tabsProperty = new Property<BottomNavigationBarBase, BottomNavigationTabBase[]>({
    name: 'tabs',
    affectsLayout: true
});

tabsProperty.register(BottomNavigationBarBase);

export const titleVisibilityProperty = new Property<BottomNavigationBarBase, TitleVisibility>({
    name: 'titleVisibility',
    equalityComparer: (x, y) => x === y,
    affectsLayout: true,
    defaultValue: TitleVisibility.Selected,
    valueConverter: v => TitleVisibility[v]
});

titleVisibilityProperty.register(BottomNavigationBarBase);

export const activeColorCssProperty = new CssProperty<Style, Color>({
    name: 'activeColor',
    cssName: 'active-color',
    equalityComparer: Color.equals,
    defaultValue: new Color('black'),
    valueConverter: v => new Color(v)
});
activeColorCssProperty.register(Style);

export const inactiveColorCssProperty = new CssProperty<Style, Color>({
    name: 'inactiveColor',
    cssName: 'inactive-color',
    equalityComparer: Color.equals,
    defaultValue: new Color('gray'),
    valueConverter: v => new Color(v)
});
inactiveColorCssProperty.register(Style);

// Bottom Navigation Tab

interface BottomNavigationTabProps {
    title: string;
    icon: string | ImageSource;
    isSelectable?: boolean;
}

@CSSType('BottomNavigationTab')
export abstract class BottomNavigationTabBase extends View implements BottomNavigationTabProps {
    @cssProperty title: string;
    @cssProperty icon: ImageSource;
    isSelectable?: boolean;

    @cssProperty activeColor: Color;
    @cssProperty inactiveColor: Color;

    constructor(args?: BottomNavigationTabProps) {
        super();
        if (!args) {
            return;
        }
        for (const k in args) {
            if (args.hasOwnProperty(k)) {
                this[k] = args[k];
            }
        }
    }

    abstract getNativeIcon(): any;
    abstract showBadge(value?: number): void;
    abstract removeBadge(): void;
}

export const isSelectableProperty = new Property<BottomNavigationTabBase, boolean>({
    name: 'isSelectable',
    defaultValue: true,
    valueConverter: booleanConverter
});

isSelectableProperty.register(BottomNavigationTabBase);

export const iconProperty = new Property<BottomNavigationTabBase, ImageSource>({
    name: 'icon',
    affectsLayout: true,
    valueConverter: fromFileOrResource
});

iconProperty.register(BottomNavigationTabBase);
