[![npm](https://img.shields.io/npm/v/nativescript-material-tabs.svg)](https://www.npmjs.com/package/nativescript-material-tabs)
[![npm](https://img.shields.io/npm/dt/nativescript-material-tabs.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-material-tabs)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-material-components.svg)](https://github.com/Akylas/nativescript-material-components/stargazers)

## Installation

### Warning :warning: :warning: 
From 5.x using material component will break N tab component on iOS (which is bound to be removed). This is needed to allow using the latest native iOS features. If needed you can use either [bottomnavigationbar](https://www.npmjs.com/package/nativescript-material-bottomnavigationbar) (this one is the best choice, closest to material design) or [tabs](https://www.npmjs.com/package/nativescript-material-tabs) (clone of N one, but with a little less features)

* `tns plugin add @nativescript-community/ui-material-tabs`

Be sure to run a new build after adding plugins to avoid any issues.

---

##### [Material Design Spec](https://material.io/design/components/tabs.html)

### Usage


## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mds="@nativescript-community/ui-material-tabs"` on the Page element_

### XML

```XML
<Page xmlns:mdt="@nativescript-community/ui-material-tabs">
    <mdt:Tabs selectedIndex="1">
        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <TabStrip>
            <TabStripItem>
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
        <TabContentItem>
            <GridLayout>
                <Label text="Home Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <TabContentItem>
            <GridLayout>
                <Label text="Account Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <TabContentItem>
            <GridLayout>
                <Label text="Search Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
    </Tabs>
</Page>
```

### CSS

```CSS
MDTabs.bottom-nav {
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
MDTabs TabStrip {
    highlight-color: red;
}
```

## NativeScript + Angular

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
    <MDTabs selectedIndex="1">
        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <TabStrip>
            <TabStripItem>
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
        <TabContentItem>
            <GridLayout>
                <Label text="Home Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <TabContentItem>
            <GridLayout>
                <Label text="Account Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <TabContentItem>
            <GridLayout>
                <Label text="Search Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
    </MDTabs>
```

## NativeScript + Vue

```javascript
import TabsPlugin from '@nativescript-community/ui-material-slider/vue';

Vue.use(TabsPlugin);
```

```html
<MDTabs selectedIndex="1">
        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <TabStrip>
            <TabStripItem>
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
        <TabContentItem>
            <GridLayout>
                <Label text="Home Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <TabContentItem>
            <GridLayout>
                <Label text="Account Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
        <TabContentItem>
            <GridLayout>
                <Label text="Search Page" class="h2 text-center"></Label>
            </GridLayout>
        </TabContentItem>
    </MDTabs>
```

## Attributes

Inherite from Nativescript [Tabs](https://docs.nativescript.org/ui/ns-ui-widgets/slider) so it already has all the same attributes

## Attributes

| Name |Type| Description|
| ------------- |:-------------:| -----:|
| items  |	Array<TabContentItem> | 	Gets or sets the items of the BottomNavigation.|
|selectedIndex  |	number | 	Gets or sets the selectedIndex of the BottomNavigation.|
|swipeEnabled  |	boolean  |	Gets or sets the swipe enabled state of the Tabs.|
|offscreenTabLimit  |	number  |	Gets or sets the number of offscreen preloaded tabs of the Tabs.|
|tabStrip 	 |TabStrip  |	Gets or sets the tab strip of the BottomNavigation.|
|tabsPosition  |	"top", "bottom"  |	Gets or sets the position state of the Tabs. Default value: top|
|iOSTabBarItemsAlignment  |	"leading", "justified", "center", "centerSelected" 	 |iOS Only: Gets or set the MDCTabBarAlignment of the tab bar icons in iOS. Default value: justified|

## Events

|Name |	Description|
| ------------- |:-------------:| -----:|
|selectedIndexChanged |	Emitted when the selectedIndex property is changed.
|loaded |	Emitted when the view is loaded.
|unloaded |	Emitted when the view is unloaded.
|layoutChanged |	Emitted when the layout bounds of a view changes due to layout processing.
