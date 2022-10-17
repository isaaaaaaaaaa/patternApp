import { ConfigurationService } from './shared/configs/configuration.service';
import { Injectable } from '@angular/core';

declare var window: any;

@Injectable()
export class AppInitService {

  constructor(private configService: ConfigurationService)
             {}

  public async init() {

      var response = await fetch('assets/app-config.json');
      var json = await response.json();
      this.configService.setConfig(json);

      return json;

    }
}
