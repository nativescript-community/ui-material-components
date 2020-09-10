import { NativeScriptVue } from 'nativescript-vue';
import { BottomSheetOptions } from '../bottomsheet';
import { Vue } from 'vue/types/vue';
import { View } from '@nativescript/core';

export interface VueBottomSheetOptions extends Omit<BottomSheetOptions, 'view'> {
    props?: any;
}

declare module 'nativescript-vue' {
    interface NativeScriptVue <V = View> extends Vue{
        $showBottomSheet(component: typeof Vue, options?: VueBottomSheetOptions);
        $closeBottomSheet(...args);
    }
}

const BottomSheetPlugin = {
    install(Vue) {
        Vue.prototype.$showBottomSheet = function(component, options: VueBottomSheetOptions) {
            let navEntryInstance = new Vue({
                name: 'BottomSheetEntry',
                parent: this.$root,
                render: h =>
                    h(component, {
                        props: options.props,
                        key: component.toString()
                    })
            });
            navEntryInstance.$mount();
            this.nativeView.showBottomSheet(
                Object.assign({}, options, {
                    view: navEntryInstance.nativeView,
                    closeCallback: (...args) => {
                        if (navEntryInstance && navEntryInstance.nativeView) {
                            options.closeCallback && options.closeCallback.apply(undefined, args);
                            navEntryInstance.$emit('bottomsheet:close');
                            navEntryInstance.$destroy();
                            navEntryInstance = null;
                        }
                    }
                })
            );
        };
        Vue.prototype.$closeBottomSheet = function(...args) {
            (this.nativeView).closeBottomSheet.apply(this.nativeView, args);
        };
    }
};

export default BottomSheetPlugin;
