import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private storaged = localStorage.getItem('favorites.courses') ? JSON.parse(localStorage.getItem('favorites.courses')!) : []
  private data = new BehaviorSubject<Array<string>>(this.storaged);

  getData() {
    return this.data.asObservable();
  }

  setData(arr: Array<string>) {
    this.data.next(arr);
  }
}
