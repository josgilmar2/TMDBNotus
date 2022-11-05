import { Component, Input, OnInit } from "@angular/core";
import { PersonDetailsResponse } from "src/app/models/interfaces/person-details.interface";
import { Person, KnownFor } from "src/app/models/interfaces/person.interface";
import { PersonService } from "src/app/services/person.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-person',
  templateUrl: './person-list.component.html',
})
export class PersonListComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  personList: Person[] = [];
  movies: KnownFor[] = []
  pDetail: PersonDetailsResponse = {} as PersonDetailsResponse;
  page = 1;


  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPerson(1).subscribe((resp) =>{
      this.personList = resp.results;
    })
  }

  getPage(pagee: number) {
    if(pagee > 0){
      this.personService.getPerson(pagee).subscribe((resp) =>{
        this.personList = resp.results;
      })
      this.page = pagee;
    }
  }

  getImg(p: Person) {
    let id = p.profile_path;
    return (`${environment.apiImgUrl}${id}`);
  }

  getMovieImg(m: KnownFor){
    let id = m.poster_path;
    return (`https://www.themoviedb.org/t/p/w220_and_h330_face/${m.poster_path}`)
  }

  parseGender(gender: number) {
    if (gender == 1) {
      return "Female";
    } else if (gender == 2) {
      return "Male";
    } else {
      return "Other";
    }
  }
}