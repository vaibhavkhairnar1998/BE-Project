import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CreateRequestPage } from './create-request/create-request.page';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {
  productSub: any;
  requests: Product[];
  backButtonSubscription: any;

  constructor(
    private productsService: ProductsService,
    private platform: Platform,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.productSub = this.productsService.products.subscribe((product) => {
    this.requests = product;
  });
  }
  ngAfterViewInit() {
		this.backButtonSubscription = this.platform.backButton.subscribe(() => {
			navigator["app"].exitApp();
		});
  }
  ngOnDestroy() {
		if (this.productSub) {
			this.productSub.unsubscribe();
		}
  }


}
