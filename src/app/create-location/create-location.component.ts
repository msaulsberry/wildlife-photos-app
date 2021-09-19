import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Location } from '../models/Location'

const CREATE_LOCATION = gql`
  mutation CreateLocation($location: LocationInput) {
    createLocation(location: $location) {
      message
    }
  }
`;

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {

  location: Location;
  constructor(private apollo : Apollo) { }

  ngOnInit(): void {
  }

  createLocation() : void {

    let country = this.location.country;
    let description = this.location.description;
    let isPrivate = this.location.isPrivate; 

    this.apollo.mutate({
      mutation: CREATE_LOCATION,
      variables: {
        location: {
          country: country,
          description: description,
          isPrivate: isPrivate,
        }
      }
    }).subscribe(({ data }) => {
      //handle data coming back
    });
  }
  

}
