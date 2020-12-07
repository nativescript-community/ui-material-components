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
                <GridLayout backgroundColor="red">
                    <Label text="Home Page" class="h2 text-center"></Label>
                </GridLayout>
            </TabContentItem>
            <TabContentItem>
                <GridLayout backgroundColor="green">
                    <Label text="Account Page" class="h2 text-center"></Label>
                </GridLayout>
            </TabContentItem>
            <TabContentItem>
                <GridLayout backgroundColor="yellow">
                    <Label text="Search Page" class="h2 text-center"></Label>
                </GridLayout>
            </TabContentItem>
        </MDTabs>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import { Tabs } from '@nativescript-community/ui-material-tabs';
import { EventData } from '@nativescript/core';

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

MDTabs {
  /* color: gold; */
}

TabContentItem.special {
  color: green;
}

TabStrip {
  color: skyblue;
}

TabStripItem.special {
  color: teal;
}

TabStripItem.special:active {
  color: yellowgreen;
}

TabStripItem.nested Label {
  color: teal;
}

TabStripItem.nested:active Label {
  color: yellowgreen;
}

</style>
