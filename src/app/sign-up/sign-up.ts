import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { NgValidationError, ValidationError, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-sign-up',
  imports: [ ɵInternalFormsSharedModule,CommonModule,ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {

  signupform!:FormGroup
  isSubmitted = false;
  private fb =inject(FormBuilder);
  ngOnInit():void {this.signupform =this.fb.nonNullable.group({
    username:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]]
    ,password:['',Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]
,confirmpassword: ['', Validators.required]
  },{validators:this.passwordmatchvalidator})
}
passwordmatchvalidator(control:AbstractControl):ValidationErrors | null{
const password =control.get('password');
const confirmpassword =control.get('confirmpassword')
if(password&&confirmpassword&&password.value!==confirmpassword.value){
  return {passwordMismatch:true}
}
return null
}
get f() {
  return this.signupform.controls;
}
onsubmit(){
  this.signupform.markAsPristine
   this.isSubmitted = true;

    if (this.signupform.invalid) {
      return;
}
} }
