import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, take, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { Plugins } from '@capacitor/core';

import { User } from './user.model';
import { Profile } from './profile.model';

interface AuthResData {
	message: string;
	userId: string;
	email: string;
	token: string;
	tokenExpirationTime: number;
	refreshToken: string;
	refreshTokenExpirationTime: number;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService implements OnDestroy {
	private _user = new BehaviorSubject<User>(null);
	private activeLogoutTimer: any;

	get userIsAuthenticated() {
		return this._user.asObservable().pipe(
			map((user) => {
				if (!user) return false;
				else return !!user.token;
			})
		);
	}

	get userId() {
		return this._user.asObservable().pipe(
			map((user) => {
				if (!user) return null;
				else return user.id;
			})
		);
	}

	get token() {
		return this._user.asObservable().pipe(
			map((user) => {
				if (!user) return null;
				else return user.token;
			})
		);
	}

	constructor(private http: HttpClient) {}

	autoLogin() {
		return from(Plugins.Storage.get({ key: 'authData' })).pipe(
			map((storedData) => {
				if (!storedData || !storedData.value) return null;
				const parsedData = JSON.parse(storedData.value) as {
					userId: string;
					email: string;
					token: string;
					tokenExpirationTime: string;
					refreshToken: string;
					refreshTokenExpirationTime: string;
				};
				const tokenExpirationDate = new Date(parsedData.tokenExpirationTime);
				const refreshTokenExpirationDate = new Date(
					parsedData.refreshTokenExpirationTime
				);
				if (tokenExpirationDate <= new Date()) return null;
				const user = new User(
					parsedData.userId,
					parsedData.email,
					parsedData.token,
					tokenExpirationDate,
					parsedData.refreshToken,
					refreshTokenExpirationDate
				);
				return user;
			}),
			tap((user) => {
				if (user) {
					this._user.next(user);
					this.autoLogout(user.tokenDuration);
				}
			}),
			map((user) => {
				return !!user;
			})
		);
	}

	login(email: string, password: string) {
		return this.http
			.post<AuthResData>(
				'http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/users/login',
				{
					email: email,
					password: password,
				}
			)
			.pipe(
				tap((userData) => {
					const tokenExpirationDate = new Date(
						new Date().getTime() + userData.tokenExpirationTime * 1000
					);
					const refreshTokenExpirationDate = new Date(
						new Date().getTime() + userData.refreshTokenExpirationTime * 1000
					);
					const user = new User(
						userData.userId,
						userData.email,
						userData.token,
						tokenExpirationDate,
						userData.refreshToken,
						refreshTokenExpirationDate
					);
					this._user.next(user);
					this.autoLogout(user.tokenDuration);
					this.storeAuthData(
						userData.userId,
						userData.email,
						userData.token,
						tokenExpirationDate.toISOString(),
						userData.refreshToken,
						refreshTokenExpirationDate.toISOString()
					);
				})
			);
	}

	logout() {
		if (this.activeLogoutTimer) clearTimeout(this.activeLogoutTimer);
		this._user.next(null);
		Plugins.Storage.remove({ key: 'authData' });
	}

	private autoLogout(duration: number) {
		if (this.activeLogoutTimer) clearTimeout(this.activeLogoutTimer);
		this.activeLogoutTimer = setTimeout(() => {
			this.logout();
		}, duration);
	}

	signup(
		name: string,
		userName: string,
		mobileNumber: string,
		email: string,
		password: string
	) {
		return this.http.post<{ message: string }>(
			'http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/users/signup',
			{
				name,
				userName,
				mobileNumber,
				email,
				password,
			}
		);
	}

	private storeAuthData(
		userId: string,
		email: string,
		token: string,
		tokenExpirationTime: string,
		refreshToken: string,
		refreshTokenExpirationTime: string
	) {
		const authData = JSON.stringify({
			userId: userId,
			email: email,
			token: token,
			tokenExpirationTime: tokenExpirationTime,
			refreshToken: refreshToken,
			refreshTokenExpirationTime: refreshTokenExpirationTime,
		});
		Plugins.Storage.set({ key: 'authData', value: authData });
	}

	ngOnDestroy() {
		if (this.activeLogoutTimer) clearTimeout(this.activeLogoutTimer);
	}
}
