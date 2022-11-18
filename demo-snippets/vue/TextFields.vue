<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <ScrollView>
            <StackLayout>
                <StackLayout orientation="horizontal">
                    <Button text="setFocus" @tap="$refs.textField1.nativeView.requestFocus()" />
                    <Button text="setSelection" @tap="$refs.textField1.nativeView.setSelection(1, 4)" />
                </StackLayout>
                <StackLayout backgroundColor="red" horizontalAlignment="center" orientation="horizontal">
                    <Label width="20" height="20" backgroundColor="green" verticalAlignment="top" />
                    <MDTextField
                        ref="textField1"
                        id="textField1"
                        backgroundColor="blue"
                        verticalAlignment="top"
                        variant="none"
                        width="250"
                        height="60"
                        paddingTop="4"
                        lineHeight="20"
                        paddingBottom="0"
                        paddingLeft="0"
                        placeholderColor="green"
                        keyboardType="datetime"
                        hint="i am an hint"
                        returnKeyType="next"
                        v-model="value"
                        @focus="onFocus"
                        @blur="onBlur"
                        @textChange="onTextChange"
                        @returnPress="onReturnPress"
                    />
                </StackLayout>
                <GridLayout backgroundColor="red" rows="auto" padding="20">
                    <MDTextField
                        id="textField2"
                        variant="filled"
                        hint="hint me"
                        helper="helper text"
                        v-model="value"
                        backgroundColor="green"
                        @focus="onFocus"
                        @blur="onBlur"
                        @textChange="onTextChange"
                        @returnPress="onReturnPress"
                        floating="true"
                    />
                </GridLayout>
                <MDTextField id="textField34" hint="test" helper="helper text" helperColor="green" errorColor="purple" error="error text" class="md-textfield-outline" variant="outline" />
                <MDTextField
                    id="textField3"
                    hint="filled"
                    @focus="onFocus"
                    @blur="onBlur"
                    @textChange="onTextChange"
                    @returnPress="onReturnPress"
                    margin="10"
                    text="this si a text not editable"
                    editable="false"
                />
                <MDTextField
                    id="textField4"
                    variant="outline"
                    hint="outline"
                    @focus="onFocus"
                    @blur="onBlur"
                    @textChange="onTextChange"
                    @returnPress="onReturnPress"
                    floatingColor="red"
                    margin="10"
                    height="100"
                    buttonColor="red"
                >
                    <FormattedString>
                        <Span text="Words " color="#00ff00"></Span>
                        <Span text="with " color="#ff0000" fontAttributes="Bold"></Span> </FormattedString
                ></MDTextField>
                <MDTextField
                    id="textField5"
                    variant="outline"
                    hint="outline"
                    @focus="onFocus"
                    @blur="onBlur"
                    @textChange="onTextChange"
                    @returnPress="onReturnPress"
                    floatingColor="red"
                    placeholderColor="blue"
                    strokeColor="green"
                    margin="10"
                />
                <MDTextField
                    id="textField6"
                    variant="filled"
                    required="true"
                    email="true"
                    maxLength="10"
                    hint="fill this out..."
                    @focus="onFocus"
                    @blur="onBlur"
                    floating="false"
                    @textChange="onTextChange"
                    @returnPress="onReturnPress"
                    strokeColor="red"
                    margin="10"
                />
                <MDTextField
                    id="textField7"
                    variant="filled"
                    hint="limited 1digits 0123456789."
                    @focus="onFocus"
                    @blur="onBlur"
                    floating="false"
                    @textChange="onTextChange"
                    @returnPress="onReturnPress"
                    keyboardType="decimal"
                    digits="0123456789."
                    margin="10"
                />
                <MDTextField
                    id="textField8"
                    variant="filled"
                    hint="limited digits 0123456789."
                    @focus="onFocus"
                    @blur="onBlur"
                    @textChange="onTextChange"
                    @returnPress="onReturnPress"
                    digits="0123456789."
                    strokeColor="red"
                    margin="10"
                />
            </StackLayout>
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
            title,
            value: ''
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
