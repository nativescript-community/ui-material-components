<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
        </ActionBar>

        <GridLayout rows="*, 0" backgroundColor="red">
            <MDBottomNavigation selectedIndex="1" :iosCustomPositioning="false" backgroundColor="blue">
                <!-- The bottom tab UI is created via MDTabStrip (the containier) and MDTabStripItem (for each tab)-->
                <MDTabStrip>
                    <MDTabStripItem>
                        <Label text="First" />
                        <Image src="font://mdi-home" class="mdi" />
                    </MDTabStripItem>
                    <MDTabStripItem class="special">
                        <Label text="Second" />
                        <Image src="font://mdi-account" class="mdi" />
                    </MDTabStripItem>
                    <MDTabStripItem class="special">
                        <Label text="Third" />
                        <Image src="font://mdi-magnify" class="mdi" />
                    </MDTabStripItem>
                    <MDTabStripItem class="special">
                        <Label text="Fourth" />
                        <Image src="font://mdi-magnify" class="mdi" />
                    </MDTabStripItem>
                </MDTabStrip>

                <!-- The number of MDTabContentItem components should corespond to the number of MDTabStripItem components -->
                <MDTabContentItem>
                    <Frame id="test" backgroundColor="transparent" @loaded="onLoaded('first')" @unloaded="onUnloaded('first')"  @selected="onSelected('first')" @unselected="onUnselected('first')">
                        <Page backgroundColor="transparent">
                            <GridLayout backgroundColor="transparent">
                                <Label text="First Page" class="h2 text-center" @tap="navigateToTabsSample"></Label>
                                <Button text="show alert" @tap="showTestAlert" verticalAlignment="center"></Button>
                            </GridLayout>
                        </Page>
                    </Frame>
                </MDTabContentItem>
                <MDTabContentItem>
                    <GridLayout backgroundColor="transparent" @loaded="onLoaded('second')" @unloaded="onUnloaded('second')" @selected="onSelected('second')" @unselected="onUnselected('second')">
                        <Label text="Second Page" class="h2 text-center"></Label>
                    </GridLayout>
                </MDTabContentItem>
                <MDTabContentItem>
                    <GridLayout backgroundColor="yellow" @loaded="onLoaded('third')" @unloaded="onUnloaded('third')" @selected="onSelected('third')" @unselected="onUnselected('third')">
                        <Label text="Third Page" class="h2 text-center"></Label>
                    </GridLayout>
                </MDTabContentItem>
                <MDTabContentItem>
                    <Frame id="test2" @loaded="onLoaded('fourth')" @unloaded="onUnloaded('fourth')" @selected="onSelected('fourth')" @unselected="onUnselected('fourth')">
                        <Page>
                            <GridLayout backgroundColor="transparent">
                                <Label text="Fourth Page" class="h2 text-center" @tap="navigateToTabsSample"></Label>
                                <Button text="show alert" @tap="showTestAlert" verticalAlignment="center"></Button>
                            </GridLayout>
                        </Page>
                    </Frame>
                </MDTabContentItem>
            </MDBottomNavigation>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import { EventData } from '@nativescript/core';
import Tabs from './Tabs.vue';

import Vue from 'vue';

export const title = 'BottomNavigation sample';

export default Vue.extend({
    name: 'BottomNavigation',
    data() {
        return {
            title
        };
    },
    methods: {
        onNavigationButtonTap() {
            this.$navigateBack();
        },
        onLoaded(name) {
            console.log('BN onTabLoaded', name);
        },
        onUnloaded(name) {
            console.log('BN onTabUnloaded', name);
        },
        onSelected(name) {
            console.log('BN onSelected', name);
        },
        onUnselected(name) {
            console.log('BN onUnselected', name);
        },
        navigateToTabsSample() {
            this.$navigateTo(Tabs);
        },
        showTestAlert() {
            alert('test');
        }
    }
});
</script>
