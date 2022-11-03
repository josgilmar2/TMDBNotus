import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateSessionDto } from "src/app/models/dto/create-session.dto";
import { DeleteSessionDto } from "src/app/models/dto/detete-sesison.dto";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  approved = false;
  user = '';
  img = '';
  reqToken = '';
  constructor(    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

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

  cerrarSession(){
    let deleteSessionDto = new DeleteSessionDto();
    if (localStorage.getItem('session_id') != null) {
      deleteSessionDto.session_id = localStorage.getItem('session_id')!;
      this.authService.deleteSession(deleteSessionDto).subscribe((resp) => {
        if (resp.success) {
          localStorage.removeItem('session_id');
          this.approved = false;
        }
      });
    }
  }

  requestToken() {
    this.authService.createRequestToken().subscribe((resp) => {
      this.reqToken = resp.request_token;
      window.location.href = `https://www.themoviedb.org/authenticate/${this.reqToken}?redirect_to=http://localhost:4200/home`;
    });
  }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
