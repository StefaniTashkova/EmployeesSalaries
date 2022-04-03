import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from './employees/employee.service';
import {Employee} from './employees/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EmployeesSalaries';

  constructor() {}

  ngOnInit(): void {
  }


}
