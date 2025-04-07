import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { SeguimientoComponent } from './seguimiento/listado/seguimiento.component';
import { BodyComponent } from './body/body.component';
import { SeguimientoDetallesComponent } from './seguimiento/detalles/detalles.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'seguimiento', component: SeguimientoComponent },
  { path: 'seguimiento/:id', component: SeguimientoDetallesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
