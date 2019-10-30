<template>
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back"
                        android.systemIcon="ic_menu_back"
                        @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <StackLayout>
      <MDProgress :value="value" maxValue="100"></MDProgress>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue'

export const title = 'Progress bars sample';

export default Vue.extend({
    name: 'ProgressBars',

    data() {
        return {
            title: title,
            value: 50
        };
    },

    methods: {
        onNavigationButtonTap() {
            frameModule.topmost().goBack();
        }
    },

    created() {
        this.interval = setInterval(() => {
            const newValue = (this.value + 1) % 100;
            this.value = newValue;
        }, 100);
    },

    beforeDestroy() {
        clearInterval(this.interval);
    },
})
</script>
