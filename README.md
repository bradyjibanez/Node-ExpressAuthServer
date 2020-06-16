# Node-ExpressAuthServer

This Express server provides an authentication service for a profile framework where users are able to create user accounts, and environment profiles if they choose. The user account provides the ability for user authentication within an application using JWT generation, as well as profile updating, retrieval, and deleting. The environment server allows for environment creation, claiming, retrieval, and updating. User invitation and inclusion aside from the creating admin is still to come. 

## Usage

All required npm packages can be installed upon cloning of this server using the standard
```bash
npm install
```
 
It is recommended to install nodemon as a dev-dependency for development update continuity when making changes
```bash
npm install --save-dev nodemon
```

To run the server stock, run this command from the root directory:
```bash
node server.js
```

To run the server with nodemon for continuous update sync:
```bash
nodemon server.js
```
    
