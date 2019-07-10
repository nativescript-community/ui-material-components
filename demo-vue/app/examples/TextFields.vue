<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout>
            <MDTextField id="textField1" helper="help me!" width="250" placeholderColor="green" keyboardType="datetime" hint="i am an hint" returnKeyType="next" v-model="value" highlightColor="yellow" @focus="onFocus" @blur="onBlur" @textChange="onTextChange" @returnPress="onReturnPress" />
            <StackLayout backgroundColor="red">
                <MDTextField id="textField2" hint="hint me" v-model="value" backgroundColor="green" @focus="onFocus" @blur="onBlur" @textChange="onTextChange" @returnPress="onReturnPress"  floating="false" margin="0" padding="20"/>
            </StackLayout>
            <MDTextField id="textField3"  maxLength="10" variant="outline" hint="outline" @focus="onFocus" @blur="onBlur" @textChange="onTextChange" @returnPress="onReturnPress" floatingColor="red" highlightColor="green" padding="10"/>
            <MDTextField id="textField4"  maxLength="10" variant="outline" hint="outline" @focus="onFocus" @blur="onBlur" @textChange="onTextChange" @returnPress="onReturnPress" floatingColor="red" placeholderColor="blue" highlightColor="green" padding="10"/>
            <MDTextField variant="filled" required="true" email="true" hint="fill this out..." @focus="onFocus" @blur="onBlur" floating="false" @textChange="onTextChange" @returnPress="onReturnPress"  highlightColor="red" padding="10"/>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import * as frameModule from 'tns-core-modules/ui/frame';
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
