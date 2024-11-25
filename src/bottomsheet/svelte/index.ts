import { BottomSheetOptions } from '../bottomsheet';
import { Frame, View } from '@nativescript/core';
import { NativeViewElementNode, createElement } from 'svelte-native/dom';
import { PageSpec } from 'svelte-native/dom/navigation';

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
interface ComponentInstanceInfo {
    element: NativeViewElementNode<View>;
    viewInstance: SvelteComponent;
}

const modalStack: ComponentInstanceInfo[] = [];

export function resolveComponentElement<T>(viewSpec: typeof SvelteComponent<T>, props?: any): ComponentInstanceInfo {
    const dummy = createElement('fragment', window.document as any);
    const viewInstance = new viewSpec({ target: dummy, props });
    const element = dummy.firstElement() as NativeViewElementNode<View>;
    return { element, viewInstance };
}

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
            componentInstanceInfo.viewInstance.$destroy(); // don't let an exception in destroy kill the promise callback
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
