<template>
  <Page>
      <ActionBar :title="title">
        <NavigationButton text="Back"
                          android.systemIcon="ic_menu_back"
                          @tap="onNavigationButtonTap"></NavigationButton>
      </ActionBar>
      <StackLayout>
        <Label text="Default slider with dynamic value" padding="10" />
        <MDSlider elevation="3" thumbColor="yellow"
                  minValue="0" maxValue="100"
                  :value="value" @valueChange="onValueChanged"/>
        <Label text="Green slider without hollow at 0" padding="10" />
        <MDSlider thumbHollowAtStart="false" color="green"
                  minValue="0" maxValue="100"
                  :value="value" @valueChange="onValueChanged" />
        <Label text="Disabled slider" padding="10" />
        <MDSlider isEnabled="false"
                  minValue="0" maxValue="100"
                  :value="value" @valueChange="onValueChanged" />
        <MDSlider
                  minValue="0" maxValue="100"
                  rippleColor="red"
                  :value="value" @valueChange="onValueChanged" />
        <MDSlider
                  minValue="0" maxValue="100"
                  color="red"
                  thumbColor="blue"
                  :value="value" @valueChange="onValueChanged" />
      </StackLayout>
  </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';

export const title = 'Sliders sample';

export default Vue.extend({
    name: 'Sliders',
    data () {
        return {
            name: 'Sliders',
            title: title,
            value: 50,
        }
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.topmost().goBack();
        },

        onValueChanged({ value }) {
            this.value = value;
        },
    },
})
</script>
