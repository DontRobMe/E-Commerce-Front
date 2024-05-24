import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  filteredOptions: Observable<string[]> = of([]); // Initialisation avec un observable vide
  options: string[] = ['Product1', 'Product2', 'Product3']; // Remplacez par vos données

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSearch() {
    const searchValue = this.searchControl.value;
    console.log('Search value:', searchValue);
    // Ajoutez ici votre logique de recherche
  }
}
