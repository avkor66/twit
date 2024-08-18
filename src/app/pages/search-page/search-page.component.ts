import {Component, inject} from '@angular/core';
import {CardUserComponent} from "../../common-ui/card-user/card-user.component";
import {ProfileService} from "../../data/servises/profile.service";
import {Profile} from "../../data/interfaces/profile.interfaces";
import {ProfileFiltersComponent} from "./profile-filters/profile-filters.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CardUserComponent,
    ProfileFiltersComponent,
    AsyncPipe
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {


  profileService = inject(ProfileService)
  profiles = this.profileService.filteredProfiles

  constructor() {
  }
}
