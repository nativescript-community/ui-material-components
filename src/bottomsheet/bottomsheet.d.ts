import { ViewBase } from "tns-core-modules/ui/page/page"

export interface BottomSheetOptions {
    view: string | ViewBase // View instance to be shown in bottom sheet. Or the name of the module to load starting from the application root.
    context?: any //Any context you want to pass to the view shown in bottom sheet. This same context will be available in the arguments of the shownInBottomSheet event handler.
    animated?: boolean // An optional parameter specifying whether to show the sheet view with animation.
    dismissOnBackgroundTap?: boolean // An optional parameter specifying whether to dismiss the sheet when clicking on background.
    closeCallback?: Function //  A function that will be called when the view is closed. Any arguments provided when calling shownInBottomSheet.closeCallback will be available here.
    trackingScrollView?: string // optional id of the scroll view to track
}

declare module "tns-core-modules/ui/core/view" {

    interface View {
        showBottomSheet(options: BottomSheetOptions): ViewBase
    }
}

declare function install();


