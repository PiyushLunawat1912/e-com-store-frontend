import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formbuilder = inject(FormBuilder);
  registerForm = this.formbuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]], 
  });

  authService = inject(AuthService);
  router = inject(Router)
  register() {
   let value =  this.registerForm.value;
    this.authService.register(value.name!,value.email!,value.password!).subscribe(result=>{
      alert("User Registered");
      this.router.navigateByUrl("login")
    });
    
  }
}
