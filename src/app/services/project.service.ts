import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Global } from './global';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';


@Injectable()
export class ProjectService{
  public url: string;

  constructor(
    private  _http: HttpClient
  ){
    this.url = Global.url;
  }

  testService(){
    return 'Probando el servicio de Angular';
  }

  public saveProject(project:Project): Observable<any>{
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'saveProject',params,{headers: headers});
  }

  public getProjects(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'projects',{headers:headers})
  }

  public saveAs(project:Project): Observable<any>{
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return;
  }
}
