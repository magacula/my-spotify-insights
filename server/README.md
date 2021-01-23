# This repo serves as the Flask Backend

## How to Start Backend Flask Server

1. make sure you're in server directory: `cd server`
2. To activate python virtual environment: (they are backslash) `backend_venv\Scripts\activate`
3. Since the libraries are not uploaded to the github, you will need to download on your own with the list provided: (in the folder of server where you can see the requirements.txt) run: pip3 install -r requirements.txt
4. (optional) If you are the one with the latest version of all libraries, and want other members to catch up, you can list the libraries installed by generating and replacing the older requirements.txt, simply do:  pip3 freeze > requirements.txt under the 'server' folder
5. Then start the backend in the virtual environment: `flask run`
