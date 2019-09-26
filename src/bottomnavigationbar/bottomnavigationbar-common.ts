import { AddChildFromBuilder, booleanConverter, Color, CssProperty, CSSType, Property, Style, View } from 'tns-core-modules/ui/core/view';

import { fromFileOrResource, ImageSource } from 'tns-core-modules/image-source';

import { TabPressedEventData, TabReselectedEventData, TabSelectedEventData, TitleVisibility } from './internal/internals';

@CSSType('BottomNavigationBar')
export abstract class BottomNavigationBarBase extends View implements AddChildFromBuilder {
    static tabPressedEvent = 'tabPressed';
    static tabSelectedEvent = 'tabSelected';
    static tabReselectedEvent = 'tabReselected';

    selectedTabIndex: number = 0;
    titleVisibility: TitleVisibility = TitleVisibility.Selected;

    protected _items: BottomNavigationTabBase[] = [];

    get items(): BottomNavigationTabBase[] {
        return this._items;
    }

    get inactiveColor(): Color {
        return this.style.inactiveColor;
    }

    set inactiveColor(color: Color) {
        this.style.inactiveColor = color;
    }

    get activeColor(): Color {
        return this.style.activeColor;
    }

    set activeColor(color: Color) {
        this.style.activeColor = color;
    }

    get backgroundColor(): Color {
        return this.style.backgroundColor;
    }

    set backgroundColor(color: Color) {
        this.style.backgroundColor = color;
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

    abstract showBadge(index: number, value?: number): void;
    abstract removeBadge(index: number): void;
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

export abstract class BottomNavigationTabBase extends View implements BottomNavigationTabProps {
    title: string;
    icon: string | ImageSource;
    isSelectable?: boolean;

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
