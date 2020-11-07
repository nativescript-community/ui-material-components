<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
        </ActionBar>
        <MDTabs>
            <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
            <TabStrip>
                <TabStripItem>
                    <Label text="Home" />
                    <Image src="font://mdi-home" class="mdi" />
                </TabStripItem>
                <TabStripItem class="special">
                    <Label text="Account" />
                    <Image src="font://mdi-account" class="mdi" />
                </TabStripItem>
                <TabStripItem class="special">
                    <Label text="Search" />
                    <Image src="font://mdi-magnify" class="mdi" />
                </TabStripItem>
            </TabStrip>

            <TabContentItem>
                <GridLayout>
                    <DockLayout width="100%" height="100%">
                        <MDButton dock="top" text="test" />
                        <MDButton dock="left" text="test1" />
                        <MDButton dock="bottom" text="test2" />
                        <MDButton class="btn" dock="right" text="test3" />
                    </DockLayout>
                    <MDSpeedDial buttonFontSize="26" text="mdi-one-up"  buttonClass="mdi" buttonBackgroundColor="yellow">
                        <MDSpeedDialItem icon="res://ic_action_add" title="test1" backgroundColor="red"  @tap="onTap"/>
                        <MDSpeedDialItem text="mdi-card-account-mail" title="test2" buttonClass="mdi" backgroundColor="green"  @tap="onTap"/>
                        <MDSpeedDialItem backgroundImage="~/images/iu.jpg"  backgroundColor="blue"  @tap="onTap"/>
                        <MDSpeedDialItem icon="res://ic_action_add" title="test4" backgroundColor="orange" @tap="onTap"/>
                    </MDSpeedDial>
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
import { Frame } from '@nativescript/core';
import { EventData } from '@nativescript/core';

import Vue from 'vue';

export const title = 'SpeedDial sample';

export default Vue.extend({
    name: 'SpeedDial',
    data() {
        return {
            title
        };
    },
    methods: {
        onNavigationButtonTap() {
            Frame.topmost().goBack();
        },
        onTap(event) {
            console.log('Button tapped', event.object, Date.now());
        },
    }
});
</script>

<style></style>
