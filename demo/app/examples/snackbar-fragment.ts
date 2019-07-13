import { SnackBar } from 'nativescript-material-snackbar';

const snackbar = new SnackBar();

export function showSimpleSnackbar() {
    snackbar.simple(`I'm a simple snackbar`).then(result => console.log('Simple Snackbar:', result));
}

export function showActionSnackbar() {
    snackbar
        .action({
            message: `I'm a snackbar with an action`,
            actionText: 'Dismiss',
            hideDelay: 2000
        })
        .then(result => console.log('Action Snackbar:', result));
}

export function showColorfulSnackbar() {
    snackbar
        .action({
            message: `I'm a colorful snackbar`,
            textColor: 'green',
            actionTextColor: 'blue',
            backgroundColor: 'cyan',
            actionText: 'Dismiss',
            hideDelay: 2000
        })
        .then(result => console.log('Action Snackbar:', result));
}

export function dismissSnackbar() {
    snackbar.dismiss().then(result => console.log('Dismiss Snackbar:', result));
}
