# I'm thinking that we'll use this file as an API service to make calls to Spotify API

# import time
# from flask import Flask

import flask
from flask import Flask, render_template, send_from_directory, request, jsonify, make_response

app = Flask(__name__)  # creates our flask app


# .route maps a URL to our flask app ("/" points to the route URL)
# @app.route('/time')
# def get_current_time():
#     return {'time': time.time()}
