<template>
<StackLayout backgroundColor="red"  @shownInBottomSheet="onShownInBottomSheet">
    <MDButton id="test1" text="test1"/>
    <MDButton id="test2" text="test2" />
</StackLayout>
</template>

<script lang="ts">
import * as frameModule from 'tns-core-modules/ui/frame';
import Vue from 'vue';


export default Vue.extend({
    data() {
        return {
        };
    },
    methods: {
        onShownInBottomSheet(args) {
            console.log('onShownInBottomSheet');
        }
    }
});
</script>