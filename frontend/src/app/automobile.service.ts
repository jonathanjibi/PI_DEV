import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { automobile } from './model/automobile';

@Injectable({
  providedIn: 'root'
})
export class AutomobileService {

  private apiServerUrl =environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getDrivers(): Observable<automobile[]> {
    return this.http.get<automobile[]>(`${this.apiServerUrl}/SpringMVC/servlet/retrieve-all-automobile`);
 
}
public addDriver(auto1 : automobile): Observable<automobile> {
  return this.http.post<automobile>(`${this.apiServerUrl}/SpringMVC/servlet/add-automobile`,auto1);
}
public updateDriver(driver : automobile): Observable<automobile> {
  return this.http.put<automobile>(`${this.apiServerUrl}/driver/update`, driver);
}

public deleteDriver(idAuto: number): Observable<void> {
  return this.http.delete<void>(`${this.apiServerUrl}/SpringMVC/servlet/remove-automobile/${idAuto}`);
}
}
