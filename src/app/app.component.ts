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
  title = 'app';
  tab = 1;
  originSelect: any = [];
  destSelect: any = [];
  restItemsUrl ='http://localhost:9000/travel/airports';
  restIfarUrl ='http://localhost:9000/travel/fares/';
  restItems: any;

  config = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5
  };

  options = [];
  locations = [];
  fares = [];
  selectForm: FormGroup;
  constructor(private fromBuilder: FormBuilder,private http: HttpClient) {
    // this.selectForm = this.fromBuilder.group({
    //   selectDrop: [null, Validators.required]
    // });
  }
  ngOnInit() {
    this.getRestItems();
    // setTimeout(() => {
    //   this.selectForm.patchValue({ selectDrop: this.selectedOptions[0] });
    // }, 7000);
      this.options=[1,2,3,4]
    // console.log(this.options);
  }
  changeValueOrigin($event: any) {
    console.log(this.originSelect['code']);
  }

  changeValueDest($event: any) {
    console.log(this.destSelect['code']);
  }


  // Read all REST Items
  getRestItems(): void {
    this.restItemsServiceGetRestItems(this.restItemsUrl)
      .subscribe(
        restItems => {
          this.locations = restItems['_embedded']['locations'];
          // this.options = res['_embedded'];
          // this.options = restItems;
          console.log(this.locations);
          console.log(this.options);
        }
      )
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems(restUrl) {
    return this.http
      .get<any[]>(restUrl)
      .pipe(map(data => data));
  }
  getFare()
  {
    this.restIfarUrl = this.restIfarUrl+this.originSelect['code']+"/"+this.destSelect['code'];
    console.log(this.locations);
    this.restItemsServiceGetRestItems(this.restIfarUrl)
      .subscribe(
        restItems => {
          this.fares = restItems;
          // this.options = res['_embedded'];
          // this.options = restItems;
          console.log(this.fares);

        }
      )
  }
}
