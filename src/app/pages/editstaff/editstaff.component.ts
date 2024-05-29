import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editstaff',
  templateUrl: './editstaff.component.html',
  styleUrls: ['./editstaff.component.scss']
})
export class EditstaffComponent implements OnInit {
  userForm: FormGroup;
  userId: number;
  userRoles: string[] = [];
  password: any;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchUserRoles();
    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      Name: ['', Validators.required],
      emailId: ['', Validators.required],
      Username: ['', Validators.required],
      role: ['', Validators.required],
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
          password:response.password,
          role:response.roleId,
        });
        console.log('password:', response.password);
        this.password=response.password;
      },
      error => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  // async onSubmit(): Promise<void> {
  //   if (this.userForm.valid) {
  //     // Update user details here
  //     console.log("User details to update:", this.userForm.value);
  //     this.router.navigate(['/staffspage']);
  //   }
  // }
  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      const userId = this.userForm.get('id')?.value;
      const currentDate = new Date(); 
        const formattedDate = currentDate.toISOString(); 
      const userData = {
        id: userId,
        loginId: this.userForm.get('Username')?.value,
        password: this.password,
        roleId: this.userForm.get('role')?.value,
        emailId: this.userForm.get('emailId')?.value,
        fullName:this.userForm.get('Name')?.value,
        isActive: true,
        createdon: "2024-05-28T16:49:41.088Z",
        createdby: "",
        lastModifiedOn: formattedDate,
        lastModifiedBy: "0",
      };
      console.log(userData,"userdata")
  
      try {
       
        await this.httpService.updatestaff(userId, userData).toPromise();
        console.log('staff updated successfully');
        this.showSuccess();
      } catch (error) {
        console.error('Error updating staff:', error);
      }
    }
  }

  fetchUserRoles() {
    this.httpService.getuserlogin().subscribe(
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
    console.log('Selected value:', this.userForm.value.role);
  }
  showSuccess() 
  {

    Swal.fire({
      title: 'Update staff ',
      text: 'Record Updated Successfully...',
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
