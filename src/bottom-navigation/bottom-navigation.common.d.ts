import { AddChildFromBuilder, View } from 'tns-core-modules/ui/core/view';
import { CssProperty, Property } from 'tns-core-modules/ui/core/properties';
import { EventData } from 'tns-core-modules/data/observable';
import { Style } from 'tns-core-modules/ui/styling/style';
import { Color } from 'tns-core-modules/color';
export interface OnTabPressedEventData extends EventData {
    index: number;
}
export interface OnTabReselectedEventData extends EventData {
    index: number;
}
export interface OnTabSelectedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
export declare type TitleVisibility = 'always' | 'selected' | 'never';
export declare type TitleVisibilityOptions = {
    [k in TitleVisibility]: any;
};
export declare abstract class BottomNavigationBase extends View implements AddChildFromBuilder {
    tabs: BottomNavigationTabBase[];
    selectedTabIndex: number;
    titleVisibility: TitleVisibility;
    activeColor: string;
    inactiveColor: string;
    backgroundColor: string;
    keyLineColor: string;
    protected abstract titleVisibilityOptions: TitleVisibilityOptions;
    selectTab(index: number): void;
    onTabPressed(index: number): void;
    onTabReselected(index: number): void;
    onTabSelected(index: number): void;
    _addChildFromBuilder(name: string, value: BottomNavigationTabBase): void;
    protected abstract selectTabNative(index: number): void;
}
export declare const tabsProperty: Property<BottomNavigationBase, BottomNavigationTabBase[]>;
export declare const titleVisibilityProperty: Property<BottomNavigationBase, TitleVisibility>;
export declare const activeColorProperty: Property<BottomNavigationBase, string>;
export declare const activeColorCssProperty: CssProperty<Style, Color>;
export declare const inactiveColorProperty: Property<BottomNavigationBase, string>;
export declare const inactiveColorCssProperty: CssProperty<Style, Color>;
export declare const backgroundColorProperty: Property<BottomNavigationBase, string>;
export declare const backgroundColorCssProperty: CssProperty<Style, Color>;
export declare const keyLineColorProperty: Property<BottomNavigationBase, string>;
export declare const keyLineColorCssProperty: CssProperty<Style, Color>;
export declare class BottomNavigationTabBase {
    constructor(title: string, icon: string, selectable?: boolean, parent?: WeakRef<BottomNavigationBase>);
    private _title;
    title: string;
    private _icon;
    icon: string;
    private _selectable;
    selectable: boolean;
    private _parent?;
    parent: WeakRef<BottomNavigationBase>;
}
