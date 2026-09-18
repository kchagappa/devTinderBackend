
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
    - list the APIs need to build for DevTinder
    - group the APIs using express Router
    - read express Router documentation
    - Read about the pre-handler in the schema. Also, read about indexes and compound indexes—why they are needed and what issues can occur if we use too many unnecessary indexes.
    - read more about mongoDB query $or, $and, $ne etc.,

