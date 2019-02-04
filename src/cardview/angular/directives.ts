import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { CardView } from '../cardview';
import { isBlank } from 'nativescript-angular/lang-facade';

@Directive({
    selector: 'CardView'
})
export class CardViewDirective implements AfterViewInit {

    public card: CardView;
    private _viewInitialized: boolean;

    constructor(element: ElementRef) {
        this.card = element.nativeElement;
    }

    private _elevation: number;

    @Input()
    get elevation(): number {
        return this._elevation;
    }

    set elevation(value: number) {
        this._elevation = value;
        if (this._viewInitialized) {
            this.card.elevation = this._elevation;
        }
    }

    private _borderRadius: number;

    @Input()
    get borderRadius(): number {
        return this._borderRadius;
    }

    set borderRadius(value: number) {
        this._borderRadius = value;
        if (this._viewInitialized) {
            this.card.borderRadius = this._borderRadius;
        }
    }

    private _interactable: boolean;

    @Input()
    get interactable(): boolean {
        return this._interactable;
    }

    set interactable(value: boolean) {
        this._interactable = value;
        if (this._viewInitialized) {
            this.card.interactable = this._interactable;
        }
    }

    private _borderColor: string;

    @Input()
    get borderColor(): string {
        return this._borderColor;
    }

    set borderColor(value: string) {
        this._borderColor = value;
        if (this._viewInitialized) {
            this.card.borderColor = this._borderColor;
        }
    }

    private _borderWidth: number;

    @Input()
    get borderWidth(): number {
        return this._borderWidth;
    }

    set borderWidth(value: number) {
        this._borderWidth = value;
        if (this._viewInitialized) {
            this.card.borderWidth = this._borderWidth;
        }
    }

    ngAfterViewInit(): void {
        this._viewInitialized = true;
        if (!isBlank(this._elevation)) { this.card.elevation = this._elevation; }
        if (!isBlank(this._borderRadius)) { this.card.borderRadius = this._borderRadius; }
        if (!isBlank(this._interactable)) { this.card.interactable = this._interactable; }
        if (!isBlank(this._borderColor)) { this.card.borderColor = this.borderColor; }
        if (!isBlank(this._borderWidth)) { this.card.borderWidth = this._borderWidth; }
    }
}

export const DIRECTIVES = [CardViewDirective];
