# MySpotifyInsights

> A personalized dashboard interface to view your Spotify data

## Requirements

- Node.js
- Python 3.7

## Setup

For Steps 1-2 you could follow this blog if you want:https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project

Step 1) Create Frontend React app (client = frontend)

Step 2) Create Flask Backend Server (server = backend)

1. Start with generating a virtual environment for our python install in **root directory**. This allows us to isolate this environment from our system. Especially useful if you need to install certain versions of packages on this project but different versions on another.

```bash
python3 -m venv [name]
python3 -m venv venv
```
or if you only have python3 installed, 
```bash
pyton -m venv [name]
python -m venv venv
```


2. To run the backend, you need to activate the python virtual environment. Make sure you are in **root folder**:

- Windows:
```bash
[name]\Scripts\activate.bat
venv\Scripts\activate.bat
```

- Linux:
```bash
source [name]/bin/activate
source venv/bin/activate
```

- MACOS:
```bash
. venv/bin/activate
```

3. Next we install our python packages and to also get it ready for deploying to Heroku later

```bash
pip install flask python-dotenv flask-cors gunicorn boto3 matplotlib
```

- flask: The main server functionality
- python-dotenv: reads key-value pairs from a .env file and can set them as environment variables.
- flask-cors: Used for cross-origin requests. Basically lets you call the endpoints from a different system without violating security
- gunicorn: It is a production server package that in this case is used by Heroku to serve up the site
- boto3: This package is used to access Amazons S3 buckets (think of this as a cloud based directory to store files) NB: Since Heroku does not guarantee persistence of files after it spins down it is super important to use this kind of cloud storage
- matplotlib: A package used to make plots. This only really matters since our test API will be using it to generate a pie chart

## Get Ready for Testing Runing in Local Machine
- Frontend:
  - Save the changes, and redeploy in heroku
  
- Backend:
  - If you ever made any changes to the frontend, you will need to build the whole frontend again to reflect the change
  - In **root folder**:
  ```bash
  yarn build 
  ```
  - This will update the existing build folder with the changes you made
  

## Test Run In Local Machine
  Here is how you run the project in your local machine during development
  - In **root folder**:
    - Make sure you have a python virtual environment in **root folder**
    - Make sure the **.env** file is under the **root folder**
    - Activate your python virtual environment depending on your machine
    - Activate the backend (flask) :
    ```bash
    flask run
    ```
    - Done
      
  - **Remainder**:
    - Everytime you want to reflect your changes when you run the application in local machine, make sure you follow the
        instructions in **Get Ready for Testing Running in Local Machine** to prepare for next run

