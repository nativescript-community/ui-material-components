<template>
    <StackLayout>
        <Stacklayout id="test2" row="0" backgroundColor="red" verticalAlignment="top">
            <Button id="innerButtonK" @tap="onButtonTap" text="close with result k"></Button>
        </Stacklayout>
        <MDTextField margin="10" variant="filled" hint="Working TextView hint 🤪" />
    </StackLayout>
</template>

<script lang="ts" setup>
import * as frameModule from '@nativescript/core/ui/frame';
import { useBottomSheet } from "@nativescript-community/ui-material-bottomsheet/vue3";
const { showBottomSheet, closeBottomSheet } = useBottomSheet()

function onShownInBottomSheet(args) {
    console.log('onShownInBottomSheet');
}

function onButtonTap(event) {
    closeBottomSheet(event.object.id);
}
</script>
