<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
        </ActionBar>
        <GridLayout class="page" backgroundColor="white" rows="*, auto">
            <MDTabs row="0" :selectedIndex="currentTab" swipeEnabled="false">
            <MDTabContentItem>
                <GridLayout class="p-20" >
                    <Label class="h1 text-center" text="First tab" textWrap="true"></Label>
                    <Button text="select sthird" @tap="selectThird" horizontalAlignment="center" verticalAlignment="bottom" />
                </GridLayout>
            </MDTabContentItem>
            <MDTabContentItem>
                <GridLayout class="p-20">
                    <Label class="h1 text-center" text="Third tab" textWrap="true"></Label>
                </GridLayout>
            </MDTabContentItem>
            </MDTabs>
            <MDBottomNavigationBar
                ref="bottomBar"
                row="1"
                activeColor="blue"
                inactiveColor="green"
                selectedTabIndex="2"
                 class="mdi"
                @loaded="onbottomNavigationBarLoaded"
                @tabPressed="onBottomNavigationTabPressed"
                @tabSelected="onBottomNavigationTabSelected"
                @tabReselected="onBottomNavigationTabReselected"
            >
                <MDBottomNavigationTab title="First" activeColor="green" />
                <MDBottomNavigationTab title="Second" icon="font://mdi-account" isSelectable="false" class="mdi" />
                <MDBottomNavigationTab title="Third" icon="res://ic_menu" inactiveColor="brown" />
            </MDBottomNavigationBar>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import { BottomNavigationBar, TabPressedEventData, TabReselectedEventData, TabSelectedEventData } from '@nativescript-community/ui-material-bottomnavigationbar';
import { EventData } from '@nativescript/core';

import Vue from 'vue';

export const title = 'BottomNavigationBar sample';

export default Vue.extend({
    name: 'BottomNavigationBar',
    data() {
        return {
            title: title,
            currentTab: 0
        };
    },
    methods: {
        selectThird() {
            this.$refs.bottomBar.nativeView.selectTab(2);
        },
        onNavigationButtonTap() {
            frameModule.Frame.topmost().goBack();
        },
        onbottomNavigationBarLoaded(args: EventData): void {
            const bottomNavigationBar = args.object as BottomNavigationBar;
            bottomNavigationBar.showBadge(1);
            bottomNavigationBar.showBadge(2, 4);
        },

        onBottomNavigationTabPressed(args: TabPressedEventData): void {
            alert('This tab has isSelectable: false, and should be used to perform actions');
            console.log(`pressed tab index:  ${args.index}`);
        },

        onBottomNavigationTabSelected(args: TabSelectedEventData): void {
            console.log(`old tab index:  ${args.oldIndex}`);
            console.log(`selected tab index:  ${args.newIndex}`);
            this.currentTab = args.newIndex;
        },

        onBottomNavigationTabReselected(args: TabReselectedEventData): void {
            alert('Tab Reselected');
            console.log(`reselected tab index:  ${args.index}`);
        }
    }
});
</script>
