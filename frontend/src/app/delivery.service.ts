import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { delivery } from './model/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiServerUrl =environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getDeliveries(): Observable<delivery[]> {
    return this.http.get<delivery[]>(`${this.apiServerUrl}/SpringMVC/servlet/retrieve-all-deliveries`);
 
}
public addDriver(delivery1 : delivery): Observable<delivery> {
  return this.http.post<delivery>(`${this.apiServerUrl}/SpringMVC/servlet/add-delivery`,delivery1);
}
public updateDelivery(delivery1 : delivery): Observable<delivery> {
  return this.http.put<delivery>(`${this.apiServerUrl}/driver/update`, delivery1);
}

public deleteDelivery(deliveryId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiServerUrl}/SpringMVC/servlet/remove-delivery/${deliveryId}`);
}

}
