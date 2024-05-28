import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-editstaff',
  templateUrl: './editstaff.component.html',
  styleUrls: ['./editstaff.component.scss']
})
export class EditstaffComponent implements OnInit {
  userForm: FormGroup;
  userId: number;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      Name: ['', Validators.required],
      emailId: ['', Validators.required],
      Username: ['', Validators.required],
      // role: ['', Validators.required],
    });

    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id');
      if (this.userId) {
        this.getUserById(this.userId);
      }
    });
    console.log(this.userId,"userid")
  }

  getUserById(userId: number): void {
    this.httpService.getbyiduserlogin(userId).subscribe(
      response => {
        console.log('User details fetched:', response);
        this.userForm.patchValue({
          id: response.id,
          Name: response.fullName,
          emailId: response.emailId,
          Username: response.fullName,
          // role:response.role,
        });
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      // Update user details here
      console.log("User details to update:", this.userForm.value);
      this.router.navigate(['/staffspage']);
    }
  }
}
