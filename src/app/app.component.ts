import {Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardUserComponent} from "./common-ui/card-user/card-user.component";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardUserComponent, JsonPipe],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'twit next';

}
