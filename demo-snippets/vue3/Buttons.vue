<template>
    <Page>
        <ActionBar :title="title">
            <StackLayout orientation="horizontal" width="100%">
                <MDButton v-show="isEditing" variant="flat" text="test" @tap="isEditing = !isEditing" />
                <MDButton text="save" @tap="isEditing = !isEditing" />
            </StackLayout>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <ScrollView>
            <StackLayout>
                <MDButton text="raised button" @tap="onTap" />
                <MDButton src="res://ic_action_add" text="button with icon" @tap="onTap" />
                <MDButton variant="text" color="red" src="res://ic_action_add" text="button with icon and tint" @tap="onTap" />
                <MDButton variant="text" text="text button" @tap="onTap" />
                <MDButton variant="flat" text="flat button" @tap="onTap" />
                <MDButton variant="outline" text="outline button" @tap="onTap" />
                <MDButton borderRadius="10" fontSize="20" text="raised button" @tap="onTap" />
                <StackLayout v-show="isEditing">
                    <MDTextField class="session-details-input" :hint="'name'" />
                    <MDTextField class="session-details-input" :hint="'description'" />
                </StackLayout>
                <MDFloatingActionButton src="res://ic_action_add" @tap="onTap" horizontalAlignment="center" />
                <MDButton fontSize="26" text="mdi-plus" class="mdi" @tap="onTap" horizontalAlignment="center" />
                <MDFloatingActionButton fontSize="26" text="mdi-plus" class="mdi" @tap="onTap" horizontalAlignment="center" />
                <MDFloatingActionButton src="res://ic_action_add" color="white" backgroundColor="blue" size="mini" @tap="onTap" horizontalAlignment="center" />
                <MDFloatingActionButton src="res://ic_action_add" text="test expanded" @tap="onTap" horizontalAlignment="center" />
                <MDFloatingActionButton src="res://ic_action_add" text="test expanded" :expanded="expanded" @tap="switchExpanded" horizontalAlignment="center" />
                <StackLayout margin="10">
                    <MDButton text="default button" @tap="onTap" />
                </StackLayout>
                <MDButton class="bg-red" borderRadius="10" color="red" text="text button" variant="text" @tap="onTap">
                    <FormattedString>
                        <Span text="Words " color="#00ff00"></Span>
                        <Span text="with " color="#ff0000" fontAttributes="Bold"></Span>
                    </FormattedString>
                </MDButton>
                <MDButton class="bg-red" verticalTextAlignment="center" borderRadius="10" color="red" text="text button" variant="text" @tap="onTap">
                    <Span text="mdi-magnify" fontSize="20" class="mdi"></Span>
                    <Span text=" search" fontAttributes="Bold"></Span>
                </MDButton>
                <MDButton text="disabled button" isEnabled="false" @tap="onTap" />
                <MDButton text="flat button \n test" variant="flat" class="bg-blue" @tap="onTap" />
                <MDButton text="flat transparent button \n test" rippleColor="red" variant="flat" backgroundColor="transparent" @tap="onTap" />
                <MDButton text="flat disabled button" variant="flat" isEnabled="false" backgroundColor="yellow" @tap="onTap" />
                <MDButton text="outline button" rippleColor="red" color="black" width="200" variant="outline" @tap="onTap" />
                <MDButton text="disabled outline button" borderColor="red" borderRadius="2" borderWidth="2" isEnabled="false" width="200" variant="outline" backgroundColor="green" @tap="onTap" />
                <MDButton text="text button" width="200" color="green" variant="text" @tap="onTap" />
                <MDButton text="text button class" width="200" class="text_class_test" variant="text" @tap="onTap" />
                <MDButton text="disabled text button" isEnabled="false" width="200" variant="text" @tap="onTap" />
                <MDButton class="falseFAb bg-green" text="+" color="white" verticalAlign="center" backgroundColor="#53ba82" @tap="onTap" />
                <MDButton class="falseFAb bg-green" src="res://ic_action_add" @tap="onTap" />
                <MDButton backgroundColor="red" text="backgroundColor" isEnabled="false" />
                <MDButton class="buttontest" text="buttontest" />
                <MDButton class="buttontest" text="buttontest" isEnabled="false" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>
<style scoped>
.buttontest {
    color: blue;
    background-color: #333;
}
.buttontest:disabled {
    color: red;
    background-color: yellow;
}
.text_class_test {
    color: red;
    ripple-color: green;
}
</style>

<script lang="ts" setup>
import * as frameModule from '@nativescript/core/ui/frame';
import { ref } from 'nativescript-vue';

const title = 'Buttons sample';
const name = 'Buttons';
const isEditing = false;
const expanded = ref(false);

const onNavigationButtonTap = () =>{
  frameModule.Frame.topmost().goBack();
}
const onTap = (event) =>{
  console.log('switchExpanded', expanded.value, event.object.nativeView);
}
const switchExpanded = (event) =>{
  expanded.value = !expanded.value;
}
</script>
