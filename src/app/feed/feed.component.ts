import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { FileUploadService } from 'src/file-upload.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  isAuthenticated: boolean;
  creatingPost: boolean;

  constructor(private uploadService: FileUploadService, private oktaAuth: OktaAuthService) { 
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
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

      this.uploadService.uploadFileToBlob(renamedFile);
    }
  }

  onCreatePost() {
    this.creatingPost = true;
  }

}
