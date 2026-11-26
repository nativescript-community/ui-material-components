// Svelte 5 binding, for @nativescript-community/svelte-native >= 5. The Svelte 4 one is in ../svelte.
import { BottomSheetOptions } from '../bottomsheet';
import { Frame, View } from '@nativescript/core';
import { NativeViewElementNode, resolveComponentElement, type ComponentInstanceInfo, type PageSpec } from '@nativescript-community/svelte-native/dom';

declare module '@nativescript/core/ui/core/view' {
    interface View {
        closeBottomSheet(...args: any): void;
        showBottomSheet(options: BottomSheetOptions): View;
    }
}

export interface SvelteShowBottomSheetOptions<U> extends Omit<BottomSheetOptions, 'view'> {
    view: PageSpec<U>;
    parent?: NativeViewElementNode<View> | View;
    props?: U;
}
export { resolveComponentElement, type ComponentInstanceInfo };

const modalStack: ComponentInstanceInfo[] = [];

export function showBottomSheet<T = any, U = any>(modalOptions: SvelteShowBottomSheetOptions<U>): Promise<T> {
    const { view, parent, props = {}, ...options } = modalOptions;
    // Get this before any potential new frames are created by component below
    const modalLauncher: View = (parent && (parent instanceof View ? parent : parent.nativeView)) || Frame.topmost().currentPage;

    const componentInstanceInfo = resolveComponentElement(view, props);
    let modalView: View = componentInstanceInfo.element.nativeView;

    return new Promise(async (resolve, reject) => {
        let resolved = false;
        const closeCallback = (result: T) => {
            if (resolved) return;
            resolved = true;
            if (options.closeCallback) {
                options.closeCallback(result,componentInstanceInfo.viewInstance);
            }
            modalStack.pop();
            resolve(result);
            modalView._tearDownUI();
            componentInstanceInfo.viewInstance.unmount(); // don't let an exception in unmount kill the promise callback
        };
        try {
            modalLauncher.showBottomSheet({ view: modalView, ...options, context: {}, closeCallback });
            modalStack.push(componentInstanceInfo);
        } catch (err) {
            reject(err);
        }
    });
}

export function closeBottomSheet(result?: any): void {
    const modalPageInstanceInfo = modalStack[modalStack.length - 1];
    if (modalPageInstanceInfo) {
        (modalPageInstanceInfo.element.nativeView as any).closeBottomSheet(result);
    }
}
export function isBottomSheetOpened() {
    return modalStack.length > 0;
}
