import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShopApiService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl.replace(/\/?$/, '');

  // LOGIN
  login(username: string, password: string): Observable<{access: string; refresh: string}> {
    return this.http.post<{access: string; refresh: string}>(
      `${this.base}/auth/token/`,
      { username, password }
    );
  }

  // REFRESH TOKEN
  refresh(refresh: string): Observable<{access: string}> {
    return this.http.post<{access: string}>(
      `${this.base}/auth/token/refresh/`,
      { refresh }
    );
  }

  // PRODUCT LIST + FILTERS (page, min rating, ordering)
  getProducts(query: { page: number; pageSize: number; minRating: number; ordering: string }):
    Observable<{ count: number; results: any[] }> {

    let params = new HttpParams()
      .set('page', query.page)
      .set('page_size', query.pageSize)
      .set('min_rating', query.minRating)
      .set('ordering', query.ordering);

    return this.http.get<{ count: number; results: any[] }>(
      `${this.base}/products/`,
      { params }
    );
  }

  // PRODUCT RATING
  getRating(id: number):
    Observable<{ product_id: number; avg_rating: number; count: number }> {

    return this.http.get<{ product_id: number; avg_rating: number; count: number }>(
      `${this.base}/products/${id}/rating/`
    );
  }
}
