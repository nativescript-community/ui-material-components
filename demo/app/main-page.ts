import * as observable from 'data/observable';
import * as pages from 'ui/page';
import { MainViewModel } from './main-view-model';
let model = new MainViewModel();
let page;
export function pageLoaded(args: observable.EventData) {
    page = <pages.Page>args.object;
    page.bindingContext = model;
    console.log('pageloaded');
}
