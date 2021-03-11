import os
from spotipy.oauth2 import SpotifyOAuth
from flask import url_for, session
import spotipy
from server.api.decorators import token_checked
from server.api.extensions import db
from datetime import datetime
from datetime import timedelta

# this file contains functions that are useful and used in many different places

# return spotify oauth object that takes care of the oauth, including access key and refresh key, etc


def get_spotify_oauth():
    sp_oauth = SpotifyOAuth(
        client_id=os.getenv("CLIENT_ID"),
        client_secret=os.getenv("CLIENT_SECRET"),
        redirect_uri=url_for('auth.redirect_page', _external=True),
        # what privileges we are asking from user
        scope="user-library-read, "
              "user-read-email, "
              "user-read-private,"
              "playlist-read-private,"
              "playlist-modify-public,"
              "playlist-modify-private,"
              "user-read-recently-played,"
              "user-top-read,"
              "user-read-currently-playing," 
              "user-read-playback-state",
    )

    return sp_oauth


# one spotify object per user
@token_checked
def get_spotify_object():
    token_info = get_token_info()
    sp_object = spotipy.Spotify(auth=token_info['access_token'])
    return sp_object


# refresh the access token
def refresh_token_info(refresh_token):
    sp_oauth_local = get_spotify_oauth()
    session['TOKEN_INFO'] = sp_oauth_local.refresh_access_token(refresh_token)
    #print("----------refreashed... session now: ")
    # print(session['TOKEN_INFO'])


def get_token_info():
    token_info = session.get("TOKEN_INFO", None)

    if token_info is None:
        return None

    sp_oauth_local = get_spotify_oauth()
    if sp_oauth_local.is_token_expired(token_info):
        session['TOKEN_INFO'] = refresh_token_info(token_info['refresh_token'])

    return session['TOKEN_INFO']


def is_new(db_datetime, expire_after_time_delta):
    if not db_datetime:
        return False

    current_time = datetime.utcnow()
    diff = current_time - db_datetime

    if diff > expire_after_time_delta:
        return False

    return True


#https://stackoverflow.com/questions/26514823/get-all-models-from-flask-sqlalchemy-db
def get_all_models():
    all_models = []
    for clazz in db.Model._decl_class_registry.values():
        try:
            #this is needed to filter out one element that does not have a table name
            #DO NOT CHANGE THE ORDER
            model_name = clazz.__tablename__
            all_models.append(clazz)
        except:
            pass

    return all_models
