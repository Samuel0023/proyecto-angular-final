import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/models/project';
import { Global } from '../../services/global';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService]
})
export class EditComponent implements OnInit {
  public url: string;
  public title: string;
  public project: Project;
  private status: string;
  public save_project:any;
  public filesToUpload: Array<File>;
  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url= Global.url;
    this.title= "Editar Projecto";
    this.status = '';
    this.project = new Project('','','',2020,'','');
    this.filesToUpload = new Array();

  }
  ngOnInit(): void {
    this._route.params.subscribe(params=> {
      let id= params.id
      this.getProject(id);
    });
  }
  getProject(id:any): void{

    this._projectService.getProject(id).subscribe(response=>{
      this.project= response.project;
    },
    error=>{
      console.log(error);
    })
  }
  onSubmit(){
    this._projectService.updateProject(this.project).subscribe(res=>
          {
            if(res.project){
              this.uploadImage(res);
            }else{
              this.save_project = res.project;
              this.status  = "success"
            }
            this._router.navigate(['/project/'+this.project._id]);
            console.log(res);
          },
          error =>{
            console.log(error);
          });
  }
  public uploadImage(res:any){
    if(this.filesToUpload.length){
      this._uploadService.makeFileRequest(Global.url+ 'uploadImage/'+ res.project._id ,[],this.filesToUpload,'image').then((result:any)=>{
        this.save_project = res.project;
        this.status = 'success'
      });
    }else{
      this.save_project = res.project;
      this.status  = "success"
    }
  }
  public fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

}
