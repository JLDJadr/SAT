import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../Services/dataservice.service';
import { UserDTO } from '../../Models/user.dto';
import { requestColumnsBBDD, RequestDTO } from '../../Models/request.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.scss'
})
export class SeguimientoComponent {
  columnsDisplayed: string[] = requestColumnsBBDD.map((col) => col.key)
  columnsSchema: any = requestColumnsBBDD
  dataSource = new MatTableDataSource()

  users: UserDTO[] = []
  requests: RequestDTO[] = []


  constructor(private dataService: DataService) { }

  ngOnInit(): void { this.loadAllData() }

  loadAllData(): void {
    this.dataService.getAllUsers().subscribe((users: UserDTO[]) => { this.users = users })
    this.dataService.getAllRequests().subscribe((requests: RequestDTO[]) => {
      this.requests = requests
      this.dataSource.data = this.requests
    })
  }
}
