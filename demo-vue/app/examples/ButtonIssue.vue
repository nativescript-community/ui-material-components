<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <ScrollView>

            <StackLayout>
                <MDButton elevation="2" text="Test me1" backgroundColor="white" />
                <MDButton elevation="2" text="Test me2" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
                <MDButton elevation="2" text="Test me3" backgroundColor="white" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';

export const title = 'Buttons Elevation Top Bottom sample';

export default Vue.extend({
    data() {
        return {
            name: 'Buttons Elevation Top Bottom Issue',
            title: title
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.Frame.topmost().goBack();
        },
        onTap() {
            console.log('Button tapped');
        }
    }
});
</script>