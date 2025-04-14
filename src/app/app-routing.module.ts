import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDetailsComponent } from './components/requests/details/request-details.component';
import { RequestFormComponent } from './components/requests/form/request-form.component';
import { RequestListComponent } from './components/requests/listado/request-list.component';


const routes: Routes = [
  { path: 'request/form', component: RequestFormComponent },
  { path: 'request/list', component: RequestListComponent },
  { path: 'request/list/:id', component: RequestDetailsComponent },
  { path: '', redirectTo: 'request/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
