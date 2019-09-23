import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { EditOfferPage } from "./edit-offer.page";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
	{
		path: "",
		component: EditOfferPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule
	],
	declarations: [EditOfferPage]
})
export class EditOfferPageModule {}
