
- what is difference between model.find() vs model.findOne()
- API - get document by using email
- API - get all the documents using "/feed"
 

 - EP - 23 AUthentication
    - validate the Data in signup API
    - Install bcrypt package
    - create passwordHash using bcrypt.hash & save the user is encrypted
    - create logIn API

    - install cookies-parser
    - just send dummy cookies to user
    - create GET /profile API and check if you get the cookies back
    - install jsonwebtoken npm packages
    - in logIn API, after email and password validation, create a JWT token and send it to user cookies
    - read the cookies inside your profile PI and find the loggers in user
    - userAuth middleware
    - Add the userAuth middleware in /profile API and a new sendConnectionResquest API
    - set the expiry of JWT and cookies to 7 days
    - create schema methods to getJWT
    - create schema method to validatePassword compare 
