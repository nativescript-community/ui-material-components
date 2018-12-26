import { View } from 'tns-core-modules/ui/page/page';
import NativeScriptVue from 'nativescript-vue';
import { BottomSheetOptions } from '../bottomsheet';

declare module 'nativescript-vue' {
    interface NativeScriptVue {
        $showBottomSheet(component: typeof NativeScriptVue, options: VueBottomSheetOptions): void;
    }
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type VueBottomSheetOptions = Omit<BottomSheetOptions, 'view'> & {
    props: any;
};

type VueConstructor = typeof NativeScriptVue;

export default {
    install(VueClass: any) {
        const Vue = VueClass as VueConstructor;
        // Vue.mixin({
        //     created() {
        //         const self = this;
        //         this.$modal = {
        //             close(data) {
        //                 const entry = _findParentModalEntry(self);

        //                 if (entry) {
        //                     entry.closeCb(data);
        //                 }
        //             }
        //         };
        //     }
        // });

        Vue.prototype.$showBottomSheet = function(component: typeof NativeScriptVue, options: VueBottomSheetOptions) {
            const that: NativeScriptVue = this;
            // const defaultOptions = {};
            // build options object with defaults
            // options = Object.assign({}, defaultOptions, options);

            // return new Promise(resolve => {
            //     let resolved = false;
            //     const closeCb = data => {
            //         if (resolved) return;

            //         resolved = true;
            //         resolve(data);
            //         (modalPage as View).closeModal();

            //         // emitted to show up in devtools
            //         // for debugging purposes
            //         navEntryInstance.$emit('modal:close', data);
            //         navEntryInstance.$destroy();
            //     };

            // const navEntryInstance = new VueClass({
            //     name: 'ModalEntry',
            //     parent: this.$root,
            //     methods: {
            //         closeCb
            //     },
            //     render: h =>
            //         h(component, {
            //             props: options.props
            //         })
            // });
            // const modalPage: Page = navEntryInstance.$mount().$el.nativeView as Page;
            (that.nativeView as View).showBottomSheet(
                Object.assign(
                    {
                        view: new VueClass({
                            render: h =>
                                h(component, {
                                    props: options.props
                                })
                        }).$mount().nativeView
                    },
                    options
                )
            );
            // });
        };
    }
};
