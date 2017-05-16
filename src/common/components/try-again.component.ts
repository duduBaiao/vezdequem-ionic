import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    templateUrl: 'try-again.component.html',
    selector: 'try-again'
})
export class TryAgainComponent {

    @Input()
    message: string;

    @Output()
    onTried = new EventEmitter();

    tryAgain() {
        this.onTried.emit({});
    }
}