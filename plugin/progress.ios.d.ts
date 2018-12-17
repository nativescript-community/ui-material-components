import { ProgressBase } from './progress-common';
export declare class Progress extends ProgressBase {
    nativeViewProtected: MDCProgressView;
    constructor();
    createNativeView(): MDCProgressView;
}
