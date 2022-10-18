import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { ConfigurationService } from './../../configs/configuration.service';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class FileUploadService {

// API url
baseApiUrl = "https://file.io"
private bucket!: S3Client;

constructor(
  private http:HttpClient,
  private configs: ConfigurationService) {

  this.bucket = new S3Client(
    {
      credentials: {
        accessKeyId: this.configs.config!.awsAccessKeyID,
        secretAccessKey: this.configs.config!.awsSecretAccessKeyID,
      },
      region: this.configs.config!.awsRegion,
    }
  );
 }

// Returns an observable
async upload(file: File):Promise<void> {

	const params = {
    Bucket: 'patterns-manager',
    Key: file.name,
    Body: file,
    ACL: 'public-read',
    ContentType: file.type
  };

	try {
    const response = await this.bucket.send(new PutObjectCommand(params));
    console.log("SUCCESS", response);
  } catch(error) {
    console.log("FAILURE", error);
  }
}
}
