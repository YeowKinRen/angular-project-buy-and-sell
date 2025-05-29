# Buy and Sell Project

A full-stack web application where users can list products for sale and browse other users' listings. Authenticated users can create, edit, and delete their own listings, which include details like title, description, price, and images.

- **Frontend**: Angular  
- **Backend**: Node.js with Hapi.js  
- **Database**: MySQL  
- **Authentication**: Firebase  
- **Hosting**: Google Cloud App Engine  

---

## 📦 Project Structure

angular-project-buy-and-sell/
│
├── buy-and-sell/ # Angular frontend project
│
└── buy-and-sell-backend/ # Node.js + Hapi.js backend API

yaml
Copy
Edit

---

## 🔧 Front-End (Angular)

Angular allows us to build fast, modern, and scalable single-page applications.

### Setup

```bash
npm install -g @angular/cli           # Install Angular CLI globally
cd buy-and-sell                       # Navigate to the frontend folder
npm install                           # Install dependencies
ng serve -o                           # Start the dev server and open browser
Useful Angular Commands
bash
Copy
Edit
ng new project-name                  # Create a new Angular project
ng generate component listings-page # Generate a new component
ng generate service listings        # Generate a new service
Notes
[(ngModel)]: Enables two-way data binding in forms.

⚙️ Back-End (Node.js + Hapi.js)
Hapi.js is a powerful framework for building RESTful APIs in Node.js.

Setup
bash
Copy
Edit
cd buy-and-sell-backend
npm install                        # Install dependencies
npm run dev                        # Start backend with nodemon + Babel
Development Dependencies
bash
Copy
Edit
npm install --save-dev @babel/core @babel/node @babel/cli
npm install --save-dev @babel/preset-env @babel/plugin-transform-runtime
npm install --save-dev nodemon
Runtime Dependencies
bash
Copy
Edit
npm install @hapi/hapi @hapi/boom @hapi/inert
npm install dotenv mysql2 uuid firebase-admin
Run API
bash
Copy
Edit
npx nodemon --exec npx babel-node src/server.js
💾 Database (MySQL)
Uses mysql2 for MySQL connection.

uuid is used to generate unique identifiers for listings.

bash
Copy
Edit
npm install mysql2 uuid
🔐 Authentication (Firebase Admin SDK)
Used for verifying Firebase JWT tokens from the frontend.

bash
Copy
Edit
npm install firebase-admin
Note: Angular 19.2 may have version conflicts with @angular/fire. To resolve:

bash
Copy
Edit
ng update @angular/core
☁️ Hosting (Google Cloud App Engine)
Install and Initialize
bash
Copy
Edit
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init
gcloud config get-value project
Deploy Backend
bash
Copy
Edit
cd buy-and-sell-backend
gcloud app deploy
📁 Environment Variables
Make sure to include a .env file in the backend with:

env
Copy
Edit
DB_USER=root
DB_PASS=password
DB_NAME=buy-and-sell
DB_SOCKET=/cloudsql/YOUR_PROJECT_ID:region:instance-name
PORT=8000