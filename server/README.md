# This repo serves as the Flask Backend

## How to Start Backend Flask Server

1. make sure you're in server directory: `cd server`
2. First you need to create python virtual environment by: python3 -m venv backend_venv
3. To activate python virtual environment: (they are backslash) `backend_venv\Scripts\activate`
4. Since the libraries are not uploaded to the github, you will need to download on your own with the list provided: (in the folder of server where you can see the requirements.txt) run: pip3 install -r requirements.txt
5. (optional) If you are the one with the latest version of all libraries, and want other members to catch up, you can list the libraries installed by generating and replacing the older requirements.txt, simply do:  pip3 freeze > requirements.txt under the 'server' folder
6. Then start the backend in the virtual environment: `flask run`
7. (important) Since most of the sensitive information will be inside .env file, not .flaskenv, so .env file will not be uploaded to github, it will either be send through discord or posted in trello board, so be aware of situations where certain functions do not work with out those sensitive information (username, password, etc)
