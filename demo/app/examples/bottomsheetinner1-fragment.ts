import { EventData, View } from '@nativescript/core';

// let closeCallback

export function onShownInBottomSheet(args) {
    console.log('onShownInBottomSheet1');
    const context = args.context;
    // closeCallback = args.closeCallback
    console.log('onShownInBottomSheet', context);
    // const view: View = <View>args.object
    // view.bindingContext = fromObject(context)
}

export function onTap(args: EventData) {
    const obj = args.object as View;
    const objId = obj.id;
    console.log('tapped in bottom sheet', objId);
    obj.bindingContext.closeCallback(objId);
}
