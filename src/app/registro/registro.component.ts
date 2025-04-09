import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../Services/dataservice.service';
import { UserDTO } from '../Models/user.dto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  registerForm: FormGroup

  users: UserDTO[] = []
  selectedUser: UserDTO;
  userExists: boolean = false

  constructor(private dataService: DataService, private location: Location) {
    this.registerForm = new FormGroup({
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
    this.registerForm.get('type')[targetUser ? 'enable' : 'disable']();
    this.userExists = targetUser ? true : false;
    this.selectedUser = targetUser ? targetUser : undefined;
    this.registerForm.get('type').setValue(targetUser ? '' : undefined)
  }

  afterRadioCheck(): void {
    const radioValue = this.registerForm.get('type')?.value

    this.registerForm.get('title')[radioValue ? 'enable' : 'disable']();
    this.registerForm.get('description')[radioValue ? 'enable' : 'disable']();
  }

  submit(): void {
    this.registerForm.get('user').setValue(this.selectedUser.id)
    this.downloadJSON() // Temporal, para revisar si son correctos los datos.
    this.goBack()
  }

  private goBack(): void { this.location.back() }

  // Temporal. Revisar si los datos son correctos
  downloadJSON(): void {
    const formData = this.registerForm.getRawValue();
    const jsonString = JSON.stringify(formData, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'registerForm.json';
    a.click();

    URL.revokeObjectURL(url);
  }

}
