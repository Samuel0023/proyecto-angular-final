import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Imports Components
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/create/create.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DetailComponent } from './components/detail/detail.component';
import { ErrorComponent } from './components/error/error.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  {path:'',component:AboutMeComponent},
  {path:'aboutMe', component: AboutMeComponent},
  {path:'contact', component: ContactComponent},
  {path:'create', component: CreateComponent},
  {path:'projects', component: ProjectsComponent},
  {path:'project/:id' , component:DetailComponent},
  {path:'edit-project/:id', component:EditComponent},
  {path:'**' , component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
