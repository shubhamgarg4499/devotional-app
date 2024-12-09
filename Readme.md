# User Login Through Number

- POST METHOD
- URL https://devotional-app.onrender.com/user/login/Number

### Parameters

- country_code (string) (required)
- phone_number (string) (required)

### ERROR If any of the field missing

- Please Select your CountryCode/Please Enter your Phone Number

### Response

- success: true
- user (user details with token)
- token

### ON ERROR

- Error Message (It's A server Error Not A custom Error)

# User Login Through Google

- Get METHOD
- URL https://devotional-app.onrender.com/auth/google

### Parameters

- None

### Response

- success: true
- user (user details with token)
- token

### ON ERROR

- Error Message (It's a server Error Not A custom Error)

# Change User Details

- POST METHOD
- URL https://devotional-app.onrender.com/user/profile

### Parameters

- ### token (In Header) (required)
- name (string) (Optional)
- dob (string) (optional)
- gender (string) (optional)
- about (string) (optional)
  Need atleast one field

### ERROR If any Other Field Added

- You can provide only name, gender, dob, about fields

### Response

- success: true
- user (user details with token)

### ON ERROR

- Error Message (It's A server Error Not A custom Error)

# Logout User

- POST METHOD
- URL https://devotional-app.onrender.com/user/profile

### Parameters

- ### token (In Header) (required)

### Response

- success: true
- message: User Logged Out!

### ON ERROR

- Error Message (Note:- It's A server Error Not A custom Error)
