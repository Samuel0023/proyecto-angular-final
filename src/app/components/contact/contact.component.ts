import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider!: number;
  public anchuraToSlider!:number;
  public captions: boolean;
  public autor:any;
  public info!:string;
  constructor() {
    this.captions=false;
  }

  ngOnInit() {
  }

  loadSlider(){
    this.anchuraToSlider = this.widthSlider;
  }
  vaciarContenido(){
    this.anchuraToSlider = NaN;
  }
  getAutor(event:any){
    console.log(event);
    this.autor=event;
    this.info =this.autor.nombre + " -- " + this.autor.website;
  }
}
