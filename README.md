# Node-ExpressAuthServer

This Express server provides an authentication service for a profile framework where users are able to create user accounts, and environment profiles if they choose. The user account provides the ability for user authentication within an application using JWT generation, as well as profile updating, retrieval, and deleting. The environment server allows for environment creation, claiming, retrieval, and updating. User invitation and inclusion aside from the creating admin is still to come. The is implimented through the use of MongoDB for creation and update maintenance, and does so through the use of the mongoose npm package. Your DB configuration is maintained in config.json of the root directory. 

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

In order to alter addressing and routing for the server, edits should be made to server.js, and config.json in the root directory accordingly.
    
## License
[MIT](https://choosealicense.com/licenses/mit/)

## References
Watmore, Jason. “Angular 6 - JWT Authentication Example &amp; Tutorial.” Jason Watmore's Blog, 23 May 2018, (jasonwatmore.com/post/2018/05/23/angular-6-jwt-authentication-example-tutorial).
