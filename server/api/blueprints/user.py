from flask import Blueprint, session, render_template, jsonify, make_response, request
#from server.api.decorators import login_required, token_checked
from flask_login import login_required, current_user
from server.api.decorators import token_checked
from server.api.extensions import limiter, db
from server.api.models import User_Info, Top_Tracks_Info, Top_Artists_Info, Recent_Tracks_Info
from server.api.utils import get_spotify_object
import sys
from datetime import datetime

# this file contains routes for specific user (information)

user_bp = Blueprint('user', __name__)


@user_bp.route("/user/test")
@login_required
# @token_checked
def test():
    response = make_response(
        jsonify(
            {'recent_tracks': "temp"}
        )
    )
    return response



# Returns dictionary of user's top tracks
@user_bp.route("/user/top_tracks")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_tracks():
    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    #database query
    db_top_tracks_info = Top_Tracks_Info.query.filter(Top_Tracks_Info.user_id == cur_user_id).first()
    if db_top_tracks_info:
        #database will update the data according to the time interval set
        return {'top_tracks': db_top_tracks_info.get_json()['items']}

    else:
        #if not exist in database, then add it
        top_tracks_raw = sp.current_user_top_tracks(
            limit=50, time_range='long_term')

        new_top_tracks_info = Top_Tracks_Info(user_id=cur_user_id)
        new_top_tracks_info.update(top_tracks_raw)
        db.session.add(new_top_tracks_info)
        # push the changes to database
        db.session.commit()

        return {"top_tracks": top_tracks_raw['items']}


@user_bp.route("/user/top_artists")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_artists():
    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    #database query
    db_top_artists_info = Top_Artists_Info.query.filter(Top_Artists_Info.user_id == cur_user_id).first()
    if db_top_artists_info:
        #database will update the data according to the time interval set
        return {'top_artists': db_top_artists_info.get_json()['items']}

    else:
        #if not exist in database, then add it
        top_artists_raw = sp.current_user_top_artists(
            limit=50, time_range='long_term')

        new_top_artists_info = Top_Artists_Info(user_id=cur_user_id)
        new_top_artists_info.update(top_artists_raw)
        db.session.add(new_top_artists_info)
        # push the changes to database
        db.session.commit()

        return {"top_artists": top_artists_raw['items']}


@user_bp.route("/user/top_albums")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_albums():
    sp = get_spotify_object()

    top_albums = []

    history = []
    # keep get top tracks until there is no more left
    offset_count = 0
    limit_count = 50
    while(True):
        top_tracks_raw = sp.current_user_top_tracks(
            limit=limit_count, offset=offset_count)
        offset_count += limit_count

        for one_track in top_tracks_raw['items']:
            cur_album = one_track['album']
            cur_album_id = one_track['album']['id']

            if cur_album_id not in history:
                top_albums.append(cur_album)
                # make sure they don't repeat
                history.append((cur_album_id))

        # if there are less tracks then limit_count, then no need to do another search
        if len(top_tracks_raw['items']) < limit_count:
            break

    return {"top_albums": top_albums}


# Returns dictionary of a user's recently played tracks
@user_bp.route("/user/recently_played_tracks")
@limiter.limit("5 per second")
@login_required
@token_checked
def recently_played_tracks():
    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    #database query
    db_recent_tracks_info = Recent_Tracks_Info.query.filter(Recent_Tracks_Info.user_id == cur_user_id).first()
    if db_recent_tracks_info:
        #database will update the data according to the time interval set
        return {'recent_tracks': [ one_track_raw['track'] for one_track_raw in db_recent_tracks_info.get_json()['items']]}

    else:
        #if not exist in database, then add it
        recent_tracks_raw = sp.current_user_recently_played(limit=50)

        new_recent_tracks_info = Recent_Tracks_Info(user_id=cur_user_id)
        new_recent_tracks_info.update(recent_tracks_raw)
        db.session.add(new_recent_tracks_info)
        # push the changes to database
        db.session.commit()

        return {"recent_tracks": [ one_track_raw['track'] for one_track_raw in recent_tracks_raw['items']]}


