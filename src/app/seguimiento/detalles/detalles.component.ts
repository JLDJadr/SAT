import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../Services/dataservice.service';
import { answerColumnsBBDD, AnswerDTO } from '../../Models/answer.dto';
import { MatTableDataSource } from '@angular/material/table';
import { UserDTO } from '../../Models/user.dto';
import { RequestDTO } from '../../Models/request.dto';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.scss'
})
export class SeguimientoDetallesComponent {
  columnsDisplayed: string[] = answerColumnsBBDD.map((col) => col.key)
  columnsSchema: any = answerColumnsBBDD
  dataSource = new MatTableDataSource()

  id: number = +this.route.snapshot.paramMap.get('id')
  answers: AnswerDTO[] = []
  users: UserDTO[] = []
  requests: RequestDTO[] = []

  loading: boolean = true

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void { this.loadAllData() }

  loadAllData(): void {
    this.dataService.getAllUsers().subscribe((users: UserDTO[]) => { this.users = users })
    this.dataService.getAllRequests().subscribe((requests: RequestDTO[]) => {
      this.requests = requests
      this.loadAnswers()
    })
  }

  loadAnswers(): void {
    this.dataService.getAllAnswers().subscribe((answers: AnswerDTO[]) => {
      this.dataSource.data = answers.filter((answer: AnswerDTO) => answer.requestId == this.id).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((answer: AnswerDTO) => {
        const answerUser: UserDTO = this.users.find((user: UserDTO) => answer.user == user.id.toString())
        answer.user = (`${answerUser.userCode} - ${answerUser.name} ${answerUser.lastname}`)
        return answer
      })
      this.loading = false
    })
  }
}
