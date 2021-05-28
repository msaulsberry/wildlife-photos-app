import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../models/User';

const CREATE_USER = gql `
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) { 
      success
      message
    }
  }
`;

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  user: User;
  constructor(private apollo : Apollo) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

  submit() {

    let email = this.user.email;
    let first = this.user.first;
    let last = this.user.last; 

    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        user: {
          email: email,
          first: first,
          last: last,
        }
      }
    }).subscribe(({ data }) => {

    });
  }
}
