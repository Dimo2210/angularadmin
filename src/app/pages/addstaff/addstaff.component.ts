import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.scss']
})
export class AddstaffComponent implements OnInit {
  staffForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      Name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      emailId: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.staffForm.valid) {
      console.log(this.staffForm.value);
      // Call your API or perform other actions here
      this.router.navigate(['/dashboard']);
    }
  }
}
