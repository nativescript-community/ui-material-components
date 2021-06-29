import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, Type, ViewContainerRef } from '@angular/core';
import type { BottomSheetOptions as MaterialBottomSheetOptions } from '@nativescript-community/ui-material-bottomsheet';
import { AppHostView, DetachedLoader, once } from '@nativescript/angular';
import { LayoutBase, ProxyViewContainer, View } from '@nativescript/core';
import { Observable, Subject } from 'rxjs';

export type BaseShowBottomSheetOptions = Omit<MaterialBottomSheetOptions, 'closeCallback' | 'view'>;

export interface BottomSheetOptions extends BaseShowBottomSheetOptions {
    viewContainerRef?: ViewContainerRef;
}

export class BottomSheetParams {
    public constructor(public readonly context: any, public readonly closeCallback: (...args) => void) {}
}

type ViewWithDialogRoot = View & { _ngDialogRoot?: View };

interface SheetRef<TResult = unknown> {
    detachedLoader?: ComponentRef<DetachedLoader>;
    componentView?: View;
    result: Subject<TResult>;
}

@Injectable({
    providedIn: 'root'
})
export class BottomSheetService {
    public show<TResult = any>(type: Type<any>, options: BottomSheetOptions): Observable<TResult> {
        return this.showWithCloseCallback(type, options).observable;
    }

    public showWithCloseCallback<TResult = any>(type: Type<any>, options: BottomSheetOptions): { observable: Observable<TResult>; closeCallback: () => void } {
        if (!options.viewContainerRef) {
            throw new Error('No viewContainerRef: Make sure you pass viewContainerRef in BottomSheetOptions.');
        }

        const sheetRef: SheetRef<TResult> = {
            result: new Subject()
        };

        const parentView = this.getParentView(options.viewContainerRef);
        const factoryResolver = this.getFactoryResolver(options.viewContainerRef);
        const bottomSheetParams = this.getBottomSheetParams(options.context, sheetRef);

        sheetRef.detachedLoader = this.createDetachedLoader(factoryResolver, bottomSheetParams, options.viewContainerRef);

        this.loadComponent(type, sheetRef).then((componentView) => {
            parentView.showBottomSheet({
                ...options,
                ...bottomSheetParams,
                view: componentView
            });
        });

        return {
            observable: sheetRef.result,
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

    private getBottomSheetParams(context: any, sheetRef: SheetRef): BottomSheetParams {
        const closeCallback = once((args) => {
            const { result, componentView, detachedLoader } = sheetRef;

            result.next(args);
            result.complete();

            if (componentView) {
                componentView.closeBottomSheet();
            }

            if (detachedLoader) {
                detachedLoader.instance.detectChanges();
                detachedLoader.destroy();
            }
        });

        return new BottomSheetParams(context, closeCallback);
    }

    private createDetachedLoader(factoryResolver: ComponentFactoryResolver, bottomSheetParams: BottomSheetParams, viewContainerRef: ViewContainerRef): ComponentRef<DetachedLoader> {
        const detachedLoaderFactory = factoryResolver.resolveComponentFactory(DetachedLoader);
        const childInjector = this.createChildInjector(bottomSheetParams, viewContainerRef);

        return viewContainerRef.createComponent(detachedLoaderFactory, 0, childInjector);
    }

    private async loadComponent(type: Type<any>, sheetRef: SheetRef): Promise<View> {
        try {
            const componentRef = await sheetRef.detachedLoader.instance.loadComponent(type);
            const detachedProxy = componentRef.location.nativeElement as ProxyViewContainer;

            if (detachedProxy.getChildrenCount() > 1) {
                throw new Error('BottomSheet content has more than one root view.');
            }

            sheetRef.componentView = detachedProxy.getChildAt(0);

            if (sheetRef.componentView.parent instanceof LayoutBase) {
                (sheetRef.componentView.parent as ViewWithDialogRoot)._ngDialogRoot = sheetRef.componentView;
                sheetRef.componentView.parent.removeChild(sheetRef.componentView);
            }

            return sheetRef.componentView;
        } catch (err) {
            console.error(err);

            return null;
        }
    }
}
