import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {  AuthenticationService } from '../../service/authentication.service';
import {  AlertService } from '../../service/alert.service';

import {  UserService } from '../../service/user.service';

@Component({ templateUrl: 'register.component.html', styleUrls: ['./register.component.css']})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    ServicesList = [];
    ServicesLoc =[];
  selectedItems = [];
  selectedItems2 = [];
  ServicesListSettings = {};
  ServicesLocSettings = {};

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            // username: ['', Validators.required],
            aadhaar_number : ['', Validators.required],
            street : ['', Validators.required],
            city : ['', Validators.required],
            state : ['', Validators.required],
            country : ['', Validators.required],
            zipcode : ['', Validators.required],
            email :  ['', Validators.required],
            mobile :  ['', Validators.required],
            password: ['', Validators.required], 
            service_provider: [false, Validators.required],
            applicable_services: [[]],
            applicable_areas:[[]]
        });
        this.ServicesList = [
            { item_id: 1, item_text: 'Cooking' },
            { item_id: 2, item_text: 'House Cleaning' },
            { item_id: 3, item_text: 'Dish Washing' },
            { item_id: 4, item_text: 'Car Cleaning' },
            { item_id: 5, item_text: 'All rounder' },
          ];
          this.selectedItems = [
            
          ];
          this.selectedItems2 = [
            
        ];
          this.ServicesLoc = [
            { item_id: 1, item_text: 'Sector 21' },
            { item_id: 2, item_text: 'Sector 22' },
            { item_id: 3, item_text: 'Sector 23' },
            { item_id: 4, item_text: 'Sector 24' }
          ]
          this.ServicesListSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            enableCheckAll : false,
            allowSearchFilter: true
          };
          this.ServicesLocSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            enableCheckAll : false,
            allowSearchFilter: true
          };
    }
    onItemSelect(item: any) {
        console.log(item);
      }
      onSelectAll(items: any) {
        console.log(items);
      }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        console.log("Hament Here================>", this.registerForm)
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
