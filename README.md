# Storefront Backend Project
***The Server-Side of online Storfront created to provide the the APIs will be fetched using the Front-End Side to get the data and store or delete products from and to the database as well as adding authentication and authorization for admins to add or remove to or from database***
## How to setup and connect to the database

- database.js is the script to connect to database.
- .env file has a variables needs to be secured.
 - has the information to connect to the database
 - the token_secret variable.
 - the saltRounds variable.
 - the bycript password used to hash the password of the user.
- database.json has the information of the testing and developing databases that should be exists

#### Ports of the database and Backend:
- database Port : 5432
- Backend Port : 3000


## Package installation instructions.
 - write on Terminal "npm install" to install all packages using package.json file.
 - #### Note: 
    - ***you have to install visual studio 17 "desktop department c++" and CMake builder for db-migrate***
      ***and db-migrate-pg libraries.***

## Steps:
 - Create manually the ***Store*** and ***Store_test*** databases.
 - for testing: write on Terminal >>"npm run test"
 - for watching the server and do the requestes by yourself: write on Terminal >>"npm run watch".


# Note: 

 ### the testing has 3 pending test i stopped them
  #### they were the "delete table" test as the orderedProduct and orders tables depends on another tables
  #### they work but it must be stopped to continue the other tests
