from flask import Blueprint, session, render_template, jsonify, make_response
from server.api.decorators import login_required, token_checked
from server.api.extensions import limiter
from server.api.utils import get_spotify_object
import sys

# routes for specific user (information)

user_bp = Blueprint('user', __name__)


@user_bp.route("/user/test")
# @login_required
# @token_checked
def test():
    print("---------in test, session: ", session)
    response = make_response(
        jsonify(
            {'recent_tracks': "temp"}
        )
    )
    response.set_cookie(key="spotifyTempCookie",
                        value="temp value", samesite='None', secure='true')
    return response


@user_bp.route("/user/homepage")
@limiter.limit("5 per second")
@login_required
@token_checked
def home():
    sp = get_spotify_object()
    # get current user
    current_user = sp.current_user()

    print("------home page..", session)

    # some basic user information

    # return "this is user page..."
    return render_template("user/dashboard_interface.html", user_info={})


@user_bp.route("/user/top_tracks")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_tracks():
    sp = get_spotify_object()

    top_tracks = []

    # keep get top tracks until there is no more left
    offset_count = 0
    limit_count = 50
    while(True):
        top_tracks_raw = sp.current_user_top_tracks(
            limit=limit_count, offset=offset_count)
        offset_count += limit_count

        for one_track in top_tracks_raw['items']:
            one_track_name = one_track['name']
            top_tracks.append(one_track_name)

        # if there are less tracks then limit_count, then no need to do another search
        if len(top_tracks_raw['items']) < limit_count:
            break

    # FIXME: change this part when need to work with front end
    return render_template("user/top_tracks.html", top_tracks=top_tracks)


@user_bp.route("/user/top_artists")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_artists():
    sp = get_spotify_object()

    top_artists = []

    # keep get top artists until there is no more left
    offset_count = 0
    limit_count = 50
    while(True):
        top_artists_raw = sp.current_user_top_artists(
            limit=limit_count, offset=offset_count)
        offset_count += limit_count

        for one_artist in top_artists_raw['items']:
            one_artist_name = one_artist['name']
            top_artists.append(one_artist_name)

        # if there are less tracks then limit_count, then no need to do another search
        if len(top_artists_raw['items']) < limit_count:
            break

    # FIXME: change this part when need to work with front end
    return render_template("user/top_artists.html", top_artists=top_artists)


@user_bp.route("/user/top_albums")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_albums():
    sp = get_spotify_object()

    top_albums = []

    # keep get top tracks until there is no more left
    offset_count = 0
    limit_count = 50
    while(True):
        top_tracks_raw = sp.current_user_top_tracks(
            limit=limit_count, offset=offset_count)
        offset_count += limit_count

        for one_track in top_tracks_raw['items']:
            cur_album_name = one_track['album']['name']
            if cur_album_name not in top_albums:
                top_albums.append(cur_album_name)

        # if there are less tracks then limit_count, then no need to do another search
        if len(top_tracks_raw['items']) < limit_count:
            break

    # FIXME: change this part when need to work with front end
    return render_template("user/top_albums.html", top_albums=top_albums)


@user_bp.route("/user/recently_played_tracks")
@limiter.limit("5 per second")
@login_required
@token_checked
def recently_played_tracks():
    sp = get_spotify_object()

    recently_played_tracks = []

    recentlY_played_raw = sp.current_user_recently_played()

    for one_record in recentlY_played_raw['items']:
        #time_stamp = one_record["played_at"]
        one_track = one_record['track']
        recently_played_tracks.append(one_track['name'])

    #FIXME: not final
    return {'recent_tracks': recently_played_tracks}

    # this is already set in the __init__.py in api folder, but don't delete, for reference later
    # response.headers.add("Access-Control-Allow-Origin",
    #                      "http://localhost:3000")
    # response.headers.add("Access-Control-Allow-Credentials", "true")
    # response.headers.add("samesite", None)
    # response.set_cookie(key="spotifyTempCookie", value="temp value", samesite='None', secure='true')
    # response.set_cookie(key="spotifyTempCookie", value="temp value", httponly=True ,samesite='None')
    # response.set_cookie(key="spotifyTempCookie", value="temp value", samesite='Lax')
    # return response

    # returns JSON data to be returned to frontend
    # return {'recent_tracks': recently_played_tracks}

    # return render_template("user/recently_played_tracks.html", recently_played_tracks=recently_played_tracks)
