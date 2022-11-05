import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cast, MovieCreditsResponse } from "src/app/models/interfaces/movie-credits.interface";
import { PersonDetailsResponse } from "src/app/models/interfaces/person-details.interface";
import { Person, KnownFor } from "src/app/models/interfaces/person.interface";
import { PersonService } from "src/app/services/person.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-person-details",
  templateUrl: "./person-details.component.html",
  styleUrls: ["./person-details.component.css"],
})
export class PersonDetailsComponent implements OnInit {
  pDetail: PersonDetailsResponse = {} as PersonDetailsResponse;
  page = 1;
  id = "";
  movieList: Cast[] = [];

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")!;

    this.personService.getDetails(this.id).subscribe((response) => {
      this.pDetail = response;
    });

    this.personService.getMovieCredits(this.id).subscribe((resp) =>{
      this.movieList = resp.cast;
    })
  }

  getImg(p: PersonDetailsResponse) {
    let id = p.profile_path;
    return `${environment.apiImgUrl}${id}`;
  }

  getMovieImg(m: Cast){
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
