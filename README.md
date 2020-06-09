## Introduction
Todo list application is written to use the Java Spring and Angular as basic level. 


## Requirements

 ### Backend
 - Java SE JDK *Version 1.8.0 (8u251)* [Download](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html) (for only editing or reviewing codes)
 - IntelliJ Idea IDE (or you can use an alternative) [Download](https://www.jetbrains.com/idea/download/)
 - Maven *Version 3.6.3* [Download](https://maven.apache.org/download.cgi)

### Frontend
- Visual Studio Code *Version 1.45.1* [Download](https://code.visualstudio.com/download) (for only editing or reviewing codes)
- NPM(NodeJS) *Version 12.18.0 LTS* [Download](https://nodejs.org/en/download/)
- Angular CLI *Version 8.3.23* [Download](https://cli.angular.io/)

**I used Windows 10 version 1909 as host machine operating system.*

## Preparing the Backend to start

 1. Install Java JDK
 2. Setup the Java_Home envirment variable
 3. Install the Maven and setup the 'Maven Path' envirment variable
 4. Install IntelliJ Idea
 5. Checkout latest release of the project
 6. Open the IDE
 7. Open project via pom.xml file
 8. The IntelliJ will inistall all dependencies, but if it wont; use maven clena and then install commands to install all dependency packages.
 9. You can start project via IntelliJ or Maven CLI.   

## Preparing the Frontend to start

 1. Install NodeJS
 2. Install VS Code
 3. Install Angular CLI via NPM
 4. Open poject folder via VS Code
 5. Open the terminal and use 'npm i' command to install all packages
 6. After the instalation you can start FE via 'ng s' command.

## Last notes
If '**8080**' or '**4200**' ports of host machine already in use, you will get some errors about it. The '**4200**' is default port of the Angular and the '**8080**' is default port of the Spring API. 

If '**4200**' already in use, you can use '**ng s --port < port number >**'  command to start FE with different port. When you change the FE port you should edit 'TodoController' class in Spring API. The controller class has an attribute which is about **CORS**, you will see the definition of the FE port in here, just update the port number value. 

If '**8080**' already in use you, modify **application.properties** and add/edit **server.port** property value. (like: server.port = 8090). Then open the FE project files and find the **envirments.ts** file. It is stores api URL with port value, change the port value of the URL.

