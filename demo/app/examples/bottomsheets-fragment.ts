import { View } from '@nativescript/core';

export function onViewTestLayoutChanged(args) {
    const view: View = <View>args.object;
    console.log('onViewTestLoaded', view.getMeasuredHeight());
}
