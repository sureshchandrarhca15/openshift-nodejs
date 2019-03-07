import { Component, OnInit} from '@angular/core';
import { GeocodeConverterService} from '../../service/geocode-converter.service';
import { BookingService } from '../../service/booking.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { } from 'googlemaps';

declare var $: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class LandingPageComponent implements OnInit {
  
  latitude: number = 28.509653999999998;
  longitude: number = 77.0704562;
  activeServices:Object;
   zoom: number= 16;
   isSearch:boolean= false;
   activeServiceName: string;
   maidName : string;
   maidMobile : string;
   maidAge : string;
   maidRating : string;
   bookingId : string;
   bookingLocation : string;
   maidLocation : string;
  bookingFailed:boolean=false;
  ownLocation:any ;
  searchLocation: any;
  locationName:string;
  listServices=[{
    name:"dishwashing",
    price:"100",
    type:"hourly",
    image:"",
    label:"Cooking",
    isActive:false
  }, {
    name: "cleaning",
    price: "100",
    type: "hourly",
    image: "",
      label: "House Cleaning",
      isActive: false
    }, {
      name: "washing",
      price: "100",
      type: "hourly",
      image: "",
      label: "Dish Washing",
      isActive: false
    }, {
      name: "takecare",
      price: "100",
      type: "hourly",
      image: "",
      label: "Car Cleaning",
      isActive: false
    }, {
      name: "allrounder",
      price: "100",
      type: "hourly",
      image: "",
      label: "All Rounder",
      isActive: false
    }];
  // ownlocation: Location;

  constructor(private GeoService: GeocodeConverterService, currentlocation: Location, private _bookingService : BookingService) {
    // this.ownlocation = currentlocation;
    console.log("hello world");
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
       
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
         this.ownLocation={
          lat : position.coords.latitude,
          lng : position.coords.longitude 
        };

        this.fetchLocationName(this.ownLocation);
      },(error)=>{
          this.ownLocation = {
            lat: this.longitude,
            lng: this.latitude
          };
      });
    }else{
      alert("Kindly share your GeoLocation");
    }
  }

  ngOnInit() {

  }

  draggableEnd($event){
    if($event!=undefined){
      this.searchLocation= $event.coords;
      this.fetchLocationName(this.searchLocation);  
    }
  }

  fetchLocationName(location:Object){
    this.GeoService.getConvertGeoCodeLatLng(location).subscribe((data) => {
      // console.log("fetchLocationName", location);
      if (data.body.results.length > 0) {
        this.locationName = data.body.results[0].formatted_address;
      }
      // console.log()
    });
  }

  activeService(index,serviceObj){
    console.log(index, serviceObj);
     this.listServices.filter(services=>{ 
      (services.isActive ? services.isActive = !services.isActive : services.isActive)
    });
    //console.log(this.listServices);
    this.listServices[index].isActive=true;
    this.activeServices = this.listServices[index];
    this.activeServiceName = this.listServices[index].name;
  }

  activeSearch(){
    this.isSearch=true;
    if(this.searchLocation==undefined){
      this.searchLocation = this.ownLocation;
    }

    this._bookingService.book(this.activeServiceName, this.latitude, this.longitude).subscribe((_response) => {
      // debugger;
      if(_response.code != 200) {
        alert('Error in Booking Maid.');
        return false;
      }
      if (_response.data && _response.data.booking_details && Object.keys(_response.data.booking_details).length>0 ){
        this.bookingId = _response.data.booking_details.id;
        this.maidName = _response.data.booking_details.provider_details.first_name + ' ' + _response.data.booking_details.provider_details.last_name;
        this.maidMobile = _response.data.booking_details.provider_details.mobile;
        this.maidAge = _response.data.booking_details.provider_details.age;
        this.maidRating = (_response.data.booking_details.provider_details.rating) ? _response.data.booking_details.provider_details.rating : '4.3';
        this.bookingLocation = (_response.data.booking_details.location).join(',');
        this.maidLocation = (_response.data.booking_details.provider_details.location).join(',');

      }else{
        this.bookingFailed=true;
      }
    });
  }

  pageRefresh(){
    this.isSearch=false;
    this.bookingFailed=false;
    
  }
}
