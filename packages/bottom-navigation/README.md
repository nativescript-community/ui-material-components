# NativeScript Material Bottom navigation

Material Design's [Bottom navigation](https://material.io/components/bottom-navigation) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-bottom-navigation.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-bottom-navigation)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-bottom-navigation.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-bottom-navigation)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
    - [React](#nativescript--react)
5.  [API](#api)

## Installation

```bash
ns plugin add @nativescript-community/ui-material-bottom-navigation
```

Be sure to run a new build after adding plugins to avoid any issues.

## [Changelog](./CHANGELOG.md)

## [FAQ](../../README.md#faq)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mds="@nativescript-community/ui-material-bottom-navigation"` on the Page element._

#### XML

```XML
<Page xmlns:mdt="@nativescript-community/ui-material-bottom-navigation">
    <mdt:BottomNavigation width="100%" id="main-tabview" class="main-tabview"
                selectedIndexChanged="{{onSelectedIndexChanged}}"
                iosOverflowSafeArea="true" selectedIndex="0" tabsPosition="bottom" swipeEnabled="false">
            <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
            <mdt:TabStrip backgroundColor="{{ color('dark')}}" color="{{ color('blue')}}">
                <mdt:TabStripItem  class="tab-item">
                    <Image src="font://&#xe1b0;" class="fal"></Image>
                    <Label text="Home" ios:fontSize="10" android:fontSize="12"></Label>
                </mdt:TabStripItem>
                <mdt:TabStripItem class="tab-item">
                    <Label text="{{ L('search') }}" ios:fontSize="10" android:fontSize="12"></Label>
                    <Image src="font://&#xe024;" class="fal"></Image>
                </mdt:TabStripItem>
                <mdt:TabStripItem  class="tab-item">
                    <Label text="{{ L('trips') }}" ios:fontSize="10" android:fontSize="12"></Label>
                    <Image src="font://&#xf03a;" class="fal"></Image>
                </mdt:TabStripItem>
                <mdt:TabStripItem class="tab-item">
                    <Label text="{{ L('inbox') }}" ios:fontSize="10" android:fontSize="12"></Label>
                    <Image src="font://&#xf4b6;" class="fal" id="tab-inbox-icon-fal"></Image>
                </mdt:TabStripItem>
            </mdt:TabStrip>

            <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
            <mdt:TabContentItem>
                <GridLayout>
                    <Label text="Home" class="h2 text-center"></Label>
                </GridLayout>
            </mdt:TabContentItem>
            <mdt:TabContentItem>
                <GridLayout>
                    <Label text="Search Page" class="h2 text-center"></Label>
                </GridLayout>
            </mdt:TabContentItem>
            <mdt:TabContentItem>
                <GridLayout>
                    <Label text="TRansactions" class="h2 text-center"></Label>
                </GridLayout>
            </mdt:TabContentItem>
            <mdt:TabContentItem>
                <GridLayout>
                    <Label text="Inbox" class="h2 text-center"></Label>
                </GridLayout>
            </mdt:TabContentItem>
        </mdt:BottomNavigation>
</Page>
```

#### CSS

```CSS
BottomNavigation.bottom-nav {
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
BottomNavigation TabStrip {
    highlight-color: red;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialTabsModule } from "@nativescript-community/ui-material-bottom-navigation/angular";

@NgModule({
    imports: [
        NativeScriptMaterialBottomNavigationModule,
        ...
    ],
    ...
})
```

```html
    <MDBottomNavigation selectedIndex="1">
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
    </MDBottomNavigation>
```

##

### NativeScript + Vue

```javascript
import BottomNavigation from '@nativescript-community/ui-material-bottom-navigation/vue';

Vue.use(BottomNavigation);
```

```html
<MDBottomNavigation selectedIndex="1">
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
    </MDBottomNavigation>
```

##

### NativeScript + React

First, register the component before any of your React NativeScript app renders. A good place to put this code is in your entrypoint file (which may be called `src/app.ts` or similar), before the `ReactNativeScript.start` function is called. Here's how to install it:

```ts
import { registerTabNavigationBase } from '@nativescript-community/ui-material-core/tab-navigation-base/react';
import { registerBottomNavigation } from '@nativescript-community/ui-material-bottom-navigation/react';

registerTabNavigationBase();
registerBottomNavigation();
```

When available (I've not implemented it at the time of writing, but intend to in time), it would be best to use this component via the `bottomNavigationNavigatorFactory()` API exported by [React NativeScript Navigation](https://github.com/shirakaba/react-nativescript-navigation/tree/master/react-nativescript-navigation), as it makes nested navigation easy, but here's how to use it directly:

```tsx
import * as React from 'react';

export function BottomNavigation() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <bottomNavigation
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
        </bottomNavigation>
    );
}
```

**Troubleshooting**

If you see an error like this when writing e.g. `<bottomNavigation>` into your JSX:

> Property 'bottomNavigation' does not exist on type 'JSX.IntrinsicElements'.ts(2339)

Make sure that you have:

1. Installed the `react-nativescript` npm module.
2. Installed the `@types/react` npm module, strictly with the exact version provided in the [React NativeScript starter template](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-blank-react).
3. Run the postinstall script that comes with the React NativeScript template – `npm run postinstall` – to patch `@types/react`.
4. Registered the component as described above (i.e. import and run the `registerTabNavigationBase()` and `registerBottomNavigation()` methods).
5. If using Visual Studio Code, option-click the import `@nativescript-community/ui-material-bottom-navigation/react` to jump to the file; opening the file will force it to load its provided typings.

## API

### Attributes

| Name |Type| Description|
| ------------- |:-------------:| -----:|
| items  |	Array<MDTabContentItem> | 	Gets or sets the items of the BottomNavigation.|
|selectedIndex  |	number | 	Gets or sets the selectedIndex of the BottomNavigation.|
|swipeEnabled  |	boolean  |	Gets or sets the swipe enabled state of the Tabs.|
|offscreenTabLimit  |	number  |	Gets or sets the number of offscreen preloaded tabs of the Tabs.|
|tabStrip 	 |TabStrip  |	Gets or sets the tab strip of the BottomNavigation.|
|tabsPosition  |	"top", "bottom"  |	Gets or sets the position state of the Tabs. Default value: top|
|iOSTabBarItemsAlignment  |	"leading", "justified", "center", "centerSelected" 	 |iOS Only: Gets or set the MDCTabBarAlignment of the tab bar icons in iOS. Default value: justified|

### Events

| Name | Description |
| ------------- | -----:|
| selectedIndexChanged | Emitted when the selectedIndex property is changed. |
| loaded |	Emitted when the view is loaded. |
| unloaded | Emitted when the view is unloaded. |
| layoutChanged | Emitted when the layout bounds of a view changes due to layout processing. |
