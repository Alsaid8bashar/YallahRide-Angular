import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Account} from "../../../../data/schema/account";
import {AccountService} from "../../../../data/service/account.service";
import {TokenService} from "../../../../shared/service/token.service";
import {User} from "../../../../data/schema/user";
import {SessionStorageService} from "../../../../shared/service/session.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../../../../data/service/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit, OnDestroy {

  private sub = new Subscription();
  accountObject: Account;
  userObject: User;
  userForm: FormGroup;
  emailForm: FormGroup;
  phoneNumberForm: FormGroup;

  constructor(private tokenService: TokenService, private userService:UserService ,private accountService: AccountService, private sessionService: SessionStorageService) {

  }

  ngOnInit(): void {
    this.setUserObject();
    this.setAccountObject();
    this.buildUserForm();
    this.prePopulateUserForm();
  }

  private buildUserForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.userObject.firstName, [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
      lastName: new FormControl(this.userObject.lastName, [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
      about: new FormControl(this.userObject.about, [Validators.required]),
      gender: new FormControl(this.userObject.gender),
    });
  }

  private prePopulateUserForm(){
    // Prepopulate the form values
    this.userForm.patchValue({
      firstName: this.userObject.firstName,
      lastName: this.userObject.lastName,
      about: this.userObject.about,
      gender: this.userObject.gender
    });
  }

  private setUserObject(){
    this.userObject = JSON.parse(this.sessionService.getItem('user')) as User;
    this.sub = this.userService.getUserById(this.userObject.id).subscribe(data => {
      console.log(data)
      this.userObject = data;
    }, error => {
      console.log(error)
    })
  }

  private setAccountObject(){
    this.sub = this.accountService.getAccountByID(+this.tokenService.extractObjectFromToken('accountId')).subscribe(data => {
      this.accountObject = data;
      this.accountObject.date = this.dateFormatter(this.accountObject.date);
    }, error => {
      console.log(error)
    })
  }

  dateFormatter(inputDate: string):string {
    const date = new Date(inputDate);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    return dateFormatter.format(date);
  }

  onUserChangesSubmit() {
    console.log("TEST")
    const formValues = this.userForm.value;
    this.userObject.firstName = formValues.firstName;
    this.userObject.lastName = formValues.lastName;
    this.userObject.about = formValues.about;
    this.userObject.gender = formValues.gender;

    console.log('FirstName:' + formValues.firstName);
    console.log('lastName:' + formValues.lastName);
    console.log('about:' + formValues.about);
    console.log('gender:' + formValues.gender);

    this.sub = this.userService.createUser(this.userObject).subscribe();

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
