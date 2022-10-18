import { ConfigurationService } from 'src/app/shared/configs/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatternCompany } from './../_models/pattern-company';

@Injectable({
  providedIn: 'root'
})
export class PatternCompaniesService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigurationService
  ) { }

  getAll(): Observable<PatternCompany[]> {
    return this.httpClient.get<PatternCompany[]>(
      this.configService.config?.devApiBaseUrl + `patterncompanies`
    );
  }

  getById(id:number): Observable<PatternCompany> {
    return this.httpClient.get<PatternCompany>(
      this.configService.config?.devApiBaseUrl + `patterncompanies/${id}`
    );
  }

  updateCreate(id:number, patternCompany: PatternCompany):Observable<any> {
    if(id===0) {
      return this.httpClient.post<any>(
        this.configService.config?.devApiBaseUrl + `patterncompanies`,patternCompany
      );
    }
    return this.httpClient.put(
      this.configService.config?.devApiBaseUrl + `patterncompanies/${id}`,
      patternCompany
    );
  }

  delete(id:number):Observable<any> {
    return this.httpClient.delete(
      this.configService.config?.devApiBaseUrl + `patterncompanies/${id}`
    );
  }
}
