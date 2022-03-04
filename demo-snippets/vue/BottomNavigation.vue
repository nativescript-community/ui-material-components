<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
        </ActionBar>

        <GridLayout rows="*, 0" backgroundColor="red">
            <MDBottomNavigation selectedIndex="1" :iosCustomPositioning="true">
                <!-- The bottom tab UI is created via MDTabStrip (the containier) and MDTabStripItem (for each tab)-->
                <MDTabStrip>
                    <MDTabStripItem>
                        <Label text="Home" />
                        <Image src="font://mdi-home" class="mdi" />
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

                <!-- The number of MDTabContentItem components should corespond to the number of MDTabStripItem components -->
                <MDTabContentItem>
                    <Frame id="test">
                        <Page>
                            <GridLayout backgroundColor="red" @loaded="onLoaded('red')" @tap="navigateToTabsSample">
                                <Label text="Home Page" class="h2 text-center"></Label>
                            </GridLayout>
                        </Page>
                    </Frame>
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
        navigateToTabsSample() {
            this.$navigateTo(Tabs);
        }
    }
});
</script>
