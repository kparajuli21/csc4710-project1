frontend link: http://localhost/csc4710-project1/Frontend/index.html
video link: https://www.canva.com/design/DAGVGt1NcMA/f0mVIeg92fTnY0Mhkm-7Dg/edit?utm_content=DAGVGt1NcMA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

# csc4710-project1
Project description

In this project, we created a user table and then used it to register a new user and then allows the user to sign into a website. This project will take 4 weeks.

Watch this video: https://www.youtube.com/watch?v=vrj9AohVhPA

Please implement the following interface and functoinalty:

1.  User registration.
2.  User sign-in.
3.  search users by first and/or last name.
4.  search users by userid;
5.  search all users whose salary is between X and Y.
6.  Search all users whose ages are between X and Y.
7.  Search users who registered after john registered, where john is the userid.
8.  search users who never signed in.
9.  Search users who registered on the same day that john registered.
10. Return the users who registered today;


# How to run code:
1. open XAMPP and start the Apache and MYSQL
2. open phpMyAdmin and create a database named users
3. run this code in the SQL to create the user tables
   
      CREATE TABLE users(
      username VARCHAR(50) primary key,
      password VARCHAR(50),
      userid VARCHAR(20),
      firstname VARCHAR(50),
      lastname VARCHAR(50),
      salary FLOAT,
      age INTEGER,
      registerday DATE,
      signintime DATETIME
      )

5. run your command prompt as administer and open it
6. change directory to wherever XAMPP is downloaded
   
      cd C:\xampp\htdocs
   
8. clone the project locally from github
   
      git clone https://github.com/kparajuli21/csc4710-project1.git
   
10. change directory to the backend of the project

      cd C:\xampp\htdocs\csc4710-project1\backend

12. if needed, rename dotenv file to .env
    
      ren doteven .env

14. initalize and start NPM to start backend server
    
      npm init -y
      npm install express mysql cors nodemon dotenv
      npm start


