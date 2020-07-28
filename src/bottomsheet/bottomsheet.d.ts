import { View, ViewBase } from '@nativescript/core';
import { BottomSheetOptions } from './bottomsheet-common';

export { BottomSheetOptions };

export declare abstract class ViewWithBottomSheetBase extends View {
    // used when triggering the closing of the bottomsheet
    protected _closeBottomSheetCallback: Function;
    // used when the bottomSheet is dismissed
    public _onDismissBottomSheetCallback: Function;
    _bottomSheetFragment: any; // com.google.android.material.bottomsheet.BottomSheetDialogFragment
    protected abstract _hideNativeBottomSheet(parent: any, whenClosedCallback: any): void;
    protected _bottomSheetContext: any;
    _raiseShownBottomSheetEvent(): void;
    public _bottomSheetClosed(): void;
    protected abstract _showNativeBottomSheet(parent: View, options: BottomSheetOptions): void;
    protected _commonShowNativeBottomSheet(parent: View, options: BottomSheetOptions): void;
    protected _raiseShowingBottomSheetEvent(): void;
    public closeBottomSheet(...args: any): void;

    public showBottomSheet(options: BottomSheetOptions): ViewBase;
}
export function install(): void;
