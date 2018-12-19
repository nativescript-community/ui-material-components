import { View } from 'tns-core-modules/ui/core/view';

export interface SnackBarOptions {
    /**
     * The action button text of the snackbar.
     */
    actionText: string;

    /**
     * The text of the snackbar.
     */
    snackText: string;

    /**
     * Delay to hide the snackbar.
     */
    hideDelay: number;

    /**
     * Action Text Color of the snackbar.
     */
    actionTextColor?: string;

    /**
     * Text Color of the snackbar.
     */
    textColor?: string;

    /**
     * Background Color of the snackbar.
     */
    backgroundColor?: string;
    /**
     * *Android Only*
     * Set the maxLines if you are displaying a long string of text and it will wrap.
     */
    maxLines?: number;

    /**
     * *Android Only*
     * Use RTL for textview of snackbar.
     */
    isRTL?: boolean;

    /**
     * *Android Only*
     * The View to which the snackbar will be attached. Useful with modals.
     * Default to topmost().currentPage
     */
    view?: View;
}

export enum DismissReasons {
    SWIPE = 'Swipe',
    ACTION = 'Action',
    TIMEOUT = 'Timeout',
    MANUAL = 'Manual',
    CONSECUTIVE = 'Consecutive',
    UNKNOWN = 'Unknown'
}
