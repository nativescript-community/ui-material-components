import { View } from 'tns-core-modules/ui/core/view';
import { ViewWithBottomSheetBase } from './bottomsheet-common';
import { BottomSheetOptions } from './bottomsheet';
declare module 'tns-core-modules/ui/core/view' {
    interface View {
        _showNativeModalView(parent: View, context: any, closeCallback: Function, fullscreen?: boolean, animated?: boolean, stretched?: boolean): any;
        _bottomSheetFragment: android.support.design.widget.BottomSheetDialogFragment;
        _setupAsRootView(context: any): void;
        callLoaded(): void;
        callUnloaded(): void;
        _removeFromFrameStack(): void;
    }
}
export declare class ViewWithBottomSheet extends ViewWithBottomSheetBase {
    protected _hideNativeBottomSheet(parent: View, whenClosedCallback: () => void): void;
    protected _showNativeBottomSheet(parent: View, options: BottomSheetOptions): void;
}
