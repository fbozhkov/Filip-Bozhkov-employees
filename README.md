# Employee Project Collaboration

This application helps to identify pairs of employees who have worked together on common projects for the longest period of time. Users can upload a CSV file containing employee and project data, and the app will display the results in a table.

## Directory Structure

The project is divided into two directories:

- `client`: Contains the frontend React application
- `server`: Contains the backend Node.js Express server
- `test_data`: Contains the data to test the application with

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation

1. Clone the repository:
``` bash
git clone https://github.com/fbozhkov/Filip-Bozhkov-employees
```

2. Change to the project directory:
``` bash
cd Filip-Bozhkov-employees
```

3. Install dependencies for the server:
``` bash
cd server
npm install
```

4. Install dependencies for the client:
``` bash
cd client
npm install
```

## Running the Application

1. Start the server by running the following command in the './server' directory:
``` bash
cd client
npm install
```
The server will start on port 5000.

2. Start the client by running the following command in the './client' directory:
``` bash
cd client
npm install
```
The client will start on port 3000 and should automatically open in your default web browser. If it doesn't open automatically, you can visit http://localhost:3000 in your browser.