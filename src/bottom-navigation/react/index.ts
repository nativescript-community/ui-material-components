import { NSVElement, NativeScriptProps, registerElement } from 'react-nativescript';
import { warn } from 'react-nativescript/dist/shared/logger';
import { BottomNavigation, SelectedIndexChangedEventData, TabContentItem, TabStrip } from '../';
import { TabNavigationBaseAttributes } from '@nativescript-community/ui-material-core/tab-navigation-base/tab-navigation-base/react';

// Global compile-time constant (for some reason not exported by RNS itself)
// eslint-disable-next-line no-var
declare var __DEV__: boolean;

// ui/bottom-navigation/bottom-navigation.d.ts
export type BottomNavigationAttributes = TabNavigationBaseAttributes & {
    android?: any;
    ios?: any;
    items?: TabContentItem[];
    onSelectedIndexChanged?: (args: SelectedIndexChangedEventData) => void;
    selectedIndex?: number;
    tabStrip?: TabStrip;
};

declare global {
    // eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword
    module JSX {
        interface IntrinsicElements {
            bottomNavigation: NativeScriptProps<BottomNavigationAttributes, BottomNavigation>;
        }
        interface ElementChildrenAttribute {
            children: {};
        }
    }
}

let installed: boolean = false;

export function registerBottomNavigation(): void {
    if (installed) {
        return;
    }
    registerElement(
        'bottomNavigation',
        // @ts-ignore I can assure that this really does extend ViewBase
        () => BottomNavigation,
        {
            // TODO: share the same NodeOps for both BottomNavigation and Tabs; they're identical as they both extend TabNavigationBase.
            nodeOps: {
                insert(child: NSVElement, parent: NSVElement<BottomNavigation>, atIndex?: number): void {
                    const bottomNavigation = parent.nativeView;

                    if (child.nodeRole === 'tabStrip') {
                        if (child.nativeView instanceof TabStrip) {
                            bottomNavigation.tabStrip = child.nativeView;
                        } else {
                            if (__DEV__) {
                                warn(`Unable to add child "${child.nativeView.constructor.name}" as the tabStrip of <bottomNavigation> as it is not an instance of TabStrip.`);
                            }
                        }
                    } else if (child.nodeRole === 'items') {
                        if (child.nativeView instanceof TabContentItem === false) {
                            if (__DEV__) {
                                warn(`Unable to add child "${child.nativeView.constructor.name}" to the items of <bottomNavigation> as it is not an instance of TabContentItem.`);
                            }
                            return;
                        }

                        const items = bottomNavigation.items || []; // Annoyingly, it's the consumer's responsibility to ensure there's an array there!

                        if (typeof atIndex === 'undefined' || atIndex === items.length) {
                            bottomNavigation.items = items.concat(child.nativeView as TabContentItem);
                        } else {
                            bottomNavigation.items = items.slice().splice(atIndex, 0, child.nativeView as TabContentItem);
                        }
                    } else if (child.nodeRole === 'item') {
                        if (__DEV__) {
                            warn(`Unable to add child "${child.nativeView.constructor.name}" to <bottomNavigation> as it had the nodeRole "item"; please correct it to "items".`);
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to add child "${child.nativeView.constructor.name}" to <bottomNavigation> as it does not have a nodeRole specified; ` +
                                    'please set a nodeRole of "tabStrip", or "items".'
                            );
                        }
                    }
                },
                remove(child: NSVElement, parent: NSVElement<BottomNavigation>): void {
                    const tabs = parent.nativeView;

                    if (child.nodeRole === 'tabStrip') {
                        tabs.tabStrip = null; // Anything falsy should work.
                    } else if (child.nodeRole === 'items') {
                        tabs.items = (tabs.items || []).filter((i) => i !== child.nativeView);
                    } else if (child.nodeRole === 'item') {
                        if (__DEV__) {
                            warn(`Unable to remove child "${child.nativeView.constructor.name}" from <bottomNavigation> as it had the nodeRole "item"; please correct it to "items".`);
                        }
                    } else {
                        if (__DEV__) {
                            warn(
                                `Unable to remove child "${child.nativeView.constructor.name}" from <bottomNavigation> as it does not have a nodeRole specified; ` +
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
