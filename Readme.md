# 1) User Login Through Number

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

# 2) User Login Through Google

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

# 3) Get User Details

- POST METHOD
- URL https://devotional-app.onrender.com/user/profile

### Parameters

- ### token (In Header) (required)

### Response

- success: true
- user (user details )

### ON ERROR

- Error Message (It's A server Error Not A custom Error)

# 4) Change User Details

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

# 5) Logout User

- POST METHOD
- URL https://devotional-app.onrender.com/user/profile

### Parameters

- ### token (In Header) (required)

### Response

- success: true
- message: User Logged Out!

### ON ERROR

- Error Message (Note:- It's A server Error Not A custom Error)

# 6) Change User Email

- POST METHOD
- URL https://devotional-app.onrender.com/user/changeUserEmail

### Parameters

- ### token (In Header) (required)
- email (string) (required)

### ERROR If Email field missing

- Give your Updated gmail

### Error If you trying to change email of the user who created his accoount with google login

- You cant change Email of this Account Because this account was created with Email

### Response

- success: true
- user (user details with token)

### ON ERROR

- Error Message (It's A server Error Not A custom Error)

# 7) Change User Phone Number

- POST METHOD
- URL https://devotional-app.onrender.com/user/changeUserPhoneNumber

### Parameters

- ### token (In Header) (required)
- phone_number (string) (required)
- countryCode (string) (required)

### ERROR If both fields missing

- Required Country Code & Phone Number!!

### Error If you trying to change Phone Number of the user who created his accoount with Phone Number

- You cant change Phone Number of this Account Because this account was created with Phone Number

### Response

- success: true
- user (user details with token)

### ON ERROR

- Error Message (It's A server Error Not A custom Error)

# 8) Change User Phone Number

- POST METHOD
- URL https://devotional-app.onrender.com/user/changeProfilePicture

### Parameters

- ### token (In Header) (required)
- profile_picture (file) (required)

### ERROR If field missing

- Please Upload a Profile Picture

### Response

- success: true
- user (user details with token)

### ON ERROR

- Error Message (It's A server Error Not A custom Error)
