from flask import Blueprint, session, render_template, jsonify, make_response, request
from server.api.decorators import login_required, token_checked
from server.api.extensions import limiter
from server.api.utils import get_spotify_object
import sys

# routes for specific user (information)

user_bp = Blueprint('user', __name__)


@user_bp.route("/user/test")
@login_required
@token_checked
def test():
    # print("---------in test, session: ", session)
    response = make_response(
        jsonify(
            {'recent_tracks': "temp"}
        )
    )
    # this is already set in the __init__.py in api folder, but don't delete, for reference later
    # response.set_cookie(key="spotifyTempCookie", value="temp value", samesite='None', secure='true')
    # response.set_cookie(key="spotifyTempCookie", value="temp value", httponly=True ,samesite='None')
    # response.set_cookie(key="spotifyTempCookie", value="temp value", samesite='Lax')
    return response


@user_bp.route("/user/homepage")
@limiter.limit("5 per second")
@login_required
@token_checked
def home():
    sp = get_spotify_object()
    # get current user
    current_user = sp.current_user()

    #  print("------home page..", session)

    # some basic user information

    # return "this is user page..."
    return render_template("user/dashboard_interface.html", user_info={})


# Returns dictionary of user's top tracks
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
            top_tracks.append(one_track)

        # if there are less tracks then limit_count, then no need to do another search
        if len(top_tracks_raw['items']) < limit_count:
            break

    return {"top_tracks": top_tracks}


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
            top_artists.append(one_artist)

        # if there are less tracks then limit_count, then no need to do another search
        if len(top_artists_raw['items']) < limit_count:
            break

    return {"top_artists": top_artists}


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

    recently_played_tracks = []

    recentlY_played_raw = sp.current_user_recently_played()

    for one_record in recentlY_played_raw['items']:
        one_track = one_record['track']
        # one_track_name = one_track['name']
        # one_track_id = one_track['id']
        recently_played_tracks.append(one_track)

        # recently_played_tracks[one_track_id] = one_track_name

    return {"recent_tracks": recently_played_tracks}

# this is already set in the __init__.py in api folder, but don't delete, for reference later
# response.headers.add("Access-Control-Allow-Origin", "*")
# response.headers.add("samesite", None)

# response.set_cookie('same-site-cookie', 'foo', samesite='Lax')
# response.set_cookie('cross-site-cookie', 'bar', samesite='None', secure=True)

# return render_template("user/recently_played_tracks.html", recently_played_tracks=recently_played_tracks)


# Returns dictionary of user's playlists (50 max)
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
        user_id = session['USER_ID']
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
@user_bp.route("/user/set_user_playlist/<playlist_id>", methods=['GET', 'POST'])
@limiter.limit("2 per second")
@login_required
@token_checked
def set_user_playlist(playlist_id):
    sp = get_spotify_object()
    if request.method == "POST":
        # get necessary data from the json passed along with the post request
        # FIXME: make sure none of they empty..
        data_json = request.get_json()
        name = data_json['name']
        public = data_json['public']
        collaborative = data_json['collaborative']
        description = data_json['description']

        sp.playlist_change_details(playlist_id=playlist_id, name=name,
                                   public=public, collaborative=collaborative, description=description)

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
