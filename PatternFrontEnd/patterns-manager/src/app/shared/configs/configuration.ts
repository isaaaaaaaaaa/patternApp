export interface Configuration {
  apiBaseUrl: string;
  mockapiBaseUrl: string;
  appName: string;
  environment:string;
  mockToken?: string;
  
  auth?: {
    audience?: string;
    clientId: string;
    connection?: string;
    domain: string;
    redirectUri?: string;
    scope?: string;
  };
}
