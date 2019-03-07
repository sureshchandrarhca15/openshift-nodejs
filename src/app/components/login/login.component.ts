﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {  AuthenticationService } from '../../service/authentication.service';
import {  AlertService } from '../../service/alert.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    errorState:boolean=false;

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
        this.loginForm = this.formBuilder.group({
            mobileNumber: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.errorState=false;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.f);
        this.authenticationService.login(this.f.mobileNumber.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data.data.user_type)
                    if(data && data.data){
                        if (data.data.user_type =='consumer'){
                            this.router.navigate(['/consumer']);
                        }else{
                            this.router.navigate(['/main-provider']);
                        }
                    }
                },
                error => {
                    this.alertService.error(error);
                     this.loading = false;
                    this.errorState =true;
                });
    }
}
