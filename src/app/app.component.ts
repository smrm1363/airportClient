import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fareValue='';
  originName = '';
  originCode = '';
  originLat = '';
  originLong = '';
  destName = '';
  destCode = '';
  destLat = '';
  destLong = '';
  currency='';
  originSelect: any = [];
  destSelect: any = [];
  restItemsUrl ='http://localhost:9000/travel/airports';
  restIfarUrl ='http://localhost:9000/travel/fares/';
  restItems: any;
  /**
   * This is a configuration for DropDown
   */
  config = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 25
  };

  locationsOrigin = [];
  locationsDest = [];
  fares = [];
  selectForm: FormGroup;
  constructor(private fromBuilder: FormBuilder,private http: HttpClient) {

  }
  ngOnInit() {
    /**
     * Fill two drop downs with values from Rest API
     */
    this.getAirPortItems();
      }

  getAirPortItems(): void {
    this.restItemsServiceGetRestItems(this.restItemsUrl)
      .subscribe(
        restItems => {
          /**
           * Dou to we uses DropDown, pagination is not important, then we only read the locations
           */
          this.locationsOrigin = restItems['_embedded']['locations'];
          this.locationsDest = this.locationsOrigin;
        }
      )
  }

  /**
   * Method for reading Rest API
   * @param restUrl
   */
  restItemsServiceGetRestItems(restUrl) {
    return this.http
      .get<any[]>(restUrl)
      .pipe(map(data => data));
  }

  /**
   * Method for getting Fare from Rest API
   */
  getFare()
  {
    this.restItemsServiceGetRestItems(this.restIfarUrl+this.originSelect['code']+"/"+this.destSelect['code'])
      .subscribe(
        restItems => {
          this.fares = restItems;
          this.fareValue = this.fares['amount'];
          this.currency = this.fares['currency'];
          this.originName = this.fares['origin']['name'];
          this.originCode = this.fares['origin']['code'];
          this.originLat = this.fares['origin']['coordinates']['latitude'];
          this.originLong = this.fares['origin']['coordinates']['latitude'];
          this.destName = this.fares['destination']['name'];
          this.destCode = this.fares['destination']['code'];
          this.destLat = this.fares['destination']['coordinates']['latitude'];
          this.destLong = this.fares['destination']['coordinates']['latitude'];
        }
      )
  }

  /**
   * Method for search airports from Rest API, while completing it's name in the DropDown
   * @param value
   */
  onSearchChangeOrigin(value)
  {
    console.log(value);
    console.log(this.locationsOrigin);
    if(this.contains(this.locationsOrigin,value))
      return;
    this.restItemsServiceGetRestItems(this.restItemsUrl+"?term="+value)
      .subscribe(
        restItems => {
          this.locationsOrigin = restItems['_embedded']['locations'];
        })

}
  onSearchChangeDest(value)
  {
    console.log(value);
    console.log(this.locationsDest);
    if(this.contains(this.locationsDest,value))
      return;
    this.restItemsServiceGetRestItems(this.restItemsUrl+"?term="+value)
      .subscribe(
        restItems => {
          this.locationsDest = restItems['_embedded']['locations'];
        })

  }
   contains(arr,val)
{
      for(var i = 0;i<arr.length;i++)
      {
        if((<String>arr[i]['name']).toLowerCase().includes(val.toLowerCase()))
          return true;
        else if((<String>arr[i]['code']).toLowerCase().includes(val.toLowerCase()))
          return true;
        else if((<String>arr[i]['description']).toLowerCase().includes(val.toLowerCase()))
          return true;

      }
      return false;
}
}
