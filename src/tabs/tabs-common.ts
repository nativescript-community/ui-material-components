// Types
import { Property } from "@nativescript/core/ui/core/properties";
import { CSSType } from "@nativescript/core/ui/core/view";
import { booleanConverter } from "@nativescript/core/ui/core/view-base";
// Requires
import { TabNavigationBase } from "@nativescript/core/ui/tab-navigation-base/tab-navigation-base";
import { Tabs as TabsDefinition } from "./tabs";


declare module '@nativescript/core/data/observable' {
    interface Observable {
        _emit(eventName: string);
    }
}
declare module '@nativescript/core/ui/core/view' {
    interface View {
        callLoaded(): void;
        _getFragmentManager();
    }
}
declare module '@nativescript/core/ui/frame' {
    interface Frame {
        _pushInFrameStackRecursive();
        _animationInProgress: boolean;
    }
}
declare module '@nativescript/core/ui/tab-navigation-base/tab-strip-item' {
    namespace TabStripItem {
        const selectEvent: string;
        const unselectEvent: string;
    }
    interface TabStripItem {
        _index: number;
    }
}

// export * from "@nativescript/core/ui/tab-navigation-base/tab-content-item";
// export * from "@nativescript/core/ui/tab-navigation-base/tab-navigation-base";
// export * from "@nativescript/core/ui/tab-navigation-base/tab-strip";
// export * from "@nativescript/core/ui/tab-navigation-base/tab-strip-item";

export const traceCategory = "TabView";

export module knownCollections {
    export const items = "items";
}

@CSSType("MDTabs")
export class TabsBase extends TabNavigationBase implements TabsDefinition {
    public swipeEnabled: boolean;
    public offscreenTabLimit: number;
    public tabsPosition: "top" | "bottom";
    public iOSTabBarItemsAlignment: IOSTabBarItemsAlignment;
}

// TODO: Add Unit tests
export const swipeEnabledProperty = new Property<TabsBase, boolean>({
    name: "swipeEnabled", defaultValue: true, valueConverter: booleanConverter
});
swipeEnabledProperty.register(TabsBase);

// TODO: Add Unit tests
// TODO: Coerce to max number of items?
export const offscreenTabLimitProperty = new Property<TabsBase, number>({
    name: "offscreenTabLimit", defaultValue: 1, valueConverter: (v) => parseInt(v)
});
offscreenTabLimitProperty.register(TabsBase);

export const tabsPositionProperty = new Property<TabsBase, "top" | "bottom">({ name: "tabsPosition", defaultValue: "top" });
tabsPositionProperty.register(TabsBase);

export type IOSTabBarItemsAlignment = "leading" | "justified" | "center" | "centerSelected";
export const iOSTabBarItemsAlignmentProperty = new Property<TabsBase, IOSTabBarItemsAlignment>({ name: "iOSTabBarItemsAlignment", defaultValue: "justified" });
iOSTabBarItemsAlignmentProperty.register(TabsBase);
