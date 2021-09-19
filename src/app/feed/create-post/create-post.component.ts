import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/models/Photo';
import { FileUploadService } from 'src/file-upload.service';
import { v4 as uuidv4 } from 'uuid';

//component query : locations with this user's id, 
//species will be a search component and added to a list
//photo mutation will have an array of species id's and locationId to establish relationships
//location mutation - location componenet
//species mutation - species component
// will be added directly to the feed list

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  private fileToUpload : File;
  
  photoToCreate : Photo;
  userLocations : Location[];

  constructor(private uploadService : FileUploadService) { 
    this.photoToCreate = new Photo();
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    const file : File = event.target.files[0];

    if (file) {

      const name = event.target.files[0].name;
      const lastDot = name.lastIndexOf('.');

      const ext = name.substring(lastDot + 1);
      const renamedFile = new File([file], uuidv4() + '.' + ext , {type: file.type} );

      this.fileToUpload = renamedFile;
      //this.uploadService.uploadFileToBlob(renamedFile);
    }
  }

}
