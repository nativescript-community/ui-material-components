import { NSVElement, NativeScriptProps, registerElement } from 'react-nativescript';
import { PropertyChangeData } from '@nativescript/core';
import { warn } from 'react-nativescript/dist/shared/Logger';
import { Tabs } from '..';
import { TabNavigationBaseAttributes } from '@nativescript-community/ui-material-core/tab-navigation-base/react';
import { SelectedIndexChangedEventData } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-navigation-base';
import { TabStrip } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-strip';
import { TabContentItem } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-content-item';

// ui/tabs/tabs.d.ts
export type TabsAttributes = TabNavigationBaseAttributes & {
    android?: any;
    iOSTabBarItemsAlignment?: 'center' | 'leading' | 'justified' | 'centerSelected';
    ios?: any;
    items?: TabContentItem[];
    offscreenTabLimit?: string | number;
    onIOsTabBarItemsAlignmentChange?: (args: PropertyChangeData) => void;
    onOffscreenTabLimitChange?: (args: PropertyChangeData) => void;
    onSelectedIndexChanged?: (args: SelectedIndexChangedEventData) => void;
    onSwipeEnabledChange?: (args: PropertyChangeData) => void;
    onTabsPositionChange?: (args: PropertyChangeData) => void;
    selectedIndex?: number;
    swipeEnabled?: string | false | true;
    tabStrip?: TabStrip;
    tabsPosition?: 'top' | 'bottom';
};

declare global {
    // eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
    module JSX {
        interface IntrinsicElements {
            tabs: NativeScriptProps<TabsAttributes, Tabs>;
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

export function registerTabs(opts: RegisterTabsOptions = {}): void {
    const { enableDebugLogging = false } = opts;

    if (installed) {
        return;
    }

    registerElement(
        'tabs',
        // @ts-ignore I can assure that this really does extend ViewBase
        () => Tabs,
        {
            // TODO: share the same NodeOps for both BottomNavigation and Tabs; they're identical as they both extend TabNavigationBase.
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<Tabs>, atIndex?: number): void {
                    const tabs = parent.nativeView;

                    if (child.nodeRole === 'tabStrip') {
                        if (child.nativeView instanceof TabStrip) {
                            tabs.tabStrip = child.nativeView;
                        } else {
                            if (enableDebugLogging) {
                                warn(`Unable to add child "${child.nativeView.constructor.name}" as the tabStrip of <tabs> as it is not an instance of TabStrip.`);
                            }
                        }
                    } else if (child.nodeRole === 'items') {
                        if (child.nativeView instanceof TabContentItem === false) {
                            if (enableDebugLogging) {
                                warn(`Unable to add child "${child.nativeView.constructor.name}" to the items of <tabs> as it is not an instance of TabContentItem.`);
                            }
                            return;
                        }

                        const items = tabs.items || []; // Annoyingly, it's the consumer's responsibility to ensure there's an array there!
                        if (typeof atIndex === 'undefined' || atIndex === items.length) {
                            tabs._addChildFromBuilder('items', child.nativeView as TabContentItem);
                        } else {
                            const itemsClone = items.slice();
                            itemsClone.splice(atIndex, 0, child.nativeView as TabContentItem);
                            tabs.items = itemsClone;
                        }
                    } else if (child.nodeRole === 'item') {
                        if (enableDebugLogging) {
                            warn(`Unable to add child "${child.nativeView.constructor.name}" to <tabs> as it had the nodeRole "item"; please correct it to "items".`);
                        }
                    } else {
                        if (enableDebugLogging) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <tabs> as it does not have a nodeRole specified; ` + 'please set a nodeRole of "tabStrip", or "items".'
                            );
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement): void {
                    const tabs = parent.nativeView as Tabs;

                    if (child.nodeRole === 'tabStrip') {
                        tabs.tabStrip = null; // Anything falsy should work.
                    } else if (child.nodeRole === 'items') {
                        tabs.items = (tabs.items || []).filter((i) => i !== child.nativeView);
                    } else if (child.nodeRole === 'item') {
                        if (enableDebugLogging) {
                            warn(`Unable to remove child "${child.nativeView.constructor.name}" from <tabs> as it had the nodeRole "item"; please correct it to "items".`);
                        }
                    } else {
                        if (enableDebugLogging) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <tabs> as it does not have a nodeRole specified; ` +
                                    'please set a nodeRole of "tabStrip", or "items"'
                            );
                        }
                    }
                }
            }
        }
    );

    installed = true;
}
