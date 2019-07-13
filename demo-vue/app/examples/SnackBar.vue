<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout>
            <MDButton id="show_snack" text="show snack" @tap="onTap" />
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from 'tns-core-modules/ui/frame';
import Vue from 'vue';
import { EventData, View } from 'tns-core-modules/ui/frame';
import { alert, AlertDialog, login, prompt } from 'nativescript-material-dialogs';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { ActivityIndicator } from 'tns-core-modules/ui/activity-indicator/activity-indicator';
import { Label } from 'tns-core-modules/ui/label/label';
import { showSnack } from 'nativescript-material-snackbar';

export const title = 'SnackBar sample';

export default Vue.extend({
    data() {
        return {
            name: 'SnackBar',
            title: title
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.topmost().goBack();
        },
        onTap(args: EventData) {
            const obj = args.object as View;
            const objId = obj.id;
            console.log('onTap', objId, obj);
            switch (objId) {
                case 'show_snack': {
                    showSnack({ message: 'this is test snack!' });
                    break;
                }
            }
        }
    }
});
</script>