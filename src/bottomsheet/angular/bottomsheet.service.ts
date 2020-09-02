import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import { AppHostView, DetachedLoader, once } from '@nativescript/angular';
import { ProxyViewContainer } from '@nativescript/core';
import { Observable, Subject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { BottomSheetOptions as MaterialBottomSheetOptions } from '@nativescript-community/ui-material-bottomsheet'; // ViewWithBottomSheetBase

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
    private componentView: any;//ViewWithBottomSheetBase;
    private subject$: Subject<{ requestId: number; result: any }> = new Subject();
    private currentId = 0;

    show<T = any>(type: Type<any>, options: BottomSheetOptions): Observable<T> {
        return this.showWithCloseCallback(type, options).observable;
    }

    showWithCloseCallback<T = any>(type: Type<any>, options: BottomSheetOptions): { observable: Observable<T>; closeCallback: () => void } {
        if (!options.viewContainerRef) {
            throw new Error('No viewContainerRef: Make sure you pass viewContainerRef in BottomSheetOptions.');
        }
        this.currentId++;
        const requestId = this.currentId;
        const parentView = this.getParentView(options.viewContainerRef);
        const factoryResolver = this.getFactoryResolver(options.viewContainerRef);
        const bottomSheetParams = this.getBottomSheetParams(options.context, requestId);

        this.detachedLoader = this.createDetachedLoader(factoryResolver, bottomSheetParams, options.viewContainerRef);

        this.loadComponent(type).then(componentView => {
            parentView.showBottomSheet({
                ...options,
                ...bottomSheetParams,
                view: componentView
            });
        });

        return {
            observable: this.subject$.pipe(
                filter(item => item && item.requestId === requestId),
                map(item => item.result),
                first()
            ),
            closeCallback: bottomSheetParams.closeCallback
        };
    }

    private getParentView(viewContainerRef: ViewContainerRef): any {//ViewWithBottomSheetBase {
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

    private getBottomSheetParams(context: any, requestId: number) {
        const closeCallback = once(args => {
            this.subject$.next({ result: args, requestId });

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

        return viewContainerRef.createComponent(detachedLoaderFactory, 0, childInjector, null);
    }

    private async loadComponent(type: Type<any>): Promise<any> {//ViewWithBottomSheetBase> {
        try {
            const componentRef = await this.detachedLoader.instance.loadComponent(type);
            const detachedProxy = componentRef.location.nativeElement as ProxyViewContainer;

            if (detachedProxy.getChildrenCount() > 1) {
                throw new Error('BottomSheet content has more than one root view.');
            }

            this.componentView = detachedProxy.getChildAt(0) as any;//ViewWithBottomSheetBase;

            if (this.componentView.parent) {
                (this.componentView.parent)._ngDialogRoot = this.componentView;
                (this.componentView.parent).removeChild(this.componentView);
            }

            return this.componentView;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}
