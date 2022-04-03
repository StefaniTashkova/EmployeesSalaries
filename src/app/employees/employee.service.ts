import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import employees from '../../api/employees.json'
import {Employee} from './employee.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[];
  constructor(private http: HttpClient) {
  }

  getEmployeesList(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000');
  }

  calculateTakeHome(salary: number, incomeTax: number, nationalInsurance: number): number {
    return parseFloat(((salary - (incomeTax + nationalInsurance)).toFixed(2)));
  }

}
