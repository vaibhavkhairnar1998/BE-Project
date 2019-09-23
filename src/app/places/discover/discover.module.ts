import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { DiscoverPage } from "./discover.page";

const routes: Routes = [
	{
		path: "",
		component: DiscoverPage
	}
];

@NgModule({
	imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
	declarations: [DiscoverPage]
})
export class DiscoverPageModule {}
