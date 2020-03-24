<template>
    <MDCardView @shownInBottomSheet="onShownInBottomSheet" borderRadius="20" elevation="30" backgroundColor="green">
        <StackLayout>
            <MDButton id="test1" text="test1" borderRadius="20" margin="20"  @tap="onButtonTap"/>
            <MDButton id="test2" text="test2" @tap="onButtonTap"/>
        </StackLayout>
    </MDCardView>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {};
    },
    methods: {
        onButtonTap() {
            this.$closeBottomSheet(true);
        },
        onShownInBottomSheet(args) {
            console.log('onShownInBottomSheet');
        }
    }
});
</script>
