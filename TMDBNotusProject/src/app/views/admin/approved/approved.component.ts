import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateSessionDto } from 'src/app/models/dto/create-session.dto';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  approved: boolean = false;
  user: string = '';
  img: string = '';

  constructor(private route: Router, private router: ActivatedRoute, private authService: AuthService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe((qParams) => {
      const ap = qParams['approved'];
      const rToken = qParams['request_token'];
      this.approved = ap == 'true' ? true : false;

      if (this.approved) {
        let session = new CreateSessionDto();
        session.request_token = rToken;
        this.authService.createSession(session).subscribe((resp) => {
          localStorage.setItem('session_id', resp.session_id);
          console.log('Session id: ' + resp.session_id);

          this.accountService.getDetails().subscribe((resp) => {
            localStorage.setItem('account_id', String(resp.id));
            console.log('Account id: ' + resp.id);
            this.route.navigate(['/public/movies']);
          });

        });
      } else {
        if (localStorage.getItem('session_id') != null) {
          this.approved = true;
        }
      }
    });
  }

}
