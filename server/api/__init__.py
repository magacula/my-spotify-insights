from flask import Flask
from flask_cors import CORS
#from authlib.integrations.flask_client import OAuth
# for oauth

from server.api.blueprints.main import main_bp
from server.api.blueprints.admin import admin_bp
from server.api.blueprints.user import user_bp
from server.api.blueprints.auth import auth_bp
from server.api.extensions import limiter

import os


def create_app(config_name=None):

    template_dir = os.path.abspath('./api/templates')

    app = Flask('api', template_folder=template_dir)
    CORS(app)
    #app = Flask('api')

    # secret key used to sign session cookie
    app.secret_key = os.getenv('SECRET_KEY')

    # for now
    app.config['SESSION_COOKIE_NAME'] = 'mySpotifyInsight_cookie'
    # oauth = OAuth(app)

    # FIXME: for now

    register_blueprints(app)
    register_extensions(app)

    # FIXME: change this to the actual file path of the html status file path in front end
    # return this error code if user exceed the rate limit
    @app.errorhandler(429)
    def rate_limit_reached(e):
        return "your rate limited reached.. 429 ... Change me in api.__init__ file"

    return app


def register_blueprints(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(admin_bp, prefix='/admin')
    app.register_blueprint(auth_bp, prefix='/auth')
    app.register_blueprint(user_bp, prefix='/user')


def register_extensions(app):
    limiter.init_app(app)
