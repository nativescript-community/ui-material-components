<template>
    <GridLayout id="test1" rows="auto auto" backgroundColor="yellow">
        <!-- highlighted in red to demonstrate movement -->
        <Stacklayout id="test2" row="0" backgroundColor="red" verticalAlignment="top" marginLeft="10" marginRight="10">
            <Button @tap="$emit('indexChanged', 200)" text="Emit value"></Button>
            <Button @tap="toggleExtraContent" text="Toggle extra content"></Button>
            <Button @tap="openAnotherInner" text="Open second"></Button>
            <Button id="innerButton" @tap="onButtonTap" text="close with result"></Button>
        </Stacklayout>
        <StackLayout style="background-color: red" row="1">
            <StackLayout orientation="horizontal">
                <MDTextField hint="Edit text to filter..." style="font-size: 16" />
                <MDActivityIndicator *ngIf="processing" width="50" height="50" />
            </StackLayout>
            <ListView height="150" :items="items" id="scrollView">
                <GridLayout height="64" backgroundColor="green">
                    <Image horizontalAlignment="left" width="64" />
                    <Label horizontalAlignment="center" />
                    <Label horizontalAlignment="right" />
                </GridLayout>
            </ListView>
            <Button text="Cancel" horizontalAlignment="center" />
        </StackLayout>
    </GridLayout>
</template>

<script lang="ts" setup>
import BottomSheetInnerKeyboardVue from './BottomSheetInnerKeyboard.vue';
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";
const { showBottomSheet, closeBottomSheet } = useBottomSheet()
import { ref } from 'nativescript-vue';

const showExtraContent = ref(false);
const items = [{}, {}, {}, {}, {}, {}]

function onButtonTap(event) {
    closeBottomSheet(event.object.id);
}

function onShownInBottomSheet(args) {
    console.log('onShownInBottomSheet');
}

function toggleExtraContent() {
    showExtraContent.value = !showExtraContent.value;
}

function openAnotherInner() {
    showBottomSheet(BottomSheetInnerKeyboardVue, {
        // transparent:true,
        ignoreBottomSafeArea: true,
        closeCallback: (...args) => {
            console.log('bottom sheet closed', args);
        }
    });
}
</script>
