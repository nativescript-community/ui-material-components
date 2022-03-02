<template>
    <GridLayout id="test1" rows="auto auto" backgroundColor="yellow">
        <!-- highlighted in red to demonstrate movement -->
        <Stacklayout id="test2" row="0" backgroundColor="red" verticalAlignment="top" marginLeft="10" marginRight="10">
            <Button @tap="toggleExtraContent" text="Toggle extra content"></Button>
            <Button @tap="openAnotherInner" text="Open second"></Button>
            <Button id="innerButton" @tap="onButtonTap" text="close with result"></Button>
        </Stacklayout>
        <StackLayout style="background-color: red" row="1">
            <StackLayout orientation="horizontal">
                <MDTextField hint="Edit text to filter..." style="font-size: 16" />
                <MDActivityIndicator *ngIf="processing" width="50" height="50" />
            </StackLayout>
            <ListView height="150" :items="items">
                <v-template let-item="item" let-odd="odd" let-even="even">
                    <GridLayout height="64" backgroundColor="green">
                        <Image horizontalAlignment="left" width="64" />
                        <Label horizontalAlignment="center" />
                        <Label horizontalAlignment="right" />
                    </GridLayout>
                </v-template>
            </ListView>
            <Button text="Cancel" horizontalAlignment="center" />
        </StackLayout>
    </GridLayout>
    <!-- </MDCardView> -->
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';
import NativeScriptVue from 'nativescript-vue';
import BottomSheetInnerKeyboardVue from './BottomSheetInnerKeyboard.vue';

export default Vue.extend({
    data() {
        return {
            showExtraContent: false,
            items: [{}, {}, {}, {}, {}, {}]
        };
    },
    methods: {
        onButtonTap(event) {
            this.$closeBottomSheet(event.object.id);
        },
        onShownInBottomSheet(args) {
            console.log('onShownInBottomSheet');
        },
        toggleExtraContent() {
            this.showExtraContent = !this.showExtraContent;
        },
        openAnotherInner() {
            (this as NativeScriptVue).$showBottomSheet(BottomSheetInnerKeyboardVue, {
                // transparent:true,
                ignoreBottomSafeArea: true,
                closeCallback: (...args) => {
                    console.log('bottom sheet closed', args);
                }
            });
        }
    }
});
</script>
