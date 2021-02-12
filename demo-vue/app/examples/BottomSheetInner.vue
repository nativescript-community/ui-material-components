<template>
    <GridLayout id="test1" rows="auto auto" height="300" backgroundColor="yellow">
        <!-- highlighted in red to demonstrate movement -->
        <GridLayout id="test2" row="0" backgroundColor="red" verticalAlignment="top">
            <Button @tap="toggleExtraContent" text="Toggle extra content"></Button>
        </GridLayout>
        <GridLayout id="test4" row="1" v-if="showExtraContent">
            <Label text="Extra content"></Label>
        </GridLayout>
    </GridLayout>
    <!-- </MDCardView> -->
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';

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
        }
    }
});
</script>
