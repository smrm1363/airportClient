import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Component} from "@angular/core";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild(NgAutoCompleteComponent) public completer: NgAutoCompleteComponent;

  public group = [
    CreateNewAutocompleteGroup(
      'Search / choose in / from list',
      'completer',
      [
        {title: 'Option 1', id: '1'},
        {title: 'Option 2', id: '2'},
        {title: 'Option 3', id: '3'},
        {title: 'Option 4', id: '4'},
        {title: 'Option 5', id: '5'},
      ],
      {titleKey: 'title', childrenKey: null}
    ),
  ];

  constructor() {

  }

  /**
   *
   * @param item
   * @constructor
   */
  Selected(item: SelectedAutocompleteItem) {
    console.log(item);
  }
}
