import {Component, OnDestroy, OnInit} from '@angular/core';
import {FeedbackService} from "../../../../data/service/feedback.service";
import {Feedback} from "../../../../data/schema/feedback";
import {Subscription} from "rxjs";
import {TokenService} from "../../../../shared/service/token.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../data/schema/user";
import {UserService} from "../../../../data/service/user.service";

@Component({
  selector: 'app-account-feedback',
  templateUrl: './account-feedback.component.html',
  styleUrls: []
})
export class AccountFeedbackComponent implements OnInit,OnDestroy{

  public feedbackObj:Feedback;
  public userObj:User;
  private sub = new Subscription();
  feedbackForm: FormGroup;

  constructor(private feedbackService:FeedbackService, private userService:UserService,private tokenService: TokenService) {
    this.buildFeedbackForm();
  }

  ngOnInit(): void {
    this.userObj = this.userService.getUserSubject();
  }

  private buildFeedbackForm(){
    this.feedbackForm = new FormGroup({
      feedback: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
      stars: new FormControl('', [Validators.required])
    });
  }

  private getUserFeedback(){
    this.sub = this.feedbackService.findFeedbackByUserId(+this.tokenService.extractObjectFromToken('userId')).subscribe(
      data =>{
        this.feedbackObj = data;
      }, error => {
        console.log(error);
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  onFeedbackSubmit() {
    const formValues = this.feedbackForm.value;
    const feedback = formValues.feedback;
    const selectedRating = parseInt(formValues.stars, 10);
    // console.log(selectedRating)
    let feedbackObj:Feedback = new Feedback(feedback,selectedRating,this.userObj);
    console.log(feedbackObj);
    this.sub = this.feedbackService.saveFeedback(feedback).subscribe();
  }
}

