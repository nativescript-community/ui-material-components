<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <ScrollView>

            <StackLayout>
                <MDButton elevation="5" text="Test me1" backgroundColor="white" />
                <StackLayout>
                    <StackLayout>
                        <StackLayout>
                            <StackLayout>
                                <StackLayout>
                                    <StackLayout>
                                        <StackLayout>
                                                                    <MDButton elevation="5" text="Test me2"  backgroundColor="white"/>
                                            <StackLayout>
                                                <StackLayout>
                                                    <StackLayout>
                                                        <StackLayout>
                                                            <StackLayout>
                                                                <StackLayout>
                                                                    <StackLayout>
                                                <StackLayout>
                                                    <StackLayout>
                                                        <StackLayout>
                                                            <StackLayout>
                                                                <StackLayout>
                                                                    <MDButton elevation="5" text="Test me3"  backgroundColor="white"/>
                                                                    </StackLayout>
                                                            </StackLayout>
                                                        </StackLayout>
                                                    </StackLayout>
                                                </StackLayout>
                                            </StackLayout>
                                                                </StackLayout>
                                                            </StackLayout>
                                                        </StackLayout>
                                                    </StackLayout>
                                                </StackLayout>
                                            </StackLayout>
                                        </StackLayout>
                                    </StackLayout>
                                </StackLayout>
                            </StackLayout>
                        </StackLayout>
                    </StackLayout>
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script lang="ts">
import * as frameModule from 'tns-core-modules/ui/frame';
import Vue from 'vue';

export const title = 'Buttons sample';

export default Vue.extend({
    data() {
        return {
            name: 'Button Issue',
            title: title
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
});
</script>