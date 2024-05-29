import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { firstValueFrom } from 'rxjs';
import {ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-staffspage',
  templateUrl: './staffspage.component.html',
  styleUrls: ['./staffspage.component.scss']
})
export class StaffspageComponent implements OnInit {
  Userlogin: any[];
  userRoles: any;

  constructor(private HttpService: HttpService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchUserRoles();

    
    this.fetchUserLogin();
  }
  // Define a method to get the role name based on roleId
getRoleName(roleId: number): string {
  const role = this.userRoles.find(role => role.id === roleId);
  return role ? role.name : ''; // Return role name if found, otherwise return an empty string
}

// Fetch user roles
fetchUserRoles() {
  this.HttpService.getuserlogin().subscribe(
      response => {
          console.log('UserRoles:', response);
          this.userRoles = response; // Assign response to userRoles
          console.log(this.userRoles, "userRoles");
      },
      error => {
          console.error('Error fetching UserRoles:', error);
      }
  );
}

// Fetch user logins
fetchUserLogin() {
  this.HttpService.UserLogins().subscribe(
      response => {
          console.log('UserLogins:', response);
          this.Userlogin = response;
      },
      error => {
          console.error('Error fetching UserLogins:', error);
      }
  );
}

  goto_userlogi_by_group(id: any) 
  {
    console.log(id)
    var data = 
    {
      "ID": id,
    };
    this.router.navigate(['/editstaff',{id:id}]);
    console.log(data);
  }

  // async deleteuserlogin(id: number): Promise<void> {
  //   try {
      
  //     await this.HttpService.deleteUserLogins(id).toPromise();
  //     console.log(`Category with ID ${id} deleted successfully.`);
  //     this.fetchUserLogin();
      
  //   } catch (error) {
  //     console.error('Error deleting category:', error);
      
  //   }
  // }


  async deleteuserlogin(id: number): Promise<void> {
    const isConfirmed = await this.showConfirmation();
  
    if (isConfirmed) {
      try {
        // Your delete logic here
        await this.HttpService.deleteUserLogins(id).toPromise();
        console.log(`staff with ID ${id} deleted successfully.`);
        this.fetchUserLogin();
        this.router.navigate(['/staffspage']);
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  }
  async showConfirmation(): Promise<boolean> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  
    return result.isConfirmed;
  }
}
