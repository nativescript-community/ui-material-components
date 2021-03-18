<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout>
        <StackLayout backgroundColor="yellow" elevation="10" dynamicElevationOffset="3">
            <Button margin="10"  elevation="5" rippleColor="red" backgroundColor="green" borderRadius="10" fontSize="20" text="elevated button" @tap="onButtonTap"/>
            <Button margin="10"  rippleColor="red" fontSize="20" text="elevated button" />
            <Label margin="10" horizontalAlignment="center" backgroundColor="yellow" padding="10" elevation="1" borderRadius="20" rippleColor="red" text="elevated text" />
            <Label margin="10" horizontalAlignment="center" padding="10" backgroundColor="yellow" dynamicElevationOffset="3" elevation="1" rippleColor="red" text="elevated text" />
            <StackLayout class="cardView" height="100" orientation="horizontal" >
                <Label width="100%" textAlignment="center" verticalAlignment="center" text="elevated text" />
            </StackLayout>
        </StackLayout>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
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
            frameModule.Frame.topmost().goBack();
        },
        onButtonTap() {
            console.log('onButtonTap');
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
