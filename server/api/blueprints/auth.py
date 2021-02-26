from flask import Blueprint, url_for, session, redirect, request, jsonify
import spotipy
from flask_login import login_user, login_required, current_user, logout_user
#FIXME:
#from server.api.decorators import login_required
# from server.api.decorators import db, db_cursor
from server.api.utils import get_spotify_oauth, get_token_info, get_spotify_object, refresh_token_info
from server.api.extensions import limiter, db
from server.api.models import User, Bug_Report

# routes relate to authentication

auth_bp = Blueprint('auth', __name__)


@auth_bp.route("/auth/logout")
@login_required
def logout():
    #session['LOGGED_IN'] = False
    #FIXME:
    logout_user()

    #refer to index
    return redirect("/")


@auth_bp.route("/auth/login",  methods=['GET'])
@limiter.limit("2 per second")
def login():
    # set up the spotify authorization
    sp_oauth = get_spotify_oauth()

    # make the authorization request and return the link where can approve the request
    auth_url = sp_oauth.get_authorize_url()

    # redirect user to that link (where they can click "agree")
    return redirect(auth_url)


# the page that returns to after user get authentication from spotify
@ auth_bp.route("/auth/redirect")
def redirect_page():
    sp_oauth = get_spotify_oauth()
    session.clear()

    # get the code passed back with the query string, it's needed to get the access token
    code = request.args.get('code')

    # if no code is given, that means user chose "decline" not "agree"
    if code is None:
        try:
            del session['TOKEN_INFO']
        finally:
            # FIXME: need a page I guess
            return 'Authorization failed'

    # get token info (access token included) with the code
    token_info = sp_oauth.get_access_token(code, check_cache=False)

    # save token info into the session
    session['TOKEN_INFO'] = token_info

    # FIXME
    refresh_token_info(token_info['refresh_token'])

    # try to login the user in
    try:
        # get spotify object that we will make request of
        sp = get_spotify_object()
        cur_user = sp.current_user()
        cur_user_name = cur_user['display_name']
        cur_user_id = cur_user['id']

        # FIXME: may need more info later
        temp_user = User.query.filter(User.user_id == cur_user_id).first()
        if not temp_user:
            temp_user = User(user_name=cur_user_name, user_id=cur_user_id)
            db.session.add(temp_user)
            db.session.commit()

        #FIXME:
        login_user(temp_user)

        #session['LOGGED_IN'] = True
        #session['USER_NAME'] = cur_user_name
        #session['USER_ID'] = cur_user_id

    except Exception as e:
        print(e)

    #refer to the /home in front end route
    return redirect("/home")

# FIXME: if you want to have a html page for this
@ auth_bp.route("/auth/token_expired")
def token_expired():
    return "Your access token is expired, please go to login page to refresh the access token"


# FIXME: react will not redirect to the login page
@ auth_bp.route("/auth/access_denied")
def access_denied():
    #return "You don't have the permission for this operation" , 404
    #supposedly, this should redirect to the login page
    return redirect("/", 403)







