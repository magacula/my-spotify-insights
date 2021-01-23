from flask import Flask
#from authlib.integrations.flask_client import OAuth
#for oauth

from server.api.blueprints.main import main_bp
from server.api.blueprints.admin import admin_bp
from server.api.blueprints.user import user_bp
from server.api.blueprints.auth import auth_bp



#from front_end.api.extensions import login_manager
import os

def create_app(config_name=None):

    template_dir = os.path.abspath('./api/templates')

    app = Flask('api', template_folder=template_dir)
    #app = Flask('api')

    app.secret_key = os.getenv('SECRET_KEY')
    # for now
    app.config['SESSION_COOKIE_NAME'] = 'mySpotifyInsight_cookie'
    # oauth = OAuth(app)

    #FIXME: for now

    register_blueprints(app)
    return app

def register_blueprints(app):
    app.register_blueprint(main_bp)
    app.register_blueprint(admin_bp, prefix='/admin')
    app.register_blueprint(auth_bp, prefix='/auth')
    app.register_blueprint(user_bp, prefix='/user')

