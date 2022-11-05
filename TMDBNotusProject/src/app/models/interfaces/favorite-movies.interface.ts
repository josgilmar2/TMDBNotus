export interface FavoriteMoviesResponse {
    page:          number;
    results:       Favorites[];
    total_pages:   number;
    total_results: number;
}

export interface Favorites {
    adult:             boolean;
    backdrop_path:     null;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    release_date:      string;
    poster_path:       null;
    popularity:        number;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}
