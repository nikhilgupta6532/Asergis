version 1.

1.  This project uses mongodb on default port.
2.  Run node ./bin/www or pm2 start ./bin/www
3.  Login url http://localhost:3000/users/login

version 0.

1.  Verify you can use git from your computer.
2.  Take the clone of this project.
3.  Create pages for Login and Signup.
4.  User should be able to Sign Up using full name, username, email and password.
5.  User should be able to log in using (username OR email) and password.
6.  Commit and push code to git.
7.  Create a dashboard page and redirect user to dashbaord after successful login.
8.  create chat functionality using socket.io.
9.  user can chat with all loggedin users.
10. Push code to gitlab

functionality

1.  User needs to signup first
2.  All of the details would be stored in the MLab of Mongo.
3.  User then needs to Login
4.  After successfully logged in he will be redirected to a dashboard where he needs to fill a Display name and a room name.
5.  All of the users who are in the same room can communicate with each other.
