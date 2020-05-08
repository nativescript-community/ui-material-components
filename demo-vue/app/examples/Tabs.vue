<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
        </ActionBar>
        <MDTabs selectedIndex="1">
            <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
            <TabStrip>
                <TabStripItem>
                    <Label text="Home"/>
                    <Image src="font://mdi-home" class="mdi"/>
                </TabStripItem>
                <TabStripItem class="special">
                    <Label text="Account"/>
                    <Image src="font://mdi-account" class="mdi"/>
                </TabStripItem>
                <TabStripItem class="special">
                    <Label text="Search"/>
                    <Image src="font://mdi-magnify" class="mdi"/>
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
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import { Tabs } from 'nativescript-material-tabs';
import { EventData } from '@nativescript/core/ui/core/view';

import Vue from 'vue';

export const title = 'Tabs sample';

export default Vue.extend({
    name: 'Tabs',
    data() {
        return {
            title: title
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.Frame.topmost().goBack();
        }
    }
});
</script>

<style>
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
</style>
