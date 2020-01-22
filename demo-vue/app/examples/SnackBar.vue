<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout>
            <MDButton id="show_snack" text="show snack" @tap="onTap" />
            <MDButton id="show_snack_action" text="show snack action" @tap="onTap" />
            <MDButton id="show_snack_action_color" text="show snack action color" @tap="onTap" />
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';
import { EventData, View } from '@nativescript/core/ui/frame';
import { alert, AlertDialog, login, prompt } from 'nativescript-material-dialogs';
import { StackLayout } from '@nativescript/core/ui/layouts/stack-layout/stack-layout';
import { ActivityIndicator } from '@nativescript/core/ui/activity-indicator/activity-indicator';
import { Label } from '@nativescript/core/ui/label/label';
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
                    showSnack({ message: 'this is test snack!', textColor:'yellow', view:this.nativeView });
                    break;
                }
                case 'show_snack_action': {
                    showSnack({ message: 'this is test snack with action!', actionText:'done' });
                    break;
                }
                case 'show_snack_action_color': {
                    showSnack({ message: 'this is test snack with action colored!', actionText:'delete', actionTextColor:'red' });
                    break;
                }
            }
        }
    }
});
</script>