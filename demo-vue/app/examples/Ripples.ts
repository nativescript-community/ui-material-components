import * as frameModule from 'tns-core-modules/ui/frame';

const description = 'Ripples sample';

export default {
  name: 'Ripples',
  description: description,
  template: `
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back"
                        android.systemIcon="ic_menu_back"
                        @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <StackLayout>
      <MDRipple backgroundColor="gray" rippleColor="green" width="100" height="100"/>
    </StackLayout>
  </Page>
  `,
  data () {
    return {
      title: description,
    };
  },
  methods: {
    onNavigationButtonTap() {
      frameModule.topmost().goBack();
    },
  },
};
