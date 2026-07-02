// src/app/core/services/category.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Environment } from '../../../enviroments/enviroment';
import { Iuserprefrences } from '../models/Iuser';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  // Safe, dynamic URL initialization
  private readonly API_URL = `${Environment.apiURL}/users/categories`;

  getUserCategories(): Observable<Iuserprefrences[]> {
    return this.http.get<{ categories: Iuserprefrences[] }>(this.API_URL).pipe(
      map(response => response.categories),
      shareReplay(1)
    );
  }
}
