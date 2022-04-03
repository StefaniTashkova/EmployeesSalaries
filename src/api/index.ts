const employees = require('./employees');
const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.get('/', (req, res) => {
  res.send(employees);
});

app.get('/employee/:employeeId/', (req, res) => {
  res.send(employees.find((employee) => employee.id = req.params.employeeId))
});

app.get('/employee/:employeeId/calculateTakeHome', (req, res) => {
  const foundEmployee = employees.find((employee) => employee.id = req.params.employeeId);

  if (foundEmployee) {
    res.send({calculatedTakeHome: foundEmployee.salary - (foundEmployee.incomeTax + foundEmployee.nationalInsurance)});
  }
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
// define a route handler for the default home page

