# Dev Tinder APIs

    ## Auth APIs
    - POST /sigup
    - POST /login
    - POST /logout

    ## Prifile Routers
    - GET /profile/view
    - PATCH /profile/edit
    - PATCH /profile/password

    ## connection Request Routers
    - POST /request/send/:status/:userId
    - POST /request/review/:status/:requestId

    ## User Routers
    - GET /user/connections
    - GET /user/request
    - GET /user/feed  - get you the profiles of other user on platform

    - STATUS: 
        - ignore
        - interested
        - accepted
        - rejected
