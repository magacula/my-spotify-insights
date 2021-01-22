from flask import Flask


def create_app():
    app = Flask(__name__)    # creates our flask app

    return app
