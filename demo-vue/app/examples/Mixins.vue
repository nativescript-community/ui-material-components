<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout>
            <Button margin="10"  rippleColor="red" backgroundColor="green" borderRadius="10" fontSize="20" text="elevated button" />
            <Button margin="10"  rippleColor="red" fontSize="20" text="elevated button" />
            <Label margin="10" horizontalAlignment="center" backgroundColor="yellow" padding="10" elevation="1" borderRadius="20" rippleColor="red" text="elevated text" />
            <Label margin="10" horizontalAlignment="center" padding="10" backgroundColor="yellow" dynamicElevationOffset="3" elevation="1" rippleColor="red" text="elevated text" />
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from 'tns-core-modules/ui/frame';
import Vue from 'vue';

export const title = 'Mixins sample';

export default Vue.extend({
    name: 'Mixins',

    data() {
        return {
            title: title,
            value: 50
        };
    },

    methods: {
        onNavigationButtonTap() {
            frameModule.topmost().goBack();
        }
    },

    created() {
        this.interval = setInterval(() => {
            const newValue = (this.value + 1) % 100;
            this.value = newValue;
        }, 100);
    },

    beforeDestroy() {
        clearInterval(this.interval);
    }
});
</script>
