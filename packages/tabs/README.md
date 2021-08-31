# NativeScript Material Tabs

Material Design's [Tabs](https://material.io/components/tabs) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-tabs.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-tabs.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4. [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
    - [React](#nativescript--react)
5.  [API](#api)

## Installation

### :warning: Warning :warning:
From NativeScript 5.x using this component will break the [NativeScript tab component](https://docs.nativescript.org/ui/components/tabs) on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [material-tabs](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs) (clone of the NativeScript one, but with a little less features).

##

```
ns plugin add @nativescript-community/ui-material-tabs
```

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mds="@nativescript-community/ui-material-tabs"` on the Page element._

#### XML

```XML
<Page xmlns:mdt="@nativescript-community/ui-material-tabs">
    <mdt:MDTabs selectedIndex="1">
        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <mdt:MDTabStrip>
            <mdt:MDTabStripItem>
                <Label text="Home"></Label>
                <Image src="font://&#xf015;" class="fas"></Image>
            </MDTabStripItem>
            <mdt:MDTabStripItem>Item class="special">
                <Label text="Account"></Label>
                <Image src="font://&#xf007;" class="fas"></Image>
            </MDTabStripItem>
            <mdt:MDTabStripItem>Item class="special">
                <Label text="Search"></Label>
                <Image src="font://&#xf00e;" class="fas"></Image>
            </MDTabStripItem>
        </MDTabStrip>

        <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
        <mdt:MDTabContentItem>
            <GridLayout>
                <Label text="Home Page" class="h2 text-center"></Label>
            </GridLayout>
        </MDTabContentItem>
        <mdt:MDTabContentItem>
            <GridLayout>
                <Label text="Account Page" class="h2 text-center"></Label>
            </GridLayout>
        </MDTabContentItem>
        <mdt:MDTabContentItem>
            <GridLayout>
                <Label text="Search Page" class="h2 text-center"></Label>
            </GridLayout>
        </MDTabContentItem>
    </Tabs>
</Page>
```

#### CSS

```CSS
MDTabs.bottom-nav {
    background-color: orangered;
    color: gold;
    font-size: 18;
}

MDTabStripItem.tabstripitem-active {
    background-color: teal;
}

MDTabStripItem.tabstripitem-active:active {
    background-color: yellowgreen;
}

MDTabContentItem.first-tabcontent {
    background-color: seashell;
    color: olive;
}
MDTabContentItem.second-tabcontent {
    background-color: slategray;
    color: aquamarine;
}
MDTabContentItem.third-tabcontent {
    background-color: blueviolet;
    color: antiquewhite;
}
MDTabs MDTabStrip {
    highlight-color: red;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialTabsModule } from "@nativescript-community/ui-material-tabs/angular";

@NgModule({
    imports: [
        NativeScriptMaterialTabsModule,
        ...
    ],
    ...
})
```

```html
    <MDTabs selectedIndex="1">
        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <MDTabStrip>
            <MDTabStripItem>
                <Label text="Home"></Label>
                <Image src="font://&#xf015;" class="fas"></Image>
            </MDTabStripItem>
            <MDTabStripItem class="special">
                <Label text="Account"></Label>
                <Image src="font://&#xf007;" class="fas"></Image>
            </MDTabStripItem>
            <MDTabStripItem class="special">
                <Label text="Search"></Label>
                <Image src="font://&#xf00e;" class="fas"></Image>
            </MDTabStripItem>
        </MDTabStrip>

        <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
        <MDTabContentItem>
            <GridLayout>
                <Label text="Home Page" class="h2 text-center"></Label>
            </GridLayout>
        </MDTabContentItem>
        <MDTabContentItem>
            <GridLayout>
                <Label text="Account Page" class="h2 text-center"></Label>
            </GridLayout>
        </MDTabContentItem>
        <MDTabContentItem>
            <GridLayout>
                <Label text="Search Page" class="h2 text-center"></Label>
            </GridLayout>
        </MDTabContentItem>
    </MDTabs>
```

##

### NativeScript + Vue

```javascript
import TabsPlugin from '@nativescript-community/ui-material-tabs/vue';

Vue.use(TabsPlugin);
```

```html
<MDTabs selectedIndex="1">
        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <MDTabStrip>
            <MDTabStripItem>
                <Label text="Home"></Label>
                <Image src="font://&#xf015;" class="fas"></Image>
            </MDTabStripItem>
            <MDTabStripItem class="special">
                <Label text="Account"></Label>
                <Image src="font://&#xf007;" class="fas"></Image>
            </MDTabStripItem>
            <MDTabStripItem class="special">
                <Label text="Search"></Label>
                <Image src="font://&#xf00e;" class="fas"></Image>
            </MDTabStripItem>
        </MDTabStrip>

        <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
        <MDTabContentItem>
            <GridLayout>
                <Label text="Home Page" class="h2 text-center"></Label>
            </GridLayout>
        </MDTabContentItem>
        <MDTabContentItem>
            <GridLayout>
                <Label text="Account Page" class="h2 text-center"></Label>
            </GridLayout>
        </MDTabContentItem>
        <MDTabContentItem>
            <GridLayout>
                <Label text="Search Page" class="h2 text-center"></Label>
            </GridLayout>
        </MDTabContentItem>
    </MDTabs>
```

##

### NativeScript + React

First, register the component before any of your React NativeScript app renders. A good place to put this code is in your entrypoint file (which may be called `src/app.ts` or similar), before the `ReactNativeScript.start` function is called. Here's how to install it:

```ts
import { registerTabNavigationBase } from '@nativescript-community/ui-material-core/tab-navigation-base/react';
import { registerTabs } from '@nativescript-community/ui-material-tabs/react';

registerTabNavigationBase();
registerTabs();
```

Normally it would be best to use this component via the `tabNavigatorFactory()` API exported by [React NativeScript Navigation](https://github.com/shirakaba/react-nativescript-navigation/tree/master/react-nativescript-navigation), as it makes nested navigation easy, but here's how to use it directly:

```tsx
import * as React from 'react';

export function Tabs() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <tabs
            selectedIndex={selectedIndex}
            onSelectedIndexChanged={(args) => {
                setSelectedIndex(args.newIndex);
            }}
            style={{ backgroundColor: 'orange' }}
        >
            {/* The bottomTab UI is created via tabStrip (the container) and tabStripItem (for each tab) */}
            <tabStrip nodeRole="tabStrip" style={{ backgroundColor: 'red' }}>
                <tabStripItem nodeRole="items">
                    <label nodeRole="label">Home</label>
                    <image nodeRole="image" src="font://&#xf015;" className="fas" />
                </tabStripItem>
                <tabStripItem nodeRole="items">
                    <label nodeRole="label">Account</label>
                    <image nodeRole="image" src="font://&#xf007;" className="fas" />
                </tabStripItem>
                <tabStripItem nodeRole="items">
                    <label nodeRole="label">Search</label>
                    <image nodeRole="image" src="font://&#xf00e;" className="fas" />
                </tabStripItem>
            </tabStrip>

            {/* The number of tabContentItem components should corespond to the number of TabStripItem components */}
            <tabContentItem nodeRole="items">
                <gridLayout style={{ backgroundColor: 'blue' }}>
                    <label style={{ color: 'white' }}>Home Page</label>
                </gridLayout>
            </tabContentItem>
            <tabContentItem nodeRole="items">
                <gridLayout style={{ backgroundColor: 'cyan' }}>
                    <label style={{ color: 'black' }}>Account Page</label>
                </gridLayout>
            </tabContentItem>
            <tabContentItem nodeRole="items">
                <gridLayout style={{ backgroundColor: 'magenta' }}>
                    <label style={{ color: 'black' }}>Search Page</label>
                </gridLayout>
            </tabContentItem>
        </tabs>
    );
}
```

**Troubleshooting**

If you see an error like this when writing e.g. `<tabs>` into your JSX:

> Property 'tabs' does not exist on type 'JSX.IntrinsicElements'.ts(2339)

Make sure that you have:

1. Installed the `react-nativescript` npm module.
2. Installed the `@types/react` npm module, strictly with the exact version provided in the [React NativeScript starter template](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-blank-react).
3. Run the postinstall script that comes with the React NativeScript template – `npm run postinstall` – to patch `@types/react`.
4. Registered the component as described above (i.e. import and run the `registerTabNavigationBase()` and `registerTabs()` methods).
5. If using Visual Studio Code, option-click the import `@nativescript-community/ui-material-tabs/react` to jump to the file; opening the file will force it to load its provided typings.

## API

### Attributes

| Name                      | Type                  | Description                                                               |
| -------------             | :-------------:       | -----:                                                                    |
| items                     | Array<MDTabContentItem> | 	Gets or sets the items of the BottomNavigation.                         |
|selectedIndex              | number                | 	Gets or sets the selectedIndex of the BottomNavigation.                 |
|swipeEnabled               | boolean               |	Gets or sets the swipe enabled state of the Tabs.                       |
|offscreenTabLimit          | number                |	Gets or sets the number of offscreen preloaded tabs of the Tabs.        |
|tabStrip 	                | TabStrip              |	Gets or sets the tab strip of the BottomNavigation.                     |
|tabsPosition               | "top", "bottom"       |	Gets or sets the position state of the Tabs. Default value: top         |
|iOSTabBarItemsAlignment    | "leading", "justified", "center", "centerSelected" | iOS Only: Gets or set the MDCTabBarAlignment of the tab bar icons in iOS. Default value: justified |

### Events

| Name                      | Description                                                                   |
| -------------             | -------------:                                                                |
| selectedIndexChanged      | Emitted when the selectedIndex property is changed.                           |
| loaded                    | Emitted when the view is loaded.                                              |
| unloaded                  | Emitted when the view is unloaded.                                            |
| layoutChanged             | Emitted when the layout bounds of a view changes due to layout processing.    |
