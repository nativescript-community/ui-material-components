import { NativeScriptVue } from 'nativescript-vue';
import { BottomSheetOptions } from '../bottomsheet';
import { View } from '@nativescript/core';

export interface VueBottomSheetOptions extends Omit<BottomSheetOptions, 'view'> {
    props?: any;
    on?: Record<string, (...args: any[]) => any>;
}

declare module 'nativescript-vue' {
    interface NativeScriptVue<V = View> extends NativeScriptVue {
        $showBottomSheet(component: typeof NativeScriptVue, options?: VueBottomSheetOptions): Promise<any>;
        $closeBottomSheet(...args);
    }
}

let sequentialCounter = 0;

function serializeModalOptions(options) {
    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    const allowed = ['fullscreen'];

    return (
        Object.keys(options)
            .filter((key) => allowed.includes(key))
            .map((key) => `${key}: ${options[key]}`)
            .concat(`uid: ${++sequentialCounter}`)
            .join(', ') + '_bottomsheet'
    );
}

const BottomSheetPlugin = {
    install(Vue) {
        Vue.prototype.$showBottomSheet = function (component, options: VueBottomSheetOptions) {
            return new Promise((resolve: (...args) => void) => {
                let resolved = false;
                let navEntryInstance = new Vue({
                    name: 'BottomSheetEntry',
                    parent: this.$root,
                    render: (h) =>
                        h(component, {
                            props: options.props,
                            on: options.on,
                            key: serializeModalOptions(options)
                        })
                });
                navEntryInstance.$mount();
                this.nativeView.showBottomSheet(
                    Object.assign({}, options, {
                        view: navEntryInstance.nativeView,
                        closeCallback: (result) => {
                            if (resolved) {
                                return;
                            }
                            resolved = true;
                            if (options.closeCallback) {
                                options.closeCallback(result, navEntryInstance);
                            }
                            resolve(result);
                            if (navEntryInstance && navEntryInstance.nativeView) {
                                navEntryInstance.$emit('bottomsheet:close');
                                navEntryInstance.$destroy();
                                navEntryInstance = null;
                            }
                        }
                    })
                );
            });
        };
        Vue.prototype.$closeBottomSheet = function (...args) {
            this.nativeView.closeBottomSheet.apply(this.nativeView, args);
        };
    }
};

export default BottomSheetPlugin;
