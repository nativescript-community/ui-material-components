import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import type { BottomSheetOptions as MaterialBottomSheetOptions } from '@nativescript-community/ui-material-bottomsheet';
import { AppHostView, DetachedLoader, once } from '@nativescript/angular';
import { LayoutBase, ProxyViewContainer, View } from '@nativescript/core';
import { Observable, Subject } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';

export type BaseShowBottomSheetOptions = Omit<MaterialBottomSheetOptions, 'closeCallback' | 'view'>;

export interface BottomSheetOptions extends BaseShowBottomSheetOptions {
    viewContainerRef?: ViewContainerRef;
}

export class BottomSheetParams {
    public constructor(public readonly context: any, public readonly closeCallback: (...args) => void) {}
}

type ViewWithDialogRoot = View & { _ngDialogRoot?: View };

@Injectable({
    providedIn: 'root'
})
export class BottomSheetService {
    private readonly results$ = new Subject<{ sheetId: number; result: any }>();

    private detachedLoader: ComponentRef<DetachedLoader>;

    private componentView: View;

    private nextSheetId = 0;

    public show<T = any>(type: Type<any>, options: BottomSheetOptions): Observable<T> {
        return this.showWithCloseCallback(type, options).observable;
    }

    public showWithCloseCallback<T = any>(type: Type<any>, options: BottomSheetOptions): { observable: Observable<T>; closeCallback: () => void } {
        if (!options.viewContainerRef) {
            throw new Error('No viewContainerRef: Make sure you pass viewContainerRef in BottomSheetOptions.');
        }

        const sheetId = this.nextSheetId++;
        const parentView = this.getParentView(options.viewContainerRef);
        const factoryResolver = this.getFactoryResolver(options.viewContainerRef);
        const bottomSheetParams = this.getBottomSheetParams(options.context, sheetId);

        this.detachedLoader = this.createDetachedLoader(factoryResolver, bottomSheetParams, options.viewContainerRef);

        this.loadComponent(type).then((componentView) => {
            parentView.showBottomSheet({
                ...options,
                ...bottomSheetParams,
                view: componentView
            });
        });

        return {
            observable: this.results$.pipe(
                filter((item) => item && item.sheetId === sheetId),
                map((item) => item.result),
                first()
            ),
            closeCallback: bottomSheetParams.closeCallback
        };
    }

    private getParentView(viewContainerRef: ViewContainerRef): View {
        let parentView = viewContainerRef.element.nativeElement as View;

        if (parentView instanceof AppHostView && parentView.ngAppRoot) {
            parentView = parentView.ngAppRoot;
        }

        // _ngDialogRoot is the first child of the previously detached proxy.
        // It should have 'viewController' (iOS) or '_dialogFragment' (Android) available for
        // presenting future bottomSheets views.
        if ((parentView as ViewWithDialogRoot)._ngDialogRoot) {
            parentView = (parentView as ViewWithDialogRoot)._ngDialogRoot;
        }

        return parentView;
    }

    private getFactoryResolver(componentContainer: ViewContainerRef): ComponentFactoryResolver {
        // resolve from particular module (moduleRef)
        // or from same module as parentView (viewContainerRef)
        return componentContainer.injector.get(ComponentFactoryResolver);
    }

    private createChildInjector(bottomSheetParams: BottomSheetParams, containerRef: ViewContainerRef): Injector {
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

    private getBottomSheetParams(context: any, sheetId: number): BottomSheetParams {
        const closeCallback = once((args) => {
            this.results$.next({ result: args, sheetId });

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

    private async loadComponent(type: Type<any>): Promise<View> {
        try {
            const componentRef = await this.detachedLoader.instance.loadComponent(type);
            const detachedProxy = componentRef.location.nativeElement as ProxyViewContainer;

            if (detachedProxy.getChildrenCount() > 1) {
                throw new Error('BottomSheet content has more than one root view.');
            }

            this.componentView = detachedProxy.getChildAt(0);

            if (this.componentView.parent instanceof LayoutBase) {
                (this.componentView.parent as ViewWithDialogRoot)._ngDialogRoot = this.componentView;
                this.componentView.parent.removeChild(this.componentView);
            }

            return this.componentView;
        } catch (err) {
            console.error(err);

            return null;
        }
    }
}
