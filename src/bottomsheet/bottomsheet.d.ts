import { ViewBase } from 'tns-core-modules/ui/page/page';
import { BottomSheetOptions } from './bottomsheet-common';

export { BottomSheetOptions };
declare module 'tns-core-modules/ui/core/view' {
    interface View {
        showBottomSheet(options: BottomSheetOptions): ViewBase;
    }
}

declare function install();
