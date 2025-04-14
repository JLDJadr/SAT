import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { answerColumnsBBDD, AnswerDTO } from '../../../models/answer.dto';
import { RequestDTO } from '../../../models/request.dto';
import { UserDTO } from '../../../models/user.dto';
import { DataService } from '../../../Services/data.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.scss'
})
export class RequestDetailsComponent {
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
