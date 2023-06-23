import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../data/schema/user";
import {StorageService} from "../../../../../shared/service/storage.service";
import {Router} from "@angular/router";
import {DynamicScriptLoaderService} from "../../../../../shared/service/dynamic-script-loader-service.service";

@Component({
  selector: 'app-sign-up-2',
  templateUrl: './sign-up-two.component.html',
  styleUrls: ['./sign-up-two.component.css']
})
export class SignUpTwoComponent implements OnInit {
  userInfoForm: FormGroup;

  constructor(private storageService: StorageService, private router: Router, private dynamicScriptLoader: DynamicScriptLoaderService,) {
    this.buildForm();
  }


  onSubmit() {
    if (this.userInfoForm.valid) {
      const user: User = this.userInfoForm.value;
      this.storageService.saveObject("user", user)
      this.router.navigate(['/auth/sign-up'])
    } else {
      this.userInfoForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.unloadScripts();
    this.loadScripts();
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  private unloadScripts() {
    this.dynamicScriptLoader.unload('bootstrap.bundle.min', 'choices', 'tiny-slider', 'flatpickr', 'glightbox', 'functions').then(data => {
    }).catch(error => console.log(error));
  }

  ngOnDestroy(): void {
    this.unloadScripts();
  }

  private buildForm(): void {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl('', [Validators.required,]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl('', Validators.required)
    });
  }


}
