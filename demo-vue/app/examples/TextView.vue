<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <ScrollView>
            <StackLayout>
                <MDTextView
                    id="textView1"
                    height="200"
                    helper="help me!"
                    width="250"
                    @focus="onFocus"
                    @blur="onBlur"
                    backgroundColor="orange"
                    placeholderColor="green"
                    hint="i am an hint"
                    @textChange="onTextChange"
                    v-model="value"
                    @returnPress="onReturnPress"
                    variant="none"
                />
                <MDTextView id="textView11" hint="hint me" @textChange="onTextChange" @returnPress="onReturnPress">
                    <FormattedString>
                        <Span text="Words " color="#00ff00"></Span>
                        <Span text="with " color="#ff0000" fontAttributes="Bold"></Span>
                    </FormattedString>
                </MDTextView>
                <MDTextView id="textView2" editable="false" counterMaxLength="10" maxLength="10" hint="hint me" @textChange="onTextChange" @returnPress="onReturnPress" />
                <MDTextView id="textView3" variant="outline" hint="outline" @textChange="onTextChange" v-model="value" @returnPress="onReturnPress" />
                <MDTextView variant="filled" required="true" email="true" hint="fill this out..." @textChange="onTextChange" @returnPress="onReturnPress" />
                <MDTextView hint="fill this out..." />
            </StackLayout>
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
            value: 'test'
        };
    },

    methods: {
        onNavigationButtonTap() {
            frameModule.Frame.topmost().goBack();
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
