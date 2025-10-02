import { Color, View } from '@nativescript/core';

import { SnackBarOptions } from './snackbar';
export { SnackBarOptions } from './snackbar';

export enum DismissReasons {
    SWIPE = 'swipe',
    ACTION = 'action',
    TIMEOUT = 'timeout',
    MANUAL = 'manual',
    CONSECUTIVE = 'consecutive',
    UNKNOWN = 'unknown'
}

export enum SnackBarAction {
    ACTION = 'action',
    NONE = 'none',
    DISMISS = 'dismiss'
}

export abstract class SnackBarBase {
    _options: SnackBarOptions;
    constructor(options?: SnackBarOptions) {
        this._options = options;
    }

    public simple(message: string, textColor?: string, backgroundColor?: string, maxLines?: number, isRTL?: boolean, view?: View): Promise<any> {
        return this.showSnack({
            message,
            textColor,
            backgroundColor,
            maxLines,
            isRTL,
            view
        });
    }

    public action(options: SnackBarOptions) {
        return this.showSnack(options);
    }

    public showSnack(options: SnackBarOptions) {
        // if (!options) {
        //     options = this._options;
        // }
        this._options = options;
        // return new Promise((resolve, reject) => {
        // try {
        // this.initSnack(options, resolve);
        return this.show();
        // } catch (ex) {
        // reject(ex);
        // }
        // });
    }
    abstract show();
    abstract dismiss();
    abstract initSnack(options: SnackBarOptions, resolve?: Function);
}
