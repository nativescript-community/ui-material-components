import { EventData, View } from 'tns-core-modules/ui/core/view';
import { ItemEventData } from 'tns-core-modules/ui/list-view/list-view';

export function onTap(args: ItemEventData) {
    const bindingContext = (args.object as View).bindingContext;
    const data = bindingContext.dataItems.getItem(args.index);

    console.log('tapped in bottom sheet list', data, bindingContext.dataItems.length);
    bindingContext.closeCallback(data.title);
}
