<template>
<!-- <Page iosOverflowSafeArea="true"> -->
    <MDCardView @shownInBottomSheet="onShownInBottomSheet" borderRadius="20" elevation="30" backgroundColor="transparent">
        <StackLayout>
            <MDButton id="test1" text="test1" borderRadius="20" margin="20" />
            <MDButton id="test2" text="test2" />
        </StackLayout>
    </MDCardView>
<!-- </Page> -->
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
        }
    }
});
</script>
