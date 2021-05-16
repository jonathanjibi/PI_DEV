import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { basket } from './model/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private apiServerUrl =environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getDrivers(): Observable<basket[]> {
    return this.http.get<basket[]>(`${this.apiServerUrl}/SpringMVC/servlet/retrieve-all-baskets`);
 
}
public addDriver(basket1 : basket): Observable<basket> {
  return this.http.post<basket>(`${this.apiServerUrl}/SpringMVC/servlet/add-basket`,basket1);
}
public updateDriver(driver : basket): Observable<basket> {
  return this.http.put<basket>(`${this.apiServerUrl}}/SpringMVC/servlet/modify-basket`, driver);
}

public deleteDriver(basketId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiServerUrl}/SpringMVC/servlet/remove-basket/${basketId}`);
}
}
