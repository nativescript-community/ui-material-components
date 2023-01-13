<template>
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back"
                        android.systemIcon="ic_menu_back"
                        @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <StackLayout>
      <MDActivityIndicator busy class="loading"/>
      <MDActivityIndicator color="red" :busy="isBusy" class="loading"/>
      <MDActivityIndicator color="green" busy class="loading"/>
      <MDActivityIndicator color="orange" busy class="loading" width="100" height="100"/>
      <MDActivityIndicator class="loading" backgroundColor="yellow" busy/>
      <MDActivityIndicator color="brown" :indeterminate="false" value="50" maxValue="100" class="loading" busy
                           horizontalAlignment="center"/>
    </StackLayout>
  </Page>
</template>

<script lang="ts" setup>
import {Frame} from '@nativescript/core/ui/frame';
import {ref, onMounted, onUnmounted} from "nativescript-vue";

const title = 'Activity indicators sample';
let interval = null;
const isBusy = ref(false);

onMounted(() => {
  interval = setInterval(() => {
    isBusy.value = isBusy.value;
  }, 2000);
})

onUnmounted(() => {
  clearInterval(interval);
})
const onNavigationButtonTap = () => {
  Frame.topmost().goBack();
}



</script>
<style lang="css">
</style>