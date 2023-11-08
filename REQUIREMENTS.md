# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- index: **used to show all Products on the List** using ***GET*** request.
 - the route used: http://localhost:3000/products

- read: **used to show specific Product using its id** using ***GET*** request.
 - the route used: http://localhost:3000/products/"write product id here"

- create [token required]: **used to add Product** using ***POST*** request.
 - the route used: http://localhost:3000/products
 - the **Body** of the  ***POST*** Request will be like this:
  {
      "product": {
          "name" : "Corwason",
          "price": 15
      }
  }
 - the header of the **Request** will contain the token 
  ***Example:*** ===> 
    {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0X25hbWUiOiJhaG1lZCIsImxhc3RfbmFtZSI6Im1vaGFtZWQiLCJwYXNzd29yZCI6IiQyYiQxMCRwQ1BNNTV2d3NjUTd1OHdyNlhUcUcuNk52eFYzZ1hQYVdQeUhDTjdaZEl0eFFDLldwT3l2RyJ9LCJpYXQiOjE2NDgwNDA5MzV9.fHoClR8nEXzmsF_NeXZnkcZT0bHtGQxMIXgKsCJtzXw"}

#### Users
- index [token required]: **used to show all Users Signed UP** using ***GET*** request.
 - the route used: http://localhost:3000/users
 - the header of the **Request** will contain the token 
 ***Example:*** ===> 
 {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0X25hbWUiOiJhaG1lZCIsImxhc3RfbmFtZSI6Im1vaGFtZWQiLCJwYXNzd29yZCI6IiQyYiQxMCRwQ1BNNTV2d3NjUTd1OHdyNlhUcUcuNk52eFYzZ1hQYVdQeUhDTjdaZEl0eFFDLldwT3l2RyJ9LCJpYXQiOjE2NDgwNDA5MzV9.fHoClR8nEXzmsF_NeXZnkcZT0bHtGQxMIXgKsCJtzXw"}


- read [token required]: **used to get the User data by its id** using ***GET*** request.
 - the route used: http://localhost:3000/users/"write user id here"
 - the **Body** of the ***GET*** Request will have the token to check validity to see the user data.


- create [token required]: **used to add User on Users Table** using ***POST*** request.
 - the route used: http://localhost:3000/users
 - the **Body** of the  ***POST*** Request will be like this:
  {
      "user": {
          "first_name": "Mahmoud",
          "last_name": "Sameh",
          "password": "164253"
      }
  }
 - the OUTPUT will be the token created for this user

#### Orders
- Current Order by user (args: user id)[token required]: **used to get the Orders of a user by its id** using ***GET*** Request.
 - the route used: http://localhost:3000/userorders/"write here the user's id".
 - the header of the **Request** will contain the token 
    ***Example:*** ===> 
        {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0X25hbWUiOiJhaG1lZCIsImxhc3RfbmFtZSI6Im1vaGFtZWQiLCJwYXNzd29yZCI6IiQyYiQxMCRwQ1BNNTV2d3NjUTd1OHdyNlhUcUcuNk52eFYzZ1hQYVdQeUhDTjdaZEl0eFFDLldwT3l2RyJ9LCJpYXQiOjE2NDgwNDA5MzV9.fHoClR8nEXzmsF_NeXZnkcZT0bHtGQxMIXgKsCJtzXw"}

## DataBases
#### Products Table
-  id
- name
- price

##### SQL Syntax to create the Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price INT
);


#### Users Table
- id
- firstName
- lastName
- password

##### SQL Syntax to create the Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR
);

#### Orders
- id
- user_id (REFERENCES to user table's id)
- status of order (active or complete)

##### SQL Syntax to create the Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20),
    user_id BIGINT REFERENCES users(id)
);

### orderedProducts Table
- id
- order_id (RFERENCES to orders table's id)
- product_id (RFERENCES to products table's id)
- quantity of each product in the order


##### SQL Syntax to create the orderedProducts table
CREATE TABLE prod_to_ord (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    quantity BIGINT,
    order_id BIGINT REFERENCES orders(id)
);



## .env file Variables

POSTGRES_HOST=127.0.0.1
PORT=5432
POSTGRES_DB=Store
POSTGRES_TEST_DB=Store_test
POSTGRES_USER=mahmoud
POSTGRES_PASSWORD=123456
ENV=dev
BCRYPT_PASSWORD=fizards1
SALT_ROUNDS=10
TOKEN_SECRET=helloWorld
