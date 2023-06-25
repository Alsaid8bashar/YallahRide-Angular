import {Component, Input} from '@angular/core';
import {User} from "../../../../data/schema/user";
import {UserDto} from "../../../../data/schema/UserDto";

@Component({
  selector: 'app-user-card-details',
  templateUrl: './user-card-details.component.html',
  styleUrls: ['./user-card-details.component.css']
})
export class UserCardDetailsComponent {

  @Input()
  userDto:UserDto;

  getFullStars(rate: number): number[] {
    const fullStars = Math.floor(rate);
    return Array(fullStars).fill(0);
  }

  hasHalfStar(rate: number): boolean {
    return rate - Math.floor(rate) >= 0.5;
  }
}
