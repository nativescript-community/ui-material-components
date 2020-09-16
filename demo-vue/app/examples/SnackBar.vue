<template>
    <Page id="pag" >
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
        </ActionBar>
        <GridLayout rows="*, auto" id="outerView" ref="outerView">
            <!-- <Frame actionBarHidden="true"> -->
                <!-- <Page actionBarHidden="true" backgroundColor="blue" id="innerPage" > -->
                    <StackLayout id="innerView" ref="innerView">
                        <MDButton id="show_snack" text="show snack" @tap="onTap" />
                        <MDButton id="show_snack_action" text="show snack action" @tap="onTap" />
                        <MDButton id="show_snack_action_color" text="show snack action color" @tap="onTap" />
                    </StackLayout>
                <!-- </Page> -->
            <!-- </Frame> -->
            <MDBottomNavigationBar row="1" activeColor="red">
                <MDBottomNavigationTab title="First" icon="res://ic_home" activeColor="green" />
                <MDBottomNavigationTab title="Second" icon="res://ic_view_list" isSelectable="false" />
                <MDBottomNavigationTab title="Third" icon="res://ic_menu" inactiveColor="brown" />
            </MDBottomNavigationBar>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';
import { EventData, View } from '@nativescript/core';
import { alert, AlertDialog, login, prompt } from '@nativescript-community/ui-material-dialogs';
import { StackLayout } from '@nativescript/core';
import { ActivityIndicator } from '@nativescript/core';
import { Label } from '@nativescript/core';
import { SnackBar, showSnack } from '@nativescript-community/ui-material-snackbar';

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
            frameModule.Frame.topmost().goBack();
        },
        onTap(args: EventData) {
            const obj = args.object as View;
            const objId = obj.id;
            console.log('onTap', objId, obj);
            switch (objId) {
                case 'show_snack': {
                    showSnack({ message: 'this is test snack!', textColor: 'yellow', view: this.$refs.innerView.nativeView });
                    break;
                }
                case 'show_snack_action': {
                    const test = new SnackBar();
                    test.showSnack({ message: 'this is test snack with action!', actionText: 'done' }).then(r=>{
                        console.log('showSnack result', r);

                    });
                    test.dismiss();
                    break;
                }
                case 'show_snack_action_color': {
                    showSnack({ message: 'this is test snack with action colored!', actionText: 'delete', actionTextColor: 'red', view: this.$refs.outerView.nativeView }).then(r => {
                        console.log('showSnack result', r);
                    });
                    break;
                }
            }
        }
    }
});
</script>
