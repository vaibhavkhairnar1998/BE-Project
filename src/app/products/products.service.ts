import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

import { Product } from './product.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { resolve } from 'url';
import { ProductLocation } from './product-location.model';

interface ProductResData {
	_id: string;
	category: string;
	description: string;
	isBooked: string;
	price: number;
	title: string;
	userId: string;
	location: ProductLocation;
}

@Injectable({
	providedIn: 'root',
})

// [
// 	new Product(
// 		'p1',
// 		'Place',
// 		'VKs Mansion',
// 		'The Great Mansion',
// 		// tslint:disable-next-line: max-line-length
// 		'https://static2.mansionglobal.com/production/media/article-images/b094a311fb9a7f66235d42bf65bb5e31/large_01-4110-Paces-Ferry-Rd-120.jpg',
// 		150000,
// 		'abc'
// 	),
// 	new Product(
// 		'p2',
// 		'Place',
// 		'APs Mansion',
// 		'A mansion with swimming Pool',
// 		'https://image.shutterstock.com/image-photo/tropical-villa-600w-95787298.jpg',
// 		360000,
// 		'abc'
// 	),
// 	new Product(
// 		// tslint:disable-next-line: indent
// 		'p3',
// 		'Place',
// 		// tslint:disable-next-line: indent
// 		'GKs Mansion',
// 		'Not your average Tent!',
// 		'http://www.campingroadtrip.com/Portals/0/emails/newsletter/OutdoorLiving/Edition026/Lit-red-tent-in-the-snow-350x232.jpg',
// 		50,
// 		'abc'
// 	),
// 	new Product(
// 		'p4',
// 		'Place',
// 		'SJs Mansion',
// 		'Not your average House!',
// 		'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
// 		150000,
// 		'abc'
// 	),
// 	new Product(
// 		'p5',
// 		'Place',
// 		'YKs Mansion',
// 		'Our Home Sweet Home!',
// 		'https://teja10.kuikr.com//r1/20180712/ak_1200_1709641279-1531371273_700x700.jpeg',
// 		150000,
// 		'abc'
// 	),
// 	new Product(
// 		'e1',
// 		'Electronic',
// 		'Sony Cammera',
// 		'Not your average city trip!',
// 		'https://5.imimg.com/data5/XC/PF/MY-11567295/sony-a7-dslr-camera-500x500.jpg',
// 		15000,
// 		'abc'
// 	),
// 	new Product(
// 		'e2',
// 		'Electronic',
// 		'Canon Cammera',
// 		'Not your average city trip!',
// 		'https://cdn.thewirecutter.com/wp-content/uploads/2018/04/canon-dslrs-march-2018-2x1-lowres3496.jpg',
// 		25000,
// 		'abc'
// 	),
// 	new Product(
// 		'e3',
// 		'Electronic',
// 		'Nikon Cammera',
// 		'Not your average city trip!',
// 		'https://static.bhphoto.com/images/images500x500/nikon_1546b_d5500_dslr_camera_with_1482421558_1280950.jpg',
// 		17000,
// 		'abc'
// 	),
// 	new Product(
// 		'e4',
// 		'Electronic',
// 		'Kodak Cammera',
// 		'Not your average city trip!',
// 		'https://3.img-dpreview.com/files/p/articles/8708403693/Images/frontview-001.jpeg',
// 		35000,
// 		'abc'
// 	),
// 	new Product(
// 		'a1',
// 		'Automobile',
// 		"La' Ferrari",
// 		'Not your average sports car!',
// 		'http://1.bp.blogspot.com/-bJUVMEtDcs4/Vf63lv2jfaI/AAAAAAAAAw8/h8NXO6ICvAI/s320/Screenshot_2015-09-20-21-40-38.png',
// 		35000000,
// 		'abc'
// 	),
// 	new Product(
// 		'a2',
// 		'Automobile',
// 		'Lexus ES 300h',
// 		'Not your average luxury Sedan!',
// 		'https://lexusenthusiast.com/images/weblog/18-06-15-lexus-es-opening-image.jpg',
// 		5500000,
// 		'abc'
// 	),
// 	new Product(
// 		'a3',
// 		'Automobile',
// 		'Volvo XC 90',
// 		'Not your average luxury SUV!',
// 		'https://d0727dbddcb0f37a2867-55aeed0264ba8e79218119aec163ef5f.ssl.cf1.rackcdn.com/YV4A22NL9K1072600/dd627767e0240f1804304f283a1172d9.jpeg',
// 		3500000,
// 		'abc'
// 	)
// ]
export class ProductsService {
	private _products = new BehaviorSubject<Product[]>([]);
	private _myProducts = new BehaviorSubject<Product[]>([]);

