<template>
    <Page id="pag" >
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap" />
        </ActionBar>
        <GridLayout rows="*, auto" id="outerView" ref="outerViewRef">
            <!-- <Frame actionBarHidden="true"> -->
                <!-- <Page actionBarHidden="true" backgroundColor="blue" id="innerPage" > -->
                    <StackLayout id="innerView" ref="innerView" backgroundColor="gray">
                        <MDButton id="show_snack" text="show snack" @tap="onTap" />
                        <MDButton id="show_snack_action" text="show snack action" @tap="onTap" />
                        <MDButton ref="show_snack_action_color" id="show_snack_action_color" text="show snack action color" @tap="onTap" />
                    </StackLayout>
                <!-- </Page> -->
            <!-- </Frame> -->

        </GridLayout>
    </Page>
</template>

<script lang="ts" setup>
import * as frameModule from '@nativescript/core/ui/frame';
import { EventData, View } from '@nativescript/core';
import { SnackBar, showSnack } from '@nativescript-community/ui-material-snackbar';
import {ref, toRaw} from "nativescript-vue";

const title = 'SnackBar sample';
const name = 'SnackBar';
const outerViewRef = ref();
const onNavigationButtonTap = () => {
  frameModule.Frame.topmost().goBack();
}
const onTap = (args: EventData) => {
  const obj = args.object as View;
  const objId = obj.id;
  console.log('onTap', objId, obj);
  switch (objId) {
    case 'show_snack': {
      showSnack({ message: 'this is test snack!', textColor: 'yellow', anchorView: toRaw(outerViewRef.value.nativeView) });
      break;
    }
    case 'show_snack_action': {
      const test = new SnackBar();
      test.showSnack({ message: 'this is test snack with action!', actionText: 'done' }).then(r=>{
        console.log('showSnack result', r);

      });
      // test.dismiss();
      break;
    }
    case 'show_snack_action_color': {
      showSnack({ message: 'this is test snack with action colored!', actionText: 'delete', actionTextColor: 'red', view: toRaw(outerViewRef.value.nativeView) }).then(r => {
        console.log('showSnack result', r);
      });
      break;
    }
  }
}

</script>
