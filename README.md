<br>
<p align="center">
   <h2 align="center">Employee Tracker Database</h2>
</p>
<br>
  <details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
  </details>
  <br>

## About the project
This is a Node.js application that uses the Inquirer npm and MySQL to generate an employee database based off of user input. This application creates a database that allows users to store and access employee information based off of their role or department. 

### Built With

* Javascript
* Node.js
* Inquirer.js
* MySQL

### Testing


To access the code for the generator:

* Clone the repo

    ```sh
    git clone https://github.com/Zd092718/employeetrackerdb
    ```

To use this project, clone the project repository and access it from your command line. Access the /db directory in the command line and type mysql -u root -p into the command line and press enter when prompted for a password leaving it blank. Then type source schema.sql to create the database. For example purposes, a seeds.sql folder was implemented in the video below and this step is not necessary for usage. Next, type node index.js into your command line when inside the main repository. The user will then be prompted to select an option which will allow them to access certain portions of the database and update, or create, employee information.

### Preview Gif
<br>

![gif of project](/project.gif)


Zachary Dowd - zdowd2796@gmail.com

Github Profile - https://github.com/Zd092718
