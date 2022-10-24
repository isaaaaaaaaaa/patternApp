import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FileUploadService } from './_services/file-upload.service';

@Component({
  selector: 'pm-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  @Input() file: File | null = null; // Variable to store file
  @Output() fileChange = new EventEmitter<File>();
  fileName: string|undefined = '';
  // Inject service
  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit(): void {}

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file?.name;
    this.fileChange.emit(this.file!);
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;

    if (this.file !== null) {
      this.fileUploadService.upload(this.file);
    }
  }
}
