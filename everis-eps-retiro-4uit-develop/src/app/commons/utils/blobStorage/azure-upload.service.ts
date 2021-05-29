import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {}
  sendFile(url, file, length) {
  const headers = new HttpHeaders({
    'x-ms-blob-type': 'BlockBlob',
    'x-ms-content-length': length.toString(),
  });
  return  this.http.put(url, file, {
      headers,
    }).pipe(
      map(() => 'success')
    );
  }
}
