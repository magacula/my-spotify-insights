from flask import Blueprint, session, render_template, jsonify, make_response, request
from server.api.decorators import login_required, token_checked
from server.api.extensions import limiter
from server.api.utils import get_spotify_object, translate_bool_value
import sys

# routes for specific user (information)

user_bp = Blueprint('user', __name__)


@user_bp.route("/user/test")
# @login_required
# @token_checked
def test():
    #print("---------in test, session: ", session)
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

    #print("------home page..", session)

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
        #recently_played_tracks.append(one_track['name'])
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

    # FOR TESTING
    # print('This is standard output', file=sys.stdout)
    # print(jsonify({'recent_tracks': recently_played_tracks}), file=sys.stdout)


@user_bp.route("/user/user_playlists")
@limiter.limit("2 per second")
@login_required
@token_checked
def user_playlists():
    sp = get_spotify_object()
    user_playlists = {}

    offset_count = 0
    limit_count = 50
    while(True):
        user_playlists_raw = sp.current_user_playlists(limit=limit_count, offset=offset_count)
        offset_count += limit_count

        for one_playlist in user_playlists_raw['items']:
            one_playlist_name = one_playlist['name']
            one_playlist_id = one_playlist['id']
            one_playlist_count = one_playlist['tracks']['total']
            one_playlist_is_public = one_playlist['public']

            #id, name, count, public
            user_playlists[one_playlist_id] = {'name': one_playlist_name,
                                               'count': one_playlist_count,
                                               'public': one_playlist_is_public}

        if len(user_playlists_raw['items']) < limit_count:
            break

    return user_playlists




@user_bp.route("/user/set_user_playlist/<playlist_id>", methods = ['POST'])
@limiter.limit("2 per second")
@login_required
@token_checked
def set_user_playlist (playlist_id):
    #get necessary data from the json passed along with the post request
    # FIXME: make sure none of they empty..
    data_json = request.get_json()
    name = data_json['name']
    public = translate_bool_value(data_json['public'])
    collaborative = translate_bool_value(data_json['collaborative'])
    description = data_json['description']



    sp = get_spotify_object()
    #FIXME: can not change private back to public, maybe the latency of scope update, check this later..
    sp.playlist_change_details(playlist_id=playlist_id,
                               name=name,
                               public=public,
                               collaborative=collaborative,
                               description=description
                               )


    #print ("input I got: id: ", playlist_id," ,name: " , name , " ,public: ",public, " , coll: ", collaborative, " ,desc: ", description)

    return "updated your playlist detials!!!"

