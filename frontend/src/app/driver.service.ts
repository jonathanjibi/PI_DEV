import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {driver} from './model/driver';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiServerUrl =environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getDrivers(): Observable<driver[]> {
    return this.http.get<driver[]>(`${this.apiServerUrl}/SpringMVC/servlet/retrieve-all-drivers`);
 
}
public addDriver(driver1 : driver): Observable<driver> {
  return this.http.post<driver>(`${this.apiServerUrl}/SpringMVC/servlet/add-driver`,driver1);
}
public updateDriver(driver : driver): Observable<driver> {
  return this.http.put<driver>(`${this.apiServerUrl}/driver/update`, driver);
}

public deleteDriver(driverId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiServerUrl}/SpringMVC/servlet/remove- driver/${driverId}`);
}
public getDriverMounth(): Observable<driver> {
  return this.http.get<driver>(`${this.apiServerUrl}/SpringMVC/servlet/drivermounth`);

}

}
