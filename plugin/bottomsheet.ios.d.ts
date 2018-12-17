import { ViewWithBottomSheetBase } from './bottomsheet-common';
import { View } from 'tns-core-modules/ui/core/view';
import { BottomSheetOptions } from './bottomsheet';
export declare class ViewWithBottomSheet extends ViewWithBottomSheetBase {
    protected _showNativeBottomSheet(parent: View, options: BottomSheetOptions): void;
    protected _hideNativeBottomSheet(parent: View, whenClosedCallback: () => void): void;
}