@user_bp.route("/user/playlists", methods=['GET', 'POST'])
@limiter.limit("2 per second")
@login_required
@token_checked
def playlists():

    sp = get_spotify_object()

    # if request is get, return all the playlists current user has
    if request.method == 'GET':
        user_playlists = []

        offset_count = 0
        limit_count = 50
        while(True):
            user_playlists_raw = sp.current_user_playlists(
                limit=limit_count, offset=offset_count)
            offset_count += limit_count

            for one_playlist in user_playlists_raw['items']:
                user_playlists.append(one_playlist)

            if len(user_playlists_raw['items']) < limit_count:
                break

        return {"playlists": user_playlists}

    # -----else if request is post, create a new playlist
    if request.method == "POST":
        data_json = request.get_json()
        #user_id = session['USER_ID']
        user_id = current_user.user_id
        playlist_name = data_json['name']
        public = data_json['public']
        # list of tracks' ids
        tracks = data_json['tracks']

        playlist_raw = sp.user_playlist_create(
            user=user_id, name=playlist_name, public=public)
        playlist_id = playlist_raw['id']

        # store the tracks
        return sp.user_playlist_add_tracks(
            user=user_id, playlist_id=playlist_id, tracks=tracks)



#FIXME: check if spotify api gives indicators of recently played / created playlists
@user_bp.route("/user/playlists", methods=['GET', 'POST'])
@limiter.limit("2 per second")
@login_required
@token_checked
def recent_playlists():

    sp = get_spotify_object()

    # returns users playlists
    if request.method == 'GET':

        user_playlists = []
        offset_count = 0
        limit_count = 10

        while(True):
            user_playlists_raw = sp.current_user_playlists(
                limit=limit_count, offset=offset_count)
            offset_count += limit_count

            for one_playlist in user_playlists_raw['items']:
                user_playlists.append(one_playlist)

            if len(user_playlists_raw['items']) < limit_count:
                break

        return {"playlists": user_playlists}


@user_bp.route("/user/recommended_tracks")
@limiter.limit("2 per second")
@login_required
@token_checked
def recommended_tracks():
    sp = get_spotify_object()

    tracks = []

    top_tracks_raw = sp.current_user_top_tracks(limit=5)

    for one_track in top_tracks_raw['items']:
        tracks.append(one_track['id'])

    # generate recommendation based on 5 top tracks (5 is max)
    recommended_tracks_raw = sp.recommendations(seed_tracks=tracks)

    result = [one_track for one_track in recommended_tracks_raw['tracks']]

    track_uris = [one_track['uri']
                  for one_track in recommended_tracks_raw['tracks']]

    return {"recommended_tracks": result, "uris": track_uris}


# when you use method "GET" it will return the playlist detail, if "POST" you can set the values with the json
@user_bp.route("/user/playlist/<playlist_id>", methods=['GET', 'POST'])
@limiter.limit("2 per second")
@login_required
@token_checked
def playlist(playlist_id):
    sp = get_spotify_object()
    if request.method == "POST":
        # get necessary data from the json passed along with the post request
        data_json = request.get_json()
        name = data_json['name']
        public = data_json['public']

        sp.playlist_change_details(playlist_id=playlist_id, name=name, public=public)
        #FIXME: since we have to return..
        return "updated your playlist details!!!"

    else:
        one_playlist_raw = sp.playlist(playlist_id)
        return one_playlist_raw


# Takes an array of a user's top tracks and returns an array of common seperated strings of track ID(s)
@login_required
@token_checked
def get_track_ids():
    sp = get_spotify_object()

    ids = []

    top_tracks = sp.current_user_top_tracks(limit=50, offset=0)

    for one_track in top_tracks['items']:
        one_track_id = one_track['id']
        ids.append(one_track_id)

    return ids


# Takes track ID(s) and returns a dictionary of the audio feature objects
@user_bp.route("/user/top_audio_features")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_tracks_audio_features():

    sp = get_spotify_object()

    ids = get_track_ids()

    audio_features = sp.audio_features(ids)

    return {'top_tracks_audio_features': audio_features}


@user_bp.route("/user/my_profile")
@limiter.limit("5 per second")
@login_required
@token_checked
def my_profile():

    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id


    #database query
    db_user_info = User_Info.query.filter(User_Info.user_id == cur_user_id).first()
    if db_user_info:
        #database will update the data according to the time interval set
        return {'user': [db_user_info.get_json()]}

    else:
        #if not exist in database, then add it
        user_profile_raw = sp.current_user()
        new_user_info = User_Info(user_id=cur_user_id)
        new_user_info.update(user_profile_raw)
        db.session.add(new_user_info)
        # push the changes to database
        db.session.commit()
        result = {'user': [user_profile_raw]}

        return result



