import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { SeguimientoDetallesComponent } from './seguimiento/detalles/detalles.component';
import { SeguimientoComponent } from './seguimiento/listado/seguimiento.component';
import { MatSelectModule } from '@angular/material/select';
import { StatusNamePipe } from './status-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    SeguimientoComponent,
    SeguimientoDetallesComponent,
    StatusNamePipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSortModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
