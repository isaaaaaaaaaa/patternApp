import { ConfigurationService } from 'src/app/shared/configs/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pattern } from '../_models/pattern';

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

  updateCreate(id:number, pattern: Pattern):Observable<any> {
    if(id===0) {
      return this.httpClient.post<any>(
        this.configService.config?.devApiBaseUrl + `patterns`,pattern
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
