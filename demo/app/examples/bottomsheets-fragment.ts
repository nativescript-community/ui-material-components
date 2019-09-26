import { View } from 'tns-core-modules/ui/core/view';

export function onViewTestLayoutChanged(args) {
    const view: View = <View>args.object;
    console.log('onViewTestLoaded', view.getMeasuredHeight());
}
