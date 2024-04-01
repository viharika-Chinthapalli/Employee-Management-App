In the project directory, you can run:

### `nodemon server.js`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.


###                                          `ADMIN ROUTES`

The Admin Get all the Employees Details
### Get: http://localhost:8000/api/employees

The Admin Update Employees Details
### PUT: http://localhost:8000/api/employees/64b4ea2b8b1cff15824baaf1(employee_id)

### JSON DATA:
   {
        "name": "shobithaRaniAPambala",
        "email": "g@gmail.com",
        "team": "backend",
        "phoneNumber": "1234567890",
        "dateOfBirth": "2003-01-31T18:30:00.000Z",
        "dateOfJoining": "2023-01-01T18:30:00.000Z",
        "password": "greeshmika"
   }

The Admin Delete the Employees Details
### Delete: http://localhost:8000/api/employees/64bfc27f43436931c1c5f3e0

The  Admin can add the Employee Details 
### Post : http://localhost:8000/api/employees

 ### JSON DATA:
 {
    "_id": "64b4ea2b8b1cff15824baaf1",
    "name": "shobitha",
    "email": "g@gmail.com",
    "team": "backend",
    "phoneNumber": "1234567890",
    "dateOfBirth": "2003-01-31T18:30:00.000Z",
    "dateOfJoining": "2023-01-01T18:30:00.000Z",
    "password": "greeshmika"
  }
  
###         lONGLEAVEREQUEST

The Admin Fetch the  all the Leaverequests
 ### GET : http://localhost:8000/api/employees/leaverequest
 
The Admin Approve the paticular Leaverequest by employee_id
 ### PUT:  http://localhost:8000/api/employees/leaverequest/64b7b617efd2b501497c4f53/approve

The Admin Reject the paticular Leaverequest by employee_id
 ### PUT:  http://localhost:8000/api/employees/leaverequest/64b7b617efd2b501497c4f53/reject

 ### JSON DATA:
        {
            "employeeId": "64b6308aa11c352f4fa1df7b",
            "employeeName": "heloo",
            "status": "pending",
            "fromDate": "2023-07-25T00:00:00.000Z",
            "toDate": "2023-07-30T00:00:00.000Z",
            "leaveType": "annual"
        }
        
###   SHORTLEAVEREQUEST 

The Admin can  Fetch the  all the Leaverequests
### GET: http://localhost:8000/api/employees/shortleaverequest

The Admin can Approve the paticular Leaverequest by employee_id
### PUT: http://localhost:8000/api/employees/shortleaverequest/64ba71dfe60d20e404a402ce/approve

The Admin can Reject the paticular Leaverequest by employee_id
### Put:http://localhost:8000/api/employees/shortleaverequest/64ba71dfe60d20e404a402ce/reject

### JSON DATA:
    {
        "employeeId": "64b524fdd912932e65b22923",
        "employeeName": "John Doe",
        "status": "rejected",
        "leaveType": "short",
        "fromDate": "2023-07-21T00:00:00.000Z",
        "THe AdminDate": "2023-07-21T00:00:00.000Z",
        "fromTime": "09:00 AM",
        "THe AdminTime": "12:00 PM"
    }

    
### TIMESHEETS

The Admin can Fetch   all  Timesheets
### GET: http://localhost:8000/api/employees/timesheets

The Admin can Approve the paticular Leaverequest by employee_id
### PUT: http://localhost:8000/api/employees/timesheets/64aebf095344fcd798f0db92/approve

The Admin can Reject the paticular Leaverequest by employee_id
### PUT: http://localhost:8000/api/employees/timesheets/64aebf095344fcd798f0db92/reject

### JSON DATA:
    {
        "employeeId": "64aeb6c9e624d0ec8ba945a4",
        "weekStartDate": "2023-07-12T00:00:00.000Z",
        "hoursWorked": {
        "monday": 8,
        "tuesday": 8,
        "wednesday": 8,
        "thursday": 8,
        "friday": 8
        },
        "documents": [
        "document1.pdf",
        "document2.pdf"
        ],
        "approved": true
    }

