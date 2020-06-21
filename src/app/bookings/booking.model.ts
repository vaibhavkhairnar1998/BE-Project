export class Booking {
	constructor(
		public id: string,
		public productId: string,
		public userId: string,
		public placeTitle: string,
		public imageUrl: string,
		public firstName: string,
		public lastName: string,
		public mobileNumber: number,
		public gender: string,
		public status: string
	) {}
}
