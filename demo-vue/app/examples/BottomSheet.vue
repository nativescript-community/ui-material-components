<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout>
            <MDButton id="bottomsheet" text="bottomsheet" @tap="onTap" />
            <MDButton id="dont_ignore_top_safe_area" text="dont_ignore_top_safe_area" @tap="onTap" />
            <MDButton id="ignore_bottom_safe_area" text="ignore_bottom_safe_area" @tap="onTap" />
            <MDButton id="dont_ignore_top_ignore_bottom_safe_area" text="dont_ignore_top_ignore_bottom_safe_area" @tap="onTap" />
            <MDButton id="bottomsheet-keyboard" text="bottomsheet-keyboard" @tap="onTap" />
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';
import { EventData, View, Color } from '@nativescript/core';
import { StackLayout } from '@nativescript/core';
import { ActivityIndicator } from '@nativescript/core';
import { Label } from '@nativescript/core';
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
            frameModule.Frame.topmost().goBack();
        },
        onTap(args: EventData) {
            const obj = args.object as View;
            const objId = obj.id;
            console.log('onTap', objId, obj);
            switch (objId) {
                case 'bottomsheet': {
                    (this as NativeScriptVue).$showBottomSheet(BottomSheetInner, {
                        transparent:true,
                        closeCallback: (...args) => {
                            console.log('bottom sheet closed', args);
                        }
                    });
                    break;
                }
                case 'dont_ignore_top_safe_area': {
                    (this as NativeScriptVue).$showBottomSheet(BottomSheetInner, {
                        ignoreTopSafeArea:false,
                        // transparent:true,
                        closeCallback: (...args) => {
                            console.log('bottom sheet closed', args);
                        }
                    });
                    break;
                }
                case 'ignore_bottom_safe_area': {
                    (this as NativeScriptVue).$showBottomSheet(BottomSheetInner, {
                        // transparent:true,
                        ignoreBottomSafeArea:true,
                        closeCallback: (...args) => {
                            console.log('bottom sheet closed', args);
                        }
                    });
                    break;
                }
                case 'dont_ignore_top_ignore_bottom_safe_area': {
                    (this as NativeScriptVue).$showBottomSheet(BottomSheetInner, {
                        // transparent:true,
                        ignoreTopSafeArea:false,
                        ignoreBottomSafeArea:true,
                        closeCallback: (...args) => {
                            console.log('bottom sheet closed', args);
                        }
                    });
                    break;
                }
                case 'bottomsheet-keyboard': {
                    (this as NativeScriptVue).$showBottomSheet(BottomSheetInnerKeyboard, {
                        closeCallback: (...args) => {
                            console.log('bottom sheet closed', args);
                        }
                    });
                    break;
                }
            }
        }
    }
});
</script>