The Admin can Fetch the Timesheets based on employee_id/year   
### GET: http://localhost:8000/api/employees/64b524fdd912932e65b22923/timesheets/2023

The Admin can Fetch the Timesheets based on employee_id/year/month
### GET :http://localhost:8000/api/employees/64b524fdd912932e65b22923/timesheets/2023/7

The Admin can Fetch the Timesheets based on employee_id/year/month/week
### GET: http://localhost:8000/api/employees/64b524fdd912932e65b22923/timesheets/2023/7/wednesday

The Admin can Fetch the Timesheets based on employee_id/year/month/week/date
### GET: http://localhost:8000/api/employees/64b524fdd912932e65b22923/timesheets/2023/7/wednesday/26

###                                        `EMPLOYEE ROUTES`
                                                                                              
### TIMESHEETS

The Employee  can fetch the employee details through empoloyee Id
### GET: http://localhost:8000/api/employee/64b524fdd912932e65b22923

The Employee  can fetch the Timesheets  through empoloyee Id
### GET : http://localhost:8000/api/employee/64b6308aa11c352f4fa1df7b/timesheets

The Employee can upadate the Employee Details through employee_id
### PUT: http://localhost:8000/api/employee/64c0d6b503316d2f4bedd4fe (UPADATE THE EMPLOYEE)

The Employee can reset the pasword through email & newPassword
### PUT :http://localhost:8000/api/employee/resetpassword

### JSON DATA:
    {
        "email": "jon@example.com",
        "newPassword": "hshinser@j"
    }

The Employee can entry  timesheet details
### POST :http://localhost:8000/api/employee/timesheets

### JSON DATA:
    {
        "employeeId" :"64b524fdd912932e65b22923",
        "employeeName": "alina",
        "status": "pending",
        "year": 2023,
        "month": 7,
        "week": "friday",
        "date": 28,
        "fromTime": "11:00 AM",
        "toTime": "2:00 PM",
        "documents": [
        "https://example.com/document1.pdf",
        "https://example.com/document2.jpg"
        ],
        "notes": "Bckend is Completed "
    }
    
### LEAVEREQUEST(LONG)

The employee can apply the longleave as per the required days
### POST:http://localhost:8000/api/employee/leaverequest

### JSON DATA:
    {
        "employeeId": "64bfca977291045826af74b0",
        "employeeName": "dimple",
        "email": "johndoe@example.com",
        "status": "pending",
        "fromDate": "2023-07-30T00:00:00.000Z",
        "toDate": "2023-08-05T00:00:00.000Z",
        "reason": "Vacation",
        "leaveType": "long"
    }

### SHORTLEAVEREQUEST

The employee can apply the shortleave  within  in a Day 
### POST: http://localhost:8000/api/employee/shortleaverequest
### JSON DATA:
    {
        "employeeId": "64b524fdd912932e65b22923",
        "employeeName": "John Doe",
        "email": "hello@gmail",
        "status": "pending",
        "leaveType": "short",
        "date": "2023-07-21",
        "fromTime": "09:00 AM",
        "toTime": "12:00 PM",
        "reason" :"sick"
    }
    
The Employee can Fetch the  all the Longleaves  applied by employee_id
### GET : http://localhost:8000/api/employee/64bfca977291045826af74b0/leaverequest

The Employee can Fetch the  all the ShortLongleaves  applied by employee_id
### GET : http://localhost:8000/api/employee/64b524fdd912932e65b22923/shortleaverequest

The Employee can Fetch the Timesheets based on employee_id/year
### GET: http://localhost:8000/api/employee/64b6308aa11c352f4fa1df7b/timesheets/2023

The Employee can Fetch the Timesheets based on employee_id/year/month
### GET: http://localhost:8000/api/employee/64b6308aa11c352f4fa1df7b/timesheets/2023/7

The Employee can Fetch the Timesheets based on employee_id/year/month/week
### GET : http://localhost:8000/api/employee/64b6308aa11c352f4fa1df7b/timesheets/2023/7/friday

The Employee can Fetch the Timesheets based on employee_id/year/month/week/date
### GET : http://localhost:8000/api/employee/64b6308aa11c352f4fa1df7b/timesheets/2023/7/friday/28