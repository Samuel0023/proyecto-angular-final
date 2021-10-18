import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { UploadService } from '../../services/upload.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Global } from '../../services/global';


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
  public filesToUpload: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title= "Crear Projecto";
    this.project = new Project('','','',2020,'','');
    this.status = '';
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
          console.log(result);
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


}
