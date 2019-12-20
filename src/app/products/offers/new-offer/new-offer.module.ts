import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { NewOfferPage } from "./new-offer.page";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
	{
		path: "",
		component: NewOfferPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		IonicModule,
		RouterModule.forChild(routes)
	],
	declarations: [NewOfferPage]
})
export class NewOfferPageModule {}