	get products() {
		return this._products.asObservable();
	}

	get myProducts() {
		return this._myProducts.asObservable();
	}

	constructor(private authService: AuthService, private http: HttpClient) {}

	fetchProducts() {
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				return this.http.get<ProductResData[]>(
					'http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/products',
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap((resData) => {
				const products = [];
				for (const index in resData) {
					products.push(
						new Product(
							resData[index]._id,
							resData[index].category,
							resData[index].title,
							resData[index].description,
							'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201909/positive-1521334_960_720-x640.jpg?rPgOxnVWANCxIs2RPpsbLVgAiUNwvzA6',
							resData[index].price,
							resData[index].userId,
							resData[index].isBooked,
							resData[index].location
						)
					);
				}
				return of(products);
			}),
			tap((products) => {
				this._products.next(products);
			})
		);
	}

	fetchMyProducts() {
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				return this.http.get<ProductResData[]>(
					'http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/products/my',
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap((resData) => {
				const myProducts = [];
				for (const index in resData) {
					myProducts.push(
						new Product(
							resData[index]._id,
							resData[index].category,
							resData[index].title,
							resData[index].description,
							'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201909/positive-1521334_960_720-x640.jpg?rPgOxnVWANCxIs2RPpsbLVgAiUNwvzA6',
							resData[index].price,
							resData[index].userId,
							resData[index].isBooked,
							resData[index].location
						)
					);
				}
				return of(myProducts);
			}),
			tap((myProducts) => {
				this._myProducts.next(myProducts);
			})
		);
	}

	getProduct(id: string) {
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				return this.http.get<ProductResData>(
					`http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/products/single/${id}`,
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			map((product) => {
				return new Product(
					product._id,
					product.category,
					product.title,
					product.description,
					'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201909/positive-1521334_960_720-x640.jpg?rPgOxnVWANCxIs2RPpsbLVgAiUNwvzA6',
					product.price,
					product.userId,
					product.isBooked,
					product.location
				);
			})
		);
	}

	addProduct(
		category: string,
		title: string,
		description: string,
		price: number,
		location: ProductLocation
	) {
		let newProduct: Product;
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				return this.http.post<ProductResData>(
					'http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/products',
					{
						category: category,
						title: title,
						description: description,
						price: price,
						location: location,
					},
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap((resData) => {
				newProduct = new Product(
					resData._id,
					resData.category,
					resData.title,
					resData.description,
					'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201909/positive-1521334_960_720-x640.jpg?rPgOxnVWANCxIs2RPpsbLVgAiUNwvzA6',
					resData.price,
					resData.userId,
					resData.isBooked,
					resData.location
				);
				return this.myProducts;
			}),
			take(1),
			tap((products) => {
				this._myProducts.next(products.concat(newProduct));
			})
		);
	}

	updateProduct(productId: string, productData: string) {
		let updatedProduct: Product = null;
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				const updateOps = JSON.parse(productData);
				return this.http.patch<ProductResData>(
					`http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/products/${productId}`,
					updateOps,
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap((product) => {
				updatedProduct = new Product(
					product._id,
					product.category,
					product.title,
					product.description,
					'https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201909/positive-1521334_960_720-x640.jpg?rPgOxnVWANCxIs2RPpsbLVgAiUNwvzA6',
					product.price,
					product.userId,
					product.isBooked,
					product.location
				);
				return this.myProducts;
			}),
			take(1),
			switchMap((products) => {
				if (!products || products.length <= 0) return this.fetchMyProducts();
				else return of(products);
			}),
			tap((products) => {
				const updatedProductIndex = products.findIndex(
					(pl) => pl.id === productId
				);
				const updatedProducts = [...products];
				updatedProducts[updatedProductIndex] = updatedProduct;
				this._myProducts.next(updatedProducts);
			})
		);
	}

	deleteProduct(productId: String) {
		return this.authService.token.pipe(
			take(1),
			switchMap((token) => {
				return this.http.delete(
					`http://localhost:5001/sample-firebase-project-5118d/us-central1/app/api/products/${productId}`,
					{ headers: { Authorization: 'Bearer ' + token } }
				);
			}),
			switchMap(() => {
				return this.myProducts;
			}),
			take(1),
			tap((myProducts) => {
				this._myProducts.next(myProducts.filter((b) => b.id !== productId));
			})
		);
	}
}
