import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {

  puta: ActivatedRoute = {} as ActivatedRoute;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.puta = this.route.children[1]
  console.log(this.puta);
  }
}
