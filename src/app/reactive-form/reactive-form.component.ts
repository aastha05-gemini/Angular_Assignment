import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/person';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  get userName() {
    return this.signUp.get('userName');
  }

  get fatherName() {
    return this.signUp.get('fatherName');
  }
  get email() {
    return this.signUp.get('email');
  }

  get password() {
    return this.signUp.get('password');
  }

  get mobile() {
    return this.signUp.get('mobile');
  }

  // function to match the regex and validate email and mobile number
  validateEmail(emails: any) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/.test(emails.value)
      ? null
      : emails;
  }

  validateMobile(numbers: any) {
    return /^\d{10}$/.test(numbers.value) ? null : numbers;
  }

  constructor(private fb: FormBuilder) {}

  signUp = this.fb.group({
    userName: ['', Validators.required],
    fatherName: ['', Validators.required],
    email: ['', [Validators.required, this.validateEmail]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    mobile: ['', [Validators.required, this.validateMobile]],
  });

  person: Person = new Person('', '', '', '', '');
  userList: Person[] = JSON.parse(localStorage.getItem('userDetails') || '[]');

  ngOnInit(): void {}
  onSubmit(signUp: any) {
    this.person = new Person(
      signUp.value.userName,
      signUp.value.fatherName,
      signUp.value.email,
      signUp.value.password,
      signUp.value.mobile
    );
    this.userList.push(this.person);
    localStorage.setItem('userDetails', JSON.stringify(this.userList));
    this.signUp.reset();
  }
}
