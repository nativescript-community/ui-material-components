import { getExamples } from '../examples';

export default {
    name: 'Home',
    template: `
    <Page>
      <ActionBar title="Material Vue">
      </ActionBar>
      <ListView ref="listView" rowHeight="50" for="example in examples">
        <v-template>
          <MDRipple rippleColor="red" @tap="{goToExample(example)}"  @longPress="{goToModalExample(example)}" >
            <Label paddingLeft="10" :text="example.title" class="title" verticalAlignment="center"/>
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
        goToExample(item) {
            console.log('goToExample');
            this.$navigateTo(item.component);
        },
        goToModalExample(item) {
            console.log('goToModalExample');
            this.$showModal(item.component, { });
        }
    }
};
