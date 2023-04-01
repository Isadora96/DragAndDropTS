import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})

export class FavoritesService {

  constructor(private http: HttpClient) {}
  
  private storaged = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : []
  private data = new BehaviorSubject<Array<string>>(this.storaged);

  getData() {
    return this.data.asObservable();
  }

  setData(arr: Array<string>) {
    this.data.next(arr);
  }

  getFavorites() {
      return this.http.get('./api/v1/favorites');
  }

  postFavorites(id: string) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return this.http.post('./api/v1/favorites', {'fav_id': id}, { headers }).pipe(map((result: any) => result));
  }
}
