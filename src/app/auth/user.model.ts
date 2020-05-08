export class User {
	constructor(
		public id: string,
		public name: string,
		public userName: string,
		public mobileNumber: number,
		public email: string,
		private _token: string,
		private tokenExpirationDate: Date,
		private _refreshToken: string,
		private refreshTokenExpirationDate: Date
	) {}

	get token() {
		if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date())
			return null;
		return this._token;
	}

	get refreshToken() {
		if (
			!this.refreshTokenExpirationDate ||
			this.refreshTokenExpirationDate <= new Date()
		)
			return null;
		return this._refreshToken;
	}

	get tokenDuration() {
		if (!this.token) return 0;
		return this.refreshTokenExpirationDate.getTime() - new Date().getTime();
	}
}
