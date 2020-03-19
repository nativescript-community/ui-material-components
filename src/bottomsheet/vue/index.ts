import { NativeScriptVue } from 'nativescript-vue';
import { BottomSheetOptions } from '../bottomsheet';
import { Vue } from 'vue/types/vue';

export interface VueBottomSheetOptions extends Omit<BottomSheetOptions, 'view'> {
    props?: any;
}

declare module 'nativescript-vue' {
    interface NativeScriptVue {
        $showBottomSheet(component: typeof Vue, options?: VueBottomSheetOptions);
        $closeBottomSheet();
    }
}

const BottomSheetPlugin = {
    install(Vue) {
        Vue.prototype.$showBottomSheet = function (component, options: VueBottomSheetOptions) {
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
                    closeCallback: objId => {
                        options.closeCallback(undefined, [objId]);
                        navEntryInstance.$emit('bottomsheet:close');
                        navEntryInstance.$destroy();
                        navEntryInstance = null;
                    }
                })
            );
        };
        Vue.prototype.$closeBottomSheet = function () {
            this.nativeView.closeBottomSheet();
        };
    }
};

export default BottomSheetPlugin;
