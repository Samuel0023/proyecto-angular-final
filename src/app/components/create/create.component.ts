import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { UploadService } from '../../services/upload.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Global } from '../../services/global';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService ,UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  private status: string;
  public save_project:Project;
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router
  ) {
    this.title= "Crear Projecto";
    this.project = new Project('','','',2020,'','');

    this.save_project = new Project('','','',2020,'','');
    this.status = '';
    this.filesToUpload = new Array();
  }

  ngOnInit() {
  }
  public onSubmit(form:any):void{
    this._projectService.saveProject(this.project).subscribe(
      response => {
      if(response.project){
        this.status = 'success';

        //guardar imagen
        console.log(response.project);

        this._uploadService.makeFileRequest(Global.url+ 'uploadImage/'+ response.project._id ,[],this.filesToUpload,'image').then((result:any)=>{


          this.save_project = response.project;

        });
      }
      else this.status = 'failed';

      },
      error => {
        console.log(<any>error);
      }
    )
  }

  public fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  public checkProject(){
    this._router.navigate(['/project/'+this.save_project._id]);
  }

}
