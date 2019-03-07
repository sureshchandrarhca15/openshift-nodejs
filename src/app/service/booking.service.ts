import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class BookingService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    book(service: string, lat: Number, long: Number) {
        return this.http.post<any>(
            `${environment.apiUrl}/maids/book`,
            {service, lat, long},
            {headers: new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('BB_ACCESS_TOKEN'))}
        )
        .pipe(map(_booking_details => {
                return _booking_details;
            }));
    }
}