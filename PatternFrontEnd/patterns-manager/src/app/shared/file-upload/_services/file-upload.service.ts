import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { ConfigurationService } from './../../configs/configuration.service';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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

  const command = new PutObjectCommand(params);

	try {
    const preSignedURL = await getSignedUrl(this.bucket, command, { expiresIn: 3600});
console.log(preSignedURL);
    this.http.put(preSignedURL, file).subscribe({
      next: (res) => {
        console.log("SUCCESS", res);
      },
      error: (err) => {
        console.log("FAILED", err);
      },
      complete: () => {
        console.log("DONE")
      }
    })
  } catch(err) {
    console.log(err);
  }
}
}
