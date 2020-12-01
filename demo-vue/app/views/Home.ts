import { getExamples } from '../examples';

export default {
    name: 'Home',
    template: `
    <Page>
      <ActionBar title="Material Vue">
      </ActionBar>
      <StackLayout>
      <Label paddingLeft="10" heigth="100" text="This is a text"  verticalAlignment="center"/>
      <ListView ref="listView" rowHeight="60" for="example in examples">
        <v-template>
          <GridLayout rippleColor="red" @tap="{goToExample(example)}"  @longPress="{goToModalExample(example)}" >
            <Label paddingLeft="10" :text="example.title"  verticalAlignment="center" isUserInteractionEnabled="false"/>
          </GridLayout>
        </v-template>
      </ListView>
      </StackLayout>
      
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
            try {
                this.$navigateTo(item.component);
            } catch(err) {
                console.error(err);
            }
        },
        goToModalExample(item) {
            console.log('goToModalExample');
            this.$showModal(item.component, { });
        }
    }
};
