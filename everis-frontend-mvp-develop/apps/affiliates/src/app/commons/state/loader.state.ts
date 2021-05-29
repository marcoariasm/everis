import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoaderState {
  private loaderState = new BehaviorSubject<boolean>(false);
  get loader() {
    return this.loaderState.asObservable();
  }
  open() {
    this.loaderState.next(true);
  }
  close() {
    this.loaderState.next(false);
  }
}
