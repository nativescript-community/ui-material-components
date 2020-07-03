import { SnackBar } from 'nativescript-material-snackbar';
import { isIOS } from 'tns-core-modules/platform';
var observable = require('data/observable');
var pageData = new observable.Observable();

const snackbar = new SnackBar();

export function onViewLoaded(args) {
    pageData.set('isIOS', isIOS);
    args.object.bindingContext = pageData;
}

export function showSimpleSnackbar() {
    snackbar.simple(`I'm a simple snackbar`).then((result) => console.log('Simple Snackbar:', result));
}

export function showActionSnackbar() {
    snackbar
        .action({
            message: `I'm a snackbar with an action`,
            actionText: 'Dismiss',
            hideDelay: 2000,
        })
        .then((result) => console.log('Action Snackbar:', result));
}

export function showColorfulSnackbar() {
    snackbar
        .action({
            message: `I'm a colorful snackbar`,
            textColor: 'green',
            actionTextColor: 'blue',
            backgroundColor: 'cyan',
            actionText: 'Dismiss',
            hideDelay: 2000,
        })
        .then((result) => console.log('Action Snackbar:', result));
}

export function showSnackbarWithOffset() {
    snackbar.action({
        message: `I'm a snackbar with bottom offset`,
        actionText: 'Dismiss',
        hideDelay: 2000,
        bottomOffset: 100, //Only on IOS, use view on android
    });
}

export function dismissSnackbar() {
    snackbar.dismiss().then((result) => console.log('Dismiss Snackbar:', result));
}
