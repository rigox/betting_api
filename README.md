# betting_api
Simple  RESTFUL API that allows users to interact with a betting contract
-- There is no real  money involve in this API is just fake number think of it like a simulation
-- Uses express to interect s With a mongo DB database
-- Will be use to make a web application
-- Simple route Athutentication using JSON webtoken
-- Implementation of Promise.All to  deal with various Asynchronous operations
-- If You wish to test please install the Package.json file and run it using PORT $4000 at the moment is better to use POSTMAN to  interact with the end points since there is no front end for it 

## Routes

### Contract Routes
```
Contract/login -- use for user to log in encryption and authentication provided
Contract/create -- use to create a new contract model
Contract/fetch_contracts -- returns  all current contracts 
Contract/delete_contract -- deletes a  contract 
Contract/join_contract -- user  is able  to join a contract
Contract/close_contract -- Admin use only here is where the contract  is close and money is redistributed
```

### User Routes
```
User/fetch_users --returns all current  users
User/make_user -- use to create a new  user
User/update_emai  -- use to updtate users email
User/delete_user -- use to delete user
User/add_funds --  use to add FAKE money to user account
User/login -- use to log in same as the one in the Contract Routes
```

