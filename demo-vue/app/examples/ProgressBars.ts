import * as frameModule from 'tns-core-modules/ui/frame';

const description = 'Progress bars sample';

export default {
    name: 'ProgressBars',
    description: description,
    template: `
    <Page>
      <ActionBar :title="title">
        <NavigationButton text="Back"
                          android.systemIcon="ic_menu_back"
                          @tap="onNavigationButtonTap"></NavigationButton>
      </ActionBar>
      <StackLayout>
        <MDProgress value="value" maxValue="100"></MDProgress>
      </StackLayout>
    </Page>
    `,
    data() {
        return {
            title: description,
            value: 50
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.topmost().goBack();
        }
    },
    created() {
        this.interval = setInterval(() => {
            const newValue = (this.value + 1) % 100;
            this.value = newValue;
        }, 100);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
};
