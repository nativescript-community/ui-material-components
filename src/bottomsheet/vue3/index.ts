import { createNativeView } from 'nativescript-vue';
import { Frame, View, ViewBase } from '@nativescript/core';
import { BottomSheetOptions } from '../bottomsheet';
import { ComponentCustomProperties } from '@vue/runtime-core';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $showBottomSheet(component: any, options: VueBottomSheetOptions): Promise<any>;
        $closeBottomSheet(...args);
    }
}

const modalStack = [];

const useBottomSheet = () => {
    const showBottomSheet = (component: any, options: VueBottomSheetOptions) => showSheet(component, options);
    const closeBottomSheet = (...args) => closeSheet(args);

    return {
        showBottomSheet,
        closeBottomSheet
    };
};

const showSheet = (component, options: VueBottomSheetOptions) =>
    new Promise((resolve: any) => {
        let resolved = false;

        const listeners = Object.entries(options.on ?? {}).reduce((listeners, [key, value]) => {
            listeners['on' + key.charAt(0).toUpperCase() + key.slice(1)] = value;
            return listeners;
        }, {});

        let navEntryInstance = createNativeView(
            component,
            Object.assign(
                options.props ?? {},
                listeners
            )
        );
        navEntryInstance.mount();

        const viewAttached = (options.view as View) ?? Frame.topmost().currentPage;

        viewAttached.showBottomSheet(
            Object.assign({}, options, {
                view: navEntryInstance.nativeView,
                closeCallback: (result) => {
                    if (resolved) {
                        return;
                    }
                    if (options.closeCallback) {
                        options.closeCallback(result, navEntryInstance);
                    }
                    resolve(result);
                    if (navEntryInstance && navEntryInstance) {
                        navEntryInstance.unmount();
                        modalStack.pop();
                    }
                }
            })
        );
        modalStack.push(navEntryInstance);
    });
const closeSheet = (...args) => {
    const modalPageInstanceInfo = modalStack[modalStack.length - 1];
    if (modalPageInstanceInfo) {
        modalPageInstanceInfo.nativeView.closeBottomSheet(args);
    }
};

const BottomSheetPlugin = {
    install(app) {
        const globals = app.config.globalProperties;

        globals.$showBottomSheet = showSheet;
        globals.$closeBottomSheet = closeSheet;
    }
};

interface VueBottomSheetOptions extends Partial<BottomSheetOptions> {
    view?: string | View;
    props?: any;
    on?: Record<string, (...args: any[]) => any>;
}

export { BottomSheetPlugin, VueBottomSheetOptions, useBottomSheet };
