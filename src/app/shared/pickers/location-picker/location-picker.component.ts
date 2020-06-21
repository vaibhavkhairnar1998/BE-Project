import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';

import { MapComponent } from '../../map/map.component';
import { ProductLocation } from '../../../products/product-location.model';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-location-picker',
	templateUrl: './location-picker.component.html',
	styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {
	selectedLocationImage: string;
	isLoading = false;
	@Output('locationPick') locationPick = new EventEmitter<ProductLocation>();

	constructor(private modalCtrl: ModalController, private http: HttpClient) {}

	ngOnInit() {}

	onPickLocation() {
		this.modalCtrl.create({ component: MapComponent }).then((modalEl) => {
			modalEl.onDidDismiss().then((modalData) => {
				if (!modalData.data) {
					return;
				}
				const pickedLocation: ProductLocation = {
					lat: modalData.data.lat,
					lng: modalData.data.lng,
					staticImgUrl: null,
				};
				this.isLoading = true;
				this.getMapImage(pickedLocation.lat, pickedLocation.lng).subscribe(
					(staticImgUrl) => {
						pickedLocation.staticImgUrl = staticImgUrl;
						this.selectedLocationImage = staticImgUrl;
						this.isLoading = false;
						this.locationPick.emit(pickedLocation);
					}
				);
			});
			modalEl.present();
		});
	}

	private getMapImage(lat: number, lng: number) {
		return of(
			` http://apis.mapmyindia.com/advancedmaps/v1/${environment.interactiveMapApiKey}/still_image?center=${lat},${lng}&zoom=18&size=500x500&markers=${lat},${lng}`
		);
	}
}
