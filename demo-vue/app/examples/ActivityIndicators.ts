import * as frameModule from 'tns-core-modules/ui/frame';

const description = 'Activity indicators sample';

export default {
    name: 'ActivityIndicators',
    description: description,
    template: `
    <Page>
      <ActionBar :title="title">
        <NavigationButton text="Back"
                          android.systemIcon="ic_menu_back"
                          @tap="onNavigationButtonTap"></NavigationButton>
      </ActionBar>
      <StackLayout>
        <MDActivityIndicator busy="true" class="loading" />
        <MDActivityIndicator color="red" :busy="isBusy" class="loading" />
        <MDActivityIndicator color="green" :busy="isBusy" class="loading" />
        <MDActivityIndicator color="orange" :busy="isBusy" class="loading"/>
        <MDActivityIndicator :busy="isBusy" class="loading"/>
      </StackLayout>
    </Page>
    `,
    data() {
        return {
            title: description,
            isBusy: true
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.topmost().goBack();
        }
    },
    created() {
        this.interval = setInterval(() => {
            this.isBusy = !this.isBusy;
        }, 2000);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
};
