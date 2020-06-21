import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';
import { LocationPickerComponent } from './pickers/location-picker/location-picker.component';
import { MapComponent } from './map/map.component';

@NgModule({
	declarations: [ImagePickerComponent, LocationPickerComponent, MapComponent],
	imports: [CommonModule, IonicModule],
	exports: [ImagePickerComponent, LocationPickerComponent, MapComponent],
	entryComponents: [
		ImagePickerComponent,
		LocationPickerComponent,
		MapComponent,
	],
})
export class SharedModule {}
