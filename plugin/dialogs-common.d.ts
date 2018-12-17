import { Color } from 'tns-core-modules/ui/core/view';
import { Page } from 'tns-core-modules/ui/page/page';
declare module 'tns-core-modules/ui/dialogs' {
    function isDialogOptions(arg: any): boolean;
    function getTextFieldColor(): Color;
    function getLabelColor(): Color;
    function getButtonColors(): {
        color: Color;
        backgroundColor: Color;
    };
    function getCurrentPage(): Page;
    const STRING: string;
    const PROMPT: string;
    const CONFIRM: string;
    const ALERT: string;
    const LOGIN: string;
    const OK: string;
    const CANCEL: string;
}
