import { EventData, View } from '@nativescript/core/ui/core/view';
import { ItemEventData } from '@nativescript/core/ui/list-view/list-view';

export function onTap(args: ItemEventData) {
    const bindingContext = (args.object as View).bindingContext;
    const data = bindingContext.dataItems.getItem(args.index);

    console.log('tapped in bottom sheet list', data, bindingContext.dataItems.length);
    bindingContext.closeCallback(data.title);
}
