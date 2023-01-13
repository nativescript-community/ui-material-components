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
                    v-model="text"
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
                <MDTextView id="textView3" placeholderColor="green" floatingColor="yellow" color="red" variant="outline" hint="text should be red" @textChange="onTextChange" v-model="text" @returnPress="onReturnPress" />
                <MDTextView variant="filled" required="true" email="true" hint="fill this out..." @textChange="onTextChange" @returnPress="onReturnPress" />
                <MDTextView hint="fill this out..." />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script lang="ts" setup>
import * as frameModule from '@nativescript/core/ui/frame';
import {ref} from "nativescript-vue";

const title = 'TextViews sample';
const text = ref('');

const onFocus = () => {
  console.log('Focused');
}
const onBlur = () => {
  console.log('Focused');
}
const onTextChange = ({ value }) => {
  console.log(`Text changed to ${value}`);
}
const onReturnPress = () => {
  console.log('Return key pressed');
}
const onNavigationButtonTap = () => {
  frameModule.Frame.topmost().goBack();
}
</script>
