import { ViewBase } from "tns-core-modules/ui/page/page"

declare module "tns-core-modules/ui/core/view" {
    interface View {
        /**
         * Shows the View contained in moduleName as a modal view.
         * @param moduleName - The name of the module to load starting from the application root.
         * @param context - Any context you want to pass to the modally shown view.
         * This same context will be available in the arguments of the shownModally event handler.
         * @param closeCallback - A function that will be called when the view is closed.
         * Any arguments provided when calling ShownModallyData.closeCallback will be available here.
         * @param fullscreen - An optional parameter specifying whether to show the modal view in full-screen mode.
         * @param animated - An optional parameter specifying whether to show the modal view with animation.
         * @param stretched - An optional parameter specifying whether to stretch the modal view when not in full-screen mode.
         */
        showBottomSheet(
            moduleName: string,
            context: any,
            closeCallback: Function
        ): ViewBase

        /**
         * Shows the view passed as parameter as a modal view.
         * @param view - View instance to be shown modally.
         * @param context - Any context you want to pass to the modally shown view. This same context will be available in the arguments of the shownModally event handler.
         * @param closeCallback - A function that will be called when the view is closed. Any arguments provided when calling ShownModallyData.closeCallback will be available here.
         * @param fullscreen - An optional parameter specifying whether to show the modal view in full-screen mode.
         * @param animated - An optional parameter specifying whether to show the modal view with animation.
         * @param stretched - An optional parameter specifying whether to stretch the modal view when not in full-screen mode.
         */
        showBottomSheet(
            view: ViewBase,
            context: any,
            closeCallback: Function
        ): ViewBase
    }
}
