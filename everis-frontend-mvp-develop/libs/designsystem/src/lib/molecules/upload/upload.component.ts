import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'everis-afp-prima-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  @ViewChild('file') file: any;
  @Input() text = 'Subir archivo';
  @Input() icon = 'arrow_upward';
  @Input() multiple: boolean;
  @Input() formatAllow: string[] = ['pdf', 'png', 'jpg', 'jpeg','image/jpeg','application/pdf','image/png','image/jpg'];
  @Input() maxSize = 8;
  @Input() loadRequest = true;
  @Output() changeUpload = new EventEmitter<File>();
  @Output() clearUpload = new EventEmitter<number>();
  @Output() messageError = new EventEmitter<string>();

  public files: Set<File> = new Set();

  constructor() {}

  ngOnInit() {}

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    const format=files[0].type;
    const isPermit =format? this.formatAllow.indexOf(format.toLowerCase()):-1;
    const maxSizeFile = files[0].size / 1024 / 1024;
    if (isPermit === -1) {
      this.messageError.emit('Formato de archivo no permitido');
    } else if (maxSizeFile >= this.maxSize) {
      this.messageError.emit('El tamaño máximo permitido es de 8 MB');
    } else {
      this.changeUpload.emit(files[0]);
      this.files.clear();
    }
  }

  clear(idx: number) {
    this.files.clear();
    this.clearUpload.emit(idx);
  }

  addFiles() {
    this.file.nativeElement.click();
  }
}
