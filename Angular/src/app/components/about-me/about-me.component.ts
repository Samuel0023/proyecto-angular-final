import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public mail: string;

  constructor() {
    this.title = 'Samuel Ontiveros';
    this.subtitle = 'Desarrollador Web';
    this.mail = "enrissmuelo@gmail.com"
  }

  ngOnInit() {
  }

}
