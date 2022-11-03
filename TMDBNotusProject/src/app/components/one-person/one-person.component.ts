import { Component, Input, OnInit } from '@angular/core';
import { PersonDetailsResponse } from 'src/app/models/interfaces/person-details.interface';
import { KnownFor, Person } from 'src/app/models/interfaces/person.interface';
import { PersonService } from 'src/app/services/person.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-one-person',
  templateUrl: './one-person.component.html',
  styleUrls: ['./one-person.component.css']
})
export class OnePersonComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  @Input() person: Person = {} as Person;
  personList: Person[] = [];
  pelis: KnownFor[] = [];
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

  // getPersonInfo(id: number) {
  //   this.personService.getDetails(String(id)).subscribe(response => {
  //      this.pDetail = response;
  //     this.dialog.open(PersonInfoComponent, {
  //       data: {
  //         personInfo: this.pDetail
  //       },
  //     });
  //   });
  // }

}
