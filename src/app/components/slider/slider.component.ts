import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
declare var $:any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input()
  anchura!: number;
  @Input('etiquetas')
  captions: boolean = false;
  @Output() conseguirAutor= new EventEmitter();

  public autor:any;
  constructor() {
    this.autor={
      nombre:"Samuel Ontiveros",
      website: "samuelontiveros.web",
      nick: 'sams'
    }
   }

  ngOnInit(): void {

    $("#logo").on("click",(e:any)=>{
      e.preventDefault();
      $("header").css("background","green").css("heigth","50px");
    });

    $('.galeria').bxSlider({
      auto: true,
      autoControls: true,
      stopAutoOnClick: true,
      pager: true,
      captions:this.captions,
      slideWidth: this.anchura
    });
  }

  throwEvent(event: any){
    this.conseguirAutor.emit(this.autor);
  }

}
