import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
	selector: "app-myprofile",
	templateUrl: "./myprofile.page.html",
	styleUrls: ["./myprofile.page.scss"]
})
export class MyprofilePage implements OnInit, OnDestroy {
	form: FormGroup;

	constructor() {}

	ngOnInit() {
		this.form = new FormGroup({
			name: new FormControl("Raju (ITUS)", {
				updateOn: "change",
				validators: [Validators.required]
			}),
			email: new FormControl("paisadouble@lakshmichitfund.com", {
				updateOn: "change",
				validators: [Validators.required]
			}),
			number: new FormControl("4204204200", {
				updateOn: "change",
				validators: [
					Validators.required,
					Validators.minLength(10),
					Validators.maxLength(10)
				]
			})
		});
	}
	onEditImg(event: Event) {
		console.log(event);
	}

	ngOnDestroy() {}
}
