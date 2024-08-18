import {Component, inject, signal} from '@angular/core';
import {SvgIconComponent} from "../../../common-ui/svg-icon/svg-icon.component";
import {DndDirective} from "../../../common-ui/directives/dnd.directive";
import {FormsModule} from "@angular/forms";
import {ImgUrlPipe} from "../../../helpers/pipes/img-url.pipe";
import {ProfileService} from "../../../data/servises/profile.service";

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [
    SvgIconComponent,
    DndDirective,
    FormsModule,
    ImgUrlPipe
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  preview = signal<string>( '/assets/images/avatar-placeholder.png')
  profileService = inject(ProfileService)
  avatar: File | null = null

  ngAfterViewInit() {

    this.preview.set(this.profileService.baseUrl + '/' + this.profileService.me()?.avatarUrl)
  }

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0]
    this.processFile(file)
  }

  onFileDropped(file: File) {
    this.processFile(file)
  }

  processFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return

    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }

    reader.readAsDataURL(file)
    this.avatar = file
  }
}
