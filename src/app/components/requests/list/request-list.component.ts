import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { requestColumnsBBDD, RequestDTO } from '../../../models/request.dto';
import { UserDTO } from '../../../models/user.dto';
import { DataService } from '../../../Services/data.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  private filters = { status: [], type: []};

  users: UserDTO[] = []
  requests: RequestDTO[] = []

  loading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void { this.loadAllData() }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  loadAllData(): void {
    const usersSub = this.dataService.getAllUsers().subscribe((users: UserDTO[]) => { 
      this.users = users; 
      this.loadRequests() 
    }, error => {
      this.showSnackBar(error)
    })
    this.subscriptions.add(usersSub)
  }

  loadRequests(): void {
    this.loading = true
    const requestSub = this.dataService.getAllRequests().subscribe((requests: RequestDTO[]) => {
      this.requests = this.transformData(requests.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
      this.dataSource.data = this.requests
      this.loading = false
      this.showSnackBar('Requests received successfully!!!')
    } , error => {
      this.showSnackBar(error)
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
    this.filters[filterType] = event.value
    this.applyFilters()

    this.applyFilters();
  }

  private applyFilters(): void {
    this.dataSource.data = this.requests.filter((request: RequestDTO) =>
      (!this.filters.status.length || this.filters.status.includes(request.status)) &&
      (!this.filters.type.length || this.filters.type.includes(request.type))
    );
  }

  freeFilter(event: any): void {
    const filterText: string = event.target.value
    this.dataSource.filter = filterText.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar'],
    });
  }
}
