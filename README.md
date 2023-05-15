# Hubla Challenge

This project was made for the challenge proposed by Hubla as part of their
hiring process. For more information about the challenge, please check the
[INSTRUCTIONS](instructions.md) file. This project is composed of three
applications: frontend, backend, and database. The frontend was developed using
ReactJS with Typescript, the backend was developed in Python, and the chosen
database was PostgreSQL.

## Instalação

The project uses Docker to manage its applications, so it's straightforward:

1. With Docker Engine running, open the terminal and run the command:
   `docker-compose up`

However, if you want to run the applications without Docker (except for the
database), follow these steps:

1. For the database, you need to use Docker, so with Docker Engine running, open
   the terminal and run the command: `docker-compose up db -d`
2. Access the HublaBackEnd folder: `cd HublaBackEnd`
3. Create a virtual environment: `python3 -m venv venv`
4. Activate the virtual environment: `source venv/bin/activate`
5. Install the backend dependencies: `pip3 install -r requirements.txt`
6. Run the development file: `python3 development.py`
7. Access the HublaFrontEnd folder: `cd ../HublaFrontEnd/frontend/`
8. Install the frontend dependencies: `npm install`
9. Start the local server: `npm start`

## Uso

1. The project uses Google Firebase authentication, so there is no problem
   registering, but if you don't want to, just use the example account:
   - Email: `exemplo@gmail.com`
   - Password: `123456`
2. Access the "Upload" page and select the [SALES](sales.txt) file. After that,
   click the "Load" button to display the parsed data from the file. You just
   need to click Save for the data to go to the database.
3. You will be redirected to the "Transactions" page, where all your
   transactions registered in the database can be viewed and filtered.
4. To see the owner and affiliates' balances, go to the "Home" page, which now
   that your user has transactions, shows three dashboards. The charts can be
   filtered by selecting a vendor to facilitate your visualization.
