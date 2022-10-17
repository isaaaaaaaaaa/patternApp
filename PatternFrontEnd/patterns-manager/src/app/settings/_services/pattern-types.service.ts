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
    let user;
    return this.httpClient.get<PatternType[]>(
      this.configService.config?.devApiBaseUrl + `/patterntypes`
    );
  }

}
