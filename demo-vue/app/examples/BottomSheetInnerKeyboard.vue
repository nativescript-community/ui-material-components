<template>
    <StackLayout>
        <MDTextField margin="10" variant="filled" hint="Working TextView hint 🤪" />
        <PreviousNextView />
    </StackLayout>
</template>

<script lang="ts">
import * as frameModule from 'tns-core-modules/ui/frame';
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