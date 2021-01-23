from functools import wraps
from flask import session, redirect, url_for
import time
import spotipy

#this file contains all kinds of decorators we are going to use

#used as a decorator, under the route decorator, check if user is logged in
def login_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        #if logged_in value not exist or false, then user is not logged in
        try:
            if not session['LOGGED_IN']:
                return redirect(url_for('auth.access_denied'))
        except:
            return redirect(url_for('auth.access_denied'))

        return func(*args, **kwargs)

    return decorated_function


#check if token still valid or exist
def token_checked(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        token_info = session.get("TOKEN_INFO", None)
        if token_info == None:
            #FIXME: for now
            return redirect(url_for('auth.token_expired'))

        now = int(time.time())
        if token_info['expires_at'] - now <= 0:
            #FIXME: for now
            return redirect(url_for('auth.token_expired'))

        return func(*args, **kwargs)


    return decorated_function

"""
#template for decorators
def token_check(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        pass
        return func(*args, **kwargs)


    return decorated_function
"""