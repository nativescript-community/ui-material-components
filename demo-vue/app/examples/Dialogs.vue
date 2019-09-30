<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout>
            <MDButton id="alert" text="alert" @tap="onTap" />
            <MDButton id="prompt" text="prompt" @tap="onTap" />
            <MDButton id="login" text="login" @tap="onTap" />
            <MDButton id="dialogCustomView" text="customView" @tap="onTap" />
            <MDButton id="alertdialog" text="alertdialog" @tap="onTap" />
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from 'tns-core-modules/ui/frame';
import Vue from 'vue';
import { EventData, View, Color } from 'tns-core-modules/ui/frame';
import { alert, AlertDialog, login, prompt } from 'nativescript-material-dialogs';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { ActivityIndicator } from 'tns-core-modules/ui/activity-indicator/activity-indicator';
import { Label } from 'tns-core-modules/ui/label/label';

export const title = 'Dialogs sample';

export default Vue.extend({
    data() {
        return {
            name: 'Dialogs',
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
                case 'alert': {
                    alert('this is test Alert!').then(result => console.log('alert result', result));;
                    break;
                }
                case 'dialogCustomView': {
                    const label = new Label();
                    label.style.padding = 20;
                    label.style.backgroundColor = new Color(255, 255,0,0);
                    label.style.fontSize = 11;
                    label.style.whiteSpace = 'normal';
                    label.text = 'Un problème technique est survenu. Notre service technique en a été informé et traitera le problème dans les plus brefs délais.';

                    alert({
                        okButtonText: 'OK',
                        // title: 'custom dialog view',
                        context: {
                            dataItems: this.dataItems
                        },
                        view: label
                    }).then(result => {
                        alert(`closed  dialog with customview and result: ${result}`);
                    });
                    break;
                }
                case 'prompt': {
                    console.log('about to prompt');
                    prompt({
                        // message: 'this is test Prompt!',
                        okButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        title: null,
                        textFieldProperties: {
                            marginLeft: 20,
                            marginRight: 50,
                            hint: 'test hint text'
                        },
                        autoFocus: true
                    }).then(result => console.log('prompt result', result));
                    break;
                }
                case 'login': {
                    console.log('about to login');
                    login({
                        message: 'this is test Prompt!',
                        okButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        title: 'title?',
                        userName: 'my username?',
                        password: 'my password?'
                    }).then(result => console.log('login result', result));
                    break;
                }

                case 'alertdialog':
                    const stack = new StackLayout();
                    stack.orientation = 'horizontal';
                    stack.verticalAlignment = 'middle';
                    // stack.height = {value:100, unit:'dip'};
                    stack.padding = 24;
                    // stack.margin = 30;
                    stack.backgroundColor = 'red';
                    const activityIndicator = new ActivityIndicator();
                    activityIndicator.className = 'activity-indicator';
                    activityIndicator.backgroundColor = 'yellow';
                    activityIndicator.busy = true;
                    activityIndicator.verticalAlignment = 'middle';
                    stack.addChild(activityIndicator);
                    const label = new Label();
                    label.verticalAlignment = 'middle';
                    label.backgroundColor = 'brown';
                    label.text = 'test';
                    stack.addChild(label);
                    const dialog = new AlertDialog({
                        // title: 'tsst',
                        // message: null,
                        view: stack
                    });
                    dialog.show();
            }
        }
    }
});
</script>