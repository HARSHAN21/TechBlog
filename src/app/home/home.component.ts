import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'tb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {

  androidDevice:boolean=false;

  constructor() { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.androidDevice=navigator.userAgent.includes("Android");
    console.log("device is : ",navigator.userAgent);
    // console.log("device is : ",navigator.userAgent.includes("Windows"));
    // console.log("device is : ",navigator.userAgent.includes("Android"));

  }

}
