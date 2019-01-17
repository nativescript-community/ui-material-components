import * as frameModule from 'tns-core-modules/ui/frame';

const description = 'Getting Started';

export default {
  name: 'GettingStarted',
  description: description,
  template: `
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back"
                        android.systemIcon="ic_menu_back"
                        @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <StackLayout>
      <Label text="Hello world"></Label>
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
