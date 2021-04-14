from flask import Blueprint, session, render_template, jsonify, make_response, request
#from server.api.decorators import login_required, token_checked
from flask_login import login_required, current_user
from server.api.decorators import token_checked, rank_progress_above
from server.api.constants import LV_ZERO, LV_ONE, LV_TWO, LV_THREE
from server.api.extensions import limiter, db
from server.api.models import Top_Artists_Info_medium, Top_Artists_Info_short, Top_Tracks_Info, Top_Tracks_Info_medium, Top_Artists_Info, Recent_Tracks_Info, Top_Tracks_Info_short, User, Bug_Report
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


@user_bp.route("/user/rank_progress")
@limiter.limit("5 per second")
@login_required
def get_rank_progress():
    db_user = User.query.filter(User.user_id == current_user.user_id).first()
    if not db_user:
        return {'rank_progress': 0}

    return {'rank_progress': db_user.rank_progress}


# FIXME: testing only, will delete later
@user_bp.route("/user/increment_rank_progress")
@limiter.limit("5 per second")
@login_required
def increment_rank_progress():
    db_user = User.query.filter(User.user_id == current_user.user_id).first()
    if not db_user:
        return {}
    db_user.increment_rank_progress_c(10)

    return {}


# Returns dictionary of user's top tracks (long term)
@user_bp.route("/user/top_tracks")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_tracks():
    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    # database query
    db_top_tracks_info = Top_Tracks_Info.query.filter(
        Top_Tracks_Info.user_id == cur_user_id).first()
    if db_top_tracks_info:
        # database will update the data according to the time interval set
        return {'top_tracks': db_top_tracks_info.get_json()['items']}

    else:
        # if not exist in database, then add it
        new_top_tracks_info = Top_Tracks_Info(user_id=cur_user_id)
        db.session.add(new_top_tracks_info)
        # push the changes to database
        db.session.commit()

        return {"top_tracks": new_top_tracks_info.get_json()['items']}

# Returns dictionary of user's top tracks (medium term)


@user_bp.route("/user/top_tracks_medium")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_tracks_medium():
    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    # database query
    db_top_tracks_info = Top_Tracks_Info_medium.query.filter(
        Top_Tracks_Info.user_id == cur_user_id).first()
    if db_top_tracks_info:
        # database will update the data according to the time interval set
        return {'top_tracks': db_top_tracks_info.get_json()['items']}

    else:
        # if not exist in database, then add it
        new_top_tracks_info = Top_Tracks_Info_medium(user_id=cur_user_id)
        db.session.add(new_top_tracks_info)
        # push the changes to database
        db.session.commit()

        return {"top_tracks_medium": new_top_tracks_info.get_json()['items']}

# Returns dictionary of user's top tracks (short term)


@user_bp.route("/user/top_tracks_short")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_tracks_short():
    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    # database query
    db_top_tracks_info = Top_Tracks_Info_short.query.filter(
        Top_Tracks_Info.user_id == cur_user_id).first()
    if db_top_tracks_info:
        # database will update the data according to the time interval set
        return {'top_tracks': db_top_tracks_info.get_json()['items']}

    else:
        # if not exist in database, then add it
        new_top_tracks_info = Top_Tracks_Info_short(user_id=cur_user_id)
        db.session.add(new_top_tracks_info)
        # push the changes to database
        db.session.commit()

        return {"top_tracks_short": new_top_tracks_info.get_json()['items']}

# Returns dictionary of user's top artists (long term)


@user_bp.route("/user/top_artists")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_artists():
    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    # database query
    db_top_artists_info = Top_Artists_Info.query.filter(
        Top_Artists_Info.user_id == cur_user_id).first()
    if db_top_artists_info:
        # database will update the data according to the time interval set
        return {'top_artists': db_top_artists_info.get_json()['items']}

    else:
        # if not exist in database, then add it
        new_top_artists_info = Top_Artists_Info(user_id=cur_user_id)
        db.session.add(new_top_artists_info)
        # push the changes to database
        db.session.commit()

        return {"top_artists": new_top_artists_info.get_json()['items']}

# Returns dictionary of user's top tracks (short term)


