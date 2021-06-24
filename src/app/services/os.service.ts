import { Os } from './../models/os';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  constructor(private http: HttpClient) { }

  findById(id: any):Observable<Os> {
    return this.http.get<Os>(`${API_CONFIG.baseUrl}/os/${id}`);
  }

  public findAll():Observable<Os[]> {
    return this.http.get<Os[]>(`${API_CONFIG.baseUrl}/os`);
  }

  create(os: Os):Observable<Os> {
    return this.http.post<Os>(`${API_CONFIG.baseUrl}/os`, os);
  }

  update(os: Os):Observable<Os> {
    return this.http.put<Os>(`${API_CONFIG.baseUrl}/os/${os.id}`, os);
  }
}
