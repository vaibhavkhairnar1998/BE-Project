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
			name: new FormControl("Abhi patel", {
				updateOn: "change",
				validators: [Validators.required]
			}),
			email: new FormControl("abhi@gmail.com", {
				updateOn: "change",
				validators: [Validators.required]
			}),
			number: new FormControl("9158546322", {
				updateOn: "change",
				validators: [
					Validators.required,
					Validators.minLength(10),
					Validators.maxLength(10)
				]
			})
		});
	}
	ngOnDestroy() {}
}
