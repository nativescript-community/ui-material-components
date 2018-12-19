/// <reference path="../node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="../node_modules/tns-platform-declarations/android-26.d.ts" />


declare module 'tns-core-modules/ui/core/view' {
    interface View {
        // _modalContext: any;
        _showNativeModalView(parent: View, context: any, closeCallback: Function, fullscreen?: boolean, animated?: boolean, stretched?: boolean);
        _bottomSheetFragment: android.support.design.widget.BottomSheetDialogFragment;
        // _closeModalCallback: Function;

        _setupAsRootView(context: any): void;
        callLoaded(): void;
        callUnloaded(): void;
        _removeFromFrameStack(): void;
    }
}