<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
<ActionItem>
            <Label  :fontSize="13">
                        <Span  text="mdi-account" class="mdi" fontSize="50"/>
                        <Span  :text="'\n' + 'Text'" />
                    </Label>
</ActionItem>
        </ActionBar>
        <MDTabs>
            <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
            <MDTabStrip>
                <MDTabStripItem>
                    <Label  :fontSize="13" class="mdi">
                        <Span  :text="'mdi-account' +  '\n'" class="mdi" style="font-size:50;"/>
                        <Span  text="Text" style="font-size:10;"/>
                    </Label>
                    <!-- <Image src="font://mdi-home" class="mdi" /> -->
                </MDTabStripItem>
                <MDTabStripItem class="special">
                    <Label text="Account" />
                    <Image src="font://mdi-account" class="mdi" />
                </MDTabStripItem>
                <MDTabStripItem class="special">
                    <Label text="Search" />
                    <Image src="font://mdi-magnify" class="mdi" />
                </MDTabStripItem>
            </MDTabStrip>

            <MDTabContentItem>
                <GridLayout>
                    <DockLayout width="100%" height="100%">
                        <Label  :fontSize="13">
                        <Span  text="mdi-account" class="mdi" fontSize="50"/>
                        <Span  :text="'\n' + 'Text'" />
                    </Label>
                        <MDButton dock="top" text="test" />
                        <MDButton dock="left" text="test1" />
                        <MDButton dock="bottom" text="test2" />
                        <MDButton class="btn" dock="right" text="test3" />
                    </DockLayout>
                    <MDSpeedDial text="mdi-one-up" buttonClass="mdi">
                        <MDSpeedDialItem icon="res://ic_action_add" title="test1" backgroundColor="red" @tap="onTap" />
                        <MDSpeedDialItem text="mdi-card-account-mail" title="test2" buttonClass="mdi" backgroundColor="green" @tap="onTap" />
                        <MDSpeedDialItem backgroundImage="~/images/iu.jpg" backgroundColor="blue" @tap="onTap" />
                        <MDSpeedDialItem icon="res://ic_action_add" title="test4" backgroundColor="orange" @tap="onTap" />
                    </MDSpeedDial>
                </GridLayout>
            </MDTabContentItem>
            <MDTabContentItem>
                <GridLayout backgroundColor="green">
                    <Label text="Account Page" class="h2 text-center"></Label>
                </GridLayout>
            </MDTabContentItem>
            <MDTabContentItem>
                <GridLayout backgroundColor="yellow">
                    <Label text="Search Page" class="h2 text-center"></Label>
                </GridLayout>
            </MDTabContentItem>
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
        }
    }
});
</script>

<style lang="css">
MDSpeedDialButton,
MDSpeedDialItemButton {
    font-family: 'materialdesignicons-webfont', 'Material Design Icons';
    color: white;
}
MDSpeedDialButton {
    background-color: yellow;
}
MDSpeedDialItemTitle {
    background-color: #444;
    vertical-text-alignment: middle;
    border-radius: 6;
    font-size: 11;
    color: white;
    padding: 6;
}
</style>
