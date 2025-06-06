
# Buy and Sell Project

  

A full-stack web application where users can list products for sale and browse other users' listings. Authenticated users can create, edit, and delete their own listings, which include details like title, description, price.

-  **Frontend**: Angular

-  **Backend**: (Node.js with Hapi.js) (Java with Spring Boot)

-  **Database**: MySQL

-  **Authentication**: Firebase

-  **Hosting**: Google Cloud App Engine


## 📦 Project Structure

angular-project-buy-and-sell/  
│  
├── buy-and-sell/ # Angular frontend project  
│  
└── buy-and-sell-backend/ # Node.js + Hapi.js backend API  

angular-project-buy-and-sell/  
│  
├── buy-and-sell/ # Angular frontend project  
│  
└── buy-and-sell-backend/ # Java + Spring Boot 

## 🔧 Front-End (Angular)

  

Angular is a TypeScript-based web application framework allows to build fast, modern, and scalable single-page applications (SPAs).

  

### Setup

  
```bash

npm  install  -g  @angular/cli  # Install Angular CLI globally

cd  buy-and-sell  # Navigate to the frontend folder

npm  install  # Install dependencies

ng  serve  -o  # Start the dev server and open browser

ng serve --proxy-config proxy.config.json # Starts the Angular dev server with a proxy.
```
### Useful  Angular  Commands
```bash
ng  new  project-name  # Create a new Angular project

ng  generate  component  listings-page  # Generate a new component

ng  generate  service  listings  # Generate a new service
```


### 🧠 Angular Key Concepts and Notes

#### 🔁 `[(ngModel)]`
- **Usage**: `[(ngModel)]="yourVariable"`
- **Meaning**: Two-way data binding.
- **Purpose**: Binds form input values to a component property and keeps them in sync.

#### 🧩 `*ngIf`
- **Usage**: `<div *ngIf="condition">...</div>`
- **Purpose**: Conditionally include or remove elements from the DOM.

#### 🔁 `*ngFor`
- **Usage**: `<li *ngFor="let item of items"> {{ item }} </li>`
- **Purpose**: Loops through an array to render multiple elements.

#### 🔒 `(ngSubmit)`
- **Usage**: `<form (ngSubmit)="onSubmit()">...</form>`
- **Purpose**: Handles form submissions via Angular.

#### 📥 `@Input()`
- **Usage**: `@Input() item: string;`
- **Purpose**: Pass data **from parent to child** component.

#### 📤 `@Output()`
- **Usage**: `@Output() event = new EventEmitter();`
- **Purpose**: Emit events **from child to parent** component.

#### ⚙️ CLI Commands (`ng generate`)
- **Generate component**: 
	- `ng generate component my-component` or 
	- `ng g c my-component`
- **Generate service**: 
	- `ng generate service my-service` or 
	- `ng g s my-service`
- **Generate module**: 
	- `ng generate module my-module` or 
	- `ng g m my-module`

#### 🌐 `HttpClient`
- **Import**: 
  ```ts
  import { HttpClient } from '@angular/common/http';
  ```
## ⚙️  Back-End (Node.js +  Hapi.js)

Hapi.js  is  a  powerful  framework  for  building  RESTful  APIs  in  Node.js.

```bash
cd  buy-and-sell-backend

npm  install  # Install dependencies

npm  run  dev  # Start backend with nodemon + Babel
```
Development  Dependencies

```bash
npm  install  --save-dev  @babel/core  @babel/node  @babel/cli

npm  install  --save-dev  @babel/preset-env  @babel/plugin-transform-runtime

npm  install  --save-dev  nodemon
```
Runtime  Dependencies
```bash
npm  install  @hapi/hapi # **Hapi.js** web framework for building RESTful APIs.
   
npm  install  @hapi/boom # Simplifies error handling by creating standardized HTTP error responses.

npm  install  dotenv # Loads environment variables from a `.env` file into `process.env` for secure configuration management.
```
### Run  API
```
npx  nodemon  --exec  npx  babel-node  src/server.js
```
## 💾  Database (MySQL)

- Uses  mysql2  for  MySQL  connection.
- uuid  is  used  to  generate  unique  identifiers  for  listings.

```
npm  install  mysql2  
npm  install  uuid
```


## 🔐  Authentication (Firebase Admin  SDK)

Used  for  verifying  Firebase  JWT  tokens  from  the  frontend.

```
npm  install  firebase-admin
```
Note:  Angular  19.2  may  have  version  conflicts  with  
```
npm install @angular/fire firebase
```
To  resolve: (update angular to 19.2.13 version)
```bash
ng  update  @angular/core 
```
### ☁️  Hosting (Google Cloud  App  Engine)

### Install  and  Initialize
```bash
curl  https://sdk.cloud.google.com | bash

exec  -l  $SHELL

gcloud  init

gcloud  config  get-value  project
```
### Deploy  Backend
```bash
cd  buy-and-sell-backend

gcloud  app  deploy
```
### Deploy  Frontend
```bash
ng build # builds for production (Files are generated in `dist/<project-name>/`)

# Backend (Register Inert to enable file handling)
npm  install  @hapi/inert # Static file and directory handling plugin (e.g., serving images or frontend assets).
```

### 📁  Environment  Variables

Make  sure  to  include  a  .env  file  in  the  backend  with:

```
DB_USER=root

DB_PASS=password

DB_NAME=buy-and-sell

DB_SOCKET=/cloudsql/YOUR_PROJECT_ID:region:instance-name

PORT=8000
```
## 🚀 Live Demo

Try out the live version of the Buy and Sell project here:

[https://buy-and-sell-1b75e.et.r.appspot.com/](https://buy-and-sell-1b75e.et.r.appspot.com/)

## 📚 Reference:

This project was initially built by following the LinkedIn Learning tutorial and later customized for improvements and personal learning.

- [https://www.linkedin.com/learning/angular-creating-and-hosting-a-full-stack-site/build-and-serve-an-angular-app](https://www.linkedin.com/learning/angular-creating-and-hosting-a-full-stack-site/build-and-serve-an-angular-app)

- [https://v17.angular.io/guide/understanding-angular-overview](https://v17.angular.io/guide/understanding-angular-overview)