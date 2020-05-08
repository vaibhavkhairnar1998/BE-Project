import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { RouterExtensions } from "nativescript-angular/router";

import { Platform } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';

import { AuthService } from './auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
	private authSub: Subscription;
	private previousState: boolean = false;

	constructor(
		private platform: Platform,
		private authService: AuthService,
		private router: Router
	) {
		this.initializeApp();
	}

	ngOnInit() {
		this.authSub = this.authService.userIsAuthenticated.subscribe((isAuth) => {
			if (!isAuth && this.previousState !== isAuth)
				this.router.navigateByUrl('/auth');
			this.previousState = isAuth;
		});
	}

	initializeApp() {
		this.platform.ready().then(() => {
			if (Capacitor.isPluginAvailable('SplashScreen')) {
				Plugins.SplashScreen.hide();
			}
		});
	}

	onLogout() {
		this.authService.logout();
		window.location.reload();
	}

	ngOnDestroy() {
		if (this.authSub) this.authSub.unsubscribe();
	}
}
