import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ConfigurationService } from 'src/app/shared/configs/configuration.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pattern } from '../_models/pattern';
import { toFormData } from 'src/app/shared/_helpers/to-form-data';

type NewType = Pattern;

@Injectable({
  providedIn: 'root'
})
export class PatternsService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigurationService
  ) { }

  getAll(): Observable<Pattern[]> {
    return this.httpClient.get<Pattern[]>(
      this.configService.config?.devApiBaseUrl + `patterns`
    );
  }

  getById(id:number): Observable<Pattern> {
    return this.httpClient.get<Pattern>(
      this.configService.config?.devApiBaseUrl + `patterns/${id}`
    );
  }

  updateCreate(id:number, pattern: any):Observable<any> {
    const fd = toFormData(pattern);
    if(id===0) {
      return this.httpClient.post<any>(
        this.configService.config?.devApiBaseUrl + `patterns`,fd
      );
    }
    return this.httpClient.put(
      this.configService.config?.devApiBaseUrl + `patterns/${id}`,
      pattern
    );
  }

  delete(id:number):Observable<any> {
    return this.httpClient.delete(
      this.configService.config?.devApiBaseUrl + `patterns/${id}`
    );
  }
}
