import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { PopularMoviesListComponent } from "./views/admin/popular-movies-list/popular-movies-list.component";
import { PersonListComponent } from "./views/admin/person-list/person-list.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { PersonDetailsComponent } from "./views/person-details/person-details.component";
import { MoviesDetailsComponent } from "./views/movies-details/movies-details.component";
import { RatedMoviesListComponent } from "./views/admin/rated-movies-list/rated-movies-list.component";

const routes: Routes = [
  // admin views
  {
    path: "public",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "movies", component: PopularMoviesListComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "actors", component: PersonListComponent },
      { path: "rated-movies", component: RatedMoviesListComponent },
      { path: "", redirectTo: "movies", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "actors-details/:id", component: PersonDetailsComponent },
  { path: "landing", component: LandingComponent },
  // { path: "movie-details", component: MoviesDetailsComponent},
  { path: "movie-details/:id", component: MoviesDetailsComponent},
  {path: '', redirectTo: '/public/movies', pathMatch: 'full'},
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
