<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>
        <StackLayout class="bg-green">
            <ScrollView>
                <StackLayout horizontalAlignment="center">
                    <MDButton text="button" rippleColor="red" color="black" width="200" variant="outline" />
                    <MDRipple backgroundColor="white" rippleColor="red" width="100" height="100" borderRadius="10"/>
                    <GridLayout columns="auto" rows="auto" backgroundColor='lightgray'>
                        <MDCardView margin="10" width="200" height="100" rippleColor="red" borderRadius="30">
                            <StackLayout>
                                <Label text="Hello world" class="title"></Label>
                            </StackLayout>
                        </MDCardView>
                    </GridLayout>
                    <MDCardView margin="10" width="200" height="100" elevation="6">
                        <StackLayout>
                            <Label text="Hello world2" class="title"></Label>
                        </StackLayout>
                    </MDCardView>
                </StackLayout>

            </ScrollView>
        </StackLayout>
    </Page>
</template>

<script lang="ts" setup>
import * as frameModule from '@nativescript/core/ui/frame';

const title = 'CardViews sample';
const name = 'CardView';

const onNavigationButtonTap = () =>{
  frameModule.Frame.topmost().goBack();
}
</script>
