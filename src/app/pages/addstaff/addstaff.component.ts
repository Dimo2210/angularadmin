import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/http.service';
@Component({
  selector: 'app-addstaff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.scss']
})
export class AddstaffComponent implements OnInit {
  staffForm: FormGroup;
  userRoles: string[] = [];
  constructor(private HttpService: HttpService,private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fetchUserRoles();
    this.staffForm = this.fb.group({
      Name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      emailId: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  // async onSubmit(): Promise<void> {
  //   if (this.staffForm.valid) {
  //     console.log(this.staffForm.value);
  //     // Call your API or perform other actions here
  //     this.router.navigate(['/dashboard']);
  //   }
  // }

  onSubmit() {
    if (this.staffForm.valid) {
      const UserData = {
        fullName: this.staffForm.get('Name')?.value,
        loginId: this.staffForm.get('username')?.value,
        password: this.staffForm.get('password')?.value,
        emailId: this.staffForm.get('emailId')?.value,
        roleId:this.staffForm.get('role')?.value,
        createdOn: new Date().toISOString(), 
        createdBy: "0", 
        isActive: true, 
      };
  
      console.log('Category data:', UserData);
  
      this.HttpService.insertuser(UserData).subscribe(
        response => {
          console.log('Category added:', response);
          this.showSuccess();
          this.staffForm.reset();
        },
        error => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  // fetchUserroles() {
  //   this.HttpService.getuserlogin().subscribe(
  //     response => {
  //       console.log('UserLogins:', response);
  //       this.Userlogin = response; 
  //       console.log(this.Userlogin,"userroles")
  //     },
  //     error => {
  //       console.error('Error fetching UserLogins:', error);
  //     }
  //   );
  // }
  fetchUserRoles() {
    this.HttpService.getuserlogin().subscribe(
      response => {
        console.log('UserLogins:', response);
        this.userRoles = response; // Assign response to userRoles
        console.log(this.userRoles, "userroles"); // Note: Changed from this.Userlogin to this.userRoles
      },
      error => {
        console.error('Error fetching UserLogins:', error);
      }
    );
  }
 
  test(){    
    console.log('Selected value:', this.staffForm.value.role);
  }
  showSuccess() 
  {

    Swal.fire({
      title: 'Add Staff ',
      text: 'Record Insert Successfully...',
      icon: 'success',
      confirmButtonColor: '#DD6B55',
      }).then((result) => {
      if (result.isConfirmed) 
      {
        this.router.navigate(['/staffspage']);   
      }
    }); 
  } 
}
