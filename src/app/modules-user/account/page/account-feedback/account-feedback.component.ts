import {Component, OnDestroy, OnInit} from '@angular/core';
import {FeedbackService} from "../../../../data/service/feedback.service";
import {Feedback} from "../../../../data/schema/feedback";
import {Subscription} from "rxjs";
import {TokenService} from "../../../../shared/service/token.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../data/schema/user";
import {UserService} from "../../../../data/service/user.service";
import Choices from "choices.js";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-account-feedback',
  templateUrl: './account-feedback.component.html',
  styleUrls: []
})
export class AccountFeedbackComponent implements OnInit, OnDestroy {
  public feedbackObj: Feedback;
  public userObj: User;
  private sub = new Subscription();
  feedbackForm: FormGroup;
  ratingChoices: Choices;
  public flag: boolean;
  const
  ratings = [{
    value: 5,
    label: "★★★★★"
  }, {
    value: 4,
    label: "★★★★☆"
  }, {
    value: 3,
    label: "★★★☆☆"
  }, {
    value: 2,
    label: "★★☆☆☆"
  }, {
    value: 1,
    label: "★☆☆☆☆"
  },]

  constructor(private feedbackService: FeedbackService, private userService: UserService, private tokenService: TokenService,private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.getUserFeedback();
    this.userObj = this.userService.getUserSubject();
    this.buildFeedbackForm();
    this.ratingChoices = new Choices(document.getElementById('rating'));
    this.setRatingChoices();
  }


  private buildFeedbackForm() {
    this.feedbackForm = new FormGroup({
      feedback: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
      stars: new FormControl('', [Validators.required])
    });
  }

  private async getUserFeedback(): Promise<void> {
    this.spinner.show();
    try {
      const data = await this.feedbackService.findFeedbackByUserId(+this.tokenService.extractObjectFromToken('userId')).toPromise();
      this.flag = true;
      this.feedbackObj = data;
      this.ratingChoices._findAndSelectChoiceByValue(this.feedbackObj.starts.toString());
      this.ratingChoices.disable();
      if (this.feedbackObj) {
        this.feedbackForm.patchValue({
          feedback: this.feedbackObj.feedback,
          stars: String(this.feedbackObj.starts)
        });
      }
    } catch (error) {
      console.log('Error retrieving user feedback:', error.status);
      this.flag = false;
      this.spinner.hide();
    }
    this.spinner.hide();
  }


  private setRatingChoices() {
    this.ratings.forEach((rating) => {
      this.ratingChoices._addChoice({value: rating.value.toString(), label: rating.label});
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  onFeedbackSubmit() {
    const formValues = this.feedbackForm.value;
    const feedback = formValues.feedback;
    const selectedRating = parseInt(formValues.stars, 10);
    let feedbackObj: Feedback = new Feedback(feedback, selectedRating, this.userObj);
    this.sub = this.feedbackService.saveFeedback(feedbackObj).subscribe(() => {
    }, error => {
      console.log(error)
    });
  }
}

