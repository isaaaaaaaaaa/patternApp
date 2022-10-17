import { Injectable } from '@angular/core';
import { Configuration } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private configData!: Configuration
  constructor() { }

  setConfig(config : Configuration) {
    this.configData = config;
  }

  get config(): Configuration | undefined {
    return this.configData;
  }
}
