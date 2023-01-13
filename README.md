<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️-->This monorepo contains multiple packages:<br><br><details>
<summary><b>activityindicator</b></summary>

[](#nativescript-material-circular-progress-indicator)

# NativeScript Material Circular progress indicator

Material Design's [Circular progress indicator](https://material.io/design/components/progress-indicators.html#circular-progress-indicators) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-activityindicator.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-activityindicator)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-activityindicator.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-activityindicator)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
5.  [API](#api)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-activityindicator`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-activityindicator`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-activityindicator@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mda="@nativescript-community/ui-material-activityindicator"` on the Page element._

#### XML

```XML
<Page xmlns:mda="@nativescript-community/ui-material-activityindicator">
    <StackLayout horizontalAlignment="center">
        <mda:ActivityIndicator busy="true"/>
    </StackLayout>
</Page>
```

#### CSS

```CSS
mdactivityindicator {
    color: #fff;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialActivityIndicatorModule } from "@nativescript-community/ui-material-activityindicator/angular";

@NgModule({
    imports: [
        NativeScriptMaterialActivityIndicatorModule,
        ...
    ],
    ...
})
```

```html
<MDActivityIndicator busy="true"></MDActivityIndicator>
```

##

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import ActivityIndicatorPlugin from '@nativescript-community/ui-material-activityindicator/vue';

Vue.use(ActivityIndicatorPlugin);
```

```html
<MDActivityIndicator busy="true"/>
```


[](#api)

## API

### Attributes

Inherite from NativeScript [Activity Indicator](https://docs.nativescript.org/ui/ns-ui-widgets/activity-indicator) so it already has all the same attributes

</details><details>
<summary><b>bottom-navigation</b></summary>

[](#nativescript-material-bottom-navigation)

# NativeScript Material Bottom navigation

Material Design's [Bottom navigation](https://material.io/components/bottom-navigation) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-bottom-navigation.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-bottom-navigation)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-bottom-navigation.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-bottom-navigation)


[](#contents)

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


[](#installation)

## Installation

```bash
ns plugin add @nativescript-community/ui-material-bottom-navigation
```

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mds="@nativescript-community/ui-material-bottom-navigation"` on the Page element._

#### XML

```XML
<Page xmlns:mdt="@nativescript-community/ui-material-bottom-navigation">
    <mdt:BottomNavigation width="100%" id="main-tabview" class="main-tabview"
                selectedIndexChanged="onSelectedIndexChanged"
                iosOverflowSafeArea="true" selectedIndex="0" tabsPosition="bottom" swipeEnabled="false">
            <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
            <mdt:TabStrip backgroundColor="color('dark')" color="color('blue')">
                <mdt:TabStripItem  class="tab-item">
                    <Image src="font://&#xe1b0;" class="fal"></Image>
                    <Label text="Home" ios:fontSize="10" android:fontSize="12"></Label>
                </mdt:TabStripItem>
                <mdt:TabStripItem class="tab-item">
                    <Label text="L('search')" ios:fontSize="10" android:fontSize="12"></Label>
                    <Image src="font://&#xe024;" class="fal"></Image>
                </mdt:TabStripItem>
                <mdt:TabStripItem  class="tab-item">
                    <Label text="L('trips')" ios:fontSize="10" android:fontSize="12"></Label>
                    <Image src="font://&#xf03a;" class="fal"></Image>
                </mdt:TabStripItem>
                <mdt:TabStripItem class="tab-item">
                    <Label text="L('inbox')" ios:fontSize="10" android:fontSize="12"></Label>
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


[](#api)

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

</details><details>
<summary><b>bottomnavigationbar</b></summary>

[](#nativescript-material-bottom-navigation-bar)

# NativeScript Material Bottom navigation bar

Material Design's [Bottom navigation](https://material.io/components/bottom-navigation) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-bottomnavigationbar.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar) [![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-bottomnavigationbar.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#angular)
    - [Vue](#vue)
    - [CSS Styling](#css-styling)
5.  [API](#api)
    - [BottomNavigationBar](#bottom-navigation-bar)
    - [BottomNavigationTab](#bottom-navigation-tab)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-bottomnavigationbar`

For NativeScript 6.x
* `tns plugin add nativescript-material-bottomnavigationbar`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

Before start using the plugin you need to add the icons for Android & iOS in your `App_Resources` directory.

### Plain NativeScript

You can set the tabs using the `tabs` property

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:mdc="@nativescript-community/ui-material-bottomnavigationbar"
      loaded="pageLoaded"
      class="page">
    <GridLayout rows="*, auto">
        <StackLayout row="0">
            <Label text="content"></Label>
        </StackLayout>
        <mdc:BottomNavigationBar
          tabs="tabs"
          activeColor="green"
          inactiveColor="red"
          backgroundColor="black"
          tabSelected="tabSelected"
          row="1"
        ></mdc:BottomNavigationBar>
    </GridLayout>
</Page>
```

```typescript
import { EventData } from '@nativescript/core/data/observable';
import { Page } from '@nativescript/core/ui/page';
import { BottomNavigationTab, TabSelectedEventData } from '@nativescript-community/ui-material-bottomnavigationbar';

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
    let page = <Page>args.object;
    page.bindingContext = {
        tabs: [
            new BottomNavigationTab({ title: 'First', icon: 'res://ic_home' }),
            new BottomNavigationTab({
                title: 'Second',
                icon: 'res://ic_view_list',
                isSelectable: false
            }),
            new BottomNavigationTab({ title: 'Third', icon: 'res://ic_menu' })
        ]
    };
}

export function tabSelected(args: TabSelectedEventData) {
    console.log('tab selected ' + args.newIndex);
}
```

or you can add the tabs directly in your xml view

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:mdc="@nativescript-community/ui-material-bottomnavigationbar"
      loaded="pageLoaded"
      class="page">
    <GridLayout rows="*, auto">
        <StackLayout row="0">
            <Label text="content"></Label>
        </StackLayout>
        <mdc:BottomNavigationBar
          activeColor="green"
          inactiveColor="red"
          backgroundColor="black"
          tabSelected="tabSelected"
          row="1"
        >
          <mdc:BottomNavigationTab title="First" icon="res://ic_home" />
          <mdc:BottomNavigationTab title="Second" icon="res://ic_view_list" isSelectable="false" />
          <mdc:BottomNavigationTab title="Third" icon="res://ic_menu" />
        </mdc:BottomNavigationBar>
    </GridLayout>
</Page>
```

### Angular

First you need to include the `NativeScriptMaterialBottomNavigationBarModule` in your `app.module.ts`

```typescript
import { NativeScriptMaterialBottomNavigationBarModule} from "@nativescript-community/ui-material-bottomnavigationbar/angular";

@NgModule({
    imports: [
        NativeScriptMaterialBottomNavigationBarModule
    ],
    ...
})
```

```html
<GridLayout rows="*, auto">
    <StackLayout row="0">
        <label text="content"></label>
    </StackLayout>
    <BottomNavigationBar
        [tabs]="tabs"
        activeColor="red"
        inactiveColor="yellow"
        backgroundColor="black"
        (tabSelected)="onBottomNavigationTabSelected($event)"
        (tabPressed)="onBottomNavigationTabPressed($event)"
        row="1"
    ></BottomNavigationBar>
</GridLayout>
```

or you can declare the `BottomNavigationTab` in your html directly

```html
<GridLayout rows="*, auto">
    <StackLayout row="0">
        <label text="content"></label>
    </StackLayout>
    <BottomNavigationBar
        activeColor="red"
        inactiveColor="yellow"
        backgroundColor="black"
        (tabSelected)="onBottomNavigationTabSelected($event)"
        (tabPressed)="onBottomNavigationTabPressed($event)"
        row="1"
    >
        <BottomNavigationTab title="First" icon="res://ic_home"></BottomNavigationTab>
        <BottomNavigationTab title="Second" icon="res://ic_view_list" [isSelectable]="false"></BottomNavigationTab>
        <BottomNavigationTab title="Third" icon="res://ic_menu"></BottomNavigationTab>
    </BottomNavigationBar>
</GridLayout>
```

### Vue

If you want to use this plugin with Vue, do this in your `app.js` or `main.js`:

```javascript
import BottomNavigationBar from '@nativescript-community/ui-material-bottomnavigationbar/vue';

Vue.use(BottomNavigationBar);
```

This will install and register `BottomNavigationBar` and `BottomNavigationTab` components to your `Vue` instance and now you can use the plugin as follows:

```html
<GridLayout rows="*, auto">
    <StackLayout row="0">
        <label text="content"></label>
    </StackLayout>
    <MDBottomNavigationBar activeColor="red" inactiveColor="yellow" backgroundColor="black" @tabSelected="onBottomNavigationTabSelected" row="1">
        <MDBottomNavigationTab title="First" icon="ic_home" />
        <MDBottomNavigationTab title="Second" icon="ic_view_list" isSelectable="false" />
        <MDBottomNavigationTab title="Third" icon="ic_menu" />
    </MDBottomNavigationBar>
</GridLayout>
```

You can find more information of how to use nativescript plugins with Vue [Here!](https://nativescript-vue.org/en/docs/getting-started/nativescript-plugins/)

### CSS Styling

You can also use your css file to set or change the `activeColor`, `inactiveColor` & `backgroundColor` of the Bottom Navigation Bar.

```css
.botom-nav {
    active-color: green;
    inactive-color: black;
    background-color: blue;
}
```


[](#api)

## API

-   **Properties (bindable):** Properties settable through XML/HTML
-   **Properties (internal):** Properties accessible through JS/TS instance
-   **Events:** Event properties settable thew XML/HTML

### Bottom Navigation Bar

#### Properties (bindable)

Properties settable through XML/HTML

| Property        | Required | Default                     | Type                         | Description                                             |
| --------------- | -------- | --------------------------- | ---------------------------- | ------------------------------------------------------- |
| tabs            | true     | []                          | `Array<BottomNavigationTab>` | Array containing the tabs for the BottomNavigationBar   |
| titleVisibility | false    | `TitleVisibility.Selected`  | `TitleVisibility`            | Title Visibility for each BottomNavigationTab           |
| activeColor     | false    | "black"                     | `String`                     | Color of the BottomNavigationTab when it's selected     |
| inactiveColor   | false    | "gray"                      | `String`                     | Color of the BottomNavigationTab when it's not selected |
| backgroundColor | false    | "white"                     | `String`                     | Color of the BottomNavigation background                |
| badgeColor      | false    | "red"                       | `String`                     | Color of the BottomNavigationTab badge background       |
| badgeTextColor  | false    | "white"                     | `String`                     | Color of the BottomNavigationTab badge text             |

#### Properties (internal)

Properties accessible through JS/TS instance

| Property         | Default                     | Type                         | Description                                             |
| ---------------- | --------------------------- | ---------------------------- | ------------------------------------------------------- |
| items            | `[]`                        | `Array<BottomNavigationTab>` | Array containing the tabs for the BottomNavigationBar   |
| selectedTabIndex | 0                           | `Number`                     | Index of the selected tab                               |
| titleVisibility  | `TitleVisibility.Selected`  | `TitleVisibility`            | Title Visibility for each BottomNavigationTab           |
| activeColor      | `new Color('black')`        | `Color`                      | Color of the BottomNavigationTab when it's selected     |
| inactiveColor    | `new Color('gray')`         | `Color`                      | Color of the BottomNavigationTab when it's not selected |
| backgroundColor  | `new Color('white')`        | `Color`                      | Color of the BottomNavigation background                |
| badgeColor       | `new Color('red')`          | `Color`                      | Color of the BottomNavigationTab badge background       |
| badgeTextColor   | `new Color('white')`        | `Color`                      | Color of the BottomNavigationTab badge text             |

#### Events

Event properties settable thew XML/HTML

| Name          | Type                                   | Description                                                              |
| ------------- | -------------------------------------- | ------------------------------------------------------------------------ |
| tabPressed    | `(args: TabPressedEventData): void`    | Function fired every time the user tap a tab with `isSelectable: false`  |
| tabSelected   | `(args: TabSelectedEventData): void`   | Function fired every time the user select a new tab                      |
| tabReselected | `(args: TabReselectedEventData): void` | Function fired every time the user select a tab that is already selected |

#### Methods

Methods accessible through JS/TS instance

| Property                                   | Type   | Description                      |
| ------------------------------------------ | ------ | -------------------------------- |
| `selectTab(index: number)`                 | `void` | Select a tab programmatically    |
| `showBadge(index: number, value?: number)` | `void` | Show a badge for an specific tab, if you want to show a badge as a red dot no value should be passed to the function |

### Bottom Navigation Tab

#### Properties (bindable)

Properties settable through XML/HTML

| Property     | Required | Default | Type      | Description                                 |
| ------------ | -------- | ------- | --------- | ------------------------------------------- |
| title        | true     | null    | `string`  | Title of the tab                            |
| icon         | true     | null    | `string`  | Icon of the tab                             |
| isSelectable | false    | true    | `boolean` | Determine if the tab can be selected or not |

</details><details>
<summary><b>bottomsheet</b></summary>

[](#nativescript-material-bottom-sheet)

# NativeScript Material Bottom sheet

Material Design's [Bottom sheet](https://material.io/components/sheets-bottom) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-bottomsheet.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomsheet)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-bottomsheet.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomsheet)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-bottomsheet`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-bottomsheet`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-bottomsheet@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#api)

## API

```ts
export interface BottomSheetOptions {
    view: string | ViewBase; 
    // View instance to be shown in bottom sheet. Or the name of the module to load starting from the application root.
    context?: any; 
    // Any context you want to pass to the view shown in bottom sheet. This same context will be available in the arguments of the shownInBottomSheet event handler.
    animated?: boolean; 
    // An optional parameter specifying whether to show the sheet view with animation.
    dismissOnBackgroundTap?: boolean; 
    // An optional parameter specifying whether to dismiss the sheet when clicking on background.
    dismissOnDraggingDownSheet?: boolean; 
    // An optional parameter specifying whether to disable dragging the sheet to dismiss.
    dismissOnBackButton?: boolean; 
    // An optional parameter that specifies whether to close the sheet when pressing the back button.
    closeCallback?: Function; 
    //  A function that will be called when the view is closed. Any arguments provided when calling shownInBottomSheet.closeCallback will be available here.
    trackingScrollView?: string; 
    // optional id of the scroll view to track
    transparent?: boolean; 
    // optional parameter to make the bottomsheet transparent
    ignoreTopSafeArea?: boolean; 
    // optional ios parameter to top safe area. Default is true
    ignoreBottomSafeArea?: boolean; 
    // optional ios parameter to bottom safe area. Default is false
    disableDimBackground?: boolean; 
    // optional parameter to remove the dim background
    skipCollapsedState?: boolean; 
    // optional Android parameter to skip midway state when view is greater than 50%. Default is false
    peekHeight?: number; 
    // optional parameter to set the collapsed sheet height. To work on iOS you need to set trackingScrollView. Also ensure the scrollView is taking the full height of the bottomsheet content. Otherwise the "full" height wont be computed correctly
    ignoreKeyboardHeight?: boolean; 
    //(iOS only) A Boolean value that controls whether the height of the keyboard should affect the bottom sheet's frame when the keyboard shows on the screen. (Default: true)
    onChangeState?: onChangeStateBottomSheet; 
    // One works to be called on the scroll of the sheet. Parameters: state (CLOSED, DRAGGING, DRAGGING, COLLAPSED) and slideOffset is the new offset of this bottom sheet within [-1,1] range. Offset increases as this bottom sheet is moving upward. From 0 to 1 the sheet is between collapsed and expanded states and from -1 to 0 it is between hidden and collapsed states.
    canTouchBehind?: boolean //(Android only) allows to interact with the screen behind the sheet. For it to work properly need dismissOnBackgroundTap set to true.
}
```


[](#usage)

## Usage

### Plain NativeScript

We need to do some wiring when your app starts, so open `app.js` and add this before creating any View/App/Frame:

#### JavaScript
```js
var material = require("@nativescript-community/ui-material-bottomsheet");

material.install();
```

#### TypeScript
```ts
import { install } from "@nativescript-community/ui-material-bottomsheet";
install();
```

Uses the same kind of API as [NativeScript Modals](https://docs.nativescript.org/ui/modal-view).

#### TS

```typescript
const modalViewModulets = "ns-ui-category/modal-view/basics/modal-ts-view-page";
export function openBottomSheet(args) {
    const mainView: Button = <Button>args.object;
    const context = { username: "test_username", password: "test" };
    const fullscreen = true;
    mainView.showBottomSheet({
        view: modalViewModulets,
        context,
        closeCallback: (username, password) => {
            bottom-sheet
            alert(`Username: ${username} : Password: ${password}`);
        },
        fullscreen
    });
}

```

##

### NativeScript + Vue
```typescript
import Vue from 'nativescript-vue';
import BottomSheetPlugin from '@nativescript-community/ui-material-bottomsheet/vue';
import { install } from "@nativescript-community/ui-material-bottomsheet";
install();

Vue.use(BottomSheetPlugin);
```
Then you can show a Vue component:
```typescript 
import MyComponent from 'MyComponent.vue';

//inside another Vue component
const options: VueBottomSheetOptions = {
};
this.$showBottomSheet(MyComponent, options)
```

##

### NativeScript + Angular
First you need to include the `NativeScriptMaterialBottomSheetModule` in your `app.module.ts`

```typescript
import { NativeScriptMaterialBottomSheetModule} from "@nativescript-community/ui-material-bottomsheet/angular";

@NgModule({
    imports: [
        // This will call the install method and inject a global service called BottomSheetService
        NativeScriptMaterialBottomSheetModule.forRoot()
    ],
    ...
})
```
now you can show your custom BottomSheet using the `BottomSheetService`, this service follows the same implementation as the `ModalService`

#### ItemComponent
```typescript
import { Component,  ViewContainerRef } from '@angular/core';
import { BottomSheetOptions, BottomSheetService } from '@nativescript-community/ui-material-bottomsheet/angular';
import { ShareOptionsComponent } from './share-options.component';

@Component({
    selector: 'ns-item',
    templateUrl: './item.component.html',
    moduleId: module.id
})
export class ItemComponent {
    constructor(
        private bottomSheet: BottomSheetService, 
        private containerRef: ViewContainerRef,
    ) {}

    showOptions() {
        const options: BottomSheetOptions = {
            viewContainerRef: this.containerRef,
            context: ['Facebook', 'Google', 'Twitter']
        };

        this.bottomSheet.show(ShareOptionsComponent, options).subscribe(result => {
            console.log('Option selected:', result);
        });
    }
}
```
#### ShareOptionsComponent
```html
<ListView
    [items]="options"
    (itemTap)="onTap($event)"
    separatorColor="white"
    class="list-group"
    height="200"
>
    <ng-template let-option="item">
        <Label
            class="list-group-item"
            [text]="option"
        ></Label>
    </ng-template>
</ListView>
```
```typescript
import { Component, OnInit } from '@angular/core';
import { BottomSheetParams } from '@nativescript-community/ui-material-bottomsheet/angular';
import { ItemEventData } from '@nativescript/core/ui/list-view';

@Component({
    selector: 'ns-share-options',
    templateUrl: 'share-options.component.html'
})
export class ShareOptionsComponent implements OnInit {
    options: string[];
    
    // The BottomSheetService injects the BottomSheetParams to the component
    // so you can get the context and call the closeCallback method from the component displayed in your BottomSheet
    constructor(private params: BottomSheetParams) {}

    ngOnInit() {
        this.options = this.params.context;
    }

    onTap({ index }: ItemEventData) {
        this.params.closeCallback(this.options[index]);
    }
}
```

</details><details>
<summary><b>button</b></summary>

[](#nativescript-material-button)

# NativeScript Material Button

Material Design's [Button](https://material.io/components/buttons) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-button.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-button)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-button.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-button)


[](#contents)

## Contents

- [NativeScript Material Button](#nativescript-material-button)
  - [Contents](#contents)
  - [Installation](#installation)
  - [](#)
  - [](#-1)
  - [](#-2)
  - [Changelog](#changelog)
  - [FAQ](#faq)
  - [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
      - [XML](#xml)
      - [CSS](#css)
  - [](#-3)
    - [NativeScript + Angular](#nativescript--angular)
  - [](#-4)
    - [NativeScript + Vue](#nativescript--vue)
  - [API](#api)
    - [Attributes](#attributes)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-button`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-button`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-button@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdb="@nativescript-community/ui-material-button"` on the Page element_

#### XML

```XML
<Page xmlns:mdb="@nativescript-community/ui-material-button">
    <StackLayout horizontalAlignment="center">
        <mdb:Button text="raised button"/>
        <mdb:Button variant="flat" text="flat button"/>
        <mdb:Button variant="text" text="text button"/>
        <mdb:Button elevation="5" rippleColor="red" text="raised custom button"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdbutton {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialButtonModule } from "@nativescript-community/ui-material-button/angular";

@NgModule({
    imports: [
        NativeScriptMaterialButtonModule,
        ...
    ],
    ...
})
```

```html
<MDButton rippleColor="blue" text="text button"></MDButton>
```

##

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import ButtonPlugin from '@nativescript-community/ui-material-button/vue';

Vue.use(ButtonPlugin);
```

```html
<MDButton rippleColor="blue" text="text button"/>
```


[](#api)

## API

### Attributes

Inherite from NativeScript [Button](https://docs.nativescript.org/ui/ns-ui-widgets/button) so it already has all the same attributes.

* **elevation** _optional_

An attribute to set the elevation of the button. This will increase the 'drop-shadow' of the button.

* **variant** _optional_

An attribute to set the variant of the button. Can be ```flat``` or ```text```. No value means raised button

* **rippleColor** _optional_

An attribute to set the ripple color of the button.

</details><details>
<summary><b>cardview</b></summary>

[](#nativescript-material-card)

# NativeScript Material Card

Material Design's [Card](https://material.io/components/cards) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-cardview.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-cardview)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-cardview.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-cardview)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
5.  [API](#api)


[](#installation)

## Installation

For N 7.0
* `tns plugin add @nativescript-community/ui-material-cardview`

##

For N 6.x
* `tns plugin add nativescript-material-cardview`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-cardview@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdc="@nativescript-community/ui-material-cardview"` on the Page element_

#### XML

```XML
<Page xmlns:mdc="@nativescript-community/ui-material-cardview">
    <StackLayout horizontalAlignment="center">
        <mdc:CardView width="100" height="100"/>
        <mdc:CardView elevation="5" rippleColor="red"  width="100" height="100"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdcardview {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialCardViewModule } from "@nativescript-community/ui-material-cardview/angular";

@NgModule({
    imports: [
        NativeScriptMaterialCardViewModule,
        ...
    ],
    ...
})
```

```html
<MDCardView rippleColor="blue"  width="100" height="100"></MDCardView>
```

##

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import CardViewPlugin from '@nativescript-community/ui-material-cardview/vue';

Vue.use(CardViewPlugin);
```

```html
<MDCardView rippleColor="blue"  width="100" height="100"/>
```


[](#api)

## API

### Attributes

Inherite from NativeScript [StackLayout](https://docs.nativescript.org/ui/layouts/layout-containers#stacklayout-properties)

* **elevation** _optional_

An attribute to set the elevation of the cardview. This will increase the 'drop-shadow' of the cardview.

* **rippleColor** _optional_

An attribute to set the ripple color of the cardview.

</details><details>
<summary><b>core</b></summary>

[](#nativescript-material-core)

# Nativescript Material Core

[npm-url]:https://npmjs.org/package/nativescript-material-components

Core module for all Nativescript material components
</details><details>
<summary><b>core-tabs</b></summary>

[](#nativescript-material-core)

# Nativescript Material Core

[npm-url]:https://npmjs.org/package/nativescript-material-components

Core module for all Nativescript material components
</details><details>
<summary><b>dialogs</b></summary>

[](#nativescript-material-dialogs)

# NativeScript Material Dialogs

Material Design's [Dialogs](https://material.io/components/dialogs) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-dialogs.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-dialogs)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-dialogs.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-dialogs)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4. [Usage](#usage)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-dialogs`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-dialogs`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-dialogs@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

Uses the same API as [NativeScript Dialogs](https://docs.nativescript.org/ui/dialogs).

Adds one option for `alert`:
* `view` : can be a NativeScript View or a path to to XML component. The custom view will be added to the dialog. Possibilities become endless.

##

### TS

```typescript
import { login, alert, prompt } from "@nativescript-community/ui-material-dialogs";

alert("Your message").then(()=> {
    console.log("Dialog closed!");
});

```

</details><details>
<summary><b>floatingactionbutton</b></summary>

[](#nativescript-material-floating-action-button)

# NativeScript Material Floating action button

Material Design's [Floating action button](https://material.io/components/buttons-floating-action-button) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-floatingactionbutton.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-floatingactionbutton)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-floatingactionbutton.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-floatingactionbutton)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
5.  [API](#api)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-floatingactionbutton`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-floatingactionbutton`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-floatingactionbutton@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdf="@nativescript-community/ui-material-floatingactionbutton"` on the Page element_

#### XML

```XML
<Page xmlns:mdf="@nativescript-community/ui-material-floatingactionbutton">
    <StackLayout horizontalAlignment="center">
        <mdf:FloatingActionButton src="res://ic_action_add"/>
        <mdf:FloatingActionButton elevation="5" src="res://ic_action_add"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdfloatingactionbutton {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { registerElement } from '@nativescript/angular/element-registry';
import { FloatingActionButton } from '@nativescript-community/ui-material-floatingactionbutton';
registerElement('MDFloatingActionButton', () => FloatingActionButton);
```

```html
<MDFloatingActionButton rippleColor="blue" src="res://ic_action_add"></MDFloatingActionButton>
```

##

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue';

Vue.use(FloatingActionButtonPlugin);
```

```html
<MDFloatingActionButton rippleColor="blue" src="res://ic_action_add"/>
```


[](#api)

## API

### Attributes

Inherite from NativeScript [Button](https://docs.nativescript.org/ui/ns-ui-widgets/button) so it already has all the same attributes.

* **src** _optional_

An attribute to set the floatingactionbutton icon. For now FAB only support images as icon

* **elevation** _optional_

An attribute to set the elevation of the floatingactionbutton. This will increase the 'drop-shadow' of the floatingactionbutton.

* **rippleColor** _optional_

An attribute to set the ripple color of the floatingactionbutton.

</details><details>
<summary><b>progress</b></summary>

[](#nativescript-material-linear-progress-indicator)

# NativeScript Material Linear progress indicator

Material Design's [Linear progress indicator](https://material.io/components/progress-indicators#linear-progress-indicators) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-progress.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-progress)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-progress.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-progress)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
5.  [API](#api)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-progress`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-progress`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-progress@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdp="@nativescript-community/ui-material-progress"` on the Page element_

#### XML

```XML
<Page xmlns:mdp="@nativescript-community/ui-material-progress">
    <StackLayout horizontalAlignment="center">
        <mdp:Progress value="50" maxValue="100"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdprogress {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialProgressModule } from "@nativescript-community/ui-material-progress/angular";

@NgModule({
    imports: [
        NativeScriptMaterialProgressModule,
        ...
    ],
    ...
})
```

```html
<MDProgress v-model="value" maxValue="100"></MDProgress>
```

##

### NativeScript + Vue

```typescript
import ProgressPlugin from '@nativescript-community/ui-material-progress/vue';

Vue.use(ProgressPlugin);
```

```html
<MDProgress value="50" maxValue="100"></MDProgress>
```


[](#api)

## API

### Attributes

Inherite from NativeScript [Progress](https://docs.nativescript.org/ui/components/progress) so it already has all the same attributes.

* **elevation** _optional_

An attribute to set the elevation of the progress. This will increase the 'drop-shadow' of the progress.

* **rippleColor** _optional_

An attribute to set the ripple color of the progress.

</details><details>
<summary><b>ripple</b></summary>

[](#nativescript-material-ripple)

# NativeScript Material Ripple

Material Design's [Ripple](https://material.io/design/interaction/states.html#pressed) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-ripple.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-ripple)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-ripple.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-ripple)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
5.  [API](#api)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-ripple`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-ripple`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-ripple@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdr="@nativescript-community/ui-material-ripple"` on the Page element_

#### XML

```XML
<Page xmlns:mdr="@nativescript-community/ui-material-ripple">
    <StackLayout horizontalAlignment="center">
        <mdr:Ripple rippleColor="green" width="100" height="100" />
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdripple {
    ripple-color: blue;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialRippleModule } from "@nativescript-community/ui-material-ripple/angular";

@NgModule({
    imports: [
        NativeScriptMaterialRippleModule,
        ...
    ],
    ...
})
```

```html
<MDRipple rippleColor="green" width="100" height="100"></MDRipple>
```

##

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import RipplePlugin from '@nativescript-community/ui-material-ripple/vue';

Vue.use(RipplePlugin);
```

```html
<MDRipple rippleColor="green" width="100" height="100"/>
```


[](#api)

## API

### Attributes

Inherite from NativeScript [StackLayout](https://docs.nativescript.org/ui/layouts/layout-containers#stacklayout-properties).

* **rippleColor** _optional_

An attribute to set the ripple color of the ripple.

</details><details>
<summary><b>slider</b></summary>

[](#nativescript-material-slider)

# NativeScript Material Slider

Material Design's [Slider](https://material.io/components/sliders) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-slider.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-slider)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-slider.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-slider)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4.  [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
5.  [API](#api)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-slider`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-slider`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-slider@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mds="@nativescript-community/ui-material-slider"` on the Page element._

#### XML

```XML
<Page xmlns:mds="@nativescript-community/ui-material-slider">
    <StackLayout horizontalAlignment="center">
        <mds:Slider value="50" minValue="0" maxValue="100" />
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdslider {
    ripple-color: blue;
    elevation: 4;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialSliderModule } from "@nativescript-community/ui-material-slider/angular";

@NgModule({
    imports: [
        NativeScriptMaterialSliderModule,
        ...
    ],
    ...
})
```

```html
<MDSlider value="50" minValue="0" maxValue="100"></MDSlider>
```

##

### NativeScript + Vue

```javascript
import SliderPlugin from '@nativescript-community/ui-material-slider/vue';

Vue.use(SliderPlugin);
```

```html
<MDSlider value="50" minValue="0" maxValue="100" @valueChange="onValueChanged"/>
```

Or you can bind the value to some instance data using the `v-model` directive:

```html
<MDSlider v-model="value" minValue="0" maxValue="100"/>
```


[](#api)

## API

### Attributes

Inherite from NativeScript [Slider](https://docs.nativescript.org/ui/ns-ui-widgets/slider) so it already has all the same attributes.

- **stepSize** _optional_
  - An attribute to set the step size of the slider. Without this attribute, it behaves as a **continuous slider**.

- **elevation** _optional_
  - An attribute to set the elevation of the slider. This will increase the 'drop-shadow' of the slider.

- **rippleColor** _optional_
  - An attribute to set the ripple color of the slider.

- **trackFillColor** _optional_
  - Sets the color of the filled track.
  - Defaults to your theme's `colorPrimary`. 

- **trackBackgroundColor** _optional_
  - Sets the color of the background track.

- **thumbColor** _optional_
  - Sets the color of the slider's thumb.
  - Defaults to your theme's `colorPrimary`. 




</details><details>
<summary><b>snackbar</b></summary>

[](#nativescript-material-snackbar)

# NativeScript Material Snackbar

Material Design's [Snackbar](https://material.io/components/snackbars) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-snackbar.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-snackbar)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-snackbar.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-snackbar)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4. [Usage](#usage)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-snackbar`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-snackbar`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-snackbar@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### TypeScript

```typescript
import { SnackBar } from '@nativescript-community/ui-material-snackbar';

const snackbar = new SnackBar();

export function showSimpleSnackbar() {
    snackbar.simple(`I'm a simple snackbar`).then(result => console.log('Simple Snackbar:', result));
}

export function showActionSnackbar() {
    snackbar
        .action({
            message: `I'm a snackbar with an action`,
            actionText: 'Dismiss',
            hideDelay: 2000
        })
        .then(result => console.log('Action Snackbar:', result));
}

export function showColorfulSnackbar() {
    snackbar
        .action({
            message: `I'm a colorful snackbar`,
            textColor: 'blue',
            actionTextColor: 'yellow',
            backgroundColor: 'green',
            actionText: 'Dismiss',
            hideDelay: 2000
        })
        .then(result => console.log('Action Snackbar:', result));
}

```

</details><details>
<summary><b>speeddial</b></summary>

[](#nativescript-material-speed-dial)

# NativeScript Material Speed dial

Material Design's [Speed dial](https://material.io/components/buttons-floating-action-button#types-of-transitions) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-speeddial.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-speeddial)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-speeddial.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-speeddial)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4. [Usage](#usage)


[](#installation)

## Installation

```bash
ns plugin add @nativescript-community/ui-material-speeddial
```

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import speeddialPlugin from '@nativescript-community/ui-material-speeddial/vue';

Vue.use(speeddialPlugin);
```

```html
<MDSpeedDial buttonFontSize="26" text="mdi-one-up"  buttonClass="mdi" buttonBackgroundColor="yellow" @tap="onTap">
    <MDSpeedDialItem icon="res://ic_action_add" title="test1" backgroundColor="red"  @tap="onTap"/>
    <MDSpeedDialItem text="mdi-card-account-mail" title="test2" buttonClass="mdi" backgroundColor="green"  @tap="onTap"/>
    <MDSpeedDialItem backgroundImage="~/images/iu.jpg"  backgroundColor="blue"  @tap="onTap"/>
    <MDSpeedDialItem icon="res://ic_action_add" title="test4" backgroundColor="orange" @tap="onTap"/>
</MDSpeedDial>
```

</details><details>
<summary><b>tabs</b></summary>

[](#nativescript-material-tabs)

# NativeScript Material Tabs

Material Design's [Tabs](https://material.io/components/tabs) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-tabs.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-tabs.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs)


[](#contents)

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

##

```
ns plugin add @nativescript-community/ui-material-tabs
```

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mds="@nativescript-community/ui-material-tabs"` on the Page element._

#### XML

```XML
<Page xmlns:mdt="@nativescript-community/ui-material-tabs">
    <mdt:Tabs selectedIndex="1">
        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <mdt:TabStrip>
            <mdt:TabStripItem>
                <Label text="Home"></Label>
                <Image src="font://&#xf015;" class="fas"></Image>
            </TabStripItem>
            <mdt:TabStripItem> class="special">
                <Label text="Account"></Label>
                <Image src="font://&#xf007;" class="fas"></Image>
            </mdt:TabStripItem>
            <mdt:TabStripItem> class="special">
                <Label text="Search"></Label>
                <Image src="font://&#xf00e;" class="fas"></Image>
            </mdt:TabStripItem>
        </mdt:TabStrip>

        <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
        <mdt:TabContentItem>
            <GridLayout>
                <Label text="Home Page" class="h2 text-center"></Label>
            </GridLayout>
        </mdt:TabContentItem>
        <mdt:TabContentItem>
            <GridLayout>
                <Label text="Account Page" class="h2 text-center"></Label>
            </GridLayout>
        </mdt:TabContentItem>
        <mdt:TabContentItem>
            <GridLayout>
                <Label text="Search Page" class="h2 text-center"></Label>
            </GridLayout>
        </mdt:TabContentItem>
    </mdt:Tabs>
</Page>
```

#### CSS

```CSS
Tabs.bottom-nav {
    background-color: orangered;
    color: gold;
    font-size: 18;
}

TabStripItem.tabstripitem-active {
    background-color: teal;
}

TabStripItem.tabstripitem-active:active {
    background-color: yellowgreen;
}

TabContentItem.first-tabcontent {
    background-color: seashell;
    color: olive;
}
TabContentItem.second-tabcontent {
    background-color: slategray;
    color: aquamarine;
}
TabContentItem.third-tabcontent {
    background-color: blueviolet;
    color: antiquewhite;
}
Tabs MDTabStrip {
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


[](#api)

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

### Events

| Name                      | Description                                                                   |
| -------------             | -------------:                                                                |
| selectedIndexChanged      | Emitted when the selectedIndex property is changed.                           |
| loaded                    | Emitted when the view is loaded.                                              |
| unloaded                  | Emitted when the view is unloaded.                                            |
| layoutChanged             | Emitted when the layout bounds of a view changes due to layout processing.    |

</details><details>
<summary><b>textfield</b></summary>

[](#nativescript-material-text-field)

# NativeScript Material Text field

Material Design's [Text field](https://material.io/components/text-fields) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-textfield.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-textfield)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-textfield.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-textfield)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4. [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
5.  [API](#api)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-textfield`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-textfield`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-textfield@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mdt="@nativescript-community/ui-material-textfield"` on the Page element._

#### XML

```XML
<Page xmlns:mdt="@nativescript-community/ui-material-textfield">
    <StackLayout horizontalAlignment="center">
        <mdt:TextField text="raised textfield"/>
        <mdt:TextField variant="flat" text="flat textfield"/>
        <mdt:TextField variant="text" text="text textfield"/>
        <mdt:TextField elevation="5" rippleColor="red" text="raised custom textfield"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdtextfield {
    ripple-color: blue;
    elevation: 4;
    stroke-color: blue;             /* the border color when active */
    stroke-inactive-color: green;   /* the border color when inactive */
    floating-color: blue;           /* the floating placeholder color when active */
    floating-inactive-color: green; /* the floating placeholder color when inactive */
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialTextFieldModule } from "@nativescript-community/ui-material-textfield/angular";

@NgModule({
    imports: [
        NativeScriptMaterialTextFieldModule,
        ...
    ],
    ...
})
```

```html
<MDTextField  helper="example helper" placeholderColor="green" keyboardType="datetime"
        hint="i am an hint" returnKeyType="next" (focus)="onFocus($event)" (blur)="onBlur($event)"
        (textChange)="onTextChange($event)"></MDTextField>
```

##

### NativeScript + Vue

```javascript
import TextFieldPlugin from '@nativescript-community/ui-material-textfield/vue';

Vue.use(TextFieldPlugin);
```

```html
<MDTextField helper="example helper" placeholderColor="green" keyboardType="datetime"
        hint="i am an hint" returnKeyType="next" @focus="onFocus" @blur="onBlur"
        @textChange="onTextChange"/>
```

Also, you can bind the text to some instance data using the `v-model` directive:

```html
<MDTextField v-model="value" />
```


[](#api)

## API

### Attributes

Inherite from NativeScript [TextField](https://docs.nativescript.org/ui/components/text-field) so it already has all the same attributes.

* **variant** _optional_

An attribute to set the variant of the textfield. Can be ```outline``` or ```underline``` or ```filled```. No value means ```underline``` textfield

* **errorColor** _optional_

An attribute to set the error color of the textfield.

* **helper** _optional_

An attribute to set the helper text of the textfield.

* **floating** _optional_

A boolean attribute to set the floating state of the textfield.

</details><details>
<summary><b>textview</b></summary>

[](#nativescript-material-text-view)

# NativeScript Material Text view

Material Design's [Text view](https://material.io/develop/android/components/material-text-view) component for NativeScript.

[![npm](https://img.shields.io/npm/v/@nativescript-community/ui-material-textview.svg)](https://www.npmjs.com/package/@nativescript-community/ui-material-textview)
[![npm](https://img.shields.io/npm/dt/@nativescript-community/ui-material-textview.svg?label=npm%20downloads)](https://www.npmjs.com/package/@nativescript-community/ui-material-textview)


[](#contents)

## Contents

1. [Installation](#installation)
2. [Changelog](#changelog)
3. [FAQ](#faq)
4. [Usage](#usage)
    - [Plain NativeScript](#plain-nativescript)
    - [Angular](#nativescript--angular)
    - [Vue](#nativescript--vue)
5.  [API](#api)


[](#installation)

## Installation

For NativeScript 7.0+
* `tns plugin add @nativescript-community/ui-material-textview`

##

For NativeScript 6.x
* `tns plugin add nativescript-material-textview`

##

If using ```tns-core-modules```
* `tns plugin add nativescript-material-textview@2.5.4`

##

Be sure to run a new build after adding plugins to avoid any issues.


[](#changelogchangelogmd)

## [Changelog](./CHANGELOG.md)


[](#faqreadmemdfaq)

## [FAQ](../../README.md#faq)


[](#usage)

## Usage

### Plain NativeScript

IMPORTANT: _Make sure you include `xmlns:mdt="@nativescript-community/ui-material-textview"` on the Page element._

#### XML

```XML
<Page xmlns:mdt="@nativescript-community/ui-material-textview">
    <StackLayout horizontalAlignment="center">
        <mdt:TextView text="raised textview"/>
        <mdt:TextView variant="flat" text="flat textview"/>
        <mdt:TextView variant="text" text="text textview"/>
        <mdt:TextView elevation="5" rippleColor="red" text="raised custom textview"/>
   </StackLayout>
</Page>
```

#### CSS

```CSS
mdtextview {
    ripple-color: blue;
    elevation: 4;
    stroke-color: blue;             /* the border color when active */
    stroke-inactive-color: green;   /* the border color when inactive */
    floating-color: blue;           /* the floating placeholder color when active */
    floating-inactive-color: green; /* the floating placeholder color when inactive */
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialTextViewModule } from "@nativescript-community/ui-material-textview/angular";

@NgModule({
    imports: [
        NativeScriptMaterialTextViewModule,
        ...
    ],
    ...
})
```

```html
<MDTextView  helper="example helper" placeholderColor="green" keyboardType="datetime"
        hint="i am an hint" returnKeyType="next" (focus)="onFocus($event)" (blur)="onBlur($event)"
        (textChange)="onTextChange($event)"></MDTextView>
```

##

### NativeScript + Vue

```javascript
import TextViewPlugin from '@nativescript-community/ui-material-textview/vue';

Vue.use(TextViewPlugin);
```

```html
<MDTextView helper="example helper" placeholderColor="green" keyboardType="datetime"
        hint="i am an hint" returnKeyType="next" @focus="onFocus" @blur="onBlur"
        @textChange="onTextChange"/>
```

Also, you can bind the text to some instance data using the `v-model` directive:

```html
<MDTextView v-model="value" />
```


[](#api)

## API

### Attributes

Inherite from NativeScript [TextView](https://docs.nativescript.org/ui/components/text-view) so it already has all the same attributes.

* **variant** _optional_

An attribute to set the variant of the textview. Can be ```outline``` or ```underline``` or ```filled```. No value means ```underline``` textview

* **errorColor** _optional_

An attribute to set the error color of the textview.

* **helper** _optional_

An attribute to set the helper text of the textview.

* **floating** _optional_

A boolean attribute to set the floating state of the textview.

</details>