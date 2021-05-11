import { CSSType, Color, CssProperty, EventData, ImageSource, Property, Style, View, booleanConverter } from '@nativescript/core';
import { cssProperty } from '@nativescript-community/ui-material-core';

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
    selected = 0,
    always = 1,
    never = 2,
}

@CSSType('BottomNavigationBar')
export abstract class BottomNavigationBarBase extends View {
    static tabPressedEvent = 'tabPressed';
    static tabSelectedEvent = 'tabSelected';
    static tabReselectedEvent = 'tabReselected';

    @cssProperty activeColor: Color;
    @cssProperty inactiveColor: Color;
    @cssProperty badgeColor: Color;
    @cssProperty badgeTextColor: Color;

    selectedTabIndex = 0;
    titleVisibility: TitleVisibility = TitleVisibility.always;
    autoClearBadge: boolean;

    protected _items: BottomNavigationTabBase[] = [];

    get items(): BottomNavigationTabBase[] {
        return this._items;
    }

    onLoaded() {
        super.onLoaded();
        this._items.forEach((child) => {
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
        const eventData: TabPressedEventData = {
            eventName: BottomNavigationBarBase.tabPressedEvent,
            object: this,
            index,
        };
        this.notify(eventData);

        if (this.autoClearBadge) {
            this.removeBadge(index);
        }
    }

    _emitTabSelected(index: number) {
        const eventData: TabSelectedEventData = {
            eventName: BottomNavigationBarBase.tabSelectedEvent,
            object: this,
            oldIndex: this.selectedTabIndex,
            newIndex: index,
        };
        this.selectedTabIndex = index;
        this.notify(eventData);

        if (this.autoClearBadge) {
            this.removeBadge(index);
        }
    }

    _emitTabReselected(index: number) {
        const eventData: TabReselectedEventData = {
            eventName: BottomNavigationBarBase.tabReselectedEvent,
            object: this,
            index,
        };
        this.notify(eventData);
    }

    _addChildFromBuilder(name: string, value: BottomNavigationTabBase): void {
        if (value instanceof BottomNavigationTabBase) {
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
    affectsLayout: true,
});

tabsProperty.register(BottomNavigationBarBase);

export const titleVisibilityProperty = new Property<BottomNavigationBarBase, TitleVisibility>({
    name: 'titleVisibility',
    equalityComparer: (x, y) => x === y,
    affectsLayout: true,
    valueConverter: (v) => (typeof v === 'string') ? TitleVisibility[v.toLowerCase()]:v ,
});

titleVisibilityProperty.register(BottomNavigationBarBase);

export const autoClearBadgeProperty = new Property<BottomNavigationBarBase, boolean>({
    name: 'autoClearBadge',
    defaultValue: true,
    valueConverter: booleanConverter,
});

autoClearBadgeProperty.register(BottomNavigationBarBase);

export const activeColorCssProperty = new CssProperty<Style, Color>({
    name: 'activeColor',
    cssName: 'active-color',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v),
});
activeColorCssProperty.register(Style);

export const inactiveColorCssProperty = new CssProperty<Style, Color>({
    name: 'inactiveColor',
    cssName: 'inactive-color',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v),
});
inactiveColorCssProperty.register(Style);
export const badgeColorCssProperty = new CssProperty<Style, Color>({
    name: 'badgeColor',
    cssName: 'badge-color',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v),
});
badgeColorCssProperty.register(Style);
export const badgeTextColorCssProperty = new CssProperty<Style, Color>({
    name: 'badgeTextColor',
    cssName: 'badge-text-color',
    equalityComparer: Color.equals,
    valueConverter: (v) => new Color(v),
});
badgeTextColorCssProperty.register(Style);

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
    valueConverter: booleanConverter,
});

isSelectableProperty.register(BottomNavigationTabBase);

export const iconProperty = new Property<BottomNavigationTabBase, ImageSource>({
    name: 'icon',
    affectsLayout: true,
    valueConverter: ImageSource.fromFileOrResourceSync,
});

iconProperty.register(BottomNavigationTabBase);
