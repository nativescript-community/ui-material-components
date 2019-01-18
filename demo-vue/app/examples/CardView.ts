import * as frameModule from 'tns-core-modules/ui/frame';

const description = 'CardView sample';

export default {
  name: 'CardView',
  description: description,
  template: `
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back"
                        android.systemIcon="ic_menu_back"
                        @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <StackLayout class="bg-green">
      <ScrollView>
        <MDCardView margin="20" width="200" height="100">
          <Label text="Hello world" class="title"></Label>
        </MDCardView>
      </ScrollView>
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
