from functools import wraps
from flask import session, redirect, url_for, abort
from flask_login import current_user
import time

# ----this file contains all kinds of decorators we are going to use


#--decorator: check if user is admin
def is_admin(func):

    @wraps(func)
    def decorated_function(*args, **kwargs):
        # print("-------current session: ", session)
        # if logged_in value not exist or false, then user is not logged in
        try:
            if not current_user.is_admin:
                return redirect(url_for('auth.access_denied'))
        except Exception as e:
            print("---------is_admin decorator Exception: ", e)

            return redirect(url_for('auth.access_denied'))

        return func(*args, **kwargs)

    return decorated_function


#--decorator: check if token still valid or exist
def token_checked(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        token_info = session.get("TOKEN_INFO", None)
        if token_info == None:
            # FIXME: for now
            return redirect(url_for('auth.token_expired'))

        now = int(time.time())
        if token_info['expires_at'] - now <= 0:
            # FIXME: for now
            return redirect(url_for('auth.token_expired'))

        return func(*args, **kwargs)

    return decorated_function


#FIXME: this decorator may not being used, thinking about delete it
# check if user has certain privileges
# 3 layers will enable it to accept parameters in the decorator
def permission_required(permission_name):
    def decorator(func):
        @wraps(func)
        def decorated_function(*args, **kwargs):

            # FIXME: need access to dtabase when there is one
            if(permission_name == "no"):
                # raise 403 Forbidden
                abort(403)

            return func(*args, **kwargs)
        return decorated_function
    return decorator



def rank_progress_above(rank_progress):
    def decorator(func):
        @wraps(func)
        def decorated_function(*args, **kwargs):

            #will not pass if rank progress lower than stated
            if current_user.rank_progress < rank_progress:
                abort(403)
            return func(*args, **kwargs)
        return decorated_function
    return decorator

"""
# template for decorators
def token_check(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        pass
        return func(*args, **kwargs)


    return decorated_function
"""
