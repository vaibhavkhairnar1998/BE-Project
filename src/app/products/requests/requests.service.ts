import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, take, tap, map } from 'rxjs/operators';

import { Product } from '../product.model';
import { Request } from './request.model';
import { AuthService } from '../../auth/auth.service';
import { RequestedProduct } from './requestedProduct.model';

interface RequestedProductResData {
	_id: string;
	title: string;
}

interface RequestResData {
	name: string;
	userName: string;
	requestedUserName: string;
	requestedUserMobileNumber: number;
}

@Injectable({
	providedIn: 'root'
})
export class RequestsService {
	private _requestedProducts = new BehaviorSubject<RequestedProduct[]>([]);

	get requestedProducts() {
		return this._requestedProducts.asObservable();
	}

	constructor(private authService: AuthService, private http: HttpClient) {}

	getRequestedProducts() {
		return this.authService.token.pipe(
			take(1),
			switchMap(token => {
				return this.http.get<RequestedProductResData[]>(
					'http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/requests',
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap(resData => {
				const requestedProducts = [];
				for (const index in resData) {
					requestedProducts.push(
						new RequestedProduct(
							resData[index]._id,
							resData[index].title,
							'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201909/positive-1521334_960_720-x640.jpg?rPgOxnVWANCxIs2RPpsbLVgAiUNwvzA6'
						)
					);
				}
				return of(requestedProducts);
			}),
			tap(requestedProducts => {
				this._requestedProducts.next(requestedProducts);
			})
		);
	}

	getRequestsForSingleProduct(productId: string) {
		return this.authService.token.pipe(
			take(1),
			switchMap(token => {
				return this.http.get<RequestResData[]>(
					`http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/requests/${productId}`,
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			map(resData => {
				const requests = [];
				for (const index in resData) {
					requests.push(
						new Request(
							resData[index].name,
							resData[index].userName,
							resData[index].requestedUserName,
							resData[index].requestedUserMobileNumber
						)
					);
				}
				return requests;
			})
		);
	}
}
