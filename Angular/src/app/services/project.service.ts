import { Injectable ,Type} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { Global } from './global';
import { Observable } from 'rxjs';


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
    return this._http.get(this.url + 'projects',{headers:headers});
  }

  public getProject(id:Number): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'project'+'/'+id,{headers:headers});

  }
  deleteProject(id:Number): Observable<any>{

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'projectDelete'+'/'+id,{headers:headers});
  }
  updateProject(project:Project):Observable<any>{
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'projectUpdate'+'/'+project._id,params,{headers:headers});
  }
}
