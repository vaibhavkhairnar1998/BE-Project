import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPage } from './product-detail.page';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
	{
		path: '',
		component: ProductDetailPage,
	},
];

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		IonicModule,
		SharedModule,
		RouterModule.forChild(routes),
	],
	declarations: [ProductDetailPage, CreateBookingComponent],
	entryComponents: [CreateBookingComponent],
})
export class ProductDetailPageModule {}
