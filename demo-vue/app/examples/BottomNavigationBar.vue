<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"/>
        </ActionBar>
        <GridLayout rows="*, auto" backgroundColor="blue">
            <StackLayout class="page" backgroundColor="white" row="0">
                <GridLayout class="p-20" v-if="currentTab === 0"> -->
                    <Label class="h1 text-center" text="First tab" textWrap="true"></Label>
                </GridLayout> -->
                <GridLayout class="p-20" v-if="currentTab === 2">
                    <Label class="h1 text-center" text="Third tab" textWrap="true"></Label>
                </GridLayout>
            </StackLayout>
            <MDBottomNavigationBar
                row="1"
                activeColor="red" 
                @loaded="onbottomNavigationBarLoaded"
                @tabPressed="onBottomNavigationTabPressed"
                @tabSelected="onBottomNavigationTabSelected"
                @tabReselected="onBottomNavigationTabReselected"                
            >
                <MDBottomNavigationTab title="First" icon="res://ic_home" activeColor="green"/>
                <MDBottomNavigationTab title="Second" icon="res://ic_view_list" isSelectable="false" />
                <MDBottomNavigationTab title="Third" icon="res://ic_menu" inactiveColor="brown"/>
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
