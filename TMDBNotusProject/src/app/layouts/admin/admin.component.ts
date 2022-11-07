import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { createPopper } from "@popperjs/core";
import { DeleteSessionDto } from "src/app/models/dto/detete-sesison.dto";
import { AccountService } from "src/app/services/account.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnInit {
  dropdownPopoverShow = false;
  approved = false;
  user = '';
  img = '';
  reqToken = '';
  icon = 'https://cdn-icons-png.flaticon.com/512/74/74472.png';
  collapseShow = "hidden";

  constructor(private route: ActivatedRoute,
    private authService: AuthService, private accountService: AccountService) { }

  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;

  ngOnInit() {

    if (localStorage.getItem('session_id') != null) {
      this.accountService.getDetails().subscribe((resp) => {
        localStorage.setItem('account_id', String(resp.id));
        console.log('Account id: ' + resp.id);
        this.user = resp.username;
        this.img = `https://www.themoviedb.org/t/p/w32_and_h32_face/${resp.avatar.tmdb.avatar_path}`;
        this.approved = true;
      });
    }

  }

  cerrarSession() {
    let deleteSessionDto = new DeleteSessionDto();
    if (localStorage.getItem('session_id') != null) {
      deleteSessionDto.session_id = localStorage.getItem('session_id')!;
      this.authService.deleteSession(deleteSessionDto).subscribe((resp) => {
        if (resp.success) {
          localStorage.removeItem('session_id');
          this.approved = false;
          window.location.href = 'http://localhost:4200/public/movies'
        }
      });
    }
  }

  requestToken() {
    this.authService.createRequestToken().subscribe((resp) => {
      this.reqToken = resp.request_token;
      window.location.href = `https://www.themoviedb.org/authenticate/${this.reqToken}?redirect_to=http://localhost:4200/approved`;
    });
  }
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
