# Eventory

Eventory is a web application built to streamline event management and participation.

## Features

- **Event Listing:** Organizations can easily list and showcase their events with detailed information.
- **Participant Registration:** Seamless registration process for participants interested in joining events.
- **Participant Tracking:** Keep track of registered users for each event.
- **User-friendly Interface:** Intuitive design for a smooth user experience.
- **In App and Email notifications:** Send timely notifications to participants regarding event updates.

## Tech Stack

- **Frontend:** React, Redux
- **Backend:** Node.js, Express
- **Database:** MySQL

## Setup Locally

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### Setup

run your mysql server and add the host and port in `src/database/index.js`


```bash
# clone the repository
git clone https://github.com/your-username/eventory.git
cd eventory

# install dependencies
npm install
```

run your mysql server and add the host and port in `src/database/index.js`
Now start the backend server
```bash
# start the server
npm start
```

Navigate to client folder and install dependencies
```bash
cd client

# install dependencies
npm install

# run frontend
npm start
```



**Important Note:**

This project requires environment variables to function properly. Please create a copy of the `.env.example` file named `.env` and configure it with your own details. 

The `.env.example` file provides a template with placeholders for each environment variable. Refer to the comments within the file for guidance on what information to provide.

**Example Environment Variables:**

* `DB_NAME`: Name of your database
* `DB_USER`: Username for your database access
* `DB_PASS`: Password for your database access
* ... (similar explanations for other variables)


