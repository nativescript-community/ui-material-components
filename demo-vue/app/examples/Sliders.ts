import * as frameModule from 'tns-core-modules/ui/frame';

const description = 'Sliders sample';

export default {
  name: 'Sliders',
  description: description,
  template: `
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back"
                        android.systemIcon="ic_menu_back"
                        @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <StackLayout>
      <Label text="Default slider with dynamic value" padding="10" />
      <MDSlider elevation="3" rippleColor="blue"
                minValue="0" maxValue="100"
                v-model="value" @valueChange="onValueChanged" />
      <Label text="Green slider without hollow at 0" padding="10" />
      <MDSlider thumbHollowAtStart="false" color="green"
                minValue="0" maxValue="100"
                v-model="value" />
      <Label text="Disabled slider" padding="10" />
      <MDSlider isEnabled="false"
                minValue="0" maxValue="100"
                v-model="value" />
    </StackLayout>
  </Page>
  `,
  data () {
    return {
      title: description,
      value: 50,
    };
  },
  methods: {
    onNavigationButtonTap() {
      frameModule.topmost().goBack();
    },
    onValueChanged({ value }) {
      console.log(`Value changed to ${value}`);
    },
  },
};
