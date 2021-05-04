import os
import sys

#--file: This file contains the configuration settings for app ----

#get the abs path of the root folder
basedir = os.path.abspath(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))


class BaseConfig:
    #don't notify me when changes are made
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_COOKIE_HTTPONLY = True

    # secret key used to sign session cookie
    SECRET_KEY = os.getenv('SECRET_KEY')

    SESSION_COOKIE_NAME = 'mySpotifyInsights_session'


#choose production for deployment
class ProductionConfig(BaseConfig):
    #store the data in the root folder
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")


#choose test if you have postgre installed
class TestConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL_DEV")


#choose development if you want to stay with sqlalchemy database.db file (not work in heroku)
class DevelopmentConfig(BaseConfig):
    WIN = sys.platform.startswith('win')
    prefix = 'sqlite:///'
    if not WIN:
        prefix = 'sqlite:////'

    SQLALCHEMY_DATABASE_URI = prefix + os.path.join(basedir, 'data.db')

website_config = {'production': ProductionConfig,
                  'test': TestConfig,
                  'development': DevelopmentConfig
                  }