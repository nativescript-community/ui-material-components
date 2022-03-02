import { ContentViewAttributes, NSVElement, NSVViewFlags, NativeScriptProps, ViewAttributes, registerElement } from 'react-nativescript';
import { Color, EventData, Image, Label, PropertyChangeData } from '@nativescript/core';
import { warn } from 'react-nativescript/dist/shared/Logger';
import { SelectedIndexChangedEventData } from '../tab-navigation-base';
import { TabContentItem } from '../tab-content-item';
import { TabStrip } from '../tab-strip';
import { TabStripItem } from '../tab-strip-item';

// ui/tab-navigation-base/tab-navigation-base/tab-navigation-base.d.ts
export type TabNavigationBaseAttributes = ViewAttributes & {
    android?: any;
    ios?: any;
    items?: string | TabContentItem[];
    onItemsChange?: (args: PropertyChangeData) => void;
    onSelectedIndexChange?: (args: PropertyChangeData) => void;
    onSelectedIndexChanged?: (args: SelectedIndexChangedEventData) => void;
    onTabStripChange?: (args: PropertyChangeData) => void;
    selectedIndex?: string | number;
    tabStrip?: string | TabStrip;
};

// ui/tab-navigation-base/tab-content-item/tab-content-item.d.ts
export type TabContentItemAttributes = ContentViewAttributes & {
    canBeLoaded?: false | true;
};

// ui/tab-navigation-base/tab-strip/tab-strip.d.ts
export type TabStripAttributes = ViewAttributes & {
    highlightColor?: string | Color;
    iosIconRenderingMode?: 'automatic' | 'alwaysOriginal' | 'alwaysTemplate';
    isIconSizeFixed?: string | false | true;
    items?: string | TabStripItem[];
    onHighlightColorChange?: (args: PropertyChangeData) => void;
    onIosIconRenderingModeChange?: (args: PropertyChangeData) => void;
    onIsIconSizeFixedChange?: (args: PropertyChangeData) => void;
    onItemTap?: (args: EventData) => void;
    onItemsChange?: (args: PropertyChangeData) => void;
    onSelectedItemColorChange?: (args: PropertyChangeData) => void;
    onUnSelectedItemColorChange?: (args: PropertyChangeData) => void;
    selectedItemColor?: string | Color;
    unSelectedItemColor?: string | Color;
};

// ui/tab-navigation-base/tab-strip-item/tab-strip-item.d.ts
export type TabStripItemAttributes = ViewAttributes & {
    iconClass?: string;
    iconSource?: string;
    image?: Image;
    label?: Label;
    onTap?: (args: EventData) => void;
    title?: string;
};

declare global {
    // eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
    module JSX {
        interface IntrinsicElements {
            tabStrip: NativeScriptProps<TabStripAttributes, TabStrip>;
            tabStripItem: NativeScriptProps<TabStripItemAttributes, TabStripItem>;
            tabContentItem: NativeScriptProps<TabContentItemAttributes, TabContentItem>;
        }
        interface ElementChildrenAttribute {
            children: {};
        }
    }
}
let installed: boolean = false;

interface RegisterTabsOptions {
    enableDebugLogging?: boolean;
}

export function registerTabNavigationBase(opts: RegisterTabsOptions = {}): void {
    const { enableDebugLogging = false } = opts;

    if (installed) {
        return;
    }

    registerElement(
        'tabStrip',
        // @ts-ignore I can assure that this really does extend ViewBase
        () => TabStrip,
        {
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TabStrip>, atIndex?: number): void {
                    const tabStrip = parent.nativeView;

                    if (child.nodeRole === 'items') {
                        if (child.nativeView instanceof TabStripItem === false) {
                            if (enableDebugLogging) {
                                warn(`Unable to add child "${child.nativeView.constructor.name}" to the items of <tabStrip> as it is not an instance of TabStripItem.`);
                            }
                            return;
                        }

                        const items = tabStrip.items || []; // Annoyingly, it's the consumer's responsibility to ensure there's an array there!
                        if (typeof atIndex === 'undefined' || atIndex === items.length) {
                            tabStrip._addChildFromBuilder('items', child.nativeView as TabStripItem);
                        } else {
                            const itemsClone = items.slice();
                            itemsClone.splice(atIndex, 0, child.nativeView as TabStripItem);
                            tabStrip.items = itemsClone;
                        }
                    } else if (child.nodeRole === 'item') {
                        if (enableDebugLogging) {
                            warn(`Unable to add child "${child.nativeView.constructor.name}" to <tabStrip> as it had the nodeRole "item"; please correct it to "items".`);
                        }
                    } else {
                        if (enableDebugLogging) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabStrip> as it does not have a nodeRole specified; ` +
                                    'please set a nodeRole of "tabStrip", or "items".'
                            );
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement<TabStrip>): void {
                    const tabStrip = parent.nativeView;

                    if (child.nodeRole === 'items') {
                        tabStrip.items = (tabStrip.items || []).filter((i) => i !== child.nativeView);
                    } else if (child.nodeRole === 'item') {
                        if (enableDebugLogging) {
                            warn(`Unable to remove child "${child.nativeView.constructor.name}" from <tabStrip> as it had the nodeRole "item"; please correct it to "items".`);
                        }
                    } else {
                        if (enableDebugLogging) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabStrip> as it does not have a nodeRole specified; ` +
                                    'please set a nodeRole of "tabStrip", or "items"'
                            );
                        }
                    }
                }
            }
        }
    );

    registerElement(
        'tabStripItem',
        // @ts-ignore I can assure that this really does extend ViewBase
        () => TabStripItem,
        {
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<TabStripItem>, atIndex?: number): void {
                    const tabStripItem = parent.nativeView;

                    // Note: The instanceof check, and nodeRole check, is technically redundant if you look at the implementation, but I'll
                    //       keep these good practices in case it's ever refactored.

                    if (child.nodeRole === 'label') {
                        if (child.nativeView instanceof Label === false) {
                            if (enableDebugLogging) {
                                warn(`Unable to add child "${child.nativeView.constructor.name}" to the items of <tabStripItem> as it is not an instance of Label.`);
                            }
                            return;
                        }

                        tabStripItem.label = child.nativeView as Label;
                    } else if (child.nodeRole === 'image') {
                        if (child.nativeView instanceof Image === false) {
                            if (enableDebugLogging) {
                                warn(`Unable to add child "${child.nativeView.constructor.name}" to the items of <tabStripItem> as it is not an instance of Image.`);
                            }
                            return;
                        }

                        tabStripItem.image = child.nativeView as Image;
                    } else {
                        if (enableDebugLogging) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabStripItem> as it does not have a nodeRole specified; ` +
                                    'please set a nodeRole of "label", or "image".'
                            );
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement<TabStripItem>): void {
                    const tabStripItem = parent.nativeView;

                    if (child.nodeRole === 'label') {
                        // WARNING: It is not evident from the implementation that TabStripItem supports removing label at all!
                        tabStripItem.label = null;
                    } else if (child.nodeRole === 'image') {
                        // WARNING: It is not evident from the implementation that TabStripItem supports removing image at all!
                        tabStripItem.image = null;
                    } else {
                        if (enableDebugLogging) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabStripItem> as it does not have a nodeRole specified; ` +
                                    'please set a nodeRole of "label", or "image"'
                            );
                        }
                    }
                }
            }
        }
    );

    registerElement(
        'tabContentItem',
        // @ts-ignore I can assure that this really does extend ViewBase
        () => TabContentItem,
        { viewFlags: NSVViewFlags.CONTENT_VIEW }
    );

    installed = true;
}
