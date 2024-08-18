import {Component, Input} from '@angular/core';
import {Profile} from "../../data/interfaces/profile.interfaces";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.scss'
})
export class CardUserComponent {
  @Input() profile!: Profile;
}
