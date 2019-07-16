# Nativescript Bottom Navigation

Nativescript plugin for Android & iOS to have the Bottom Navigation bar following the Material Design Guidelines.

[![npm](https://img.shields.io/npm/v/nativescript-material-bottom-navigation.svg)](https://www.npmjs.com/package/nativescript-material-bottom-navigation)
[![npm](https://img.shields.io/npm/dt/nativescript-material-bottom-navigation.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-bottom-navigation)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

<img alt="iOS" src="https://raw.githubusercontent.com/henrychavez/nativescript-bottom-navigation/master/screenshots/screenshot-ios.png" width="250">

## Contents
1.  [Installation](#installation)
2.  [Usage with Javascript](#usage)
3.  [Usage with Angular](#angular)
4.  [Usage with Vue](#vue)
5.  [Css Styling](#css-styling)
6.  [API](#api)

### Prerequisites / Requirements

You need the version of NS3 or later to use this plugin.

### Installation

```bash
tns plugin add nativescript-material-bottom-navigation
```

### Usage 

Before start using the plugin you need to add the icons for android & iOS in your `App_Resources` directory.

#### XML

You can set the tabs using the `tabs` property

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:bottomNav="nativescript-material-bottom-navigation"
      loaded="pageLoaded"
      class="page">
    <GridLayout columns="*"
                rows="*, auto">
        <StackLayout row="0">
            <Label text="content" />
        </StackLayout>
        <bottomNav:BottomNavigation 
            tabs="{{ tabs }}"
            activeColor="green"
            inactiveColor="red"
            backgroundColor="black"
            loaded="bottomNavigationLoaded"
            row="1"
        />
    </GridLayout>
</Page>
```

```typescript
import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { BottomNavigation, BottomNavigationTab, OnTabSelectedEventData } from "nativescript-material-bottom-navigation";

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  page.bindingContext = {
      tabs: [
        new BottomNavigationTab('First', 'ic_home'),
        new BottomNavigationTab('Second', 'ic_view_list'),
        new BottomNavigationTab('Third', 'ic_menu')
      ]
  };
}

export function bottomNavigationLoaded(args) {
  let bottomNavigation: BottomNavigation = args.object;
  // For some reason the tabSelected event doesn't work if you
  // handle it from the view, so you need to handle the event in this way.
  bottomNavigation.on('tabSelected', tabSelected);

}

export function tabSelected(args: OnTabSelectedEventData) {
  console.log('tab selected ' + args.newIndex);
}

```

or you can add the tabs directly in your xml view

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:bottomNav="nativescript-material-bottom-navigation"
      loaded="pageLoaded"
      class="page">
    <GridLayout columns="*"
                rows="*, auto">
        <StackLayout row="0">
            <Label text="content"/>
        </StackLayout>
        <bottomNav:BottomNavigation 
            activeColor="green"
            inactiveColor="red"
            backgroundColor="black"
            loaded="bottomNavigationLoaded"
            row="1"
        >
            <bottomNav:BottomNavigationTab title="First" icon="ic_home"></bottomNav:BottomNavigationTab>
            <bottomNav:BottomNavigationTab title="Second" icon="ic_view_list"></bottomNav:BottomNavigationTab>
            <bottomNav:BottomNavigationTab title="Third" icon="ic_menu"></bottomNav:BottomNavigationTab>
        </bottomNav:BottomNavigation>
    </GridLayout>
</Page>
```

```typescript
import { EventData } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import { BottomNavigation, OnTabSelectedEventData } from "nativescript-material-bottom-navigation";

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
}

export function bottomNavigationLoaded(args) {
  let bottomNavigation: BottomNavigation = args.object;
  bottomNavigation.on('tabSelected', tabSelected);

}

export function tabSelected(args: OnTabSelectedEventData) {
  console.log('tab selected ' + args.newIndex);
}

```

#### Angular

First you need to include the `NativescriptMaterialBottomNavigationModule` in your app.module.ts

```typescript
import { NativescriptMaterialBottomNavigationModule } from "nativescript-material-bottom-navigation/angular";

@NgModule({
    imports: [
        NativescriptMaterialBottomNavigationModule
    ],
    ...
})
```

As the examples in the Javascript/Typescript version you can use the `tabs` property to set the BottomNavigationTabs

```html
<GridLayout rows="*, auto">
    <StackLayout row="0">
       <Label text="content"></Label>
    </StackLayout>
    <BottomNavigation 
        [tabs]="tabs"
        activeColor="red"
        inactiveColor="yellow"
        backgroundColor="black"
        (tabSelected)="onBottomNavigationTabSelected($event)"
        (tabPressed)="onBottomNavigationTabPressed($event)"
        row="1"
    ></BottomNavigation>
</GridLayout>
```

or you can declare the BottomNavigationTabs in your html directly

```html
<GridLayout rows="*, auto">
    <StackLayout row="0">
       <Label text="content"></Label>
    </StackLayout>
    <BottomNavigation 
        activeColor="red"
        inactiveColor="yellow"
        backgroundColor="black"
        (tabSelected)="onBottomNavigationTabSelected($event)"
        (tabPressed)="onBottomNavigationTabPressed($event)"
        row="1"
    >
        <BottomNavigationTab title="First" icon="ic_home"></BottomNavigationTab>
        <BottomNavigationTab title="Second" icon="ic_view_list"></BottomNavigationTab>
        <BottomNavigationTab title="Third" icon="ic_menu"></BottomNavigationTab>
    </BottomNavigation>
</GridLayout>
```

```typescript
import { Component } from "@angular/core";
import { BottomNavigationTab, OnTabPressedEventData, OnTabSelectedEventData } from 'nativescript-material-bottom-navigation';

@Component(
  {
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
  }
)
export class AppComponent {

  public tabs: BottomNavigationTab[] = [
    new BottomNavigationTab('First', 'ic_home'),
    new BottomNavigationTab('Second', 'ic_view_list'),
    new BottomNavigationTab('Third', 'ic_menu')
  ];

  onBottomNavigationTabPressed(args: OnTabPressedEventData): void {
    console.log(`Tab pressed:  ${args.index}`);
  }

  onBottomNavigationTabSelected(args: OnTabSelectedEventData): void {
    console.log(`Tab selected:  ${args.oldIndex}`);
  }
}
```

#### Vue

If you want to use this plugin with Vue, do this in your `app.js` or `main.js`:

```javascript
import BottomNavigation from 'nativescript-material-bottom-navigation/vue';

Vue.use(BottomNavigation)
```

This will install and register `BottomNavigation` and `BottomNavigationTab` components to your `Vue` instance and now you can use the plugin as follows:

```html
<GridLayout rows="*, auto">
    <StackLayout row="0">
       <Label text="content"></Label>
    </StackLayout>
    <BottomNavigation 
        activeColor="red"
        inactiveColor="yellow"
        backgroundColor="black"
        @tabSelected="onBottomNavigationTabSelected"
        row="1"
    >
        <BottomNavigationTab title="First" icon="ic_home" />
        <BottomNavigationTab title="Second" icon="ic_view_list" />
        <BottomNavigationTab title="Third" icon="ic_menu" />
    </BottomNavigation>
</GridLayout>
```

You can find more information of how to use NativeScript plugins with Vue [Here!](https://nativescript-vue.org/en/docs/getting-started/nativescript-plugins/)

#### CSS Styling

You can also use your css file to set or change the activeColor, inactiveColor & backgroundColor of the Bottom Navigation.

```css
.botom-nav {
    tab-active-color: green;
    tab-inactive-color: black;
    tab-background-color: blue;
}
```

## API

1. [BottomNavigation](#bottom-navigation)
2. [BottomNavigationTab](#bottom-navigation-tab)

** properties (bindable) = properties settable thew XML/HTML
** events = event properties settable thew XML/HTML
** properties (internal) = properties settable thew JS/TS instance

# Bottom Navigation

#### Properties (bindable)

| Property | Required | Default | Type | Description |
| --- | --- | --- | --- | --- |
| tabs | true | null | `Array<BottomNavigationTab>` | Array containing the tabs for the BottomNavigation |
| titleVisibility | false | "selected" | `"selected" | "always" | "never"` | Title Visibility for each BottomNavigationTab  |
| activeColor | false | "blue" | `String` | Color of the BottomNavigationTab when it's selected  |
| inactiveColor | false | "gray" | `String` | Color of the BottomNavigationTab when it's not selected  |
| backgroundColor | false | "white" | `String` | Color of the BottomNavigation background  |

#### Events

| Property | Required | Default | Type | Description |
| --- | --- | --- | --- | --- |
| tabSelected | false | null | `function ($event: OnTabSelectedEventData) {}` | Function fired every time the user select a new tab that receive an event object |
| tabReselected | false | null | `function ($event: OnTabReselectedEventData) {}` | Function fired every time the user select a tab that is already selected and receive an event object |
| tabPressed | false | null | `function ($event: OnTabPressedEventData) {}` | Function fired every time the user tap a tab with `selectable: false` that receive an event object |

#### Properties (internal)

| Property | Required | Default | Type | Description |
| --- | --- | --- | --- | --- |
| selectedTabIndex | true | 0 | `Number` | Index of the selected tab |

#### Methods

| Property | Type | Description |
| --- | --- | --- |
| `selectTab(index: number)` | `Void` | Select a tab programmatically |
| `createTabs(tabs: BottomNavigationTab[])` | `Void` | Create the tabs programmatically |

# Bottom Navigation Tab

#### Properties (internal)

| Property | Required | Default | Type | Description |
| --- | --- | --- | --- | --- |
| title | true | null | `String` | Title of the tab |
| icon | true | null | `String` | Icon of the tab  |
| selectable | false | true | `Boolean` | Determine if the tab can be selected or not (The `tabSelected` event still be fired)  |
