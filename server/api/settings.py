import os
import sys

# -----This file contains the configuration settings for app ----

#get the abs path of the root folder
basedir = os.path.abspath(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

#for database
WIN = sys.platform.startswith('win')
prefix = 'sqlite:///'
if not WIN:
    prefix = 'sqlite:////'

class BaseConfig:
    #don't notify me when changes are made
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(BaseConfig):
    #store the data in the root folder
    SQLALCHEMY_DATABASE_URI = prefix + os.path.join(basedir, 'data.db')

    SESSION_COOKIE_HTTPONLY = True

    # secret key used to sign session cookie
    SECRET_KEY = os.getenv('SECRET_KEY')

    SESSION_COOKIE_NAME = 'mySpotifyInsights_session'

website_config = {'production': ProductionConfig}