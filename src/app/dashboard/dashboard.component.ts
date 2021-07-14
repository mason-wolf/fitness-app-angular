import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  greeting = {};
  
  constructor(private authService : AuthService, private httpClient : HttpClient) {
 //   httpClient.get('resource').subscribe(data => this.greeting = data);
  }
  
  
  ngOnInit(): void {
  }

}
