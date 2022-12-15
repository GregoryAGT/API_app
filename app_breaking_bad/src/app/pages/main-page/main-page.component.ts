import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Character } from 'src/app/interfaces/characters.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  characters: Character[] | undefined;
  charactersCopy: Character[] | undefined;

  constructor(public http: HttpClient) {
    this.getData();
   }


  async getData() {
   await this.http
      .get<any>(environment.apiUrl + '/character')
      .subscribe((data) => {                  
        this.characters = data.results.map(({ id, name, status, species, image}: Character) => {
          return {
          id: id,
          name: name,
          status: status,
          species: species,
          image: image,
          };         
        })
        this.charactersCopy = this.characters
      });
  }

  ngOnInit(): void {
  }

  filter(e: any){
    const search: string = e.target.value;
    this.characters = this.charactersCopy.filter(({ name }: Character ) => {
      return name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });
  }

}
