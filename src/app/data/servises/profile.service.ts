import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/profile.interfaces";
import {Pageble} from "../interfaces/pageble.interface";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient)

  baseUrl = "https://icherniakov.ru/yt-course";

  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([])

  getTestAccount() {
    return this.http.get<Profile[]>(`${this.baseUrl}/account/test_accounts`)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseUrl}/account/me`)
      .pipe(
        tap(profile => this.me.set(profile))
      )
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseUrl}/account/${id}`)
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http.get<Pageble<Profile>>(`${this.baseUrl}/account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0,subsAmount))
      )
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(
      `${this.baseUrl}/account/me`,
      profile
    )
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append("image", file);
    return this.http.post<Profile>(
      `${this.baseUrl}/account/upload_image`,
      fd
    )
  }

  filterProfiles(params: Record<string, any>) {

    return this.http.get<Pageble<Profile>>(
      `${this.baseUrl}/account/accounts`,
      {
        params
      }
    ).pipe(
      tap(res => this.filteredProfiles.set(res.items)),
    )
  }
}
