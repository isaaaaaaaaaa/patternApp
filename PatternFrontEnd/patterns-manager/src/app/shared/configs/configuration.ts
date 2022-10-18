export interface Configuration {
  apiBaseUrl: string;
  devApiBaseUrl:string;
  appName: string;
  environment:string;
  mockToken?: string;
  awsAccessKeyID: string;
  awsSecretAccessKeyID: string;
  awsRegion: string;
}
