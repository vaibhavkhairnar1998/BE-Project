export class Product {
	constructor(
		public id: string,
		public catagory: string,
		public title: string,
		public description: string,
		public imageUrl: string,
		public price: number,
		public userId: string
	) {}
}
