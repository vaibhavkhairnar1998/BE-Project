export class Product {
	constructor(
		public id: string,
		public category: string,
		public title: string,
		public description: string,
		public imageUrl: string,
		public price: number,
		public userId: string,
		public isBooked: Boolean
	) {}
}
