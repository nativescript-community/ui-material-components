<template>
  <Page>
      <ActionBar :title="title">
        <NavigationButton text="Back"
                          android.systemIcon="ic_menu_back"
                          @tap="onNavigationButtonTap"></NavigationButton>
      </ActionBar>
      <StackLayout>
        <Label text="Default slider with dynamic value" padding="10" />
        <MDSlider elevation="3" 
                  minValue="0" maxValue="100"
                  :value="slider" @valueChange="onValueChanged"/>
        <Label text="Green slider without hollow at 0" padding="10" />
        <MDSlider thumbHollowAtStart="false" color="#6200EE"
                  minValue="0" maxValue="100"
                  :value="slider" @valueChange="onValueChanged" />
        <Label text="Disabled slider" padding="10" />
        <MDSlider isEnabled="false"
                  minValue="0" maxValue="100"
                  :value="slider" @valueChange="onValueChanged" />
        <MDSlider
                  minValue="5" maxValue="200"
                  rippleColor="red"
                  backgroundColor="black"
                  :value="slider" @valueChange="onValueChanged" />
        <MDSlider
                  minValue="0" maxValue="100"
                  color="red"
                  thumbColor="blue"
                  :value="slider" @valueChange="onValueChanged" />
      </StackLayout>
  </Page>
</template>

<script lang="ts" setup>
import * as frameModule from '@nativescript/core/ui/frame';
import {ref} from "nativescript-vue";

const name = 'Sliders';
const title = 'Sliders sample';
const slider = ref(50)
const onValueChanged = ({ value }) => {
  slider.value = value;
}
const onNavigationButtonTap = () => {
  frameModule.Frame.topmost().goBack();
}
</script>
