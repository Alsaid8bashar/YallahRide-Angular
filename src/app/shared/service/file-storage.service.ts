import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';

import {
  S3Client,
  ListObjectsCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  GetObjectCommand
} from '@aws-sdk/client-s3';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {
  apiURL = environment.serverUrl + 'account/';
  bucket = environment.BucketName;
  accessKeyId = environment.accessKeyId;
  secretAccessKey = environment.secretAccessKey;
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: environment.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey
      }
    });
  }

  uploadFile(file: File): Observable<any> {
    const params = {
      Bucket: this.bucket,
      Key: file.name,
      Body: file
    };
    const command = new PutObjectCommand(params);

    return from(this.s3.send(command));
  }

  getFileUrl(fileName: string): Observable<string> {
    const params = {
      Bucket: this.bucket,
      Key: fileName
    };

    const getObjectCommand = new GetObjectCommand(params);

    return from(getSignedUrl(this.s3, getObjectCommand, {expiresIn: 3600 * 24}))
      .pipe(
        map(signedUrl => signedUrl as string)
      );
  }


  deleteFile(fileName: string): Observable<any> {
    const params = {
      Bucket: this.bucket,
      Key: fileName
    };
    const command = new DeleteObjectCommand(params);

    return from(this.s3.send(command));
  }

  deleteFiles(fileNames: string[]): Observable<any> {
    const deletePromises = fileNames.map(fileName => this.deleteFile(fileName).toPromise());

    return from(Promise.all(deletePromises));
  }

  getFilesByKeys(keys: string[]): Observable<any[]> {
    const params = {
      Bucket: this.bucket
    };
    const command = new ListObjectsCommand(params);

    return from(this.s3.send(command)).pipe(
      map((data: any) => {
        return data.Contents.filter((file: any) => keys.includes(file.Key));
      })
    );
  }
}
