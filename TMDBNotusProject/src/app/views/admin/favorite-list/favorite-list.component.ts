import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { PersonService } from "src/app/services/person.service";
import { FavoriteMovieDto } from "src/app/models/dto/favorite-movie.dto";
import {
  FavoriteMoviesResponse,
  Favorites,
} from "src/app/models/interfaces/favorite-movies.interface";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-favorite-list",
  templateUrl: "./favorite-list.component.html",
})
export class FavoriteListComponent implements OnInit {
  favMovies: Favorites[] = [];
  isFav: boolean = false;
  page = 0;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.getPage(1);
  }

  getPage(pagee: number) {
    if(pagee > 0){
      this.accountService.getFavoriteMovies(pagee).subscribe((resp) =>{
        this.favMovies = resp.results;
      })
      this.page = pagee;
    }
  }
}
