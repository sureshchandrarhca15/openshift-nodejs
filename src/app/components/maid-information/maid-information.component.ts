import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-maid-information',
  templateUrl: './maid-information.component.html',
  styleUrls: ['./maid-information.component.css']
})
export class MaidInformationComponent implements OnInit {

  userImgPath:string;
  ratingIco:string;
  
  @Input() maidMobile: string;
  @Input() maidAge: string;
  @Input() maidName: string;
  @Input() maidRating: string;
  @Input() bookingId:string;
  @Input() maidLocation : any;
  @Input() bookingLocation : any;

  constructor() { 
    this.userImgPath = '/assets/images/user-icon.png';
    this.ratingIco = '/assets/images/rating.png'
  }

  ngOnInit() {
  }

  SearchAgain(){

  }

}
