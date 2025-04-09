import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { requestColumnsBBDD, RequestDTO } from '../../Models/request.dto';
import { UserDTO } from '../../Models/user.dto';
import { DataService } from '../../Services/dataservice.service';
import { MatSort } from '@angular/material/sort';

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

  loading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: DataService) { }

  ngOnInit(): void { this.loadAllData() }

  loadAllData(): void {
    this.dataService.getAllUsers().subscribe((users: UserDTO[]) => { this.users = users; this.loadRequests() })
  }

  loadRequests(): void {
    this.loading = true
    this.dataService.getAllRequests().subscribe((requests: RequestDTO[]) => {
      this.requests = this.transformData(requests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
      this.dataSource.data = this.requests

      this.loading = false
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  transformData(requests: RequestDTO[]): RequestDTO[] {
    return requests.map((request: RequestDTO) => {
      const requestUser: UserDTO = this.users.find((user: UserDTO) => user.id == +request.user)
      request.user = (`${requestUser.userCode} - ${requestUser.name} ${requestUser.lastname}`)
      return request
    })
  }

  selectFilter(event: any): void {
    const statusList: string[] = event.value
    this.dataSource.data = statusList.length ? this.requests.filter((request: RequestDTO) => statusList.includes(request.status)) : [...this.requests]
  }

  freeFilter(event: any): void {
    const filterText: string = event.target.value
    this.dataSource.filter = filterText.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
