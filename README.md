# MySpotifyInsights

> A personalized dashboard interface to view your Spotify data

## Requirements

- Node.js
- Python

## Setup

For Steps 1-2 you could follow this blog if you want:https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project

Step 1) Create Frontend React app (client = frontend)

1. Add proxy line to package.json (dependency list file):

```bash
   "proxy": "http://localhost:5000"
```

This tells React to proxy to backend Flask server

Step 2) Create Flask Backend Server (server = backend)

1. Start with generating a virtual environment for our python install. This allows us to isolate this environment from our system. Especially useful if you need to install certain versions of packages on this project but different versions on another.

```bash
python3 -m venv venv
```

2. To use this environment, we need to activate it. Depending on your OS it may look a bit different but on Windows we run (every time we run our application we must activate this :

```bash
venv\Scripts\activate`
```

- For Unix-based operating systems: `source venv/bin/activate`
- For MACOS: `. venv/bin/activate`

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

## Setting up Servers for Development

- Refer to client & server folder README
