import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestDetailsComponent } from './components/requests/details/request-details.component';
import { RequestFormComponent } from './components/requests/form/request-form.component';
import { RequestListComponent } from './components/requests/listado/request-list.component';
import { StatusNamePipe } from './status-name.pipe';
@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
    RequestListComponent,
    RequestDetailsComponent,
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
    MatInputModule,
    MatProgressBarModule

  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
