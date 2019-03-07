import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from "rxjs/Rx";
import { Observable } from 'rxjs';
import { GLOBAL_VARIABLE } from "../global";

@Injectable({
  providedIn:'root'
})
export class GeocodeConverterService {

  constructor(private http:HttpClient, private globals:GLOBAL_VARIABLE) { }
  
  getConvertGeoCodeLatLng(location): Observable<any>{
    let url = this.globals.MAPS_GEOCODE_URL + "latlng=" + location.lat + ',' + location.lng + "&key=" + this.globals.MAP_KEY_API;
    return this.http.get(url,{ observe: 'response' });
      
    // let resultObservable = this.http.get(url);
    // console.log(resultObservable);
    // let results = resultObservable.map((res) => res.json());
    // return results;
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.log(errMsg);

    return Observable.throw(errMsg);
  }
}
