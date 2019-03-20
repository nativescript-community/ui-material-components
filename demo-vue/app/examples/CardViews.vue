<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout class="bg-green">
            <ScrollView>
                <MDCardView margin="20" width="200" height="100" rippleColor="blue">
                    <Label text="Hello world" class="title"></Label>
                </MDCardView>
            </ScrollView>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from 'tns-core-modules/ui/frame';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class CardViews extends Vue {
    title: 'CardViews sample';

    onNavigationButtonTap() {
        frameModule.topmost().goBack();
    }
}
</script>
