import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

import { Booking } from './booking.model';
import { AuthService } from '../auth/auth.service';
import { Product } from '../products/product.model';

interface BookingResData {
	_id: string;
	product: Product;
	firstName: string;
	lastName: string;
	mobileNumber: number;
	gender: string;
	userId: string;
	status: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
	private _bookings = new BehaviorSubject<Booking[]>([]);

	get bookings() {
		return this._bookings.asObservable();
	}

	constructor(private authService: AuthService, private http: HttpClient) {}

	fetchBooking() {
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				return this.http.get<BookingResData[]>(
					'http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/orders',
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap((resData) => {
				const myBookings = [];
				for (const index in resData) {
					myBookings.push(
						new Booking(
							resData[index]._id,
							resData[index].product.id,
							resData[index].userId,
							resData[index].product.title,
							'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201909/positive-1521334_960_720-x640.jpg?rPgOxnVWANCxIs2RPpsbLVgAiUNwvzA6',
							resData[index].firstName,
							resData[index].lastName,
							resData[index].mobileNumber,
							resData[index].gender,
							resData[index].product.isBooked
						)
					);
				}
				return of(myBookings);
			}),
			tap((myBookings) => {
				this._bookings.next(myBookings);
			})
		);
	}

	addBooking(
		productId: string,
		firstName: string,
		lastName: string,
		mobileNumber: number,
		gender: string
	) {
		let newBooking: Booking;
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				return this.http.post<BookingResData>(
					'http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/orders',
					{
						product: productId,
						firstName: firstName,
						lastName: lastName,
						mobileNumber: mobileNumber,
						gender: gender,
					},
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap((resData) => {
				newBooking = new Booking(
					resData._id,
					resData.product.id,
					resData.userId,
					resData.product.title,
					'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201909/positive-1521334_960_720-x640.jpg?rPgOxnVWANCxIs2RPpsbLVgAiUNwvzA6',
					resData.firstName,
					resData.lastName,
					resData.mobileNumber,
					resData.gender,
					resData.product.isBooked
				);
				return this.bookings;
			}),
			take(1),
			tap((bookings) => {
				this._bookings.next(bookings.concat(newBooking));
			})
		);
	}

	cancelBooking(bookingId: string) {
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				return this.http.delete(
					`http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/orders/${bookingId}`,
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap(() => {
				return this.bookings;
			}),
			take(1),
			tap((bookings) => {
				this._bookings.next(bookings.filter((b) => b.id !== bookingId));
			})
		);
	}
}
