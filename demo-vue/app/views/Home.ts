import { getExamples } from '../examples';

export default {
    name: 'Home',
    template: `
    <Page>
      <ActionBar title="Material Vue">
      </ActionBar>
      <ListView ref="listView" separatorColor="blue" for="example in examples" @itemTap="goToExample">
        <v-template>
        <MDRipple rippleColor="red">
          <StackLayout class="item" orientation="horizontal" height="40">
            <Label paddingLeft="10" :text="example.title" class="title" verticalAlignment="center"/>
          </StackLayout>
          </MDRipple>
          </v-template>
      </ListView>
    </Page>
    `,
    data() {
        return {
            examples: getExamples()
        };
    },
    methods: {
        goToExample({ item }) {
            this.$navigateTo(item.component);
        }
    }
};
