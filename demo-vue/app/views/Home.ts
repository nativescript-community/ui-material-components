import { getExamples } from '../examples';

export default {
    name: 'Home',
    template: `
    <Page>
      <ActionBar title="Material Vue">
      </ActionBar>
      <ListView ref="listView"
          rowHeight="50"
          for="example in examples"
          separatorColor="transparent"
          @itemTap="goToExample">
        <v-template>
          <StackLayout class="item" orientation="horizontal">
            <Label :text="example.title" class="title" verticalAlignment="center"/>
          </StackLayout>
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
