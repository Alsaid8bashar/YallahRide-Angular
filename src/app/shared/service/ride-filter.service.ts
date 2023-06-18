import {Injectable} from '@angular/core';
import moment from "moment/moment";
import {Ride} from "../../data/schema/ride";

@Injectable({
  providedIn: 'root'
})
export class RideFilterService {

  constructor() {
  }

  private rides: Ride[];

  filterByLowestPrice() {
    return this.rides.sort((a, b) => {
      return a.cost - b.cost;
    });
  }

  filterByEarliestDeparture() {
    return this.rides.sort((a, b) => {
      const timeA = new Date('1970-01-01T' + a.departureTime);
      const timeB = new Date('1970-01-01T' + b.departureTime);
      if (timeA < timeB) {
        return -1;
      } else if (timeA > timeB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  filterRidesBeforeSixAM() {
    return this.rides.filter(ride => {
      const departureTime = moment(ride.departureTime, 'h:mm a');
      return departureTime.isBefore(moment('06:00 am', 'h:mm a'));
    });
  }

  filterRidesSixAMToTwelvePM() {
    return this.rides.filter(ride => {
      const departureTime = moment(ride.departureTime, 'h:mm a');
      return departureTime.isBetween(moment('06:00 am', 'h:mm a'), moment('12:00 pm', 'h:mm a'), undefined, '[)');
    });
  }

  filterRidesTwelvePMToSixPM() {
    return this.rides.filter(ride => {
      const departureTime = moment(ride.departureTime, 'h:mm a');
      return departureTime.isBetween(moment('12:01 pm', 'h:mm a'), moment('06:00 pm', 'h:mm a'), undefined, '[)');
    });
  }

  filterRidesAfterSixPM() {
    return this.rides.filter(ride => {
      const departureTime = moment(ride.departureTime, 'h:mm a');
      return departureTime.isAfter(moment('06:00 pm', 'h:mm a'));
    });
  }

  filterByCapacity(minCapacity: number, maxCapacity: number) {
    return this.rides.filter(item => {
      return item.seats >= minCapacity && item.seats <= maxCapacity;
    });
  }

  filterByPrice(minPrice: number, maxPrice: number) {
    return this.rides.filter(item => {
      return item.cost >= minPrice && item.cost <= maxPrice;
    });
  }

  filterRidesByMaxCapacity() {
    return this.rides.filter(ride => {
      return ride.seats >= 2;
    });
  }

  filterRidesByInstantBooking() {
    return this.rides.filter(ride => {
      return ride.instantBooking == true;
    });
  }

  filterRidesByIsSmokingAllowed() {
    return this.rides.filter(ride => {
      const driverPreferenceIds = ride.driver.travelPreferences.map(pref => pref.id);
      return driverPreferenceIds.includes(7) || driverPreferenceIds.includes(8);
    });
  }
  filterRidesByIsPetsAllowed() {
    return this.rides.filter(ride => {
      const driverPreferenceIds = ride.driver.travelPreferences.map(pref => pref.id);
      return driverPreferenceIds.includes(10) || driverPreferenceIds.includes(11);
    });
  }
  // filterRidesByIsDriverVerified() {
  //   return this.rides.filter(ride => {
  //     return ride.driver. == true;
  //   });
  // }

  applyFilters(formValues: any, rides: Ride[]) {
    this.rides = rides;

    if (formValues.earliestDeparture) {
      this.rides = this.filterByEarliestDeparture();
    }

    if (formValues.lowestPrice) {
      this.rides = this.filterByLowestPrice();
    }

    if (formValues.before) {
      this.rides = this.filterRidesBeforeSixAM();
    }

    if (formValues.morning) {
      this.rides = this.filterRidesSixAMToTwelvePM();
    }

    if (formValues.afternoon) {
      this.rides = this.filterRidesTwelvePMToSixPM();
    }

    if (formValues.evening) {
      this.rides = this.filterRidesAfterSixPM();
    }

    // if (formValues.Verified) {
    //   // Apply the filterRidesByMaxCapacity function here
    //   this.rides = this.filterRidesByMaxCapacity();
    // }

    if (formValues.Max2) {
      this.rides = this.filterRidesByMaxCapacity();
    }

    if (formValues.InstantBooking) {
      this.rides = this.filterRidesByInstantBooking();
    }

    if (formValues.Smokingallowed) {
      this.rides = this.filterRidesByIsSmokingAllowed();
    }

    if (formValues.Petsallowed) {
      this.rides = this.filterRidesByIsPetsAllowed();
    }

    return this.rides;
  }
}