@user_bp.route("/user/top_artists_short")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_artists_short():
    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    # database query
    db_top_artists_info = Top_Artists_Info_short.query.filter(
        Top_Artists_Info.user_id == cur_user_id).first()
    if db_top_artists_info:
        # database will update the data according to the time interval set
        return {'top_artists': db_top_artists_info.get_json()['items']}

    else:
        # if not exist in database, then add it
        new_top_artists_info = Top_Artists_Info_short(user_id=cur_user_id)
        db.session.add(new_top_artists_info)
        # push the changes to database
        db.session.commit()

        return {"top_artists": new_top_artists_info.get_json()['items']}

# Returns dictionary of user's top tracks (medium term)


@user_bp.route("/user/top_artists_medium")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_artists_medium():
    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    # database query
    db_top_artists_info = Top_Artists_Info_medium.query.filter(
        Top_Artists_Info.user_id == cur_user_id).first()
    if db_top_artists_info:
        # database will update the data according to the time interval set
        return {'top_artists': db_top_artists_info.get_json()['items']}

    else:
        # if not exist in database, then add it
        new_top_artists_info = Top_Artists_Info_medium(user_id=cur_user_id)
        db.session.add(new_top_artists_info)
        # push the changes to database
        db.session.commit()

        return {"top_artists": new_top_artists_info.get_json()['items']}

# --------------- top albums long range -------------------------


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
            limit=limit_count, offset=offset_count, time_range='long_term')
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


@user_bp.route("/user/top_albums_medium")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_albums_medium():
    sp = get_spotify_object()

    top_albums = []

    history = []
    # keep get top tracks until there is no more left
    offset_count = 0
    limit_count = 50
    while(True):
        top_tracks_raw = sp.current_user_top_tracks(
            limit=limit_count, offset=offset_count, time_range='medium_term')
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

    return {"top_albums_medium": top_albums}


@user_bp.route("/user/top_albums_short")
@limiter.limit("5 per second")
@login_required
@token_checked
def top_albums_short():
    sp = get_spotify_object()

    top_albums = []

    history = []
    # keep get top tracks until there is no more left
    offset_count = 0
    limit_count = 50
    while(True):
        top_tracks_raw = sp.current_user_top_tracks(
            limit=limit_count, offset=offset_count, time_range='short_term')
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

    return {"top_albums_short": top_albums}


# Returns dictionary of a user's recently played tracks
@user_bp.route("/user/recently_played_tracks")
@limiter.limit("5 per second")
@login_required
@token_checked
def recently_played_tracks():
    sp = get_spotify_object()
    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    # database query
    db_recent_tracks_info = Recent_Tracks_Info.query.filter(
        Recent_Tracks_Info.user_id == cur_user_id).first()
    if db_recent_tracks_info:
        # database will update the data according to the time interval set
        return {'recent_tracks': [one_track_raw['track'] for one_track_raw in db_recent_tracks_info.get_json()['items']]}

    else:
        # if not exist in database, then add it
        new_recent_tracks_info = Recent_Tracks_Info(user_id=cur_user_id)
        db.session.add(new_recent_tracks_info)
        # push the changes to database
        db.session.commit()

        return {'recent_tracks': [one_track_raw['track'] for one_track_raw in new_recent_tracks_info.get_json()['items']]}

# FIXME: need database support


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

# Gets tracks from a user's playlist


@user_bp.route("/user/playlist/<playlist_id>", methods=['GET'])
@limiter.limit("2 per second")
@login_required
@token_checked
def get_user_playlist(playlist_id):
    sp = get_spotify_object()

    user_playlist = []

    playlist_tracks = sp.playlist_tracks(playlist_id)

    for track in playlist_tracks['items']:
        user_playlist.append(track)

    return {'playlist_tracks': user_playlist}


# FIXME: need to verify if this works
# user can save their downloaded tracks' path, so they can play through this website

@user_bp.route("/user/local_tracks", methods=['GET', 'POST'])
@limiter.limit("2 per second")
# @login_required
# @token_checked
def local_tracks():

    #db_user = User.query.filter(User.user_id == current_user.user_id).first()
    user_id = "31t5sil2muy6y4hktuaca3qmlrke"
    db_user = User.query.filter(User.user_id == user_id).first()

    # FIXME
    if not db_user:
        return "user not found"

    # if request is get
    if request.method == 'GET':
        # make sure name is unique
        # FIXME: {'name_timestamp':'path','name_timestamp':'path', ....}
        db_local_tracks_json = db_user.local_tracks_json
        print("----local_tracks.json: ", db_local_tracks_json)
        if db_local_tracks_json:
            return db_local_tracks_json

        #case: empty
        return {}

    # -----else if request is post
    if request.method == "POST":
        data_json = request.get_json()
        db_user.local_tracks_json.update(data_json)
        db.session.commit()

    return {}


