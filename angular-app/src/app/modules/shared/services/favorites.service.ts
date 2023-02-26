import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private data = new BehaviorSubject<number | undefined>(0);

  getData() {
    return this.data.asObservable();
  }

  setData(number: number | undefined) {
    this.data.next(number);
  }
}
