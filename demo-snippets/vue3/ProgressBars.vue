<template>
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back"
                        android.systemIcon="ic_menu_back"
                        @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <StackLayout>
      <MDProgress :value="value" maxValue="100" color="red" padding="0"></MDProgress>
      <MDProgress busy indeterminate="true" height="10" padding="0"/>
      <AbsoluteLayout height="10" width="100%" backgroundColor="green"/>
      <MDProgress value="50" maxValue="100"></MDProgress>
    </StackLayout>
  </Page>
</template>

<script lang="ts" setup>
import * as frameModule from '@nativescript/core/ui/frame';
import {onMounted, onUnmounted, ref} from "nativescript-vue";

const title = 'Progress bars sample';
let interval = null;
const value = ref(50);

onMounted(() => {
  interval = setInterval(() => {
    const newValue = (value.value + 1) % 100;
    value.value = newValue;
  }, 100);
})

onUnmounted(() => {
  clearInterval(interval);
})
const onNavigationButtonTap = () => {
  frameModule.Frame.topmost().goBack();
}

</script>
