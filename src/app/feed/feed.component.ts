import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/file-upload.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    const file : File = event.target.files[0];

    if (file) {

      const name = event.target.files[0].name;
      const lastDot = name.lastIndexOf('.');

      const ext = name.substring(lastDot + 1);
      const renamedFile = new File([file], uuidv4() + '.' + ext , {type: file.type} );

      this.uploadService.uploadFileToBlob(renamedFile);
    }
  }

}
