import * as frameModule from 'tns-core-modules/ui/frame';

const description = 'CardViews sample';

export default {
    name: 'CardViews',
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
          <MDCardView margin="20" width="200" height="100" rippleColor="blue">
            <Label text="Hello world" class="title"></Label>
          </MDCardView>
        </ScrollView>
      </StackLayout>
    </Page>
    `,
    data() {
        return {
            title: description
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.topmost().goBack();
        }
    }
};
