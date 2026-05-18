<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
        </ActionBar>
        <GridLayout class="page" backgroundColor="white" rows="*, auto">
            <MDSegmentedBar ref="bottomBar" row="0" activeColor="blue" inactiveColor="green" selectedTabIndex="2" class="mdi">
                <MDSegmentedBarItem title="First" class="mdi" variant="outline"/>
                <MDSegmentedBarItem title="Second" class="mdi" />
                <MDSegmentedBarItem title="Third" />
            </MDSegmentedBar>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';

import Vue from 'vue';

export const title = 'BottomNavigationBar sample';

export default Vue.extend({
    name: 'SegmentedBar',
    data() {
        return {
            title,
            currentTab: 0
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.Frame.topmost().goBack();
        }
    }
});
</script>
