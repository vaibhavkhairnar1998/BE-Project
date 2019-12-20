import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { ProductsPage } from "./products.page";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
	imports: [CommonModule, IonicModule, ProductsRoutingModule],
	declarations: [ProductsPage]
})
export class ProductsPageModule {}
