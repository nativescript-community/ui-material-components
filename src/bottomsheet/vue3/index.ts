import { App, createApp } from 'nativescript-vue3';
import { Frame, View, ViewBase } from '@nativescript/core';
import { BottomSheetOptions } from '../bottomsheet';
import { ComponentCustomProperties } from '@vue/runtime-core';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $showBottomSheet: (component: any, options: VueBottomSheetOptions) => Promise<any>;
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
                {
                    props: options.props
                },
                listeners
            )
        ).mount();

        const viewAttached = (options.view as View) ?? Frame.topmost().currentPage;

        viewAttached.showBottomSheet(
            Object.assign({}, options, {
                view: navEntryInstance.$el.nativeView,
                closeCallback: (...args) => {
                    if (resolved) {
                        return;
                    }
                    resolved = true;
                    if (navEntryInstance && navEntryInstance) {
                        options.closeCallback && options.closeCallback.apply(undefined, args);
                        resolve(...args);
                        navEntryInstance.$emit('bottomsheet:close');
                        navEntryInstance.$el = null;
                        navEntryInstance = null;
                        modalStack.splice(modalStack.length, 1);
                    }
                }
            })
        );
        modalStack.push(navEntryInstance);
    });
const closeSheet = (...args) => {
    const modalPageInstanceInfo = modalStack[modalStack.length - 1];
    if (modalPageInstanceInfo) {
        modalPageInstanceInfo.$el.nativeView.closeBottomSheet(args);
    }
};

const BottomSheetPlugin = {
    install(app) {
        const globals = app.config.globalProperties;

        globals.$showBottomSheet = showSheet;
        globals.$closeBottomSheet = closeSheet;
    }
};

const createNativeView = (component: any, props?: any): App => createApp(component, props);


interface VueBottomSheetOptions extends Partial<BottomSheetOptions> {
    view?: string | ViewBase;
    props?: any;
    on?: Record<string, (...args: any[]) => any>;
}

export { BottomSheetPlugin, VueBottomSheetOptions, useBottomSheet };
