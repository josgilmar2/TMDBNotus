import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MoviesDetailsResponse } from 'src/app/models/interfaces/movies-details.interface';
import { MoviesVideos } from 'src/app/models/interfaces/movies-videos.interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.css']
})
export class MoviesDetailsComponent implements OnInit {

  movieDetails: MoviesDetailsResponse = {} as MoviesDetailsResponse;
  movieVideosList: MoviesVideos[] = [];
  id: number = 0;


  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id = res['id'];
    })
    this.getOneMovieDetails();
    this.getMovieVideos();
  }

  getOneMovieDetails() {
    this.moviesService.getDetails(this.id).subscribe(res => {
      this.movieDetails = res;
    })
  }

  getMovieVideos() {
    this.moviesService.getVideos(this.id).subscribe(res => {
      res.results.filter(a => {
        if(a.type == 'Trailer') {
          this.movieVideosList.push(a);
        }
      });
    })
  }

  showMovieImg() {
    return `https://image.tmdb.org/t/p/w500${this.movieDetails.backdrop_path}`;
  }

  showMovieVideos(mv: MoviesVideos) {
    let url = `https://www.youtube.com/embed/${mv.key}`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
