import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../data/service/user.service";
import {FileStorageService} from "../../../shared/service/files-storage.service";
import {HttpResponse} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  displayedFileUrl: SafeUrl;

  constructor(private userService: UserService, private fileService: FileStorageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getUserImage();
  }


  getUserImage() {
    const userImage = this.userService.getUserSubject().imagePath;
    console.error(userImage);
    this.fileService.getFile(userImage).subscribe(
      (response: HttpResponse<Blob>) => {
        this.displayedFileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response.body));
      },
      error => {
        console.log('Error fetching file:', error);
      }
    );
  }
}
