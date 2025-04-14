import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../Services/data.service';
import { UserDTO } from '../../../models/user.dto';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})
export class RequestFormComponent {

  requestForm: FormGroup

  users: UserDTO[] = []
  selectedUser: UserDTO;
  userExists: boolean = false

  constructor(private dataService: DataService, private location: Location) {
    this.requestForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      type: new FormControl({ value: '', disabled: true }, [Validators.required]),
      title: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(256)]),
      description: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(4096)]),
      status: new FormControl('pending', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe((users: UserDTO[]) => this.users = users)
  }

  checkUsers(event: any): void {
    const userFieldValue = event.target.value.trim().toLowerCase()
    const targetUser: UserDTO = this.users.find((user: UserDTO) => user.userCode == userFieldValue || userFieldValue == user.email)
    this.requestForm.get('type')[targetUser ? 'enable' : 'disable']();
    this.userExists = targetUser ? true : false;
    this.selectedUser = targetUser ? targetUser : undefined;
    this.requestForm.get('type').setValue(targetUser ? '' : undefined)
  }

  afterRadioCheck(): void {
    const radioValue = this.requestForm.get('type')?.value
    this.requestForm.get('title')[radioValue ? 'enable' : 'disable']();
    this.requestForm.get('description')[radioValue ? 'enable' : 'disable']();
  }

  submit(): void {
    this.requestForm.get('user').setValue(this.selectedUser.id)
    this.downloadJSON() // Temporal, para revisar si son correctos los datos.
    this.goBack()
  }

  private goBack(): void { this.location.back() }

  // Temporal. Revisar si los datos son correctos
  downloadJSON(): void {
    const formData = this.requestForm.getRawValue();
    const jsonString = JSON.stringify(formData, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'requestForm.json';
    a.click();

    URL.revokeObjectURL(url);
  }

}
