import { EventData, View, ItemEventData } from '@nativescript/core';

export function onTap(args: ItemEventData) {
    const bindingContext = (args.object as View).bindingContext;
    const data = bindingContext.dataItems.getItem(args.index);

    console.log('tapped in bottom sheet list', data);
    bindingContext.closeCallback(data.title);
}
