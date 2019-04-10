declare module 'tns-core-modules/ui/core/view' {
    interface View {
        _setupAsRootView(context: any): void;
        callLoaded(): void;
        callUnloaded(): void;
    }
}
