from flask import Flask, session
#from flask_cors import CORS
#from authlib.integrations.flask_client import OAuth
# for oauth

from server.api.blueprints.main import main_bp

from server.api.blueprints.admin import admin_bp
from server.api.blueprints.user import user_bp
from server.api.blueprints.auth import auth_bp
from server.api.extensions import limiter

import os


def create_app(config_name=None):


    #app = Flask('api', template_folder=template_dir)

    #point static folder to the build folder
    app = Flask('api', static_folder='build', static_url_path='/')

    app.config['CORS_SUPPORTS_CREDENTIALS'] = True
    app.config['CORS_ORIGINS'] = 'http://localhost:3000'
    # CORS(app)
    #CORS(app, supports_credentials=True)

    # FIXME: uncomment this when doing deployment
    # app.config['SESSION_COOKIE_SECURE'] = True
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    #app.config['SESSION_COOKIE_SAMESITE'] = 'None'

    #app = Flask('api')

    # secret key used to sign session cookie
    app.secret_key = os.getenv('SECRET_KEY')

    # for now
    app.config['SESSION_COOKIE_NAME'] = 'mySpityfInsight_session'
    # oauth = OAuth(app)

    # FIXME: for now

    register_blueprints(app)
    register_extensions(app)
    register_error_handler(app)

    return app


def register_error_handler(app):
    # FIXME: change this to the actual file path of the html status file path in front end

    # return this error code if user exceed the rate limit
    @app.errorhandler(429)
    def rate_limit_reached(e):
        return "your rate limited reached.. 429 ... Change me in api.__init__ file"

    # no permission error

    @app.errorhandler(403)
    def permission_denied(e):
        return "You don't have the permission.. 403"

    #when path not in backend, check frontend
    @app.errorhandler(404)
    def route_to_frontend(e):
        return app.send_static_file('index.html')

def register_blueprints(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(admin_bp, prefix='/admin')
    app.register_blueprint(auth_bp, prefix='/auth')
    app.register_blueprint(user_bp, prefix='/user')


def register_extensions(app):
    limiter.init_app(app)

if __name__ == "__main__":
    app = create_app()
    #PORT is given by heroku, not necessary 5000
    port = int(os.getenv('PORT'), 5000)
    app.run(host='0.0.0.0', port=port)
