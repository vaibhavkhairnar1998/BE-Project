import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';

import { Profile } from '../auth/profile.model';
import { AuthService } from '../auth/auth.service';
import { take, switchMap, tap, map } from 'rxjs/operators';

interface ProfileResData {
	_id: string;
	name: string;
	userName: string;
	mobileNumber: number;
}

@Injectable({
	providedIn: 'root',
})
export class MyprofileService {
	private _profile = new BehaviorSubject<Profile>(null);

	constructor(private http: HttpClient, private authService: AuthService) {}

	getProfile() {
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				return this.http.get<ProfileResData>(
					'http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/users/myprofile',
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap((resData) => {
				const profile = new Profile(
					resData._id,
					resData.name,
					resData.userName,
					resData.mobileNumber
				);
				return of(profile);
			}),
			tap((profile) => {
				this._profile.next(profile);
			})
		);
	}

	updateProfile(userId: string, profileData: string) {
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				const updateOps = JSON.parse(profileData);
				return this.http.patch<ProfileResData>(
					`http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/users/myprofile/${userId}`,
					updateOps,
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap((resData) => {
				const profile = new Profile(
					resData._id,
					resData.name,
					resData.userName,
					resData.mobileNumber
				);
				return of(profile);
			}),
			tap((profile) => {
				this._profile.next(profile);
			})
		);
	}
}
