import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { firstValueFrom } from 'rxjs';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staffspage',
  templateUrl: './staffspage.component.html',
  styleUrls: ['./staffspage.component.scss']
})
export class StaffspageComponent implements OnInit {
  Userlogin: any[];

  constructor(private HttpService: HttpService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.fetchUserLogin();
  }
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

  async deleteuserlogin(id: number): Promise<void> {
    try {
      
      await this.HttpService.deleteUserLogins(id).toPromise();
      console.log(`Category with ID ${id} deleted successfully.`);
      this.fetchUserLogin();
      
    } catch (error) {
      console.error('Error deleting category:', error);
      
    }
  }
}
