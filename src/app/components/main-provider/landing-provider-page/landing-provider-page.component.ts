import { Component, OnInit } from '@angular/core';
import { GeocodeConverterService} from '../../../service/geocode-converter.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { } from 'googlemaps';

declare var $: any;

@Component({ 
  selector: 'app-landing-provider-page',
  templateUrl: './landing-provider-page.component.html',
  styleUrls: ['./landing-provider-page.component.css'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class LandingProviderPageComponent implements OnInit {
  
   latitude: number ;
   longitude: number;
  activeServices:Object;
   zoom: number= 16;
   isSearch:boolean= false;

  ownLocation:any ;
  searchLocation: any;
  locationName:string;
  listServices=[{
    name:"dishwashing",
    price:"100",
    type:"hourly",
    image:"",
    label:"Dish Washing",
    isActive:false
  }, {
    name: "cleaning",
    price: "100",
    type: "hourly",
    image: "",
      label: "Floor Sweep",
      isActive: false
    }, {
      name: "washing",
      price: "100",
      type: "hourly",
      image: "",
      label: "Washing",
      isActive: false
    }, {
      name: "takecare",
      price: "100",
      type: "hourly",
      image: "",
      label: "Care Taker",
      isActive: false
    }, {
      name: "nanny",
      price: "100",
      type: "hourly",
      image: "",
      label: "Baby Sitting",
      isActive: false
    }];
  // ownlocation: Location;

  constructor(private GeoService: GeocodeConverterService, currentlocation: Location) {
    // this.ownlocation = currentlocation;
    // console.log("hello world");
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
         this.ownLocation={
          lat : position.coords.latitude,
          lng : position.coords.longitude 
        };

        this.searchLocation={
          lat: (position.coords.latitude + 0.12),
          lng: position.coords.longitude 
        }
        this.fetchLocationName(this.ownLocation);
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
  }

  activeSearch(){
    this.isSearch=true;
    if(this.searchLocation==undefined){
      this.searchLocation = this.ownLocation;
    }
  }
}