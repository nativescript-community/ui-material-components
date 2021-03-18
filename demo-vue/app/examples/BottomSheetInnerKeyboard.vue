<template>
    <StackLayout>
        <Stacklayout id="test2" row="0" backgroundColor="red" verticalAlignment="top">
            <Button id="innerButtonK" @tap="onButtonTap" text="close with result k"></Button>
        </Stacklayout>
        <MDTextField margin="10" variant="filled" hint="Working TextView hint 🤪" />
        <PreviousNextView />
    </StackLayout>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {};
    },
    methods: {
        onShownInBottomSheet(args) {
            console.log('onShownInBottomSheet');
        },
        onButtonTap(event) {
            this.$closeBottomSheet(event.object.id);
        }
    }
});
</script>
