<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout>
            <MDRipple backgroundColor="gray" rippleColor="green" width="100" height="100" borderRadius="10" />
            <MDRipple width="100" height="100" borderRadius="10" />
        </StackLayout>
    </Page>
</template>

<script lang="ts" setup>
import * as frameModule from '@nativescript/core/ui/frame';

const title = 'Ripples sample';
const onNavigationButtonTap = () => {
  frameModule.Frame.topmost().goBack();
}
</script>
