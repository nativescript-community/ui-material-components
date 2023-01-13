<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout>
            <MDRipple backgroundColor="gray" rippleColor="green" width="100" height="100" borderRadius="10" />
            <MDRipple width="100" height="100" borderRadius="10" />
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';

export const title = 'Ripples sample';

export default Vue.extend({
    name: 'Ripples',

    data() {
        return {
            title
        };
    },

    methods: {
        onNavigationButtonTap() {
            frameModule.Frame.topmost().goBack();
        }
    }
});
</script>
