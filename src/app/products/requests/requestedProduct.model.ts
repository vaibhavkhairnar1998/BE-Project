import { Request } from './request.model';

export class RequestedProduct {
	constructor(
		public id: string,
		public title: string,
		public imageUrl: string
	) {}
}
