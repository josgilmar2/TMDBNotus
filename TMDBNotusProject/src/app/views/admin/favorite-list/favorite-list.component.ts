import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { PersonService } from "src/app/services/person.service";
import { FavoriteMovieDto } from "src/app/models/dto/favorite-movie.dto";
import {
  FavoriteMoviesResponse,
  Favorites,
} from "src/app/models/interfaces/favorite-movies.interface";

@Component({
  selector: "app-favorite-list",
  templateUrl: "./favorite-list.component.html",
})
export class FavoriteListComponent implements OnInit {
  listaFav: FavoriteMoviesResponse[] = [];
  favMovies: Favorites[] = [];
  isFav: boolean = false;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  marcarFavorita() {
    let favMovie = new FavoriteMovieDto();
    this.personService.markAsFavorite(favMovie).subscribe((resp) =>{
      
    });
  }
}
