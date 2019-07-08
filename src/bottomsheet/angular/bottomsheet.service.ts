import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { DetachedLoader } from 'nativescript-angular';
import { AppHostView } from 'nativescript-angular/app-host-view';
import { once } from 'nativescript-angular/common/utils';
import { BottomSheetOptions as MaterialBottomSheetOptions } from '../bottomsheet-common';
import { ViewWithBottomSheetBase } from '../bottomsheet-common';
import { Observable, Subject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ProxyViewContainer } from 'tns-core-modules/ui/proxy-view-container';

export type BaseShowBottomSheetOptions = Pick<MaterialBottomSheetOptions, Exclude<keyof MaterialBottomSheetOptions, 'closeCallback' | 'view'>>;

export interface BottomSheetOptions extends BaseShowBottomSheetOptions {
    viewContainerRef?: ViewContainerRef;
}

export class BottomSheetParams {
    context: any;
    closeCallback: (...args) => void;

    constructor(context, closeCallback) {
        this.context = context;
        this.closeCallback = closeCallback;
    }
}

@Injectable({
    providedIn: 'root'
})
export class BottomSheetService {
    private detachedLoader: ComponentRef<DetachedLoader>;
    private componentView: ViewWithBottomSheetBase;
    private subject$: Subject<any> = new Subject();

    show<T = any>(type: Type<any>, options: BottomSheetOptions): Observable<T> {
        if (!options.viewContainerRef) {
            throw new Error('No viewContainerRef: Make sure you pass viewContainerRef in BottomSheetOptions.');
        }
        const parentView = this.getParentView(options.viewContainerRef);
        const factoryResolver = this.getFactoryResolver(options.viewContainerRef);
        const bottomSheetParams = this.getBottomSheetParams(options.context);

        this.detachedLoader = this.createDetachedLoader(factoryResolver, bottomSheetParams, options.viewContainerRef);

        this.loadComponent(type).then(componentView => {
            parentView.showBottomSheet({
                ...options,
                ...bottomSheetParams,
                view: componentView
            });
        });

        return this.subject$.pipe(
            filter(item => !!item),
            first()
        );
    }

    private getParentView(viewContainerRef: ViewContainerRef): ViewWithBottomSheetBase {
        let parentView = viewContainerRef.element.nativeElement;

        if (parentView instanceof AppHostView && parentView.ngAppRoot) {
            parentView = parentView.ngAppRoot;
        }

        // _ngDialogRoot is the first child of the previously detached proxy.
        // It should have 'viewController' (iOS) or '_dialogFragment' (Android) available for
        // presenting future bottomSheets views.
        if (parentView._ngDialogRoot) {
            parentView = parentView._ngDialogRoot;
        }

        return parentView;
    }

    private getFactoryResolver(componentContainer: ViewContainerRef): ComponentFactoryResolver {
        // resolve from particular module (moduleRef)
        // or from same module as parentView (viewContainerRef)
        return componentContainer.injector.get(ComponentFactoryResolver);
    }

    private createChildInjector(bottomSheetParams: BottomSheetParams, containerRef: ViewContainerRef) {
        return Injector.create({
            providers: [
                {
                    provide: BottomSheetParams,
                    useValue: bottomSheetParams
                }
            ],
            parent: containerRef.injector
        });
    }

    private getBottomSheetParams(context: any) {
        const closeCallback = once(args => {
            this.subject$.next(args);

            if (!this.componentView) {
                return;
            }

            this.componentView.closeBottomSheet();
            this.detachedLoader.instance.detectChanges();
            this.detachedLoader.destroy();
        });

        return new BottomSheetParams(context, closeCallback);
    }

    private createDetachedLoader(factoryResolver: ComponentFactoryResolver, bottomSheetParams: BottomSheetParams, viewContainerRef: ViewContainerRef): ComponentRef<DetachedLoader> {
        const detachedLoaderFactory = factoryResolver.resolveComponentFactory(DetachedLoader);
        const childInjector = this.createChildInjector(bottomSheetParams, viewContainerRef);

        return viewContainerRef.createComponent(detachedLoaderFactory, -1, childInjector, null);
    }

    private async loadComponent(type: Type<any>): Promise<ViewWithBottomSheetBase> {
        try {
            const componentRef = await this.detachedLoader.instance.loadComponent(type);
            const detachedProxy = <ProxyViewContainer>componentRef.location.nativeElement;

            if (detachedProxy.getChildrenCount() > 1) {
                throw new Error('BottomSheet content has more than one root view.');
            }

            this.componentView = detachedProxy.getChildAt(0) as ViewWithBottomSheetBase;

            if (this.componentView.parent) {
                (<any>this.componentView.parent)._ngDialogRoot = this.componentView;
                (<any>this.componentView.parent).removeChild(this.componentView);
            }

            return this.componentView;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
