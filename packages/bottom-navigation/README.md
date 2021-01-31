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
5.  [API](#api)

## Installation

### :warning: Warning :warning:
From NativeScript 5.x using this component will break the [NativeScript tab component](https://docs.nativescript.org/ui/components/tabs) on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/@nativescript-community/ui-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [material-tabs](https://www.npmjs.com/package/@nativescript-community/ui-material-tabs) (clone of the NativeScript one, but with a little less features).

##

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
    <mdt:Tabs selectedIndex="1">
        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <MDTabStrip>
            <MDTabStripItem>
                <Label text="Home"></Label>
                <Image src="font://&#xf015;" class="fas"></Image>
            </TabStripItem>
            <TabStripItem class="special">
                <Label text="Account"></Label>
                <Image src="font://&#xf007;" class="fas"></Image>
            </TabStripItem>
            <TabStripItem class="special">
                <Label text="Search"></Label>
                <Image src="font://&#xf00e;" class="fas"></Image>
            </TabStripItem>
        </TabStrip>

        <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
        <MDTabContentItem>
            <GridLayout>
                <Label text="Home Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <MDTabContentItem>
            <GridLayout>
                <Label text="Account Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <MDTabContentItem>
            <GridLayout>
                <Label text="Search Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
    </Tabs>
</Page>
```

#### CSS

```CSS
MDBottomNavigation.bottom-nav {
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
MDBottomNavigation TabStrip {
    highlight-color: red;
}
```

##

### NativeScript + Angular

```typescript
import { NativeScriptMaterialTabsModule } from "@nativescript-community/ui-material-slider/angular";

@NgModule({
    imports: [
        NativeScriptMaterialTabsModule,
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
            </TabStripItem>
            <TabStripItem class="special">
                <Label text="Account"></Label>
                <Image src="font://&#xf007;" class="fas"></Image>
            </TabStripItem>
            <TabStripItem class="special">
                <Label text="Search"></Label>
                <Image src="font://&#xf00e;" class="fas"></Image>
            </TabStripItem>
        </TabStrip>

        <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
        <MDTabContentItem>
            <GridLayout>
                <Label text="Home Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <MDTabContentItem>
            <GridLayout>
                <Label text="Account Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <MDTabContentItem>
            <GridLayout>
                <Label text="Search Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
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
            </TabStripItem>
            <TabStripItem class="special">
                <Label text="Account"></Label>
                <Image src="font://&#xf007;" class="fas"></Image>
            </TabStripItem>
            <TabStripItem class="special">
                <Label text="Search"></Label>
                <Image src="font://&#xf00e;" class="fas"></Image>
            </TabStripItem>
        </TabStrip>

        <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
        <MDTabContentItem>
            <GridLayout>
                <Label text="Home Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <MDTabContentItem>
            <GridLayout>
                <Label text="Account Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <MDTabContentItem>
            <GridLayout>
                <Label text="Search Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
    </MDBottomNavigation>
```

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
