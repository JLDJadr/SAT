import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { requestColumnsBBDD, RequestDTO } from '../../../models/request.dto';
import { UserDTO } from '../../../models/user.dto';
import { DataService } from '../../../Services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent {
  columnsDisplayed: string[] = requestColumnsBBDD.map((col) => col.key)
  columnsSchema: any = requestColumnsBBDD
  dataSource = new MatTableDataSource()

  private subscriptions = new Subscription();

  users: UserDTO[] = []
  requests: RequestDTO[] = []

  loading: boolean = true;

  selectedStatus: string[] = []
  selectedType: string[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dataService: DataService) { }

  ngOnInit(): void { this.loadAllData() }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  loadAllData(): void {
    const usersSub = this.dataService.getAllUsers().subscribe((users: UserDTO[]) => { this.users = users; this.loadRequests() })
    this.subscriptions.add(usersSub)
  }

  loadRequests(): void {
    this.loading = true
    const requestSub = this.dataService.getAllRequests().subscribe((requests: RequestDTO[]) => {
      this.requests = this.transformData(requests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
      this.dataSource.data = this.requests
      this.loading = false
    })

    this.subscriptions.add(requestSub)
    
  }

  transformData(requests: RequestDTO[]): RequestDTO[] {
    return requests.map((request: RequestDTO) => {
      const requestUser: UserDTO = this.users.find((user: UserDTO) => user.id == +request.user)
      request.user = request.user ? `${requestUser.userCode} - ${requestUser.name} ${requestUser.lastname}` : 'Usuario desconocido'
      return request
    })
  }

  selectFilter(event: any, filterType: 'status' | 'type'): void {
    if (filterType === "status") {
      this.selectedStatus = event.value
    } else if (filterType === "type") {
      this.selectedType = event.value
    }

    this.applyFilters();
  }

  private applyFilters(): void {
    this.dataSource.data = this.requests.filter((request: RequestDTO) =>
      (!this.selectedStatus.length || this.selectedStatus.includes(request.status)) &&
      (!this.selectedType.length || this.selectedType.includes(request.type))
    );
  }

  freeFilter(event: any): void {
    const filterText: string = event.target.value
    this.dataSource.filter = filterText.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
