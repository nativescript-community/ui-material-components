<template>
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back"
                        android.systemIcon="ic_menu_back"
                        @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <StackLayout>
      <MDActivityIndicator busy="true" class="loading" />
      <MDActivityIndicator color="red" :busy="isBusy" class="loading" />
      <MDActivityIndicator color="green" :busy="isBusy" class="loading" />
      <MDActivityIndicator color="orange" :busy="isBusy" class="loading"/>
      <MDActivityIndicator :busy="isBusy" class="loading"/>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import * as frameModule from 'tns-core-modules/ui/frame';
import Vue from 'vue'

export const title = 'Activity indicators sample';

export default Vue.extend({
    name: 'ActivityIndicators',
    data() {
        return {
            title: title,
            isBusy: true
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.topmost().goBack();
        }
    },
    created() {
        this.interval = setInterval(() => {
            this.isBusy = !this.isBusy;
        }, 2000);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
});
</script>