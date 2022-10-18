import { ConfigurationService } from 'src/app/shared/configs/configuration.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatternType } from './../_models/pattern-type';

@Injectable({
  providedIn: 'root'
})
export class PatternTypesService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigurationService
  ) { }

  getAll(): Observable<PatternType[]> {
    return this.httpClient.get<PatternType[]>(
      this.configService.config?.devApiBaseUrl + `patterntypes`
    );
  }

  getById(id:number): Observable<PatternType> {
    return this.httpClient.get<PatternType>(
      this.configService.config?.devApiBaseUrl + `patterntypes/${id}`
    );
  }

  updateCreate(id:number, patternType: PatternType):Observable<any> {
    if(id===0) {
      return this.httpClient.post<any>(
        this.configService.config?.devApiBaseUrl + `patterntypes`,patternType
      );
    }
    return this.httpClient.put(
      this.configService.config?.devApiBaseUrl + `patterntypes/${id}`,
      patternType
    );
  }

  delete(id:number):Observable<any> {
    return this.httpClient.delete(
      this.configService.config?.devApiBaseUrl + `patterntypes/${id}`
    );
  }
}
