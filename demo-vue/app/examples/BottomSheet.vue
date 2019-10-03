<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout>
            <MDButton id="bottomsheet" text="bottomsheet" @tap="onTap" />
            <MDButton id="bottomsheet-keyboard" text="bottomsheet-keyboard" @tap="onTap" />
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from 'tns-core-modules/ui/frame';
import Vue from 'vue';
import { EventData, View, Color } from 'tns-core-modules/ui/frame';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { ActivityIndicator } from 'tns-core-modules/ui/activity-indicator/activity-indicator';
import { Label } from 'tns-core-modules/ui/label/label';
import BottomSheetInner  from './BottomSheetInner.vue';
import BottomSheetInnerKeyboard  from './BottomSheetInnerKeyboard.vue';
import { NativeScriptVue } from 'nativescript-vue';

export const title = 'BottomSheet sample';

export default Vue.extend({
    data() {
        return {
            name: 'BottomSheet',
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
                case 'bottomsheet': {
                    (this as NativeScriptVue).$showBottomSheet(BottomSheetInner, {
                        closeCallback: objId => {
                            console.log('bottom sheet closed');
                        }
                    });
                    break;
                }
                case 'bottomsheet-keyboard': {
                    (this as NativeScriptVue).$showBottomSheet(BottomSheetInnerKeyboard, {
                        closeCallback: objId => {
                            console.log('bottom sheet closed');
                        }
                    });
                    break;
                }
            }
        }
    }
});
</script>