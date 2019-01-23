import * as frameModule from 'tns-core-modules/ui/frame';

const description = 'Buttons sample';

export default {
    name: 'Buttons',
    description: description,
    template: `
    <Page>
      <ActionBar :title="title">
        <NavigationButton text="Back"
                          android.systemIcon="ic_menu_back"
                          @tap="onNavigationButtonTap"></NavigationButton>
      </ActionBar>
      <StackLayout>
        <MDFloatingActionButton id="fab" src="res://ic_action_add" backgroundColor="blue" @tap="onTap"/>
        <MDButton id="button1" elevation="5" borderRadius="10" fontSize="20" text="raised button" @tap="onTap"/>
        <MDButton id="button2" class="bg-red" borderRadius="10" color="red" text="text button" variant="text" @tap="onTap">
          <FormattedString>
            <Span text="Words " color="#00ff00"></Span>
            <Span text="with " color="#ff0000" fontAttributes="Bold"></Span>
          </FormattedString>
        </MDButton>
        <MDButton id="button3" text="flat button \n test" variant="flat" class="bg-blue" @tap="onTap"/>
        <MDButton id="button4" text="flat disabled button" isEnabled="false" backgroundColor="yellow" @tap="onTap"/>
        <MDButton id="button5" text="outline button" color="black" width="200" variant="outline" @tap="onTap"/>
        <MDButton id="button6" text="disabled outline button" isEnabled="false" width="200" variant="outline" @tap="onTap"/>
        <MDButton id="button7" text="text button" width="200" color="blue" variant="text" @tap="onTap"/>
        <MDButton id="button8" text="disabled text button" isEnabled="false" width="200" variant="text" @tap="onTap"/>
        <MDButton id="button9" class="falseFAb bg-green" text="+" color="white" verticalAlign="center" backgroundColor="#53ba82" @tap="onTap"/>
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
        },
        onTap() {
            console.log('Button tapped');
        }
    }
};
