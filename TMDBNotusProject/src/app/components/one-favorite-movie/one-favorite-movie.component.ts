import { Component, Input, OnInit } from '@angular/core';
import { FavoriteMovieDto } from 'src/app/models/dto/favorite-movie.dto';
import { Favorites } from 'src/app/models/interfaces/favorite-movies.interface';
import { Person } from 'src/app/models/interfaces/person.interface';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-one-favorite-movie',
  templateUrl: './one-favorite-movie.component.html',
  styleUrls: ['./one-favorite-movie.component.css']
})
export class OneFavoriteMovieComponent implements OnInit {

  @Input() 
  favMovie: Favorites = {} as Favorites;

  @Input()
  page = 0;

  session_id = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    if(localStorage.getItem('session_id') !== null) {
      this.session_id = true;
    }
  }

  deleteFav(){
    let favMovie = new FavoriteMovieDto();
    favMovie.favorite = false;
    favMovie.media_id = this.favMovie.id;
    favMovie.media_type = 'movie';
    this.accountService.markAsFavorite(favMovie).subscribe((resp) =>{
      if(resp.success){
        location.reload();
        alert('Has eliminado esta pelicula de favoritos.');
      }
    })
  }

  getImg() {
    return (`${environment.apiImgUrl}${this.favMovie.poster_path}`);
  }
}
