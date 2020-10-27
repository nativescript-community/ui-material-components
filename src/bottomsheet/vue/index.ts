import { NativeScriptVue } from 'nativescript-vue';
import { BottomSheetOptions } from '../bottomsheet';
import { Vue } from 'vue/types/vue';
import { View } from '@nativescript/core';

export interface VueBottomSheetOptions extends Omit<BottomSheetOptions, 'view'> {
    props?: any;
}

declare module 'nativescript-vue' {
    interface NativeScriptVue <V = View> extends Vue{
        $showBottomSheet(component: typeof Vue, options?: VueBottomSheetOptions): Promise<any>;
        $closeBottomSheet(...args);
    }
}

let sequentialCounter = 0;

function serializeModalOptions(options) {
    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    const allowed = ['fullscreen'];

    return Object.keys(options)
        .filter(key => allowed.includes(key))
        .map(key => `${key}: ${options[key]}`)
        .concat(`uid: ${++sequentialCounter}`)
        .join(', ') + '_bottomsheet';
}

const BottomSheetPlugin = {
    install(Vue) {
        Vue.prototype.$showBottomSheet = function(component, options: VueBottomSheetOptions) {
            return new Promise((resolve: (...args) => void) => {
                let resolved = false;
                let navEntryInstance = new Vue({
                    name: 'BottomSheetEntry',
                    parent: this.$root,
                    render: h =>
                        h(component, {
                            props: options.props,
                            key: serializeModalOptions(options)
                        })
                });
                navEntryInstance.$mount();
                this.nativeView.showBottomSheet(
                    Object.assign({}, options, {
                        view: navEntryInstance.nativeView,
                        closeCallback: (...args) => {
                            if (resolved) {
                                return;
                            }
                            resolved = true;
                            if (navEntryInstance && navEntryInstance.nativeView) {
                                options.closeCallback && options.closeCallback.apply(undefined, args);
                                resolve(...args);
                                navEntryInstance.$emit('bottomsheet:close');
                                navEntryInstance.$destroy();
                                navEntryInstance = null;
                            }
                        }
                    })
                );
            });
        };
        Vue.prototype.$closeBottomSheet = function(...args) {
            (this.nativeView).closeBottomSheet.apply(this.nativeView, args);
        };
    }
};

export default BottomSheetPlugin;
