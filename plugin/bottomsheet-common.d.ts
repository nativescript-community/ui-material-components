import { EventData, View } from 'tns-core-modules/ui/core/view';
import { ViewBase } from 'tns-core-modules/ui/frame/frame';
import { BottomSheetOptions } from './bottomsheet';
export interface ShownBottomSheetData extends EventData {
    context?: any;
    closeCallback?: Function;
}
export declare const shownInBottomSheetEvent = "shownInBottomSheet";
export declare const showingInBottomSheetEvent = "showingInBottomSheet";
export declare abstract class ViewWithBottomSheetBase extends View {
    protected _closeBottomSheetCallback: Function;
    protected abstract _hideNativeBottomSheet(parent: any, whenClosedCallback: any): any;
    protected _bottomSheetContext: any;
    _raiseShownBottomSheetEvent(): void;
    _bottomSheetClosed(): void;
    protected _showNativeBottomSheet(parent: View, options: BottomSheetOptions): void;
    protected _raiseShowingBottomSheetEvent(): void;
    closeBottomSheet(...args: any[]): void;
    showBottomSheet(options: BottomSheetOptions): ViewBase;
}
