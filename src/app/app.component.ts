import { Component } from "@angular/core";
import { Router } from "@angular/router";
// import { RouterExtensions } from "nativescript-angular/router";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AuthService } from "./auth/auth.service";
import { Capacitor, Plugins } from "@capacitor/core";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html"
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private authService: AuthService,
		private router: Router
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			if (Capacitor.isPluginAvailable("SplashScreen")) {
				Plugins.SplashScreen.hide();
			}
		});
	}

	onLogout() {
		this.authService.logout();
		// $rootScope.$viewHistory.backView = null;

		// $ionicViewService.nextViewOptions({
		//     disableBack: true
		// });

		window.location.reload();

		// this.router.navigateByUrl("/auth", { clearHistory: true });
	}
}
