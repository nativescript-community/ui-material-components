<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
        </ActionBar>
        
        <MDBottomNavigation selectedIndex="1" unloadOnTabChange="false">
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
                    <Label text="Account Page" class="h2 text-center"></Label>
                </GridLayout>
            </MDTabContentItem>
            <MDTabContentItem>
                <GridLayout backgroundColor="yellow" @loaded="onLoaded('yellow')">
                    <Label text="Search Page" class="h2 text-center"></Label>
                </GridLayout>
            </MDTabContentItem>
        </MDBottomNavigation>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import { Tabs } from '@nativescript-community/ui-material-tabs';
import { EventData } from '@nativescript/core';

import Vue from 'vue';

export const title = 'BottomNavigation sample';

export default Vue.extend({
    name: 'BottomNavigation',
    data() {
        return {
            title: title
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.Frame.topmost().goBack();
        },
        onLoaded(name) {
            console.log('onTabLoaded', name)
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
}

MDTabStripItem.special {
  color: teal;
}

MDTabStripItem.special:active {
  color: yellowgreen;
}

MDTabStripItem.nested Label {
  color: teal;
}

MDTabStripItem.nested:active Label {
  color: yellowgreen;
}

</style>
