<template>
    <GridLayout id="test1" rows="auto auto" height="300" backgroundColor="yellow">
        <!-- highlighted in red to demonstrate movement -->
        <Stacklayout id="test2" row="0" backgroundColor="red" verticalAlignment="top">
            <Button @tap="toggleExtraContent" text="Toggle extra content"></Button>
            <Button @tap="openAnotherInner" text="Open second"></Button>
            <Button  id="innerButton" @tap="onButtonTap" text="close with result"></Button>
        </Stacklayout>
        <GridLayout id="test4" row="1" v-if="showExtraContent">
            <Label text="Extra content"></Label>
        </GridLayout>
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
            showExtraContent: false
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
