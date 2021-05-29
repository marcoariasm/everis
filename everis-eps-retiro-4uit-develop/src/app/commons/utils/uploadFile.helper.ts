import { Injectable } from '@angular/core';
import { SasGeneratorService } from './blobStorage/sas-generator.service';
import { UploadFileService } from './blobStorage/azure-upload.service';
import { RequestState } from '@aafp/commons/state/request.state';

const validFileType = ['jpeg', 'png', 'jpg', 'pdf'];

@Injectable({
  providedIn: 'root',
})
export class UploadFileHelper {
  constructor(
    private sasToken: SasGeneratorService,
    private upload: UploadFileService,
    private requestState: RequestState
  ) {}

  sendFile($event, afp, document, typeDocument) {
    let fileType = null;
    if ($event.length > 0) {
      fileType = this.getFiletype($event[0].name);
    }

    const isValidType = fileType ? this.isValidType(fileType): false;

    if (fileType && isValidType) {
      this.sasToken.getSasToken(fileType, afp, document, typeDocument).subscribe(
        (value) => {
          const filename = this.getFileName(value);
          this.setFileInfo(filename);
          if (value) {
            this.upload
              .sendFile(value, $event[0], $event[0].size)
              .subscribe((res) => {
                return res;
              });
          }
        },
        (err) => {
          console.error('ha ocurrido un error al obtener el token', err);
        }
      );
    }
  }

  setFileInfo(name) {
    this.requestState.action(name, 'FILE_NAME');
  }

  isValidType(type: string) {
    return validFileType.includes(type.toLowerCase());
  }

  getFiletype(filename: string) {
    let filetype = null;
    if (filename) {
      filetype = filename.split('.').pop();
    }
    return filetype;
  }

  getFileName(url) {
    return url.split('/').pop().split('?')[0];
  }
}
