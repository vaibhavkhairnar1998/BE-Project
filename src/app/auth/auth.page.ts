import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ViewChildren, QueryList } from "@angular/core";

import { Platform, IonRouterOutlet, AlertController } from "@ionic/angular";

import { AuthService } from "./auth.service";
import { LoadingController } from "@ionic/angular";

@Component({
	selector: "app-auth",
	templateUrl: "./auth.page.html",
	styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit, OnDestroy {
	isLoading = false;
	backButtonSubscription;
	@ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

	constructor(
		private authService: AuthService,
		private router: Router,
		private loadingctrl: LoadingController,
		private platform: Platform,
		public alertController: AlertController
	) {}

	ngOnInit() {
		if (this.authService.userIsAuthenticated) {
			this.router.navigateByUrl("/products/tabs/discover");
		}
	}

	ngAfterViewInit() {
		this.backButtonSubscription = this.platform.backButton.subscribe(() => {
			navigator["app"].exitApp();
		});
	}

	onSubmit() {
		this.isLoading = true;
		this.authService.login();
		this.loadingctrl
			.create({ keyboardClose: true, message: "Logging In..." })
			.then((loadingEl) => {
				loadingEl.present();
				setTimeout(() => {
					this.isLoading = false;
					loadingEl.dismiss();
					this.router.navigateByUrl("/products/tabs/discover");
				}, 1500);
			});
	}

	ngOnDestroy() {
		this.backButtonSubscription.unsubscribe();
	}
}
