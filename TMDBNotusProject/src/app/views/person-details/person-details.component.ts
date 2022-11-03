import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonDetailsResponse } from 'src/app/models/interfaces/person-details.interface';
import { Person, KnownFor } from 'src/app/models/interfaces/person.interface';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
  personList: Person[] = [];
  person: Person = {} as Person;
  pelis: KnownFor[] = [];
  pDetail: PersonDetailsResponse = {} as PersonDetailsResponse;
  page = 1;
  id = '';

  constructor(private personService: PersonService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.personService.getDetails(this.id).subscribe(response => {
      this.pDetail = response;
   });
  }


}
