import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CarJSON} from "../../../../../data/schema/carJSON";
import {TokenService} from "../../../../../shared/service/token.service";
import {UserService} from "../../../../../data/service/user.service";
import {AccountService} from "../../../../../data/service/account.service";
import {SessionStorageService} from "../../../../../shared/service/session.service";
import {NgxSpinnerService} from "ngx-spinner";
import {CarJSONService} from "../../../../../data/service/car-json.service";
import {Subscription} from "rxjs";
import {ModelSeries} from "../../../../../data/schema/modelJSON";
import {FormControl, FormGroup} from "@angular/forms";
import Choices from "choices.js";
import * as Dropzone from 'dropzone';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit, OnDestroy {


  private sub = new Subscription();
  cars: CarJSON[] = [];
  filteredModels: ModelSeries[] = [];
  selectedCarId: number | null = null;
  carForm: FormGroup;
  modelChoices: Choices;

  files: File[] = [];
  dropzone: Dropzone;
  @ViewChild('imageGallery') imageGalleryRef: ElementRef;




  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private accountService: AccountService,
    private sessionService: SessionStorageService,
    private spinner: NgxSpinnerService,
    private carJSON: CarJSONService
  ) {

  }

  selectedImage: any; // Define the selectedImage variable in your component

  showFullView(image: any) {
    this.selectedImage = image;
  }

  closeFullView() {
    this.selectedImage = null;
  }


  ngOnInit(): void {
    this.modelChoices = new Choices(document.getElementById('mySelect'));
    this.buildCarForm();
    this.carJSON.fetchCarData().subscribe(data => {
      this.cars = data;
    });
    // Access the Dropzone instance
    const dropzoneElement = this.imageGalleryRef.nativeElement;
    const dropzoneOptions = {
      maxFiles: 5,
      addRemoveLinks: false
    };
    const dropzone = new Dropzone(dropzoneElement, dropzoneOptions);

    // Listen for the 'addedfile' event, which is triggered when a file is added to the gallery
    dropzone.on('addedfile', (file: Dropzone.DropzoneFile) => {
      // Access the file details
      const fileName = file.name;
      const fileSize = file.size;

      // Log the file details
      console.log('File added:', fileName);
      console.log('File size:', fileSize);
    });

    // Listen for the 'removedfile' event, which is triggered when a file is removed from the gallery
    dropzone.on('removedfile', (file: Dropzone.DropzoneFile) => {
      // Access the file details
      const fileName = file.name;

      // Log the file removal
      console.log('File removed:', fileName);
    });
  }


  private buildCarForm() {
    this.carForm = new FormGroup({
      make: new FormControl(''),
      model: new FormControl(''),
      year: new FormControl(''),
      color: new FormControl(''),
    });
  }

  private filterCarModel(id: number) {
    this.carJSON.fetchCarData().subscribe(data => {
      this.cars = data;
      console.log(this.cars);

      const car = this.cars.find(c => c.id == id);
      if (car) {
        this.filteredModels = car.model_series;
        this.setChoices();
      }
    });
  }

  private setChoices() {
    this.modelChoices.clearChoices();
    const choicesArray = this.filteredModels.map((modelSeries: ModelSeries) => ({
      value: modelSeries.name,
      label: modelSeries.name
    }));
    this.modelChoices.setChoices(choicesArray, 'value', 'label', true);
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  onMakeSelection(): void {
    this.filterCarModel(this.carForm.value.make);
  }

  onAddCarSubmit() {
    console.log("Submitted")
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