# FIXME: I don't think there is a way to get recently played playlist, may delete this part later
# FIXME: check if spotify api gives indicators of recently played / created playlists
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


# Gets audio features for a track
@user_bp.route("/user/track_audio_features/<track_id>", methods=['GET'])
@limiter.limit("5 per second")
@login_required
@token_checked
def get_track_audio_features(track_id):

    sp = get_spotify_object()

    track = []
    track.append(track_id)

    audio_features = sp.audio_features(track)

    return {'track_audio_features': audio_features}

# Gets audio features for a playlist


@user_bp.route("/user/playlist_audio_features/<playlist_id>", methods=['GET'])
@limiter.limit("5 per second")
@login_required
@token_checked
def get_playlist_audio_features(playlist_id):

    sp = get_spotify_object()

    playlist_track_ids = []

    playlist_tracks = sp.playlist_tracks(playlist_id)

    for track in playlist_tracks['items']:
        one_track_id = track['track']['id']
        playlist_track_ids.append(one_track_id)

    audio_features = sp.audio_features(playlist_track_ids)

    return {'playlist_audio_features': audio_features}


# Get audio analysis for a track based upon its Spotify ID
@user_bp.route("/user/track_audio_analysis/<track_id>", methods=['GET'])
@login_required
@token_checked
@limiter.limit("5 per second")
def track_audio_analysis(track_id):

    sp = get_spotify_object()

    audio_analysis = sp.audio_analysis(track_id)

    return {'track_audio_analysis': audio_analysis}

# Set playlist to public or private


@user_bp.route("/user/set_playlist", methods=['POST'])
@limiter.limit("5 per second")
@login_required
@token_checked
def set_playlist():

    sp = get_spotify_object()
    print("This sets the playlist details")
    if request.method == "POST":
        print("POST method used")
        data_json = request.get_json()
        playlistID = data_json['playlistID']
        privacy = data_json['privacy']
        user = data_json['user']

        if privacy == 'private':
            privacy = True
        else:
            privacy = False

        sp.user_playlist_change_details(
            playlist_id=playlistID, public=privacy, user=user)
        return {}


@user_bp.route("/user/my_profile")
@limiter.limit("5 per second")
@login_required
@token_checked
def my_profile():

    #cur_user_id = session['USER_ID']
    cur_user_id = current_user.user_id

    # database query
    #db_user_info = User_Info.query.filter(User_Info.user_id == cur_user_id).first()
    db_user_info = User.query.filter(User.user_id == cur_user_id).first()
    if db_user_info:
        # database will update the data according to the time interval set
        return {'user': [db_user_info.get_json()]}

    else:
        # if not exist in database, then add it
        new_user_info = User(user_id=cur_user_id)
        db.session.add(new_user_info)
        # push the changes to database
        db.session.commit()

        return {'user': [new_user_info.get_json()]}


# NOTE: pause/resume playback requires premium account
# track what track current user is playing...
@user_bp.route("/user/current_playback")
@limiter.limit("5 per second")
@login_required
@token_checked
def playback_current():
    sp = get_spotify_object()
    raw_data_json = sp.current_playback()

    # FIXME: change this if return null json data is not valid
    # only get return value when user is playing or just paused
    if not raw_data_json:
        return {}

    return {"progress": raw_data_json['progress_ms'],
            "total_length": raw_data_json['item']['duration_ms'],
            "is_playing": raw_data_json['is_playing'],
            "playback_json": raw_data_json
            }


# FIXME: may not need it
# post bug report
@user_bp.route("/user/report_bugs", methods=['POST'])
@limiter.limit("2 per second")
@login_required
@token_checked
def report_bugs():
    data_json = request.get_json()
    author_id = current_user.user_id

    report = data_json['report']

    db.session.add(Bug_Report(report=report, author_id=author_id))
    db.session.commit()

    return {}


# FIXME: demo can pass with low rank
@user_bp.route("/user/test_rank_low")
@limiter.limit("2 per second")
@login_required
@rank_progress_above(LV_ZERO)
def test_rank_low():
    return "pass lv zero"


# FIXME: demo can pass with high rank
@user_bp.route("/user/test_rank_high")
@limiter.limit("2 per second")
@login_required
@rank_progress_above(LV_THREE)
def test_rank_high():
    return "pass lv 3"
