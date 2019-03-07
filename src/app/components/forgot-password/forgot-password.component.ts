import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AuthenticationService } from '../../service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
	forgotPasswordForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.forgotPasswordForm = this.formBuilder.group({
            mobileNumber: ['', Validators.required],
			otp: ['', Validators.required]		
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 // convenience getter for easy access to form fields
    get f() { return this.forgotPasswordForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.validateOTP(this.f.mobileNumber.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/reset-password']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
		
    }
}
