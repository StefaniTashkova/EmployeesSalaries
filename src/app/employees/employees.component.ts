import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Employee} from './employee.model';
import {EmployeeService} from './employee.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employeeData: Employee[];
  subscription: Subscription;

  employeeAutocompleteData: Employee[];
  foundEmployee: Employee;
  calculatedTakeHomeSalary: number;
  @ViewChild('searchedEmployeeInput') searchedEmployeeInput: ElementRef;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.subscription = this.employeeService.getEmployeesList().subscribe(employees => {
      this.employeeData = employees;
    });
  }

  searchEmployeeByName(searchEmployeeInput, employeeData: Employee[]): Employee[] | Employee | undefined {
    const employeeInputSplit = searchEmployeeInput.split(' ').filter(element => element !== '');
    const firstName = employeeInputSplit[0] ? employeeInputSplit[0].trim() : undefined;
    const surname = employeeInputSplit[1] ? employeeInputSplit[1].trim() : undefined;
    // Find Exact match
    if (`${firstName} ${surname}` === searchEmployeeInput) {
      return employeeData.find((employee) => employee.firstName === firstName && employee.surname === surname);
    }
    const result = employeeData.filter((employee) => {
      const isEmployeeFound = employee.firstName.substr(0, firstName.length).toUpperCase() === firstName.toUpperCase()
        || employee.surname.substr(0, firstName.length).toUpperCase() === firstName.toUpperCase();

      return isEmployeeFound;
    });

    return result;
  }

  getEmployeeInput(employeeIdInput: HTMLInputElement): void {
    const employeeInput = employeeIdInput.value;
    if (employeeInput !== '') {
      const resultSearchEmployeeByName = this.searchEmployeeByName(employeeInput, this.employeeData);

      if (Array.isArray(resultSearchEmployeeByName) && resultSearchEmployeeByName.length > 1) {
        this.employeeAutocompleteData = resultSearchEmployeeByName;
      }

      if (!Array.isArray(resultSearchEmployeeByName)) {
        this.foundEmployee = resultSearchEmployeeByName;
        const {salary, incomeTax, nationalInsurance} = this.foundEmployee;
        this.calculatedTakeHomeSalary = this.employeeService.calculateTakeHome(salary, incomeTax, nationalInsurance);
      } else {
        this.foundEmployee = undefined;
      }
    }

  }

 ngOnDestroy(): void {
    this.subscription.unsubscribe();
 }

}
