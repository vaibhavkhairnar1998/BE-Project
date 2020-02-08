import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../../product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.page.html',
  styleUrls: ['./create-request.page.scss'],
})
export class CreateRequestPage implements OnInit {
  product: Product;
	private productSub: Subscription;
	isBookable = false;

  constructor(
    private menuCtrl: MenuController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private productsService: ProductsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
			if (!paramMap.has("placeId")) {
				this.navCtrl.navigateBack("/products/tabs/discover");
				return;
			}
			this.productSub = this.productsService
				.getProduct(paramMap.get("placeId"))
				.subscribe((product) => {
					this.product = product;
					this.isBookable =
						product.userId !== this.authService.userId;
				});
		});
  }
  onOpenMenu() {
    this.menuCtrl.toggle();
  

}
}
