<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
        </ActionBar>
        
        <MDTabs ref="tabs" unloadOnTabChange="false">
            <!-- The bottom tab UI is created via MDTabStrip (the containier) and MDTabStripItem (for each tab)-->
            <MDTabStrip>
                <MDTabStripItem>
                    <Label text="Home"/>
                    <Image src="font://mdi-home" class="mdi"/>
                </MDTabStripItem>
                <MDTabStripItem class="special">
                    <Label text="Account"/>
                    <Image src="font://mdi-account" class="mdi"/>
                </MDTabStripItem>
                <MDTabStripItem class="special">
                    <Label text="Search"/>
                    <Image src="font://mdi-magnify" class="mdi"/>
                </MDTabStripItem>
            </MDTabStrip>

            <!-- The number of MDTabContentItem components should corespond to the number of MDTabStripItem components -->
            <MDTabContentItem>
                <GridLayout backgroundColor="red" @loaded="onLoaded('red')">
                    <Label text="Home Page" class="h2 text-center"></Label>
                </GridLayout>
            </MDTabContentItem>
            <MDTabContentItem>
                <GridLayout backgroundColor="green" @loaded="onLoaded('green')">
                    <Label text="Account Page" class="h2 text-center" @tap="addPage"></Label>
                </GridLayout>
            </MDTabContentItem>
            
        </MDTabs>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import { TabContentItem, Tabs } from '@nativescript-community/ui-material-tabs';
import { Color, EventData, GridLayout, Label, StackLayout } from '@nativescript/core';

import Vue from 'vue';

export const title = 'Tabs sample';

export default Vue.extend({
    name: 'Tabs',
    data() {
        return {
            title: title,
            addThirdItem:false
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.Frame.topmost().goBack();
        },

        onLoaded(name) {
            console.log('onTabLoaded', name)
        },
         createContent(index: number) {
    const label = new Label();
    label.text = `${index === 0 ? "Home" : (index === 1 ? "Account" : "Search")}`;
    label.className = "h2 text-center";
    const stack = new GridLayout();
    stack.backgroundColor ="yellow";
    stack.addChild(label);

    return stack;
},
        addPage() {
            console.log('addPage')
            this.addThirdItem = true;

            const items = this.$refs.tabs.nativeView.items.slice(0);
             const item: TabContentItem = new TabContentItem();
        // The createContent is a custom method that returns a StackLayout with a Label as a chils
            item.content = this.createContent(index);
        items.push(item);
           this.$refs.tabs.nativeView.items = items.slice(0)
        }
    }
});
</script>

<style>

MDTabs {
  /* color: gold; */
}

MDTabContentItem.special {
  color: green;
}

MDTabStrip {
  color: skyblue;
    selected-item-color: white;
    un-selected-item-color: blue;
    highlight-color: yellow;
    background-color: green;
}

MDTabStripItem.special {
  color: teal;
}

MDTabStripItem.nested {
  color: teal;
}

MDTabStripItem:highlighted {
    background-color: red;
  color: purple;
}

</style>
