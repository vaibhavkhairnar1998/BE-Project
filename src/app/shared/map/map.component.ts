import {
	Component,
	OnInit,
	Input,
	ElementRef,
	ViewChild,
	AfterViewInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';

import { environment } from '../../../environments/environment';
import { Coordinates } from '../../products/product-location.model';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
	@Input('location') location: Coordinates;
	@Input('hideHeader') hideHeader: boolean;
	@ViewChild('map', null) mapElementRef: ElementRef;
	mapApi: any;
	map: any;

	constructor(private modalCtrl: ModalController) {}

	ngOnInit() {}

	ngAfterViewInit() {
		this.getMap()
			.then((mapApi) => {
				this.mapApi = mapApi;
				this.map = new mapApi.mapMyIndia.Map(this.mapElementRef.nativeElement, {
					center: [28.61, 77.23],
					zoomControl: true,
					hybrid: true,
				});
				if (this.location !== undefined) {
					this.map.setView([this.location.lat, this.location.lng], 15);
					this.mapApi.L.circle([this.location.lat, this.location.lng], {
						radius: 200,
					}).addTo(this.map);
				} else {
					if (!Capacitor.isPluginAvailable('Geolocation')) return;
					return Plugins.Geolocation.getCurrentPosition();
				}
			})
			.then((geoPosition) => {
				this.map.setView(
					[geoPosition.coords.latitude, geoPosition.coords.longitude],
					13
				);
				this.map.on('click', (e) => {
					this.modalCtrl.dismiss(e.latlng);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	private getMap(): Promise<any> {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = `https://apis.mapmyindia.com/advancedmaps/v1/${environment.interactiveMapApiKey}/map_load?v=1.3`;
			script.async = true;
			script.defer = true;
			document.head.appendChild(script);
			script.onload = () => {
				const win = window as any;
				const mapApi = { mapMyIndia: win.MapmyIndia, L: win.L };
				if (mapApi.mapMyIndia && mapApi.L) return resolve(mapApi);
				else return reject('cannot load map');
			};
		});
	}

	onCancel() {
		this.modalCtrl.dismiss();
	}
}
