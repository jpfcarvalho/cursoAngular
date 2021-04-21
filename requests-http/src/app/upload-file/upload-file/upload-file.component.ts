import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';
import { UploeadFileService } from '../uploead-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;
  progress = 0;

  constructor(private service: UploeadFileService) { }

  ngOnInit(): void {
  }

  onChange(event){
    console.log(event);

    const selectFiles = <FileList>event.srcElement.files;
    //document.getElementById('customFileLabel').innerHTML = selectFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectFiles.length; i++) {
      fileNames.push(selectFiles[i].name);
      this.files.add(selectFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
    this.progress = 0;
  }

  onUpload(){
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, environment.BASE_URL + '/upload').pipe(
        uploadProgress(progress => this.progress = progress),
        filterResponse()
      ).subscribe(reponse => console.log('Upload Concluído'));
      // .subscribe((event: HttpEvent<Object>) => {
      //   //HttpEventType
      //  // console.log(event);
      //   if (event.type == HttpEventType.Response) {
      //     console.log('Upload Concluído');
      //   } else if (event.type == HttpEventType.UploadProgress) {
      //     const percentDone = Math.round(((event.loaded * 100)/ event.total));
      //    // console.log('Progresso', percentDone);
      //     this.progress = percentDone;
      //   }
      // });
    }
  }

  onDownloadExcel(){
    this.service.download(environment.BASE_URL + '/downloadExcel').subscribe((res: any) => {
      this.service.handleFile(res, 'report.xlsx');

    });
  }

  onDownloadPdf(){
    this.service.download(environment.BASE_URL + '/downloadPdf').subscribe((res: any) => {
      this.service.handleFile(res, 'report.pdf');

    });
  }

}
