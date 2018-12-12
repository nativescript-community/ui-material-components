import { ViewModel } from './home-view-model';
import { EventData } from 'tns-core-modules/data/observable';

export function pageLoaded(args) {
    this.page = args.object;
    this.page.bindingContext = new ViewModel();
}