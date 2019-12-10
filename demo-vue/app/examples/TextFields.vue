<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <ScrollView>
        <GridLayout rows="auto,auto,auto,auto,auto,auto,auto">
            <StackLayout row="0" backgroundColor="red" horizontalAlignment="center">
                <MDTextField id="textField1"  verticalAlignment="center" variant="none" width="250" placeholderColor="green" keyboardType="datetime" hint="i am an hint" returnKeyType="next" v-model="value"  @focus="onFocus" @blur="onBlur" @textChange="onTextChange" @returnPress="onReturnPress" />
            </StackLayout>
            <GridLayout row="1" backgroundColor="red" rows="auto" padding="20">
                <MDTextField id="textField2" variant="filled" hint="hint me" v-model="value" backgroundColor="green" @focus="onFocus" @blur="onBlur" @textChange="onTextChange" @returnPress="onReturnPress" floating="false" />
            </GridLayout>
            <MDTextField row="2" id="textField3" hint="filled" @focus="onFocus" @blur="onBlur" @textChange="onTextChange" @returnPress="onReturnPress" margin="10" />
            <MDTextField row="3" id="textField4" maxLength="10" variant="outline" hint="outline" @focus="onFocus" @blur="onBlur" @textChange="onTextChange" @returnPress="onReturnPress" floatingColor="red" margin="10" buttonColor="red"/>
            <MDTextField row="4" id="textField5" variant="outline" hint="outline" @focus="onFocus" @blur="onBlur" @textChange="onTextChange" @returnPress="onReturnPress" floatingColor="red" placeholderColor="blue" strokeColor="green" margin="10" />
            <MDTextField row="5" id="textField6" variant="filled" required="true" email="true" hint="fill this out..." @focus="onFocus" @blur="onBlur" floating="false" @textChange="onTextChange" @returnPress="onReturnPress" strokeColor="red" margin="10" />
        </GridLayout>
        </ScrollView>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';

export const title = 'Text fields sample';

export default Vue.extend({
    name: 'TextFields',

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
