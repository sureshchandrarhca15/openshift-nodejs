import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {  AuthenticationService } from '../../service/authentication.service';
import {  AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
	resetPasswordForm: FormGroup;
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
        this.resetPasswordForm = this.formBuilder.group({
            otp: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 // convenience getter for easy access to form fields
    get f() { return this.resetPasswordForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.resetPassword(this.f.otp.value,this.f.newPassword.value,
            this.f.confirmPassword.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
		
    }
}
