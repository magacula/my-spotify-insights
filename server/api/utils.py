import os
from spotipy.oauth2 import SpotifyOAuth
from flask import url_for, session
import spotipy
from server.api.decorators import token_checked
import psycopg2

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
              "user-top-read"
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


def connect_to_database():

    #in heroku
    """
    db = psycopg2.connect(
        os.getenv("DATABASE_URL"),
        sslmode='require'
    )
    """

    #development mode
    db = psycopg2.connect(
        host=os.getenv("DATABASE_URL"),
        database='my-spotify-insights-test',
        user=os.getenv('DATABASE_USER'),
        password=os.getenv('DATABASE_PASSWORD')
    )

    #db_cursor = db.cursor()

    #return db_cursor
    return db

def init_db():
    db = None
    try:
        db = connect_to_database()
        db_cursor = db.cursor()
        print("-----------database here...")

        #drop the database if exist
        sql_command = "DROP TABLE IF EXISTS public.user"


        #sql_command = "SELECT * FROM public.user"
        db_cursor.execute(sql_command)

        #db_result = db_cursor.fetchall()

        #print("db result: ", db_result)

        #db.commit()

        sql_command = "CREATE TABLE public.user(" \
                      "user_id VARCHAR(20) PRIMARY KEY NOT NULL," \
                      "user_name VARCHAR(20) NOT NULL," \
                      "created_on TIMESTAMP NOT NULL default current_timestamp" \
                      ");"

        db_cursor.execute(sql_command)

        """
        sql_command = "INSERT INTO public.user(user_id, user_name)" \
                      "VALUES(" \
                      "'whaha', 'myusername');"
        db_cursor.execute(sql_command)
        """


        db.commit()



        # close cursor
        db_cursor.close()

    except Exception as e:
        print("something is wrong...", e)
    finally:
        # close database connection
        db.close()
