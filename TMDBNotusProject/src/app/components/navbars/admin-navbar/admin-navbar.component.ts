import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateSessionDto } from "src/app/models/dto/create-session.dto";
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {
  approved = false;
  user = '';
  img = '';
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((qParams) => {
      const ap = qParams['approved'];
      const rToken = qParams['request_token'];
      this.approved = ap == 'true' ? true : false;

      if (this.approved) {
        let session = new CreateSessionDto();
        session.request_token = rToken;
        this.authService.createSession(session).subscribe((resp) => {
          localStorage.setItem('session_id', resp.session_id);
          console.log('Session id: ' + resp.session_id);

          this.authService.getInfo().subscribe((resp) => {
            this.user = resp.username;
            this.img = `https://www.themoviedb.org/t/p/w32_and_h32_face/${resp.avatar.tmdb.avatar_path}`;

          });
  
        });
      } else {
        if(localStorage.getItem('session_id') != null){
          this.approved = true;
        }
      }
    });
  }
}
