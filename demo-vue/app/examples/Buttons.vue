<template>
    <Page>
        <ActionBar :title="title">
            <StackLayout orientation="horizontal" width="100%">
                <MDButton v-show="isEditing" variant="flat" text="test" @tap="isEditing = !isEditing" />
                <MDButton variant="flat" text="save" @tap="isEditing = !isEditing" />
            </StackLayout>
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <ScrollView>
            <StackLayout>
                <StackLayout v-if="isEditing">
                        <MDTextField class="session-details-input" :hint="('name')" />
                        <MDTextField class="session-details-input" :hint="('description')"/>
                    </StackLayout>
                <MDFloatingActionButton src="res://ic_action_add"  @tap="onTap" horizontalAlignment="center" />
                <MDFloatingActionButton id="fab" src="res://ic_action_add" color="white" backgroundColor="blue" size="mini" @tap="onTap" horizontalAlignment="center" />
                <MDFloatingActionButton src="res://ic_action_add" text="test expanded" expanded="true" @tap="onTap" horizontalAlignment="center" />
                <MDFloatingActionButton src="res://ic_action_add" text="test expanded" :expanded="expanded" @tap="expanded = !expanded" horizontalAlignment="center" />
                <StackLayout margin="10">
                    <MDButton id="button0" text="default button" @tap="onTap" />
                </StackLayout>
                <MDButton id="button1" elevation="2" borderRadius="10" fontSize="20" text="raised button" @tap="onTap" />
                <MDButton id="button2" class="bg-red" borderRadius="10" color="red" text="text button" variant="text" @tap="onTap">
                    <FormattedString>
                        <Span text="Words " color="#00ff00"></Span>
                        <Span text="with " color="#ff0000" fontAttributes="Bold"></Span>
                    </FormattedString>
                </MDButton>
                <MDButton id="button3" text="disabled button"  isEnabled="false" @tap="onTap" />
                <MDButton id="button3" text="flat button \n test" variant="flat" class="bg-blue" @tap="onTap" />
                <MDButton id="button4" text="flat disabled button" variant="flat" isEnabled="false" backgroundColor="yellow" @tap="onTap" />
                <MDButton id="button5" text="outline button" rippleColor="red" color="black" width="200" variant="outline" @tap="onTap" />
                <MDButton id="button6" text="disabled outline button" borderColor="red" borderRadius="2" borderWidth="2" isEnabled="false" width="200" variant="outline" backgroundColor="green" @tap="onTap" />
                <MDButton id="button7" text="text button" width="200" color="blue" variant="text" @tap="onTap" />
                <MDButton id="button8" text="disabled text button" isEnabled="false" width="200" variant="text" @tap="onTap" />
                <MDButton id="button9" class="falseFAb bg-green" text="+" color="white" verticalAlign="center" backgroundColor="#53ba82" @tap="onTap" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script lang="ts">
import * as frameModule from '@nativescript/core/ui/frame';
import Vue from 'vue';

export const title = 'Buttons sample';

export default Vue.extend({
    data() {
        return {
            name: 'Buttons',
            title: title,
            isEditing:false,
            expanded:false
        };
    },
    methods: {
        onNavigationButtonTap() {
            frameModule.Frame.topmost().goBack();
        },
        onTap() {
            console.log('Button tapped');
        }
    }
});
</script>