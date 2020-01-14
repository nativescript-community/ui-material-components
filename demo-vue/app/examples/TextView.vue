<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <ScrollView>
        <GridLayout rows="auto,auto,auto,auto,auto,auto,auto">
            <MDTextView id="textView1" helper="help me!" width="250"  @focus="onFocus" @blur="onBlur" backgroundColor="orange" placeholderColor="green" hint="i am an hint"  @textChange="onTextChange" @returnPress="onReturnPress"/>
            <MDTextView id="textView2" maxLength="10" hint="hint me" @textChange="onTextChange" @returnPress="onReturnPress"/>
            <MDTextView id="textView3" variant="outline" hint="outline" @textChange="onTextChange" @returnPress="onReturnPress"/>
            <MDTextView  variant="filled" required="true" email="true" hint="fill this out..." @textChange="onTextChange" @returnPress="onReturnPress"/>
            <TextView  hint="fill this out..."/>
        </ScrollView>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';

export const title = 'TextViews sample';

export default Vue.extend({
    name: 'TextViews',

    data() {
        return {
            title: title,
            value: ''
        };
    },

    methods: {
        onNavigationButtonTap() {
            frameModule.topmost().goBack();
        },
        onFocus() {
            console.log('Focused');
        },
        onBlur() {
            console.log('Blurred');
        },
        onTextChange({ value }) {
            console.log(`Text changed to ${value}`);
        },
        onReturnPress() {
            console.log('Return key pressed');
        }
    }
});
</script>
